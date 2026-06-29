import { ShoppingBag, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <div className="flex items-center gap-2">
            <img src="/logo.jpeg" alt="BRINA Logo" className="w-12 h-12 object-contain drop-shadow-md rounded-full" />
            <span className="text-2xl font-black tracking-tighter uppercase text-slate-900">BRINA PUTIH TELUR</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 font-bold text-sm uppercase tracking-widest">
            <a href="#beranda" className="text-slate-900 hover:text-yellow-500 transition-colors">Beranda</a>
            <a href="#keunggulan" className="text-slate-900 hover:text-yellow-500 transition-colors">Keunggulan</a>
            <a href="#teori" className="text-slate-900 hover:text-yellow-500 transition-colors">Manfaat & Nutrisi</a>
            <a href="#produk" className="text-slate-900 hover:text-yellow-500 transition-colors">Produk</a>
            <a href="#review" className="text-slate-900 hover:text-yellow-500 transition-colors">Review</a>
            <a 
              href="#produk" 
              className="bg-slate-900 text-white px-8 py-3 rounded-full font-bold hover:bg-yellow-500 transition-colors uppercase text-xs tracking-widest flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              Beli Sekarang
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-900 hover:text-yellow-500 focus:outline-none transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 font-bold text-sm uppercase tracking-widest">
            <a href="#beranda" className="block px-3 py-2 text-slate-900 hover:text-yellow-500 hover:bg-slate-50 rounded-md transition-colors">Beranda</a>
            <a href="#keunggulan" className="block px-3 py-2 text-slate-900 hover:text-yellow-500 hover:bg-slate-50 rounded-md transition-colors">Keunggulan</a>
            <a href="#teori" className="block px-3 py-2 text-slate-900 hover:text-yellow-500 hover:bg-slate-50 rounded-md transition-colors">Manfaat & Nutrisi</a>
            <a href="#produk" className="block px-3 py-2 text-slate-900 hover:text-yellow-500 hover:bg-slate-50 rounded-md transition-colors">Produk</a>
            <a href="#review" className="block px-3 py-2 text-slate-900 hover:text-yellow-500 hover:bg-slate-50 rounded-md transition-colors">Review</a>
          </div>
        </div>
      )}
    </nav>
  );
}
