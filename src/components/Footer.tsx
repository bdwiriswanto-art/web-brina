import { Instagram, ShoppingBag, Video } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-16 border-t-8 border-yellow-400 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <img src="/logo.jpeg" alt="BRINA Logo" className="w-12 h-12 object-contain drop-shadow-md rounded-full" />
              <span className="text-2xl font-black tracking-tighter uppercase text-white">BRINA PUTIH TELUR</span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed font-medium mb-6">
              Mitra terbaik untuk memenuhi kebutuhan protein harian Anda. Berkualitas, higienis, dan terpercaya tanpa lemak tambahan.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/putihtelur.smg?igsh=MW11ZmNsbzVuOTF3NA==" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-slate-900 transition-all text-slate-400"
                title="Ikuti kami di Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://shopee.co.id/putihtelur.smg" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-[#ee4d2d] hover:text-white transition-all text-slate-400"
                title="Kunjungi Toko Shopee Kami"
              >
                <ShoppingBag className="w-5 h-5" />
              </a>
              <a 
                href="https://www.tiktok.com/@putihtelur.smg?_t=ZS-8zehzNZOvOG&_r=1" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all text-slate-400"
                title="Ikuti kami di TikTok"
              >
                {/* Custom TikTok SVG for perfection */}
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.09-1.5-.77-.6-1.39-1.39-1.81-2.28v7.41c.07 1.53-.19 3.09-.97 4.41-.83 1.4-2.18 2.48-3.76 2.87-1.57.38-3.29.23-4.75-.42-1.46-.66-2.65-1.87-3.26-3.34-.63-1.49-.66-3.18-.12-4.66.52-1.45 1.59-2.7 2.97-3.41 1.19-.62 2.54-.88 3.87-.79V12.1c-.88-.13-1.81.02-2.58.49-.78.48-1.35 1.28-1.53 2.19-.19.95.02 1.98.57 2.75.56.77 1.47 1.25 2.42 1.28 1.01.03 2.03-.45 2.59-1.28.53-.78.68-1.79.62-2.73V.02h3.04z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-black text-sm uppercase tracking-widest text-yellow-400 mb-6">Tautan</h4>
            <ul className="space-y-4 font-bold text-sm uppercase tracking-wider">
              <li><a href="#beranda" className="text-slate-400 hover:text-yellow-400 transition-colors">Beranda</a></li>
              <li><a href="#keunggulan" className="text-slate-400 hover:text-yellow-400 transition-colors">Keunggulan</a></li>
              <li><a href="#teori" className="text-slate-400 hover:text-yellow-400 transition-colors">Manfaat & Nutrisi</a></li>
              <li><a href="#produk" className="text-slate-400 hover:text-yellow-400 transition-colors">Produk</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-black text-sm uppercase tracking-widest text-yellow-400 mb-6">Kontak</h4>
            <ul className="space-y-4 font-medium text-slate-400 text-sm">
              <li><span className="block font-bold text-white uppercase tracking-wider text-xs mb-1">WhatsApp</span> +62 821-4662-8802</li>
              <li><span className="block font-bold text-white uppercase tracking-wider text-xs mb-1">Instagram</span> <a href="https://www.instagram.com/putihtelur.smg?igsh=MW11ZmNsbzVuOTF3NA==" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:underline">@putihtelur.smg</a></li>
              <li><span className="block font-bold text-white uppercase tracking-wider text-xs mb-1">TikTok</span> <a href="https://www.tiktok.com/@putihtelur.smg?_t=ZS-8zehzNZOvOG&_r=1" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:underline">@putihtelur.smg</a></li>
              <li><span className="block font-bold text-white uppercase tracking-wider text-xs mb-1">Shopee</span> <a href="https://shopee.co.id/putihtelur.smg" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:underline">putihtelur.smg</a></li>
              <li><span className="block font-bold text-white uppercase tracking-wider text-xs mb-1">Email</span> putihtelursmg@gmail.com</li>
              <li><span className="block font-bold text-white uppercase tracking-wider text-xs mb-1">Lokasi</span> Jl. Badak II No.19, Pandean Lamper, Kec. Gayamsari, Kota Semarang, Jawa Tengah 50249, Indonesia</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 text-center md:text-left text-slate-500 text-sm flex flex-col md:flex-row justify-between items-center gap-4 font-bold uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} BRINA PUTIH TELUR. Hak Cipta Dilindungi.</p>
          <p className="text-yellow-500">MURNI. BERSIH. SEHAT.</p>
        </div>
      </div>
    </footer>
  );
}
