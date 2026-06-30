import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Package, ArrowDownRight, ArrowUpRight, Trash2 } from 'lucide-react';
import { getTodayStr } from '../utils/dateUtils';

export function DailyStockWidget() {
  const [stock, setStock] = useState({ masuk: 0, keluar: 0, sisa: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'sales'), where('tgl', '==', getTodayStr()));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      let masuk = 0;
      let keluar = 0;

      snapshot.forEach((doc) => {
        const data = doc.data();
        masuk += Number(data.order?.qty) || 0;
        keluar += Number(data.jual?.qty) || 0;
      });

      setStock({ masuk, keluar, sisa: masuk - keluar });
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const formatNum = (num: number) => {
    return Intl.NumberFormat('id-ID', { maximumFractionDigits: 2 }).format(num);
  };

  const [message, setMessage] = useState<{type: 'success'|'error', text: string} | null>(null);

  const handleReset = async () => {
    try {
      const q = query(collection(db, 'sales'), where('tgl', '==', getTodayStr()));
      const snapshot = await getDocs(q);
      
      const deletePromises: Promise<void>[] = [];
      snapshot.forEach((document) => {
        deletePromises.push(deleteDoc(document.ref));
      });
      
      await Promise.all(deletePromises);
      setMessage({ type: 'success', text: 'Data hari ini berhasil direset menjadi 0.' });
      setTimeout(() => setMessage(null), 3000);
    } catch (e: any) {
      console.error('Error resetting data:', e);
      setMessage({ type: 'error', text: `Gagal mereset data: ${e.message}` });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-sm font-bold text-slate-700 uppercase">Ringkasan Hari Ini</h2>
        <div className="flex items-center gap-4">
          {message && (
            <span className={`text-xs ${message.type === 'success' ? 'text-emerald-600' : 'text-red-600'}`}>
              {message.text}
            </span>
          )}
          <button 
            onClick={handleReset}
            className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 transition-colors bg-red-50 px-2 py-1 rounded-md"
            title="Reset Data Hari Ini"
          >
            <Trash2 className="w-3 h-3" />
            <span>Reset 0</span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
            <ArrowDownRight className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Masuk Hari Ini</p>
            <p className="text-xl font-bold text-slate-900">
              {loading ? '...' : formatNum(stock.masuk)} <span className="text-sm font-normal text-slate-500">kg</span>
            </p>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
            <ArrowUpRight className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Keluar Hari Ini</p>
            <p className="text-xl font-bold text-slate-900">
              {loading ? '...' : formatNum(stock.keluar)} <span className="text-sm font-normal text-slate-500">kg</span>
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Sisa Hari Ini</p>
            <p className="text-xl font-bold text-slate-900">
              {loading ? '...' : formatNum(stock.sisa)} <span className="text-sm font-normal text-slate-500">kg</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
