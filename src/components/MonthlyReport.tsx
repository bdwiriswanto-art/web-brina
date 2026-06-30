import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { DailySale } from '../types';
import { FileText, Loader2 } from 'lucide-react';

export function MonthlyReport() {
  const [sales, setSales] = useState<DailySale[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Get unique months for filter
  const [selectedMonth, setSelectedMonth] = useState<string>('');

  useEffect(() => {
    const q = query(collection(db, 'sales'), orderBy('tgl', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: DailySale[] = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as DailySale);
      });
      setSales(data);
      
      if (data.length > 0 && !selectedMonth) {
        // Set to most recent month by default
        const mostRecent = data[0].tgl.substring(0, 7); // YYYY-MM
        setSelectedMonth(mostRecent);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, [selectedMonth]);

  const uniqueMonths = Array.from(new Set(sales.map(s => s.tgl.substring(0, 7)))).sort().reverse();
  
  const filteredSales = sales.filter(s => selectedMonth ? s.tgl.startsWith(selectedMonth) : true);

  // Totals for the month
  const totalOrderQty = filteredSales.reduce((sum, item) => sum + item.order.qty, 0);
  const totalOrderRp = filteredSales.reduce((sum, item) => sum + item.order.total, 0);
  const totalJualQty = filteredSales.reduce((sum, item) => sum + item.jual.qty, 0);
  const totalJualRp = filteredSales.reduce((sum, item) => sum + item.jual.total, 0);
  const totalSubtotal = filteredSales.reduce((sum, item) => sum + item.subtotal, 0);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-4" />
        <p className="text-neutral-500">Memuat data laporan...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-lg shadow-sm border border-slate-200">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800">Laporan Bulanan</h2>
            <p className="text-sm text-slate-500">Rekapitulasi transaksi berdasarkan bulan</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <label className="text-sm font-bold text-slate-600 uppercase">Pilih Bulan:</label>
          <select 
            value={selectedMonth} 
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="w-40 px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            <option value="">Semua Bulan</option>
            {uniqueMonths.map(m => {
              const date = new Date(m + '-01');
              const label = date.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
              return <option key={m} value={m}>{label}</option>
            })}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-lg shadow-sm border border-slate-200 border-l-4 border-l-orange-400">
          <p className="text-sm font-medium text-slate-500 mb-1">Total Masuk (KG)</p>
          <p className="text-2xl font-bold text-slate-900">{totalOrderQty}</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-sm border border-slate-200 border-l-4 border-l-orange-500">
          <p className="text-sm font-medium text-slate-500 mb-1">Total Pengeluaran</p>
          <p className="text-2xl font-bold text-orange-600">Rp {totalOrderRp.toLocaleString('id-ID')}</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-sm border border-slate-200 border-l-4 border-l-indigo-400">
          <p className="text-sm font-medium text-slate-500 mb-1">Total Keluar (KG)</p>
          <p className="text-2xl font-bold text-slate-900">{totalJualQty}</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-sm border border-slate-200 border-l-4 border-l-indigo-500">
          <p className="text-sm font-medium text-slate-500 mb-1">Total Pendapatan</p>
          <p className="text-2xl font-bold text-emerald-600">Rp {totalJualRp.toLocaleString('id-ID')}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr>
                <th rowSpan={2} className="px-4 py-3 bg-slate-50 text-left font-bold text-slate-600 uppercase border-r border-slate-200 text-xs">TGL</th>
                <th colSpan={4} className="px-4 py-2 bg-orange-50 text-center font-bold text-orange-800 uppercase border-r border-slate-200 border-b border-orange-200 text-xs">PEMBELIAN / MASUK</th>
                <th colSpan={4} className="px-4 py-2 bg-indigo-50 text-center font-bold text-indigo-800 uppercase border-r border-slate-200 border-b border-indigo-200 text-xs">PENJUALAN / KELUAR</th>
                <th rowSpan={2} className="px-4 py-3 bg-slate-50 text-right font-bold text-slate-600 uppercase border-r border-slate-200 text-xs">STOK (KG)</th>
                <th rowSpan={2} className="px-4 py-3 bg-slate-50 text-right font-bold text-slate-600 uppercase border-r border-slate-200 text-xs">SUBTOTAL</th>
                <th rowSpan={2} className="px-4 py-3 bg-slate-50 text-left font-bold text-slate-600 uppercase text-xs">SUPPLIER / PEMBELI</th>
              </tr>
              <tr>
                <th className="px-3 py-2 bg-orange-50/50 text-left font-bold text-slate-500 uppercase border-r border-slate-200 text-xs">NAMA</th>
                <th className="px-3 py-2 bg-orange-50/50 text-right font-bold text-slate-500 uppercase border-r border-slate-200 text-xs">QTY (KG)</th>
                <th className="px-3 py-2 bg-orange-50/50 text-right font-bold text-slate-500 uppercase border-r border-slate-200 text-xs">HARGA</th>
                <th className="px-3 py-2 bg-orange-50/50 text-right font-bold text-slate-500 uppercase border-r border-slate-200 text-xs">TOTAL</th>
                
                <th className="px-3 py-2 bg-indigo-50/50 text-left font-bold text-slate-500 uppercase border-r border-slate-200 text-xs">NAMA</th>
                <th className="px-3 py-2 bg-indigo-50/50 text-right font-bold text-slate-500 uppercase border-r border-slate-200 text-xs">QTY (KG)</th>
                <th className="px-3 py-2 bg-indigo-50/50 text-right font-bold text-slate-500 uppercase border-r border-slate-200 text-xs">HARGA</th>
                <th className="px-3 py-2 bg-indigo-50/50 text-right font-bold text-slate-500 uppercase border-r border-slate-200 text-xs">TOTAL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filteredSales.length === 0 ? (
                <tr>
                  <td colSpan={12} className="px-4 py-8 text-center text-slate-500">
                    Tidak ada data untuk bulan ini.
                  </td>
                </tr>
              ) : (
                filteredSales.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 text-slate-700">
                    <td className="px-4 py-3 whitespace-nowrap border-r border-slate-100">{item.tgl}</td>
                    
                    <td className="px-3 py-3 border-r border-slate-100">{item.order.nama || '-'}</td>
                    <td className="px-3 py-3 text-right border-r border-slate-100">{item.order.qty || '-'}</td>
                    <td className="px-3 py-3 text-right border-r border-slate-100">{item.order.harga ? item.order.harga.toLocaleString('id-ID') : '-'}</td>
                    <td className="px-3 py-3 text-right font-medium text-orange-600 border-r border-slate-100">{item.order.total ? item.order.total.toLocaleString('id-ID') : '-'}</td>
                    
                    <td className="px-3 py-3 border-r border-slate-100">{item.jual.nama || '-'}</td>
                    <td className="px-3 py-3 text-right border-r border-slate-100">{item.jual.qty || '-'}</td>
                    <td className="px-3 py-3 text-right border-r border-slate-100">{item.jual.harga ? item.jual.harga.toLocaleString('id-ID') : '-'}</td>
                    <td className="px-3 py-3 text-right font-medium text-indigo-600 border-r border-slate-100">{item.jual.total ? item.jual.total.toLocaleString('id-ID') : '-'}</td>
                    
                    <td className="px-4 py-3 text-right font-medium border-r border-slate-100">{item.stok}</td>
                    <td className="px-4 py-3 text-right font-semibold text-emerald-600 border-r border-slate-100">{item.subtotal.toLocaleString('id-ID')}</td>
                    <td className="px-4 py-3 text-slate-500 max-w-xs truncate" title={item.keterangan}>{item.keterangan || '-'}</td>
                  </tr>
                ))
              )}
            </tbody>
            {filteredSales.length > 0 && (
              <tfoot className="bg-slate-50 font-medium border-t-2 border-slate-200">
                <tr className="text-slate-800">
                  <td className="px-4 py-3 border-r border-slate-200 text-right font-bold" colSpan={2}>TOTAL</td>
                  <td className="px-3 py-3 text-right border-r border-slate-200 font-bold">{totalOrderQty}</td>
                  <td className="px-3 py-3 text-right border-r border-slate-200">-</td>
                  <td className="px-3 py-3 text-right text-orange-700 font-bold border-r border-slate-200">{totalOrderRp.toLocaleString('id-ID')}</td>
                  
                  <td className="px-3 py-3 border-r border-slate-200 text-right font-bold">TOTAL</td>
                  <td className="px-3 py-3 text-right border-r border-slate-200 font-bold">{totalJualQty}</td>
                  <td className="px-3 py-3 text-right border-r border-slate-200">-</td>
                  <td className="px-3 py-3 text-right text-indigo-700 font-bold border-r border-slate-200">{totalJualRp.toLocaleString('id-ID')}</td>
                  
                  <td className="px-4 py-3 text-right border-r border-slate-200">-</td>
                  <td className="px-4 py-3 text-right text-emerald-700 font-bold border-r border-slate-200">{totalSubtotal.toLocaleString('id-ID')}</td>
                  <td className="px-4 py-3"></td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}
