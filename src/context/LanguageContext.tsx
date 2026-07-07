import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

type Language = 'id' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, component: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations: Record<Language, Record<string, Record<string, string>>> = {
  id: {
    navbar: {
      beranda: 'Beranda',
      keunggulan: 'Keunggulan',
      sains: 'Manfaat & Nutrisi',
      produk: 'Produk',
      ulasan: 'Review',
      beli_sekarang: 'Beli Sekarang'
    },
    hero: {
      badge: 'Murni Bersih Sehat',
      title1: 'MURNI',
      title2: 'BERSIH',
      title3: 'SEHAT',
      description: 'Dapatkan sumber protein terbaik tanpa kolesterol dan lemak. Putih telur cair segar siap minum atau masak untuk kebutuhan nutrisi harianmu.',
      btn_pesan: 'Pesan Sekarang',
      btn_detail: 'Lihat Detail',
      protein_label: 'Protein / 100ml',
      fat_label: 'Lemak & Kolesterol',
      preservative_label: 'Pengawet',
      fat_badge: 'Lemak'
    },
    features: {
      section_title: 'Keunggulan Kami',
      section_desc: 'Kami menghadirkan kualitas putih telur terbaik dengan standar kebersihan tinggi untuk mendukung gaya hidup sehat Anda.',
      f1_title: 'Tinggi Protein',
      f1_desc: 'Mengandung protein murni berkualitas tinggi (11g per 100ml) untuk mendukung pembentukan dan pemulihan otot.',
      f2_title: 'Proses Higienis',
      f2_desc: 'Diproses dengan standar kebersihan tinggi untuk kualitas terbaik yang aman dikonsumsi.',
      f3_title: 'Bebas Lemak',
      f3_desc: '0% lemak dan kolesterol. Pilihan sempurna untuk diet ketat, cutting, atau menjaga berat badan ideal.',
      f4_title: 'Siap Pakai',
      f4_desc: 'Tidak perlu repot memisahkan kuning telur. Langsung tuang untuk dimasak atau dicampur ke protein shake.'
    },
    products: {
      section_title: 'Pilihan Produk Kami',
      section_desc: 'Pilih ukuran yang sesuai dengan kebutuhan diet atau usahamu. Pesan sekarang dan kami antar dalam kondisi segar.',
      p1_name: 'Putih Telur Mentah (1 kg)',
      p1_desc: 'Kemasan pas untuk kebutuhan protein harian yang tinggi. Setara dengan ±30 putih telur ukuran sedang.',
      p2_name: 'Putih Telur Matang (1 kg)',
      p2_desc: 'Siap makan! Putih telur matang yang diproses higienis. Cocok untuk cemilan diet instan.',
      p3_name: 'Putih Telur Mentah (16 kg)',
      p3_desc: 'Kemasan grosir untuk usaha kuliner, baking, atau konsumsi dalam jumlah besar. (Rp 18.000/kg)',
      popular_badge: 'Paling Laris 🔥',
      btn_wa: 'Beli via WhatsApp',
      btn_shopee: 'Beli via Shopee',
      wa_msg: 'Halo, saya ingin memesan {productName}. Apakah stoknya tersedia?'
    },
    egg_theory: {
      section_badge: 'Manfaat & Nutrisi Praktis',
      section_title: 'Kebaikan Putih Telur Murni',
      section_desc: 'Kenapa putih telur murni sangat digemari untuk mendampingi pola hidup sehat? Berikut manfaat praktis dan mudahnya untuk tubuh Anda.',
      t1_title: 'Mudah Diserap Tubuh',
      t1_desc: 'Protein dalam putih telur sangat mudah dicerna oleh tubuh kita. Menjadikannya salah satu sumber protein alami terbaik yang bekerja dengan cepat untuk kebugaran fisik Anda.',
      t2_title: 'Bikin Kenyang & Rendah Kalori',
      t2_desc: 'Sangat rendah kalori namun kaya protein. Sangat cocok mendampingi program diet sehat agar kenyang lebih lama tanpa perlu khawatir lemak bertambah.',
      t3_title: 'Menjaga Kekuatan Otot',
      t3_desc: 'Kandungan protein murni alaminya membantu menjaga otot Anda tetap kuat, kencang, dan tidak mudah lelah selama menjalani aktivitas harian.',
      t4_title: 'Bebas Lemak & Kolesterol',
      t4_desc: 'Putih telur murni 100% bebas dari kolesterol dan lemak jenuh yang biasanya menumpuk di kuning telur. Sangat aman dikonsumsi setiap hari untuk jantung sehat.',
      calc_title: 'Kalkulator Nutrisi',
      calc_desc: 'Hitung kandungan protein dan kalori dari porsi takaran putih telur Anda secara mudah.',
      calc_unit: 'Pilih Satuan Takaran',
      calc_gram: 'Gram (g)',
      calc_ml: 'Mililiter (ml)',
      calc_amount: 'Jumlah Konsumsi',
      calc_amount_placeholder: 'Contoh: 100',
      calc_preset: 'Takaran Cepat',
      nutri_protein: 'PROTEIN',
      nutri_cal: 'KALORI',
      nutri_cal_unit: 'kkal',
      nutri_fat: 'LEMAK',
      nutri_carbs: 'KARBOHIDRAT',
      egg_equiv_title: 'Setara Putih Telur Utuh',
      egg_equiv_desc_1: 'Takaran ini setara dengan mengonsumsi sekitar ',
      egg_equiv_desc_2: ' butir putih telur ukuran sedang tanpa repot mengupas atau memisahkannya secara manual!',
      tips_title: 'Tips Konsumsi:',
      rec_empty: 'Masukkan jumlah untuk mendapatkan rincian nutrisi.',
      rec_low: 'Sangat baik untuk cemilan sehat rendah kalori atau pelengkap sarapan guna menjaga kebugaran harian.',
      rec_med: 'Porsi ideal setelah berolahraga untuk membantu pemulihan tenaga dan otot Anda.',
      rec_high: 'Dosis tinggi untuk olahraga berat atau binaraga aktif guna mendukung asupan protein harian maksimal!',
      banner_title: 'Mengapa Memilih BRINA Lebih Praktis & Aman?',
      banner_desc: 'Memisahkan kuning telur secara manual melelahkan, menyita waktu, dan sering kali menyisakan kuning telur yang terbuang percuma. Selain itu, telur mentah biasa rentan kotor. Produk <strong>BRINA PUTIH TELUR</strong> hadir menyajikan putih telur yang sudah dipisah, higienis, steril, dan praktis. Siap langsung Anda masak atau campur ke dalam menu diet harian tanpa repot.',
      banner_badge: '100% PRAKTIS & HIGIENIS'
    },
    reviews: {
      stat_rating: 'Rating Toko Shopee',
      stat_hygiene: 'Segar & Higienis',
      stat_satisfied: 'Puas',
      stat_tx: 'Transaksi Berhasil',
      quote_badge: 'Rekomendasi Medis & Gizi',
      quote_title: 'Disetujui Oleh Ahli Gizi & Kesehatan',
      quote_text: '"Banyak peneliti dan ahli kesehatan, seperti <span class="text-indigo-600 font-black">Kylie Arrindell</span> (ahli diet klinis di <span class="text-indigo-800 font-black">Houston Methodist</span>), sepakat bahwa putih telur sangat baik untuk tubuh. Penelitian medis dan gizi secara umum juga membuktikan bahwa putih telur adalah sumber protein murni yang rendah lemak dan kalori."',
      filter_all: 'Semua Ulasan',
      search_placeholder: 'Cari ulasan, produk, kata kunci...',
      tag_popular: 'Kategori Populer:',
      tag_all: 'Semua Tag',
      delete_title: 'Hapus Ulasan',
      delete_confirm: 'Apakah Anda yakin ingin menghapus ulasan ini?',
      card_product: 'Produk:',
      empty_title: 'Tidak Ada Ulasan Cocok',
      empty_desc: 'Kami tidak dapat menemukan ulasan dengan kata kunci "{searchQuery}" atau filter yang dipilih. Silakan coba pencarian lain.',
      trust_badge: 'Kepercayaan Multi-Sektor',
      trust_title: 'Dipercaya Berbagai Kalangan',
      trust_desc: 'Dari kebutuhan dapur rumah tangga hingga produksi skala besar, kami menjaga standar kualitas terbaik untuk setiap konsumen.',
      trust_c1_title: 'Masyarakat Umum',
      trust_c1_desc: 'Konsumen rumah tangga, penggiat fitness, olahragawan, dan pelaku diet sehat yang membutuhkan asupan protein murni bebas lemak setiap hari.',
      trust_c2_title: 'Pedagang Pasar',
      trust_c2_desc: 'Pengecer bahan makanan, lapak grosir, serta pedagang pasar tradisional Semarang yang mempercayakan suplai harian mereka kepada kami.',
      trust_c3_title: 'Pabrik & Catering',
      trust_c3_desc: 'Industri roti (bakery), pabrik mi, produsen makanan olahan, serta katering skala besar yang membutuhkan pasokan kental putih telur dalam jumlah tonase stabil.'
    },
    footer: {
      desc: 'Mitra terbaik untuk memenuhi kebutuhan protein harian Anda. Berkualitas, higienis, dan terpercaya tanpa lemak tambahan.',
      tt_ig: 'Ikuti kami di Instagram',
      tt_shopee: 'Kunjungi Toko Shopee Kami',
      tt_tiktok: 'Ikuti kami di TikTok',
      link_title: 'Tautan',
      contact_title: 'Kontak',
      l_loc: 'Lokasi',
      copyright: '© {year} BRINA PUTIH TELUR. Hak Cipta Dilindungi.',
      slogan: 'MURNI. BERSIH. SEHAT.'
    }
  },
  en: {
    navbar: {
      beranda: 'Home',
      keunggulan: 'Benefits',
      sains: 'Benefits & Nutrition',
      produk: 'Products',
      ulasan: 'Reviews',
      beli_sekarang: 'Buy Now'
    },
    hero: {
      badge: 'Pure Clean Healthy',
      title1: 'PURE',
      title2: 'CLEAN',
      title3: 'HEALTHY',
      description: 'Get the best protein source without cholesterol and fat. Fresh liquid egg whites ready to drink or cook for your daily nutritional needs.',
      btn_pesan: 'Order Now',
      btn_detail: 'View Details',
      protein_label: 'Protein / 100ml',
      fat_label: 'Fat & Cholesterol',
      preservative_label: 'Preservatives',
      fat_badge: 'Fat'
    },
    features: {
      section_title: 'Our Advantages',
      section_desc: 'We provide the best quality egg whites with high hygiene standards to support your healthy lifestyle.',
      f1_title: 'High Protein',
      f1_desc: 'Contains high-quality pure protein (11g per 100ml) to support muscle building and recovery.',
      f2_title: 'Hygienic Process',
      f2_desc: 'Processed with high hygiene standards for the best quality that is safe to consume.',
      f3_title: 'Fat Free',
      f3_desc: '0% fat and cholesterol. Perfect choice for strict diets, cutting, or maintaining an ideal body weight.',
      f4_title: 'Ready to Use',
      f4_desc: 'No need to bother separating egg yolks. Just pour to cook or mix into a protein shake.'
    },
    products: {
      section_title: 'Our Product Selection',
      section_desc: 'Choose the size that fits your diet or business needs. Order now and we will deliver it fresh.',
      p1_name: 'Raw Egg White (1 kg)',
      p1_desc: 'Perfect size for high daily protein needs. Equivalent to ±30 medium-sized egg whites.',
      p2_name: 'Cooked Egg White (1 kg)',
      p2_desc: 'Ready to eat! Hygienically processed cooked egg whites. Perfect for instant diet snacks.',
      p3_name: 'Raw Egg White (16 kg)',
      p3_desc: 'Wholesale packaging for culinary businesses, baking, or large consumption. (Rp 18,000/kg)',
      popular_badge: 'Best Seller 🔥',
      btn_wa: 'Buy via WhatsApp',
      btn_shopee: 'Buy via Shopee',
      wa_msg: 'Hello, I would like to order {productName}. Is it in stock?'
    },
    egg_theory: {
      section_badge: 'Practical Benefits & Nutrition',
      section_title: 'The Goodness of Pure Egg Whites',
      section_desc: 'Why are pure egg whites so popular for a healthy lifestyle? Here are the practical and easy benefits for your body.',
      t1_title: 'Easily Absorbed by the Body',
      t1_desc: 'The protein in egg whites is very easy to digest. Making it one of the best natural protein sources that works fast for your physical fitness.',
      t2_title: 'Filling & Low Calorie',
      t2_desc: 'Very low in calories but rich in protein. Very suitable for healthy diet programs so you feel full longer without worrying about adding fat.',
      t3_title: 'Maintain Muscle Strength',
      t3_desc: 'Its natural pure protein helps keep your muscles strong, toned, and less fatigued during daily activities.',
      t4_title: 'Fat & Cholesterol Free',
      t4_desc: 'Pure egg white is 100% free of cholesterol and saturated fat which usually accumulates in the egg yolk. Very safe to consume daily for a healthy heart.',
      calc_title: 'Nutrition Calculator',
      calc_desc: 'Easily calculate the protein and calorie content from your egg white portion.',
      calc_unit: 'Select Measurement Unit',
      calc_gram: 'Grams (g)',
      calc_ml: 'Milliliters (ml)',
      calc_amount: 'Consumption Amount',
      calc_amount_placeholder: 'Example: 100',
      calc_preset: 'Quick Measurements',
      nutri_protein: 'PROTEIN',
      nutri_cal: 'CALORIES',
      nutri_cal_unit: 'kcal',
      nutri_fat: 'FAT',
      nutri_carbs: 'CARBS',
      egg_equiv_title: 'Equivalent to Whole Egg Whites',
      egg_equiv_desc_1: 'This amount is equivalent to consuming about ',
      egg_equiv_desc_2: ' medium-sized egg whites without the hassle of peeling or manually separating them!',
      tips_title: 'Consumption Tips:',
      rec_empty: 'Enter an amount to get the nutritional breakdown.',
      rec_low: 'Great for a healthy low-calorie snack or breakfast supplement to maintain daily fitness.',
      rec_med: 'Ideal portion after a workout to help restore your energy and muscles.',
      rec_high: 'High dose for heavy workouts or active bodybuilding to support maximum daily protein intake!',
      banner_title: 'Why Choose BRINA For More Practicality & Safety?',
      banner_desc: 'Manually separating egg yolks is tiring, time-consuming, and often leaves wasted yolks. In addition, ordinary raw eggs are prone to getting dirty. <strong>BRINA EGG WHITES</strong> provides separated, hygienic, sterile, and practical egg whites. Ready to cook or mix into your daily diet menu without the hassle.',
      banner_badge: '100% PRACTICAL & HYGIENIC'
    },
    reviews: {
      stat_rating: 'Shopee Store Rating',
      stat_hygiene: 'Fresh & Hygienic',
      stat_satisfied: 'Satisfied',
      stat_tx: 'Successful Transactions',
      quote_badge: 'Medical & Nutrition Recommendation',
      quote_title: 'Approved By Nutritionists & Health Experts',
      quote_text: '"Many researchers and health experts, such as <span class="text-indigo-600 font-black">Kylie Arrindell</span> (clinical dietitian at <span class="text-indigo-800 font-black">Houston Methodist</span>), agree that egg whites are very good for the body. General medical and nutritional research also proves that egg white is a pure protein source that is low in fat and calories."',
      filter_all: 'All Reviews',
      search_placeholder: 'Search reviews, products, keywords...',
      tag_popular: 'Popular Categories:',
      tag_all: 'All Tags',
      delete_title: 'Delete Review',
      delete_confirm: 'Are you sure you want to delete this review?',
      card_product: 'Product:',
      empty_title: 'No Matching Reviews',
      empty_desc: 'We couldn\'t find any reviews matching "{searchQuery}" or the selected filters. Please try another search.',
      trust_badge: 'Multi-Sector Trust',
      trust_title: 'Trusted by Various Circles',
      trust_desc: 'From household kitchen needs to large-scale production, we maintain the best quality standards for every consumer.',
      trust_c1_title: 'General Public',
      trust_c1_desc: 'Household consumers, fitness enthusiasts, athletes, and healthy diet practitioners who need daily intake of pure fat-free protein.',
      trust_c2_title: 'Market Traders',
      trust_c2_desc: 'Food retailers, wholesale stalls, and traditional market traders in Semarang who entrust their daily supply to us.',
      trust_c3_title: 'Factories & Catering',
      trust_c3_desc: 'Bakeries, noodle factories, processed food manufacturers, and large-scale catering that require stable tonnage supplies of thick egg whites.'
    },
    footer: {
      desc: 'The best partner to meet your daily protein needs. High quality, hygienic, and trusted with no added fat.',
      tt_ig: 'Follow us on Instagram',
      tt_shopee: 'Visit our Shopee Store',
      tt_tiktok: 'Follow us on TikTok',
      link_title: 'Links',
      contact_title: 'Contact',
      l_loc: 'Location',
      copyright: '© {year} BRINA PUTIH TELUR. All Rights Reserved.',
      slogan: 'PURE. CLEAN. HEALTHY.'
    }
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('id');

  useEffect(() => {
    const saved = localStorage.getItem('brina_language') as Language;
    if (saved && (saved === 'id' || saved === 'en')) {
      setLanguage(saved);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('brina_language', lang);
  };

  const t = (key: string, component: string): string => {
    return translations[language]?.[component]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
