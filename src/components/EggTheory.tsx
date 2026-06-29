import { useState } from 'react';
import { motion } from 'motion/react';
import { Award, Heart, Activity, Flame, ShieldAlert, Sparkles, Scale } from 'lucide-react';

export default function EggTheory() {
  const [amount, setAmount] = useState<number>(100); // default 100 grams / ml
  const [unit, setUnit] = useState<'gram' | 'ml'>('gram');

  // Nutritional values per 100g / 100ml of pure egg white
  // 100g egg white yields approx:
  // - 10.9g protein (~11g)
  // - 52 kcal
  // - 0.17g fat (~0g)
  // - 0.73g carbs (~0.7g)
  // - Equivalent to approx 3 medium egg whites (each medium egg white is ~33g)
  const calculateNutrition = (qty: number) => {
    const scale = qty / 100;
    return {
      protein: (scale * 11).toFixed(1),
      calories: Math.round(scale * 52),
      fat: (scale * 0.17).toFixed(1),
      carbs: (scale * 0.73).toFixed(1),
      eggEquivalent: (qty / 33).toFixed(1)
    };
  };

  const nutrition = calculateNutrition(amount || 0);

  // Recommendations based on protein intake amount
  const getRecommendationText = (proteinGrams: number) => {
    const protVal = proteinGrams;
    if (protVal <= 0) return 'Masukkan jumlah untuk mendapatkan rincian nutrisi.';
    if (protVal < 15) {
      return 'Sangat baik untuk cemilan sehat rendah kalori atau pelengkap sarapan guna menjaga kebugaran harian.';
    }
    if (protVal < 35) {
      return 'Porsi ideal setelah berolahraga untuk membantu pemulihan tenaga dan otot Anda.';
    }
    return 'Dosis tinggi untuk olahraga berat atau binaraga aktif guna mendukung asupan protein harian maksimal!';
  };

  const theories = [
    {
      icon: <Award className="w-6 h-6 text-yellow-600" />,
      title: 'Mudah Diserap Tubuh',
      description: 'Protein dalam putih telur sangat mudah dicerna oleh tubuh kita. Menjadikannya salah satu sumber protein alami terbaik yang bekerja dengan cepat untuk kebugaran fisik Anda.'
    },
    {
      icon: <Flame className="w-6 h-6 text-yellow-600" />,
      title: 'Bikin Kenyang & Rendah Kalori',
      description: 'Sangat rendah kalori namun kaya protein. Sangat cocok mendampingi program diet sehat agar kenyang lebih lama tanpa perlu khawatir lemak bertambah.'
    },
    {
      icon: <Activity className="w-6 h-6 text-yellow-600" />,
      title: 'Menjaga Kekuatan Otot',
      description: 'Kandungan protein murni alaminya membantu menjaga otot Anda tetap kuat, kencang, dan tidak mudah lelah selama menjalani aktivitas harian.'
    },
    {
      icon: <Heart className="w-6 h-6 text-yellow-600" />,
      title: 'Bebas Lemak & Kolesterol',
      description: 'Putih telur murni 100% bebas dari kolesterol dan lemak jenuh yang biasanya menumpuk di kuning telur. Sangat aman dikonsumsi setiap hari untuk jantung sehat.'
    }
  ];

  return (
    <section id="teori" className="py-24 bg-white relative overflow-hidden">
      {/* Background Decorative Circles */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-yellow-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-slate-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="px-4 py-1.5 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold uppercase tracking-widest inline-block mb-4">
            Manfaat & Nutrisi Praktis
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 uppercase tracking-tight">
            Kebaikan Putih Telur Murni
          </h2>
          <p className="text-xl text-slate-600 font-medium">
            Kenapa putih telur murni sangat digemari untuk mendampingi pola hidup sehat? Berikut manfaat praktis dan mudahnya untuk tubuh Anda.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          
          {/* Scientific Theories Cards (Left side) */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            {theories.map((theory, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-slate-50 p-6 rounded-[32px] border-4 border-white shadow-xl hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-yellow-100 group-hover:bg-yellow-400 group-hover:text-slate-900 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300">
                  {theory.icon}
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-3 uppercase tracking-wide">
                  {theory.title}
                </h3>
                <p className="text-slate-600 font-medium text-sm leading-relaxed">
                  {theory.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Interactive Calculator (Right side) */}
          <div className="lg:col-span-5 bg-slate-900 text-white rounded-[40px] p-8 md:p-10 shadow-2xl relative overflow-hidden border-4 border-slate-800">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-full blur-2xl"></div>
            
            <div className="flex items-center gap-3 mb-6">
              <Scale className="w-6 h-6 text-yellow-400" />
              <h3 className="text-2xl font-black uppercase tracking-tight text-white">Kalkulator Nutrisi</h3>
            </div>
            
            <p className="text-slate-400 text-sm font-medium mb-8 leading-relaxed">
              Hitung kandungan protein dan kalori dari porsi takaran putih telur Anda secara mudah.
            </p>

            <div className="space-y-6 mb-8">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3">
                  Pilih Satuan Takaran
                </label>
                <div className="grid grid-cols-2 gap-2 bg-slate-800 p-1.5 rounded-2xl">
                  <button
                    type="button"
                    onClick={() => setUnit('gram')}
                    className={`py-2.5 rounded-xl font-bold uppercase text-xs tracking-wider transition-all ${
                      unit === 'gram' 
                        ? 'bg-yellow-400 text-slate-900 shadow-md' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Gram (g)
                  </button>
                  <button
                    type="button"
                    onClick={() => setUnit('ml')}
                    className={`py-2.5 rounded-xl font-bold uppercase text-xs tracking-wider transition-all ${
                      unit === 'ml' 
                        ? 'bg-yellow-400 text-slate-900 shadow-md' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Mililiter (ml)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3">
                  Jumlah Konsumsi
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    max="10000"
                    value={amount}
                    onChange={(e) => setAmount(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full bg-slate-800 border-2 border-slate-700 rounded-2xl py-4 px-6 text-xl font-black text-white focus:outline-none focus:border-yellow-400 transition-colors"
                    placeholder="Contoh: 100"
                  />
                  <span className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold uppercase text-sm tracking-wider">
                    {unit}
                  </span>
                </div>
              </div>

              {/* Presets */}
              <div>
                <span className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
                  Takaran Cepat
                </span>
                <div className="flex flex-wrap gap-2">
                  {[100, 250, 500, 1000].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setAmount(val)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                        amount === val
                          ? 'bg-yellow-400 text-slate-900 border-yellow-400'
                          : 'bg-transparent border-slate-700 text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      {val >= 1000 ? `${val/1000} kg` : `${val} ${unit}`}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Nutrition Result Grid */}
            <div className="grid grid-cols-2 gap-4 bg-slate-850 p-6 rounded-3xl border border-slate-800 mb-6">
              <div className="bg-slate-800/40 p-4 rounded-2xl border border-slate-800 text-center">
                <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">PROTEIN</span>
                <span className="text-3xl font-black text-yellow-400">{nutrition.protein}g</span>
              </div>
              <div className="bg-slate-800/40 p-4 rounded-2xl border border-slate-800 text-center">
                <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">KALORI</span>
                <span className="text-3xl font-black text-white">{nutrition.calories} <span className="text-xs font-medium">kkal</span></span>
              </div>
              <div className="bg-slate-800/40 p-4 rounded-2xl border border-slate-800 text-center">
                <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">LEMAK</span>
                <span className="text-xl font-black text-slate-300">{nutrition.fat}g</span>
              </div>
              <div className="bg-slate-800/40 p-4 rounded-2xl border border-slate-800 text-center">
                <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">KARBOHIDRAT</span>
                <span className="text-xl font-black text-slate-300">{nutrition.carbs}g</span>
              </div>
            </div>

            {/* Egg Equivalence Indicator */}
            <div className="flex items-start gap-3 bg-yellow-400/10 p-4 rounded-2xl border border-yellow-400/20 mb-6">
              <Sparkles className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
              <div className="text-xs">
                <p className="font-bold text-white mb-1 uppercase tracking-wider">Setara Putih Telur Utuh</p>
                <p className="text-slate-300 leading-relaxed font-medium">
                  Takaran ini setara dengan mengonsumsi sekitar <strong className="text-yellow-400 text-sm font-black">{nutrition.eggEquivalent}</strong> butir putih telur ukuran sedang tanpa repot mengupas atau memisahkannya secara manual!
                </p>
              </div>
            </div>

            {/* Science analysis output */}
            <div className="text-xs text-slate-400 leading-relaxed border-t border-slate-800 pt-6">
              <span className="font-black text-white block uppercase tracking-wider mb-2">Tips Konsumsi:</span>
              <p className="font-medium italic text-slate-300">"{getRecommendationText(parseFloat(nutrition.protein))}"</p>
            </div>

          </div>

        </div>

        {/* Nutritional comparison table or neat fact card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-yellow-400 text-slate-900 rounded-[40px] p-8 md:p-12 shadow-xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <h4 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-3">
                Mengapa Memilih BRINA Lebih Praktis & Aman?
              </h4>
              <p className="font-medium text-slate-800 leading-relaxed">
                Memisahkan kuning telur secara manual melelahkan, menyita waktu, dan sering kali menyisakan kuning telur yang terbuang percuma. Selain itu, telur mentah biasa rentan kotor. Produk <strong>BRINA PUTIH TELUR</strong> hadir menyajikan putih telur yang sudah dipisah, higienis, steril, dan praktis. Siap langsung Anda masak atau campur ke dalam menu diet harian tanpa repot.
              </p>
            </div>
            <div className="flex justify-center md:justify-end">
              <div className="bg-slate-900 text-white p-6 rounded-3xl border-4 border-white shadow-xl text-center max-w-[220px]">
                <ShieldAlert className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <span className="font-black block uppercase text-sm tracking-wider leading-tight">100% PRAKTIS & HIGIENIS</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
