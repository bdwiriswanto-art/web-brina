import { useState } from 'react';
import { motion } from 'motion/react';
import { Award, Heart, Activity, Flame, ShieldAlert, Sparkles, Scale } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function EggTheory() {
  const { t } = useLanguage();
  const [amount, setAmount] = useState<number>(100);
  const [unit, setUnit] = useState<'gram' | 'ml'>('gram');

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

  const getRecommendationText = (proteinGrams: number) => {
    const protVal = proteinGrams;
    if (protVal <= 0) return t('rec_empty', 'egg_theory');
    if (protVal < 15) {
      return t('rec_low', 'egg_theory');
    }
    if (protVal < 35) {
      return t('rec_med', 'egg_theory');
    }
    return t('rec_high', 'egg_theory');
  };

  const theories = [
    {
      icon: <Award className="w-6 h-6 text-yellow-600" />,
      title: t('t1_title', 'egg_theory'),
      description: t('t1_desc', 'egg_theory')
    },
    {
      icon: <Flame className="w-6 h-6 text-yellow-600" />,
      title: t('t2_title', 'egg_theory'),
      description: t('t2_desc', 'egg_theory')
    },
    {
      icon: <Activity className="w-6 h-6 text-yellow-600" />,
      title: t('t3_title', 'egg_theory'),
      description: t('t3_desc', 'egg_theory')
    },
    {
      icon: <Heart className="w-6 h-6 text-yellow-600" />,
      title: t('t4_title', 'egg_theory'),
      description: t('t4_desc', 'egg_theory')
    }
  ];

  return (
    <section id="teori" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-yellow-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-slate-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="px-4 py-1.5 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold uppercase tracking-widest inline-block mb-4">
            {t('section_badge', 'egg_theory')}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 uppercase tracking-tight">
            {t('section_title', 'egg_theory')}
          </h2>
          <p className="text-xl text-slate-600 font-medium">
            {t('section_desc', 'egg_theory')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          
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

          <div className="lg:col-span-5 bg-slate-900 text-white rounded-[40px] p-8 md:p-10 shadow-2xl relative overflow-hidden border-4 border-slate-800">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-full blur-2xl"></div>
            
            <div className="flex items-center gap-3 mb-6">
              <Scale className="w-6 h-6 text-yellow-400" />
              <h3 className="text-2xl font-black uppercase tracking-tight text-white">{t('calc_title', 'egg_theory')}</h3>
            </div>
            
            <p className="text-slate-400 text-sm font-medium mb-8 leading-relaxed">
              {t('calc_desc', 'egg_theory')}
            </p>

            <div className="space-y-6 mb-8">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3">
                  {t('calc_unit', 'egg_theory')}
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
                    {t('calc_gram', 'egg_theory')}
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
                    {t('calc_ml', 'egg_theory')}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3">
                  {t('calc_amount', 'egg_theory')}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    max="10000"
                    value={amount}
                    onChange={(e) => setAmount(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full bg-slate-800 border-2 border-slate-700 rounded-2xl py-4 px-6 text-xl font-black text-white focus:outline-none focus:border-yellow-400 transition-colors"
                    placeholder={t('calc_amount_placeholder', 'egg_theory')}
                  />
                  <span className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold uppercase text-sm tracking-wider">
                    {unit}
                  </span>
                </div>
              </div>

              <div>
                <span className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
                  {t('calc_preset', 'egg_theory')}
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

            <div className="grid grid-cols-2 gap-4 bg-slate-850 p-6 rounded-3xl border border-slate-800 mb-6">
              <div className="bg-slate-800/40 p-4 rounded-2xl border border-slate-800 text-center">
                <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{t('nutri_protein', 'egg_theory')}</span>
                <span className="text-3xl font-black text-yellow-400">{nutrition.protein}g</span>
              </div>
              <div className="bg-slate-800/40 p-4 rounded-2xl border border-slate-800 text-center">
                <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{t('nutri_cal', 'egg_theory')}</span>
                <span className="text-3xl font-black text-white">{nutrition.calories} <span className="text-xs font-medium">{t('nutri_cal_unit', 'egg_theory')}</span></span>
              </div>
              <div className="bg-slate-800/40 p-4 rounded-2xl border border-slate-800 text-center">
                <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{t('nutri_fat', 'egg_theory')}</span>
                <span className="text-xl font-black text-slate-300">{nutrition.fat}g</span>
              </div>
              <div className="bg-slate-800/40 p-4 rounded-2xl border border-slate-800 text-center">
                <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{t('nutri_carbs', 'egg_theory')}</span>
                <span className="text-xl font-black text-slate-300">{nutrition.carbs}g</span>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-yellow-400/10 p-4 rounded-2xl border border-yellow-400/20 mb-6">
              <Sparkles className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
              <div className="text-xs">
                <p className="font-bold text-white mb-1 uppercase tracking-wider">{t('egg_equiv_title', 'egg_theory')}</p>
                <p className="text-slate-300 leading-relaxed font-medium">
                  {t('egg_equiv_desc_1', 'egg_theory')}<strong className="text-yellow-400 text-sm font-black">{nutrition.eggEquivalent}</strong>{t('egg_equiv_desc_2', 'egg_theory')}
                </p>
              </div>
            </div>

            <div className="text-xs text-slate-400 leading-relaxed border-t border-slate-800 pt-6">
              <span className="font-black text-white block uppercase tracking-wider mb-2">{t('tips_title', 'egg_theory')}</span>
              <p className="font-medium italic text-slate-300">"{getRecommendationText(parseFloat(nutrition.protein))}"</p>
            </div>
          </div>
        </div>

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
                {t('banner_title', 'egg_theory')}
              </h4>
              <p className="font-medium text-slate-800 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('banner_desc', 'egg_theory') }} />
            </div>
            <div className="flex justify-center md:justify-end">
              <div className="bg-slate-900 text-white p-6 rounded-3xl border-4 border-white shadow-xl text-center max-w-[220px]">
                <ShieldAlert className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <span className="font-black block uppercase text-sm tracking-wider leading-tight">{t('banner_badge', 'egg_theory')}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
