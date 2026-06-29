import { ShieldCheck, Zap, Droplets, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

const features = [
  {
    icon: <Zap className="w-8 h-8 text-slate-900" />,
    title: 'Tinggi Protein',
    description: 'Mengandung protein murni berkualitas tinggi (11g per 100ml) untuk mendukung pembentukan dan pemulihan otot.'
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-slate-900" />,
    title: 'Pasteurisasi Higienis',
    description: 'Diproses dengan teknologi pasteurisasi modern untuk membunuh bakteri Salmonella. Aman dikonsumsi mentah.'
  },
  {
    icon: <Droplets className="w-8 h-8 text-slate-900" />,
    title: 'Bebas Lemak',
    description: '0% lemak dan kolesterol. Pilihan sempurna untuk diet ketat, cutting, atau menjaga berat badan ideal.'
  },
  {
    icon: <CheckCircle2 className="w-8 h-8 text-slate-900" />,
    title: 'Siap Pakai',
    description: 'Tidak perlu repot memisahkan kuning telur. Langsung tuang untuk dimasak atau dicampur ke protein shake.'
  }
];

export default function Features() {
  return (
    <section id="keunggulan" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 uppercase tracking-tight">Keunggulan Kami</h2>
          <p className="text-xl text-slate-600 font-medium">
            Kami menghadirkan kualitas putih telur terbaik dengan standar kebersihan tinggi untuk mendukung gaya hidup sehat Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-[40px] border-4 border-slate-100 shadow-xl hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center mb-8 shadow-inner shadow-white/50">
                {feature.icon}
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-wide">{feature.title}</h3>
              <p className="text-slate-600 font-medium leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
