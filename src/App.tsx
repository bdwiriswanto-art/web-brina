/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { InputPenjualanForm } from './components/InputPenjualanForm';
import { InputSupplierForm } from './components/InputSupplierForm';
import { MonthlyReport } from './components/MonthlyReport';
import { DailyStockWidget } from './components/DailyStockWidget';
import { ClipboardList, LayoutDashboard, Clock, Truck } from 'lucide-react';
import logoUrl from './assets/logo.jpeg';

export default function App() {
  const [activeTab, setActiveTab] = useState<'input-penjualan' | 'input-supplier' | 'report'>('input-penjualan');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans print:h-auto print:bg-white print:overflow-visible">
      <aside className="w-[240px] bg-white border-r border-slate-200 text-slate-800 flex flex-col justify-between p-6 print:hidden">
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <img src={logoUrl} alt="Logo" className="w-8 h-8 object-contain mix-blend-multiply" />
              <h1 className="text-xl font-bold tracking-tight text-slate-900">BRINA PUTIH TELUR</h1>
            </div>
            <p className="text-xs text-slate-500">Sistem Input Penjualan Harian</p>
          </div>
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('input-penjualan')}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                activeTab === 'input-penjualan'
                  ? 'bg-blue-50 text-blue-700 border border-blue-200 font-medium'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <ClipboardList className="w-5 h-5" />
              <span>Input Penjualan</span>
            </button>
            <button
              onClick={() => setActiveTab('input-supplier')}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                activeTab === 'input-supplier'
                  ? 'bg-blue-50 text-blue-700 border border-blue-200 font-medium'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Truck className="w-5 h-5" />
              <span>Input Supplier</span>
            </button>
            <button
              onClick={() => setActiveTab('report')}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                activeTab === 'report'
                  ? 'bg-blue-50 text-blue-700 border border-blue-200 font-medium'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Laporan Bulanan</span>
            </button>
          </nav>
        </div>
        <div className="border-t border-slate-200 pt-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white">A</div>
            <div>
              <p className="text-sm font-medium">Admin Toko</p>
              <p className="text-xs font-medium text-emerald-600">● Online</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col p-6 gap-6 overflow-hidden print:p-0 print:overflow-visible">
        <header className="flex justify-between items-center bg-white p-4 rounded-lg border border-slate-200 shadow-sm shrink-0 print:hidden">
          <div className="flex flex-col">
            <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Status Koneksi Database</span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-sm font-medium text-slate-800">Terhubung ke Firestore</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-slate-800">
              {currentTime.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <p className="text-xs text-slate-500 font-mono flex items-center justify-end gap-1 mt-0.5">
              <Clock className="w-3 h-3" />
              {currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })} WIB
            </p>
          </div>
        </header>
        
        <div className="flex-1 overflow-y-auto print:overflow-visible">
          <div className="print:hidden">
            <DailyStockWidget />
          </div>
          {activeTab === 'input-penjualan' && <InputPenjualanForm />}
          {activeTab === 'input-supplier' && <InputSupplierForm />}
          {activeTab === 'report' && <MonthlyReport />}
        </div>
      </main>
    </div>
  );
}

