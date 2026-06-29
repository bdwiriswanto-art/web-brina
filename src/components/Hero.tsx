import { motion } from 'motion/react';
import { ArrowRight, Activity, TrendingUp } from 'lucide-react';

export default function Hero() {
  return (
    <section id="beranda" className="relative pt-20 pb-32 overflow-hidden bg-white">
      {/* Background Decorative Shapes */}
      <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] bg-yellow-400 rounded-full opacity-10"></div>
      <div className="absolute bottom-[-50px] left-[-50px] w-[300px] h-[300px] bg-yellow-300 rounded-full opacity-20"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="inline-block px-4 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              Murni Bersih Sehat
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-black leading-[0.9] mb-8 uppercase text-slate-900">
              MURNI<br/>BERSIH<br/><span className="text-yellow-400">SEHAT</span>
            </h1>
            
            <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-md">
              Dapatkan sumber protein terbaik tanpa kolesterol dan lemak. Putih telur cair segar siap minum atau masak untuk kebutuhan nutrisi harianmu.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#produk" 
                className="bg-yellow-400 text-slate-900 px-10 py-5 rounded-2xl font-black text-lg shadow-lg shadow-yellow-200 uppercase text-center hover:bg-yellow-500 transition-colors"
              >
                Pesan Sekarang
              </a>
              <a 
                href="#keunggulan" 
                className="border-2 border-slate-200 px-10 py-5 rounded-2xl font-black text-lg uppercase text-slate-900 hover:border-slate-300 transition-colors text-center"
              >
                Lihat Detail
              </a>
            </div>

            <div className="mt-16 flex flex-wrap gap-12 border-t border-slate-100 pt-12">
              <div className="flex flex-col">
                <span className="text-4xl font-black text-yellow-500 leading-none">11g</span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Protein / 100ml</span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl font-black text-slate-900 leading-none">0%</span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Lemak & Kolesterol</span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl font-black text-slate-900 leading-none">FREE</span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Pengawet</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:h-[600px] flex items-center justify-center"
          >
            {/* Abstract representation of the product */}
            <div className="relative w-full max-w-[380px] aspect-[4/5] bg-slate-50 rounded-[60px] border-8 border-white shadow-2xl overflow-hidden flex items-center justify-center mx-auto">
              <div className="absolute top-0 w-full h-1/3 bg-yellow-400 flex items-center justify-center">
                <span className="text-white font-black text-4xl italic">PROTEIN+</span>
              </div>
              <div className="mt-20 flex flex-col items-center relative z-10">
                <div className="w-32 h-32 bg-white rounded-full shadow-inner flex items-center justify-center mb-4">
                  <div className="w-24 h-24 border-4 border-dashed border-yellow-200 rounded-full"></div>
                </div>
                <div className="text-center">
                  <p className="font-black text-2xl text-slate-900">BRINA PUTIH TELUR</p>
                  <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Liquid Egg White</p>
                </div>
              </div>
            </div>
            
            {/* Floating badge */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute lg:-right-4 right-4 lg:top-1/4 top-1/2 w-32 h-32 bg-slate-900 rounded-full flex flex-col items-center justify-center text-white border-4 border-white shadow-xl z-20"
            >
              <span className="text-3xl font-black leading-none mb-1">0%</span>
              <span className="text-[10px] font-bold uppercase tracking-tight">Lemak</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
