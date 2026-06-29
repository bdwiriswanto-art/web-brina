import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  MessageCircle, 
  CheckCircle,
  Trash2,
  Star,
  Search,
  SlidersHorizontal,
  ThumbsUp,
  Sparkles,
  ShieldCheck,
  Quote,
  X,
  Users,
  Store,
  Factory,
  Camera,
  Image
} from 'lucide-react';

interface Review {
  id: string;
  name: string;
  role: string;
  source: 'whatsapp' | 'shopee';
  rating: number;
  date: string;
  text: string;
  productName: string;
  avatarColor: string;
  tags: string[];
  helpfulCount: number;
}

export default function Reviews() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'whatsapp' | 'shopee'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  // Clean, professional Indonesian text reviews without any images/photos
  const defaultReviews: Review[] = [
    {
      id: '1',
      name: 'Andi Wijaya',
      role: 'Fitness Enthusiast / Gym Goer',
      source: 'whatsapp',
      rating: 5,
      date: 'Kemarin',
      text: 'Putih telur cairnya segar banget, ga amis sama sekali pas dimasak dadar atau direbus microwave. Sangat membantu buat penuhi makro protein harian saya tanpa ribet misahin kuning telur. Pengiriman ke Gayamsari cepat banget sampai!',
      productName: 'Putih Telur Mentah (1 Liter)',
      avatarColor: 'bg-blue-600',
      tags: ['Sangat Segar', 'Rekomendasi Gym', 'Pengiriman Cepat'],
      helpfulCount: 12
    },
    {
      id: '2',
      name: 'Riana Lestari',
      role: 'Pemilik Bakery & Catering',
      source: 'shopee',
      rating: 5,
      date: '2 Hari Lalu',
      text: 'Langganan beli kemasan 16 kg buat bahan dasar kue lapis dan chiffon. Putih telurnya kental, bersih dari kotoran cangkang, dan hasil kocokan mixer ngembang sempurna. Harga sangat hemat untuk kebutuhan usaha kuliner.',
      productName: 'Putih Telur Mentah (16 kg)',
      avatarColor: 'bg-emerald-600',
      tags: ['Sangat Bersih', 'Bahan Kue Lapis', 'Harga Grosir'],
      helpfulCount: 24
    },
    {
      id: '3',
      name: 'dr. Haryo Prasetyo',
      role: 'Konsumen Diet Sehat',
      source: 'whatsapp',
      rating: 5,
      date: '1 Minggu Lalu',
      text: 'Sangat terbantu dengan putih telur matang siap makan. Higienis, rasanya pas, dan praktis sekali untuk sarapan instan sebelum berangkat kerja ke klinik. Cocok untuk program pengurangan kolesterol saya.',
      productName: 'Putih Telur Matang (1 kg)',
      avatarColor: 'bg-amber-600',
      tags: ['Praktis & Higienis', 'Diet Sehat', 'Rendah Kolesterol'],
      helpfulCount: 8
    },
    {
      id: '4',
      name: 'Budi Santoso',
      role: 'Binaraga Amatir',
      source: 'shopee',
      rating: 5,
      date: '1 Minggu Lalu',
      text: 'Kualitas bintang 5! Respon admin cepat, dikirim pakai GoSend langsung sampai dalam kondisi dingin dan fresh. Sudah langganan 3 bulan terakhir, otot makin padat asupan protein murni terjaga terus.',
      productName: 'Putih Telur Mentah (1 Liter)',
      avatarColor: 'bg-purple-600',
      tags: ['Kualitas Premium', 'GoSend Cepat', 'Langganan Atlet'],
      helpfulCount: 15
    },
    {
      id: '5',
      name: 'Siti Rahmawati',
      role: 'Ibu Rumah Tangga',
      source: 'whatsapp',
      rating: 5,
      date: '2 Minggu Lalu',
      text: 'Anak-anak suka sekali putih telur rebusnya dipotong kecil-kecil dicampur salad. Higienis dan bersih sekali pengerjaannya. Sekarang ga perlu capek ngerebus dan ngupas telur sendiri lagi.',
      productName: 'Putih Telur Matang (1 kg)',
      avatarColor: 'bg-rose-600',
      tags: ['Suka Kebersihan', 'Favorit Anak', 'Praktis Rebus'],
      helpfulCount: 6
    }
  ];

  // Load reviews from localStorage or defaults
  const [reviewsList, setReviewsList] = useState<Review[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('brina_text_reviews');
        if (saved) {
          return JSON.parse(saved);
        }
      } catch (e) {
        console.error('Gagal memuat ulasan dari localStorage:', e);
      }
    }
    return defaultReviews;
  });

  // Save to localStorage when reviewsList changes
  useEffect(() => {
    try {
      localStorage.setItem('brina_text_reviews', JSON.stringify(reviewsList));
    } catch (e) {
      console.error('Gagal menyimpan ulasan ke localStorage:', e);
    }
  }, [reviewsList]);

  // Permanent premium sector images
  const defaultSectorImages = {
    masyarakat: '/masyarakatumum.png',
    pedagang: '/Pedagang%20Pasar.jpeg',
    pabrik: '/Pabrik&Catering.jpeg'
  };

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus ulasan ini?')) {
      setReviewsList(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleLike = (id: string) => {
    if (liked[id]) {
      setLiked(prev => ({ ...prev, [id]: false }));
      setLikes(prev => ({ ...prev, [id]: (prev[id] || 0) - 1 }));
    } else {
      setLiked(prev => ({ ...prev, [id]: true }));
      setLikes(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    }
  };

  // Get all unique tags
  const allTags = Array.from(
    new Set(reviewsList.flatMap(r => r.tags || []))
  );

  // Filter & Search logic
  const filteredReviews = reviewsList.filter(item => {
    // 1. Source filter
    if (activeFilter !== 'all' && item.source !== activeFilter) return false;
    
    // 2. Selected tag filter
    if (selectedTag && !item.tags.includes(selectedTag)) return false;
    
    // 3. Search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(query);
      const matchText = item.text.toLowerCase().includes(query);
      const matchProduct = item.productName.toLowerCase().includes(query);
      const matchRole = item.role.toLowerCase().includes(query);
      return matchName || matchText || matchProduct || matchRole;
    }
    
    return true;
  });

  const countSource = (src: 'all' | 'whatsapp' | 'shopee') => {
    if (src === 'all') return reviewsList.length;
    return reviewsList.filter(s => s.source === src).length;
  };

  return (
    <section id="review" className="py-24 bg-gradient-to-b from-slate-50 to-slate-100 relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-yellow-200/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-orange-200/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Grid Pattern overlay for clean modern look */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* 🌟 STATS & SATISFACTION SUMMARY BAR 🌟 */}
        <div className="mb-14 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl shadow-slate-100/50 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            {/* Stat 1 */}
            <div className="flex items-center gap-4 pb-4 md:pb-0 md:pr-6">
              <div className="w-12 h-12 bg-yellow-50 text-yellow-500 rounded-2xl flex items-center justify-center shrink-0">
                <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-2xl font-black text-slate-900">4.9</span>
                  <span className="text-sm font-bold text-slate-400">/ 5.0</span>
                </div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Rating Toko Shopee</p>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex items-center gap-4 py-4 md:py-0 md:px-6">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-2xl font-black text-slate-900">100%</span>
                </div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Segar & Higienis</p>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="flex items-center gap-4 pt-4 md:pt-0 md:pl-6">
              <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center shrink-0">
                <ThumbsUp className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-2xl font-black text-slate-900">1.200+</span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full font-black uppercase">Puas</span>
                </div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Transaksi Berhasil</p>
              </div>
            </div>
          </div>
        </div>

        {/* 🔬 EXPERT HEALTH & NUTRITION QUOTE 🔬 */}
        <div className="mb-14 max-w-5xl mx-auto bg-gradient-to-r from-blue-50/60 via-indigo-50/40 to-slate-50/60 rounded-3xl p-8 border border-slate-200/60 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl"></div>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 relative z-10">
            {/* Health Icon/Badge */}
            <div className="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-indigo-200">
              <Quote className="w-7 h-7 transform rotate-180 text-white" />
            </div>
            
            <div className="space-y-3 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-[10px] font-black uppercase tracking-widest">
                <Sparkles className="w-3 h-3 text-indigo-600 fill-indigo-600" />
                Rekomendasi Medis & Gizi
              </div>
              
              <h3 className="text-base font-black text-slate-900 uppercase tracking-tight">
                Disetujui Oleh Ahli Gizi & Kesehatan
              </h3>
              
              <p className="text-slate-700 font-semibold text-sm leading-relaxed max-w-4xl">
                "Banyak peneliti dan ahli kesehatan, seperti <span className="text-indigo-600 font-black">Kylie Arrindell</span> (ahli diet klinis di <span className="text-indigo-800 font-black">Houston Methodist</span>), sepakat bahwa putih telur sangat baik untuk tubuh. Penelitian medis dan gizi secara umum juga membuktikan bahwa putih telur adalah sumber protein murni yang rendah lemak dan kalori."
              </p>
            </div>
          </div>
        </div>

        {/* 🔍 SEARCH & FILTER BAR 🔍 */}
        <div className="max-w-5xl mx-auto mb-10 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            
            {/* Filter Tabs */}
            <div className="flex p-1 bg-slate-200/70 backdrop-blur-sm rounded-2xl w-full md:w-auto overflow-x-auto">
              <button
                onClick={() => { setActiveFilter('all'); setSelectedTag(null); }}
                className={`flex-1 md:flex-none px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap flex items-center justify-center gap-1.5 ${
                  activeFilter === 'all'
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Semua Ulasan
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${activeFilter === 'all' ? 'bg-white/20 text-white' : 'bg-slate-300/60 text-slate-600'}`}>
                  {countSource('all')}
                </span>
              </button>
              
              <button
                onClick={() => { setActiveFilter('whatsapp'); setSelectedTag(null); }}
                className={`flex-1 md:flex-none px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap flex items-center justify-center gap-1.5 ${
                  activeFilter === 'whatsapp'
                    ? 'bg-[#25D366] text-white shadow-md'
                    : 'text-slate-600 hover:text-[#25D366]'
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${activeFilter === 'whatsapp' ? 'bg-white/20 text-white' : 'bg-slate-300/60 text-slate-600'}`}>
                  {countSource('whatsapp')}
                </span>
              </button>

              <button
                onClick={() => { setActiveFilter('shopee'); setSelectedTag(null); }}
                className={`flex-1 md:flex-none px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap flex items-center justify-center gap-1.5 ${
                  activeFilter === 'shopee'
                    ? 'bg-[#ee4d2d] text-white shadow-md'
                    : 'text-slate-600 hover:text-[#ee4d2d]'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                Shopee
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${activeFilter === 'shopee' ? 'bg-white/20 text-white' : 'bg-slate-300/60 text-slate-600'}`}>
                  {countSource('shopee')}
                </span>
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder="Cari ulasan, produk, kata kunci..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-200 hover:border-slate-300 rounded-2xl pl-10 pr-4 py-2.5 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all shadow-sm"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Quick Tag Pills */}
          {allTags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-2">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1 mr-1">
                <SlidersHorizontal className="w-3 h-3" />
                Kategori Populer:
              </span>
              
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                  selectedTag === null
                    ? 'bg-slate-950 text-white'
                    : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                Semua Tag
              </button>

              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-1 ${
                    selectedTag === tag
                      ? 'bg-yellow-400 text-slate-900 border border-yellow-400 font-black'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 📜 REVIEWS GRID (HIGHLY POLISHED TEXT-ONLY TESTIMONIAL CARDS) 📜 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filteredReviews.map((review, idx) => {
              const initialLikes = review.helpfulCount;
              const currentLikes = initialLikes + (likes[review.id] || 0);
              const isUserLiked = liked[review.id] || false;

              return (
                <motion.div
                  key={review.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-xl flex flex-col justify-between relative hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
                >
                  {/* Delete Button (Visible on Hover/Touch) */}
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="absolute top-4 left-4 w-7 h-7 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white rounded-lg flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-10 shadow-sm"
                    title="Hapus Ulasan"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  {/* Source Badge */}
                  <div className="absolute top-6 right-6">
                    {review.source === 'whatsapp' ? (
                      <span className="flex items-center gap-1.5 bg-green-50 text-green-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border border-green-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        WhatsApp
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 bg-orange-50 text-[#ee4d2d] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border border-orange-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ee4d2d]"></span>
                        Shopee
                      </span>
                    )}
                  </div>

                  <div>
                    {/* Rating Stars & Verified Mark */}
                    <div className="flex items-center gap-2 mb-5">
                      <div className="flex gap-0.5">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="bg-slate-100 text-slate-500 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded">
                        Verified
                      </span>
                    </div>

                    {/* Review Text */}
                    <div className="relative mb-6">
                      <Quote className="absolute -top-3 -left-3 w-8 h-8 text-slate-100/80 -z-0" />
                      <p className="text-slate-700 font-semibold text-sm leading-relaxed relative z-10">
                        "{review.text}"
                      </p>
                    </div>

                    {/* Tag list */}
                    <div className="flex flex-wrap gap-1 mb-6">
                      {review.tags.map(tag => (
                        <span key={tag} className="text-[9px] bg-slate-100 text-slate-500 px-2.5 py-0.5 rounded-md font-bold uppercase tracking-wider">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer of Card */}
                  <div className="border-t border-slate-100 pt-6 mt-auto">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Produk: <span className="text-slate-900">{review.productName}</span>
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        {review.date}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${review.avatarColor} text-white rounded-2xl flex items-center justify-center font-black text-sm shadow-sm`}>
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-1">
                            <h4 className="font-black text-slate-900 text-xs uppercase tracking-wider leading-tight">{review.name}</h4>
                            <CheckCircle className="w-4 h-4 text-blue-500" />
                          </div>
                          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mt-0.5">{review.role}</p>
                        </div>
                      </div>

                      {/* Helpful Button */}
                      <button
                        onClick={() => handleLike(review.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                          isUserLiked 
                            ? 'bg-yellow-400 text-slate-900' 
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-900'
                        }`}
                      >
                        <ThumbsUp className={`w-3.5 h-3.5 ${isUserLiked ? 'fill-current' : ''}`} />
                        <span>{currentLikes}</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredReviews.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-slate-200 max-w-lg mx-auto shadow-sm">
            <Quote className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h4 className="font-black text-slate-700 uppercase tracking-wider text-sm">Tidak Ada Ulasan Cocok</h4>
            <p className="text-xs text-slate-400 font-medium max-w-xs mx-auto mt-2 leading-relaxed">
              Kami tidak dapat menemukan ulasan dengan kata kunci "{searchQuery}" atau filter yang dipilih. Silakan coba pencarian lain.
            </p>
          </div>
        )}

        {/* 🏆 SEGMENTED TRUST BANNER 🏆 */}
        <div className="mt-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-yellow-600 fill-yellow-600" />
              Kepercayaan Multi-Sektor
            </span>
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 mt-3 uppercase tracking-tight">
              Dipercaya Berbagai Kalangan
            </h3>
            <p className="text-xs text-slate-500 font-bold mt-2 leading-relaxed">
              Dari kebutuhan dapur rumah tangga hingga produksi skala besar, kami menjaga standar kualitas terbaik untuk setiap konsumen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
            {/* 1. Masyarakat Umum */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-lg hover:shadow-xl transition-all overflow-hidden flex flex-col group">
              {/* Image Banner */}
              <div className="relative h-48 bg-slate-50 flex items-center justify-center border-b border-slate-100 overflow-hidden">
                <img
                  src={defaultSectorImages.masyarakat}
                  alt="Masyarakat Umum"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                      <Users className="w-4 h-4" />
                    </div>
                    <h4 className="font-black text-slate-900 text-sm uppercase tracking-wider">Masyarakat Umum</h4>
                  </div>
                  <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                    Konsumen rumah tangga, penggiat fitness, olahragawan, dan pelaku diet sehat yang membutuhkan asupan protein murni bebas lemak setiap hari.
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Pedagang Pasar */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-lg hover:shadow-xl transition-all overflow-hidden flex flex-col group">
              {/* Image Banner */}
              <div className="relative h-48 bg-slate-50 flex items-center justify-center border-b border-slate-100 overflow-hidden">
                <img
                  src={defaultSectorImages.pedagang}
                  alt="Pedagang Pasar"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
                      <Store className="w-4 h-4" />
                    </div>
                    <h4 className="font-black text-slate-900 text-sm uppercase tracking-wider">Pedagang Pasar</h4>
                  </div>
                  <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                    Pengecer bahan makanan, lapak grosir, serta pedagang pasar tradisional Semarang yang mempercayakan suplai harian mereka kepada kami.
                  </p>
                </div>
              </div>
            </div>

            {/* 3. Pabrik & Catering */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-lg hover:shadow-xl transition-all overflow-hidden flex flex-col group">
              {/* Image Banner */}
              <div className="relative h-48 bg-slate-50 flex items-center justify-center border-b border-slate-100 overflow-hidden">
                <img
                  src={defaultSectorImages.pabrik}
                  alt="Pabrik & Catering"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center shrink-0">
                      <Factory className="w-4 h-4" />
                    </div>
                    <h4 className="font-black text-slate-900 text-sm uppercase tracking-wider">Pabrik & Catering</h4>
                  </div>
                  <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                    Industri roti (bakery), pabrik mi, produsen makanan olahan, serta katering skala besar yang membutuhkan pasokan kental putih telur dalam jumlah tonase stabil.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
