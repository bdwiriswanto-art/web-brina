import { useState, FormEvent } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { DailySale } from '../types';
import { Save, AlertCircle, CheckCircle2, Truck } from 'lucide-react';
import { getTodayStr } from '../utils/dateUtils';

export function InputSupplierForm() {
  const [tgl, setTgl] = useState(getTodayStr());
  
  const [orderNama, setOrderNama] = useState('Putih Telur Mentah');
  const [orderQty, setOrderQty] = useState<number | ''>('');
  const [orderHarga, setOrderHarga] = useState<number | ''>('');
  
  const [keterangan, setKeterangan] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{type: 'success'|'error', text: string} | null>(null);

  const orderTotal = (Number(orderQty) || 0) * (Number(orderHarga) || 0);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!tgl) {
      setMessage({ type: 'error', text: 'Mohon lengkapi tanggal.' });
      return;
    }
    
    setIsSubmitting(true);
    setMessage(null);
    
    try {
      const newRecord: Omit<DailySale, 'id'> = {
        tgl,
        order: {
          nama: orderNama,
          qty: Number(orderQty) || 0,
          harga: Number(orderHarga) || 0,
          total: orderTotal
        },
        jual: {
          nama: '',
          qty: 0,
          harga: 0,
          total: 0
        },
        stok: Number(orderQty) || 0,
        subtotal: 0,
        keterangan,
        createdAt: Date.now()
      };
      
      await addDoc(collection(db, 'sales'), newRecord);
      
      // Sync to Google Sheets
      try {
        const response = await fetch('/api/sync-sheets', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            data: {
              type: 'supplier',
              date: tgl,
              item: orderNama,
              qty: Number(orderQty) || 0,
              price: Number(orderHarga) || 0,
              total: orderTotal,
              note: keterangan
            }
          })
        });
        const result = await response.json();
        if (result.spreadsheetUrl) {
           setMessage({ type: 'success', text: `Data order berhasil disimpan dan disinkronisasi ke Spreadsheet!` });
        } else {
           setMessage({ type: 'success', text: 'Data order berhasil disimpan (tanpa link spreadsheet).' });
        }
      } catch (e) {
        console.error('Failed to sync to sheets', e);
        setMessage({ type: 'success', text: 'Data order berhasil disimpan (gagal sinkronisasi).' });
      }
      
      setOrderQty(''); setOrderHarga('');
      setKeterangan('');
      
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Gagal menyimpan data.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden flex flex-col max-w-3xl">
      <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white">
        <div className="flex items-center gap-2">
          <Truck className="w-5 h-5 text-orange-600" />
          <h2 className="font-bold text-slate-800">Form Input Supplier (Masuk)</h2>
        </div>
        <span className="text-xs bg-orange-50 text-orange-600 px-2 py-1 rounded font-semibold">Tersinkronisasi</span>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 space-y-6 bg-white">
        {message && (
          <div className={`p-4 rounded-md flex items-center gap-3 ${message.type === 'success' ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'}`}>
            {message.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <span className="text-sm font-medium">{message.text}</span>
          </div>
        )}

        <div className="max-w-xs">
          <label className="text-xs font-bold text-slate-600 mb-1 block uppercase">Tanggal</label>
          <input 
            type="date" 
            required
            value={tgl}
            onChange={(e) => setTgl(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white" 
          />
        </div>

        <div className="space-y-4">
          <div className="pb-2 border-b border-orange-100">
            <h3 className="text-xs font-bold text-orange-600 uppercase tracking-wider">DATA PEMBELIAN (MASUK)</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-600 mb-1 block uppercase">QTY (KG)</label>
              <input type="number" min="0" step="any" value={orderQty} onChange={(e) => setOrderQty(e.target.valueAsNumber || e.target.value)} 
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-600 mb-1 block uppercase">Harga Satuan</label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-slate-400 sm:text-sm">Rp</span>
                </div>
                <input type="number" min="0" value={orderHarga} onChange={(e) => setOrderHarga(e.target.valueAsNumber || e.target.value)} 
                  className="w-full pl-9 px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white" />
              </div>
            </div>
          </div>
          
          <div className="bg-orange-50 p-3 rounded-md flex justify-between items-center border border-orange-100">
            <span className="text-sm font-medium text-orange-800">Total Harga</span>
            <span className="text-lg font-bold text-orange-900">Rp {orderTotal.toLocaleString('id-ID')}</span>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100">
          <div>
            <label className="text-xs font-bold text-slate-600 mb-1 block uppercase">Nama Supplier</label>
            <input 
              type="text"
              value={keterangan}
              onChange={(e) => setKeterangan(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
              placeholder="Nama supplier..."
            />
          </div>
        </div>

        <div className="pt-4 flex gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 inline-flex items-center justify-center bg-orange-600 text-white px-5 py-2.5 rounded-md font-semibold text-sm transition-all hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-5 h-5 mr-2" />
            {isSubmitting ? 'Menyimpan...' : 'Submit Data Supplier'}
          </button>
          <button
            type="button"
            onClick={() => {
              setOrderQty(''); setOrderHarga('');
              setKeterangan('');
            }}
            className="px-8 bg-slate-100 text-slate-600 py-2.5 rounded-md font-semibold text-sm transition-all hover:bg-slate-200"
          >
            Reset Form
          </button>
        </div>
      </form>
    </div>
  );
}
