import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, ShoppingBag, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Products() {
  const { t, language } = useLanguage();
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [formData, setFormData] = useState({
    nama: '',
    jumlah: '',
    jamAmbil: ''
  });

  const products = [
    {
      id: '1',
      name: t('p1_name', 'products'),
      description: t('p1_desc', 'products'),
      price: 'Rp 20.000',
      popular: true,
      image: '/putihtelurmentah1L.jpeg'
    },
    {
      id: '2',
      name: t('p2_name', 'products'),
      description: t('p2_desc', 'products'),
      price: 'Rp 30.000',
      popular: false,
      image: '/putihtelurrebus1L.jpeg'
    },
    {
      id: '3',
      name: t('p3_name', 'products'),
      description: t('p3_desc', 'products'),
      price: 'Rp 288.000',
      popular: false,
      image: '/putihtelur16L.jpeg'
    }
  ];

  const handleOrder = (productName: string) => {
    setSelectedProduct(productName);
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let msg = t('wa_msg_template', 'products');
    msg = msg.replace('{productName}', selectedProduct);
    msg = msg.replace('{nama}', formData.nama);
    msg = msg.replace('{jumlah}', formData.jumlah);
    msg = msg.replace('{jamAmbil}', formData.jamAmbil);
    
    const text = encodeURIComponent(msg);
    window.open(`https://wa.me/6282146628802?text=${text}`, '_blank');
    
    setShowModal(false);
    setFormData({ nama: '', jumlah: '', jamAmbil: '' });
  };

  return (
    <section id="produk" className="py-24 bg-white relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 uppercase tracking-tight">{t('section_title', 'products')}</h2>
            <p className="text-xl text-slate-600 font-medium">
              {t('section_desc', 'products')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex flex-col bg-white rounded-[40px] border-4 ${product.popular ? 'border-yellow-400 shadow-2xl shadow-yellow-100/50' : 'border-slate-100 shadow-xl'} overflow-hidden group hover:-translate-y-2 transition-transform duration-300`}
            >
              {product.popular && (
                <div className="absolute top-0 inset-x-0 h-2 bg-yellow-400"></div>
              )}
              
              <div className="p-8 flex-grow">
                {product.popular && (
                  <span className="inline-block px-4 py-1.5 bg-yellow-100 text-yellow-700 text-xs font-bold uppercase tracking-widest rounded-full mb-6">
                    {t('popular_badge', 'products')}
                  </span>
                )}
                
                <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase tracking-wide leading-tight">{product.name}</h3>
                <p className="text-slate-600 font-medium mb-8 min-h-[48px]">{product.description}</p>
                
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-4xl font-black text-yellow-500">{product.price}</span>
                </div>

                <div className="w-full aspect-square bg-slate-50 rounded-[32px] mb-8 flex items-center justify-center border-4 border-white shadow-inner relative overflow-hidden">
                   <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="p-8 pt-0 mt-auto space-y-3">
                <button
                  onClick={() => handleOrder(product.name)}
                  className={`w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl font-black uppercase tracking-widest text-xs transition-colors ${
                    product.popular 
                      ? 'bg-yellow-400 text-slate-900 hover:bg-yellow-500 shadow-lg shadow-yellow-100' 
                      : 'bg-slate-900 text-white hover:bg-yellow-400 hover:text-slate-900'
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  {t('btn_wa', 'products')}
                </button>
                <a
                  href="https://id.shp.ee/Yt3tDYxd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl font-black uppercase tracking-widest text-xs bg-[#ee4d2d] text-white hover:bg-[#d44023] transition-all shadow-md shadow-orange-100 hover:shadow-lg hover:-translate-y-0.5"
                >
                  <ShoppingBag className="w-4 h-4" />
                  {t('btn_shopee', 'products')}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-[32px] p-8 w-full max-w-md shadow-2xl border-4 border-slate-100"
            >
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              
              <h3 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-wide">
                {t('modal_title', 'products')}
              </h3>
              <p className="text-slate-500 font-medium text-sm mb-6 pb-6 border-b border-slate-100">
                {selectedProduct}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">
                    {t('modal_name', 'products')}
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.nama}
                    onChange={(e) => setFormData({...formData, nama: e.target.value})}
                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl py-3 px-4 font-semibold text-slate-900 focus:outline-none focus:border-yellow-400 focus:bg-white transition-colors"
                    placeholder="Contoh: Budi"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">
                    {t('modal_qty', 'products')}
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.jumlah}
                    onChange={(e) => setFormData({...formData, jumlah: e.target.value})}
                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl py-3 px-4 font-semibold text-slate-900 focus:outline-none focus:border-yellow-400 focus:bg-white transition-colors"
                    placeholder="Contoh: 2 kg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">
                    {t('modal_time', 'products')}
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.jamAmbil}
                    onChange={(e) => setFormData({...formData, jamAmbil: e.target.value})}
                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl py-3 px-4 font-semibold text-slate-900 focus:outline-none focus:border-yellow-400 focus:bg-white transition-colors"
                    placeholder="Contoh: Jam 16:00"
                  />
                </div>
                
                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 py-3 px-4 rounded-xl font-bold uppercase tracking-wider text-xs bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                  >
                    {t('modal_cancel', 'products')}
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 px-4 rounded-xl font-black uppercase tracking-wider text-xs bg-green-500 text-white hover:bg-green-600 shadow-lg shadow-green-200 transition-all hover:-translate-y-0.5"
                  >
                    {t('modal_submit', 'products')}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
