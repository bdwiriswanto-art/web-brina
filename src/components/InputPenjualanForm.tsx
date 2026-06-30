import { useState, FormEvent } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { DailySale } from '../types';
import { Save, AlertCircle, CheckCircle2, ShoppingCart, Printer, X } from 'lucide-react';
import logoUrl from '../assets/logo.jpeg';
import { getTodayStr } from '../utils/dateUtils';

export function InputPenjualanForm() {
  const [tgl, setTgl] = useState(getTodayStr());
  
  const [jualNama, setJualNama] = useState('');
  const [jualQty, setJualQty] = useState<number | ''>('');
  const [jualHarga, setJualHarga] = useState<number | ''>('');
  
  const [keterangan, setKeterangan] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{type: 'success'|'error', text: string} | null>(null);
  const [notaData, setNotaData] = useState<any>(null);

  const jualTotal = (Number(jualQty) || 0) * (Number(jualHarga) || 0);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!tgl) {
      setMessage({ type: 'error', text: 'Mohon lengkapi tanggal.' });
      return;
    }
    if (!jualNama) {
      setMessage({ type: 'error', text: 'Mohon isi nama barang.' });
      return;
    }
    
    setIsSubmitting(true);
    setMessage(null);
    setNotaData(null);
    
    try {
      const currentTime = new Date();
      const jam = currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

      const newRecord: Omit<DailySale, 'id'> = {
        tgl,
        order: {
          nama: '',
          qty: 0,
          harga: 0,
          total: 0
        },
        jual: {
          nama: jualNama,
          qty: Number(jualQty) || 0,
          harga: Number(jualHarga) || 0,
          total: jualTotal
        },
        stok: -(Number(jualQty) || 0),
        subtotal: jualTotal,
        keterangan,
        createdAt: currentTime.getTime()
      };
      
      await addDoc(collection(db, 'sales'), newRecord);
      
      // Sync to Google Sheets
      try {
        const response = await fetch('/api/sync-sheets', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            data: {
              type: 'penjualan',
              date: tgl,
              item: jualNama,
              qty: Number(jualQty) || 0,
              price: Number(jualHarga) || 0,
              total: jualTotal,
              note: keterangan
            }
          })
        });
        const result = await response.json();
        if (result.spreadsheetUrl) {
           setMessage({ type: 'success', text: `Data penjualan berhasil disimpan dan disinkronisasi ke Spreadsheet!` });
           // Could theoretically store the URL, but showing this message is enough
        } else {
           setMessage({ type: 'success', text: 'Data penjualan berhasil disimpan (tanpa link spreadsheet).' });
        }
      } catch (e) {
        console.error('Failed to sync to sheets', e);
        setMessage({ type: 'success', text: 'Data penjualan berhasil disimpan (gagal sinkronisasi).' });
      }
      
      // Setup nota data to show automatically
      setNotaData({
        tgl,
        jam,
        namaPembeli: keterangan || '-',
        namaBarang: jualNama,
        qty: Number(jualQty) || 0,
        harga: Number(jualHarga) || 0,
        total: jualTotal,
        noNota: `INV-${currentTime.getTime().toString().slice(-6)}`
      });

      setJualNama(''); setJualQty(''); setJualHarga('');
      setKeterangan('');
      
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Gagal menyimpan data.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrint = () => {
    if (!notaData) return;
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    document.body.appendChild(iframe);
    
    const contentWindow = iframe.contentWindow;
    if (!contentWindow) return;
    
    const formattedHarga = notaData.harga.toLocaleString('id-ID');
    const formattedTotal = notaData.total.toLocaleString('id-ID');

    contentWindow.document.write(`
      <html>
        <head>
          <title>Nota Penjualan - ${notaData.noNota}</title>
          <style>
            @page { margin: 0; size: 80mm auto; }
            body { font-family: monospace; font-size: 12px; width: 70mm; margin: 0; padding: 10px; color: black; }
            .text-center { text-align: center; }
            .font-bold { font-weight: bold; }
            .font-semibold { font-weight: 600; }
            .mb-1 { margin-bottom: 4px; }
            .mb-2 { margin-bottom: 8px; }
            .mb-4 { margin-bottom: 16px; }
            .mt-1 { margin-top: 4px; }
            .mt-2 { margin-top: 8px; }
            .mt-4 { margin-top: 16px; }
            .pb-2 { padding-bottom: 8px; }
            .pb-4 { padding-bottom: 16px; }
            .border-b { border-bottom: 1px dashed black; }
            .flex-between { display: flex; justify-content: space-between; }
            img { max-width: 48px; margin: 0 auto; display: block; filter: grayscale(100%); }
            p { margin: 0; }
          </style>
        </head>
        <body>
          <div class="text-center border-b pb-4 mb-4">
            <img src="${window.location.origin}${logoUrl}" alt="Logo" />
            <h2 class="font-bold mt-2" style="font-size: 16px;">NOTA PENJUALAN</h2>
            <p>No: ${notaData.noNota}</p>
            <p>${notaData.tgl} | ${notaData.jam}</p>
          </div>
          
          <div class="mb-4">
            <p><span class="font-semibold">Pembeli:</span> ${notaData.namaPembeli}</p>
          </div>
          
          <div class="border-b pb-2 mb-2">
            <div class="flex-between font-bold mb-2">
              <span>Item</span>
              <span>Total</span>
            </div>
            
            <div class="mb-2">
              <p class="font-bold">${notaData.namaBarang}</p>
              <div class="flex-between mt-1">
                <span>${notaData.qty} KG x Rp ${formattedHarga}</span>
                <span>Rp ${formattedTotal}</span>
              </div>
            </div>
          </div>
          
          <div class="flex-between font-bold mt-4 border-b pb-4 text-center" style="font-size: 14px;">
            <span>TOTAL:</span>
            <span>Rp ${formattedTotal}</span>
          </div>
          
          <div class="text-center mt-4">
            <p class="font-bold mb-1">Terima Kasih</p>
            <p style="font-size: 10px;">Barang yang sudah dibeli<br/>tidak dapat ditukar/dikembalikan</p>
          </div>
        </body>
      </html>
    `);
    contentWindow.document.close();
    contentWindow.focus();
    setTimeout(() => {
      contentWindow.print();
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 1000);
    }, 500);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden flex flex-col max-w-3xl print:hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-indigo-600" />
            <h2 className="font-bold text-slate-800">Form Input Penjualan (Keluar)</h2>
          </div>
          <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded font-semibold">Tersinkronisasi</span>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6 bg-white">
          {message && (
            <div className={`p-4 rounded-md flex items-center gap-3 ${message.type === 'success' ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'}`}>
              {message.type === 'success' ? <CheckCircle2 className="w-5 h-5 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 flex-shrink-0" />}
              <span className="text-sm font-medium flex-1">{message.text}</span>
              {message.type === 'success' && notaData && (
                <button 
                  type="button" 
                  onClick={handlePrint}
                  className="ml-auto flex items-center gap-1 bg-emerald-600 text-white px-3 py-1.5 rounded text-sm font-medium hover:bg-emerald-700 transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  Cetak Nota
                </button>
              )}
            </div>
          )}

          <div className="max-w-xs">
            <label className="text-xs font-bold text-slate-600 mb-1 block uppercase">Tanggal</label>
            <input 
              type="date" 
              required
              value={tgl}
              onChange={(e) => setTgl(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white" 
            />
          </div>

          <div className="space-y-4">
            <div className="pb-2 border-b border-indigo-100">
              <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-wider">DATA PENJUALAN (KELUAR)</h3>
            </div>
            
            <div>
              <label className="text-xs font-bold text-slate-600 mb-1 block uppercase">Nama Barang</label>
              <select value={jualNama} onChange={(e) => setJualNama(e.target.value)} required
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white">
                <option value="" disabled>Pilih Barang...</option>
                <option value="Putih Telur Rebus">Putih Telur Rebus</option>
                <option value="Putih Telur Mentah">Putih Telur Mentah</option>
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-600 mb-1 block uppercase">QTY (KG)</label>
                <input type="number" min="0" step="any" value={jualQty} onChange={(e) => setJualQty(e.target.valueAsNumber || e.target.value)} 
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600 mb-1 block uppercase">Harga Satuan</label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-slate-400 sm:text-sm">Rp</span>
                  </div>
                  <input type="number" min="0" value={jualHarga} onChange={(e) => setJualHarga(e.target.valueAsNumber || e.target.value)} 
                    className="w-full pl-9 px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white" />
                </div>
              </div>
            </div>
            
            <div className="bg-indigo-50 p-3 rounded-md flex justify-between items-center border border-indigo-100">
              <span className="text-sm font-medium text-indigo-800">Total Jual</span>
              <span className="text-lg font-bold text-indigo-900">Rp {jualTotal.toLocaleString('id-ID')}</span>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100">
            <div>
              <label className="text-xs font-bold text-slate-600 mb-1 block uppercase">Nama Pembeli</label>
              <input 
                type="text"
                value={keterangan}
                onChange={(e) => setKeterangan(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                placeholder="Nama pembeli..."
              />
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 inline-flex items-center justify-center bg-indigo-600 text-white px-5 py-2.5 rounded-md font-semibold text-sm transition-all hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-5 h-5 mr-2" />
              {isSubmitting ? 'Menyimpan...' : 'Submit Data Penjualan'}
            </button>
            <button
              type="button"
              onClick={() => {
                setJualNama(''); setJualQty(''); setJualHarga('');
                setKeterangan('');
                setNotaData(null);
              }}
              className="px-8 bg-slate-100 text-slate-600 py-2.5 rounded-md font-semibold text-sm transition-all hover:bg-slate-200"
            >
              Reset Form
            </button>
          </div>
        </form>
      </div>

      {/* NOTA PREVIEW MODAL */}
      {notaData && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 print:hidden">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-4 bg-slate-50 border-b border-slate-100">
              <h3 className="font-bold text-slate-800">Preview Nota</h3>
              <button onClick={() => setNotaData(null)} className="text-slate-400 hover:text-slate-600 bg-slate-200 hover:bg-slate-300 rounded-full p-1 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto bg-slate-100 flex justify-center">
              {/* Fake Receipt Paper */}
              <div className="bg-white shadow-md p-6 w-[80mm] font-mono text-sm relative">
                {/* Receipt Zigzag top */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-slate-100" style={{ backgroundImage: 'radial-gradient(circle at 5px 0, transparent 5px, white 6px)', backgroundSize: '10px 10px', backgroundPosition: '0 -5px', marginTop: '-10px' }}></div>
                
                <div className="text-center mb-4 border-b border-dashed border-slate-300 pb-4">
                  <div className="flex justify-center mb-2">
                    <img src={logoUrl} alt="Logo" className="w-12 h-12 object-contain grayscale mix-blend-multiply" />
                  </div>
                  <h2 className="text-xl font-bold uppercase mb-1">Nota Penjualan</h2>
                  <p className="text-xs text-slate-600">No: {notaData.noNota}</p>
                  <p className="text-xs text-slate-600">{notaData.tgl} | {notaData.jam}</p>
                </div>
                
                <div className="mb-4">
                  <p className="mb-1"><span className="font-semibold">Pembeli:</span> {notaData.namaPembeli}</p>
                </div>
                
                <div className="border-b border-dashed border-slate-300 pb-2 mb-2">
                  <div className="flex justify-between font-semibold mb-2">
                    <span>Item</span>
                    <span>Total</span>
                  </div>
                  
                  <div className="mb-2">
                    <p className="font-bold">{notaData.namaBarang}</p>
                    <div className="flex justify-between text-xs mt-1 text-slate-600">
                      <span>{notaData.qty} KG x Rp {notaData.harga.toLocaleString('id-ID')}</span>
                      <span>Rp {notaData.total.toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between font-bold text-lg mt-4 border-b border-dashed border-slate-300 pb-4">
                  <span>TOTAL</span>
                  <span>Rp {notaData.total.toLocaleString('id-ID')}</span>
                </div>
                
                <div className="text-center mt-6 text-slate-500">
                  <p className="text-xs font-semibold mb-1">Terima Kasih</p>
                  <p className="text-[10px] leading-tight">Barang yang sudah dibeli<br/>tidak dapat ditukar/dikembalikan</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-slate-100 bg-white flex gap-3">
              <button 
                onClick={() => setNotaData(null)}
                className="flex-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors"
              >
                Tutup
              </button>
              <button 
                onClick={handlePrint}
                className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors flex justify-center items-center gap-2"
              >
                <Printer className="w-5 h-5" />
                Cetak Nota
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
