export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-16 border-t-8 border-yellow-400 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <img src="/logo.png" alt="BRINA Logo" className="w-12 h-12 object-contain drop-shadow-md rounded-full" />
              <span className="text-2xl font-black tracking-tighter uppercase text-white">BRINA</span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed font-medium">
              Mitra terbaik untuk memenuhi kebutuhan protein harian Anda. Berkualitas, higienis, dan terpercaya tanpa lemak tambahan.
            </p>
          </div>
          
          <div>
            <h4 className="font-black text-sm uppercase tracking-widest text-yellow-400 mb-6">Tautan</h4>
            <ul className="space-y-4 font-bold text-sm uppercase tracking-wider">
              <li><a href="#beranda" className="text-slate-400 hover:text-yellow-400 transition-colors">Beranda</a></li>
              <li><a href="#keunggulan" className="text-slate-400 hover:text-yellow-400 transition-colors">Keunggulan</a></li>
              <li><a href="#produk" className="text-slate-400 hover:text-yellow-400 transition-colors">Produk</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-black text-sm uppercase tracking-widest text-yellow-400 mb-6">Kontak</h4>
            <ul className="space-y-4 font-medium text-slate-400 text-sm">
              <li><span className="block font-bold text-white uppercase tracking-wider text-xs mb-1">WhatsApp</span> +62 812-3456-7890</li>
              <li><span className="block font-bold text-white uppercase tracking-wider text-xs mb-1">Email</span> halo@putihtelur.id</li>
              <li><span className="block font-bold text-white uppercase tracking-wider text-xs mb-1">Lokasi</span> Jakarta, Indonesia</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 text-center md:text-left text-slate-500 text-sm flex flex-col md:flex-row justify-between items-center gap-4 font-bold uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} BRINA. Hak Cipta Dilindungi.</p>
          <p className="text-yellow-500">MURNI. BERSIH. KUAT.</p>
        </div>
      </div>
    </footer>
  );
}
