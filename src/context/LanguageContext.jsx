import { createContext, useContext, useState, useEffect } from "react";
import { trackEvent } from "../utils/analytics";

export const SUPPORTED_LANGUAGES = [
  { code: "id", short: "ID", label: "Bahasa Indonesia", region: "Indonesia" },
  { code: "en", short: "EN", label: "English", region: "International" },
  { code: "de", short: "DE", label: "Deutsch", region: "Deutschland" },
  { code: "zh", short: "ZH", label: "中文 (简体)", region: "中国" },
  { code: "ja", short: "JA", label: "日本語", region: "日本" },
  { code: "ru", short: "RU", label: "Русский", region: "Россия" },
];

const TRANSLATIONS = {
  id: {
    topbar: {
      location: "Gudang & Kantor: Kerobokan Kaja, Badung, Bali",
      hours: "Senin – Sabtu · 09:00 – 17:00 WITA",
      directWa: "Konsultasi B2B via WhatsApp",
    },
    nav: {
      home: "Beranda",
      products: "Katalog Produk",
      about: "Profil Perusahaan",
      clients: "Portofolio Klien",
      contact: "Kontak",
      rfq: "Daftar Penawaran",
      requestQuote: "Minta Penawaran",
    },
    hero: {
      eyebrow: "PT Kawan Baik Bali — Hospitality Supply Partner",
      titleLine1: "Supplier Hotel Amenities",
      titleLine2: "& Perlengkapan Kamar di Bali",
      subtitle:
        "Menyediakan perlengkapan kamar mandi hotel, sandal kamar, handuk & linen katun, dry amenities, lini ramah lingkungan, hingga payung custom logo untuk hotel, resort, dan villa di Bali maupun seluruh Indonesia.",
      viewProducts: "Jelajahi Katalog Produk",
      requestQuote: "Buat Permintaan Penawaran (RFQ)",
      metrics: [
        { value: "Kerobokan, Bali", label: "Lokasi Gudang & Distribusi" },
        { value: "Custom OEM", label: "Sablon, Emboss & Bordir Logo" },
        { value: "MOQ Fleksibel", label: "Skala Villa hingga Resort Bintang 5" },
        { value: "< 24 Jam", label: "Estimasi Respon Penawaran" },
      ],
    },
    home: {
      clientsEyebrow: "Dipercaya oleh Industri Perhotelan Bali",
      clientsTitle: "Mitra Pengadaan untuk Hotel, Resort & Villa",
      clientsLink: "Lihat Semua Portofolio Klien",
      catEyebrow: "01 / Kategori Produk",
      catTitle: "Solusi Lengkap Kebutuhan Kamar & Properti",
      catSubtitle:
        "Enam lini produk utama yang dirancang khusus untuk standar operasional housekeeping hotel, resort, villa, dan spa.",
      exploreCategory: "Lihat Kategori",
      featuredEyebrow: "02 / Katalog Unggulan",
      featuredTitle: "Produk Pilihan Siap Pesan & Custom Logo",
      featuredSubtitle:
        "Pilih produk di bawah ini untuk melihat spesifikasi detail atau langsung masukkan ke daftar permintaan penawaran harga (RFQ).",
      viewAllCatalog: "Buka Seluruh Katalog",
      processEyebrow: "03 / Alur Pemesanan B2B",
      processTitle: "Proses Pengadaan yang Jelas & Terukur",
      processSubtitle:
        "Kami menyederhanakan alur pengadaan amenities properti Anda dari tahap diskusi spesifikasi hingga pengiriman rutin ke gudang hotel.",
      processSteps: [
        {
          step: "01",
          title: "Pilih Produk & Kirim RFQ",
          desc: "Pilih item dari katalog online kami, tentukan estimasi kuantitas serta opsi kemasan (polos atau custom logo), lalu kirimkan daftar RFQ.",
        },
        {
          step: "02",
          title: "Penawaran Harga & Sampel",
          desc: "Tim sales kami di Bali mengirimkan rincian harga grosir, MOQ, dan menyiapkan sampel fisik maupun desain mockup logo properti Anda.",
        },
        {
          step: "03",
          title: "Produksi & Pemeriksaan Kualitas",
          desc: "Pesanan diproses sesuai standar spesifikasi yang disepakati melalui tahapan pemeriksaan kualitas kemasan, aroma, dan jahitan.",
        },
        {
          step: "04",
          title: "Pengiriman Tepat Waktu",
          desc: "Pengiriman terjadwal langsung dari gudang Kerobokan untuk area Bali atau melalui ekspedisi kargo terpercaya ke seluruh Indonesia.",
        },
      ],
      profileEyebrow: "04 / Tentang PT Kawan Baik Bali",
      profileTitle: "Mitra Rantai Pasok Hospitality yang Andal di Bali",
      profileP1:
        "Berbasis di Kerobokan Kaja, Kuta Utara, PT Kawan Baik Bali hadir untuk menjawab kebutuhan pengadaan hotel amenities yang konsisten, rapi, dan tepat waktu.",
      profileP2:
        "Kami melayani beragam skala akomodasi di Bali dan Indonesia — mulai dari private villa di Canggu dan Ubud, boutique hotel di Seminyak dan Legian, hingga resort tepi pantai di Nusa Dua.",
      profilePoints: [
        "Stok terencana & pengiriman terjadwal untuk kelancaran operasional housekeeping",
        "Pilihan produk polos siap kirim maupun produksi khusus berlogo hotel (OEM)",
        "Pendampingan langsung oleh tim sales lokal yang memahami standar perhotelan di Bali",
      ],
      faqEyebrow: "05 / Informasi Pengadaan",
      faqTitle: "Pertanyaan Umum (FAQ) Purchasing Hotel",
      faqs: [
        {
          q: "Berapa jumlah pemesanan minimum (MOQ) untuk setiap produk?",
          a: "MOQ menyesuaikan jenis produk dan tipe kemasan. Untuk produk stok polos/netral tersedia dalam jumlah kecil mulai dari 50–300 pcs, sedangkan untuk cetak logo custom (sablon/box/bordir) rata-rata mulai dari 300–1.000 pcs per item.",
        },
        {
          q: "Apakah bisa meminta sampel produk sebelum melakukan pemesanan rutin?",
          a: "Tentu. Tim kami dapat mengirimkan sampel produk ke kantor purchasing atau properti Anda di Bali agar manajemen dapat memeriksa langsung kualitas bahan, aroma, dan kemasan.",
        },
        {
          q: "Berapa lama estimasi waktu pengerjaan untuk produk custom logo?",
          a: "Untuk produk ready stock polos dapat dikirim dalam 1–3 hari kerja di area Bali. Untuk produk dengan cetakan logo atau bordir custom berkisar antara 7–21 hari kerja tergantung kompleksitas kemasan.",
        },
        {
          q: "Apakah melayani pengiriman ke luar pulau Bali?",
          a: "Ya, selain armada pengiriman langsung di seluruh Bali (Badung, Denpasar, Gianyar, Tabanan, Karangasem, Buleleng), kami rutin mengirimkan pesanan ke Lombok, Labuan Bajo, Jawa, dan wilayah lain di Indonesia.",
        },
      ],
      ctaEyebrow: "Siap Merencanakan Pengadaan Amenities Properti Anda?",
      ctaTitle: "Diskusikan Kebutuhan Spesifikasi & Kuantitas Bersama Tim Kami",
      ctaDesc:
        "Susun daftar produk yang Anda butuhkan melalui halaman RFQ atau hubungi tim B2B kami di Kerobokan untuk jadwal kunjungan dan pengiriman sampel.",
    },
    product: {
      catEyebrow: "Katalog Pengadaan B2B",
      allProducts: "Katalog Lengkap Hotel Amenities",
      catalogSubtitle:
        "Telusuri lini produk di bawah ini berdasarkan kategori atau kata kunci. Klik pada produk untuk membaca tabel spesifikasi lengkap atau tambahkan langsung ke Daftar Penawaran (RFQ).",
      searchPlaceholder: "Cari produk (misal: shampoo, handuk, sandal, dental kit, bambu)...",
      filterAll: "Semua Kategori",
      showingCount: "Menampilkan",
      productsLabel: "produk",
      noResults: "Tidak ditemukan produk yang sesuai dengan pencarian Anda.",
      resetFilter: "Tampilkan Semua Produk",
      specs: "Spesifikasi Teknis Produk",
      packaging: "Kemasan & Ukuran",
      moq: "Minimum Order (MOQ)",
      leadTime: "Estimasi Waktu Pengerjaan",
      addToRfq: "Tambah ke Daftar RFQ",
      addedShort: "Terdaftar di RFQ",
      addShort: "+ RFQ",
      inRfq: "Sudah di Daftar RFQ",
      enquireWa: "Tanya via WhatsApp",
      viewDetails: "Spesifikasi Detail",
      viewAllPhotos: "Lihat Galeri Foto",
      categoryTitle: "Kategori Hotel Amenities",
      customAvailable: "Tersedia Opsi Custom Logo & Kemasan",
      localBali: "Pengiriman dari Gudang Kerobokan, Bali",
      qualityChecked: "Melewati Pemeriksaan Kualitas Sebelum Pengiriman",
      relatedProducts: "Produk Lain dalam Kategori Ini",
      otherCategories: "Kategori Produk Lainnya",
      needCustomTitle: "Butuh Spesifikasi Khusus atau Desain Kemasan Eksklusif?",
      needCustomDesc:
        "Kami melayani pembuatan paket amenities sesuai warna identitas brand dan standar anggaran kamar properti Anda.",
      specLabels: {
        volume: "Volume / Kapasitas",
        size: "Ukuran Standar",
        dimensions: "Dimensi Ukuran",
        material: "Material Bahan",
        packaging: "Tipe Kemasan",
        fragrance: "Pilihan Aroma",
        contents: "Isi Paket",
        color: "Pilihan Warna",
        colors: "Varian Warna",
        moq: "Minimum Order (MOQ)",
        customization: "Opsi Kustomisasi Logo",
        leadTime: "Estimasi Produksi / Kirim",
      },
    },
    rfq: {
      eyebrow: "Formulir Pengadaan B2B",
      title: "Daftar Permintaan Penawaran Harga (RFQ)",
      subtitle:
        "Susun daftar produk hotel amenities yang dibutuhkan properti Anda, sesuaikan jumlah dan jenis branding, lalu kirimkan ke tim sales kami melalui WhatsApp atau Email.",
      quickAddTitle: "Tambah Cepat Produk ke Daftar RFQ",
      quickAddPlaceholder: "Pilih produk dari katalog untuk ditambahkan...",
      quickAddBtn: "Tambahkan Produk",
      emptyTitle: "Belum Ada Produk dalam Daftar Penawaran",
      emptyDesc:
        "Anda dapat memilih produk langsung melalui tombol pencarian di atas, atau menjelajahi halaman katalog produk kami.",
      browseCatalog: "Buka Katalog Produk",
      tableItem: "Daftar Produk yang Diminta",
      tableQuantity: "Estimasi Kuantitas",
      tableBranding: "Tipe Kemasan / Logo",
      tableNotes: "Catatan Spesifikasi (Opsional)",
      tableNotesPlaceholder: "Contoh: botol 30ml aroma green tea, cetak logo 1 warna...",
      tableAction: "Hapus",
      brandCustom: "Custom Logo Hotel / Villa",
      brandPlain: "Polos / Tanpa Logo (Ready Stock)",
      brandEco: "Kemasan Kertas Kraft Eco",
      formTitle: "Identitas Properti & Pemohon",
      fullName: "Nama Lengkap Pemohon",
      role: "Jabatan (Purchasing / GM / Owner / Housekeeping)",
      property: "Nama Hotel / Resort / Villa",
      rooms: "Jumlah Kamar (Opsional)",
      location: "Area / Lokasi Pengiriman (cth: Seminyak, Ubud)",
      phone: "Nomor Telepon / WhatsApp Aktif",
      email: "Alamat Email Resmi",
      deliveryDate: "Target Waktu Pengiriman",
      extraNotes: "Catatan Tambahan / Permintaan Sampel",
      extraNotesPlaceholder: "Tuliskan jika Anda memerlukan pengiriman sampel fisik atau jadwal kontrak rutin bulanan...",
      sendWhatsApp: "Kirim Daftar RFQ via WhatsApp",
      sendEmail: "Kirim Daftar RFQ via Email",
      printSummary: "Cetak / Simpan PDF",
      clearCart: "Kosongkan Daftar",
      addedToast: "ditambahkan ke Daftar RFQ",
      viewCart: "Buka Daftar RFQ",
      directNotice:
        "Tim sales kami di Kerobokan, Bali akan meninjau daftar Anda dan mengirimkan rincian harga grosir beserta estimasi waktu pengerjaan.",
      submittedBanner:
        "Format permintaan penawaran telah disiapkan. Silakan lanjutkan pengiriman melalui jendela WhatsApp atau aplikasi Email Anda.",
    },
    about: {
      eyebrow: "Profil Perusahaan",
      title: "Mitra Penyedia Hotel Amenities & Perlengkapan Hospitality di Bali",
      subtitle:
        "Berpusat di Kerobokan Kaja, Kabupaten Badung, PT Kawan Baik Bali mendukung kelancaran operasional hotel, resort, villa, dan spa melalui pengadaan perlengkapan kamar yang terstandarisasi.",
      storyEyebrow: "01 / Latar Belakang",
      storyTitle: "Berangkat dari Kebutuhan Nyata Industri Perhotelan Bali",
      storyP1:
        "PT Kawan Baik Bali dibangun atas kesadaran bahwa detail kecil di dalam kamar — mulai dari kelembutan handuk, kerapian kemasan dental kit, hingga aroma sabun mandi — membentuk kesan pertama tamu terhadap standar sebuah properti.",
      storyP2:
        "Berlokasi strategis di jalur penghubung Seminyak, Canggu, Kuta, dan Denpasar, kami mengoperasikan gudang dan tim distribusi lokal yang siap merespons kebutuhan pengadaan reguler maupun mendesak.",
      storyP3:
        "Kami melayani pengadaan satu pintu (one-stop supply) yang mencakup cairan perawatan diri (personal care), sandal kamar hotel & resort, linen tempat tidur & handuk, perlengkapan praktis kamar mandi, produk ramah lingkungan, hingga payung promosi berlogo.",
      pillarsEyebrow: "02 / Standar Layanan Kami",
      pillarsTitle: "Komitmen Operasional untuk Klien B2B",
      pillars: [
        {
          code: "01",
          title: "Lokasi Gudang Strategis di Bali",
          desc: "Berpusat di Kerobokan Kaja, Kuta Utara — memudahkan koordinasi sampel, kunjungan langsung, dan pengiriman cepat ke seluruh area pariwisata Bali.",
        },
        {
          code: "02",
          title: "Kustomisasi Identitas Brand (OEM)",
          desc: "Mendukung pencetakan logo properti melalui metode sablon, hot-stamping, label khusus, hingga bordir pada sandal dan handuk.",
        },
        {
          code: "03",
          title: "Fleksibilitas Kuantitas Pesanan",
          desc: "Skema MOQ yang adaptif bagi manajemen private villa, boutique hotel, hingga jaringan resort berskala besar.",
        },
        {
          code: "04",
          title: "Pemeriksaan Kualitas Terukur",
          desc: "Setiap batch produk melewati pengecekan fisik kemasan, konsistensi isi, dan kerapian jahitan sebelum dikirimkan ke gudang klien.",
        },
        {
          code: "05",
          title: "Alternatif Material Berkelanjutan",
          desc: "Menyediakan pilihan bahan bambu, serat gandum (wheat straw), anyaman alami, serta kemasan isi ulang (bulk 5L) untuk mengurangi limbah plastik.",
        },
        {
          code: "06",
          title: "Kemitraan Jangka Panjang",
          desc: "Kami berfokus pada keandalan jadwal suplai bulanan dan komunikasi yang transparan dengan departemen purchasing maupun housekeeping.",
        },
      ],
      segmentsEyebrow: "03 / Cakupan Layanan",
      segmentsTitle: "Segmen Properti yang Kami Layani",
      segments: [
        { title: "Hotel & Resort Bintang 3–5", desc: "Suplai rutin kontrak bulanan dengan kemasan custom berlogo dan standar kualitas kamar hotel berbintang." },
        { title: "Private Villa & Manajemen Villa", desc: "Paket amenities estetik, sandal anyaman resort, dan handuk berkualitas dengan MOQ yang bersahabat." },
        { title: "Spa, Wellness & Beach Club", desc: "Handuk pool/pantai motif garis, sandal selop alami, aromaterapi, dan perlengkapan locker room." },
        { title: "Korporat & Event", desc: "Payung golf custom sablon multi-panel dan merchandise suvenir berkualitas tinggi." },
      ],
      vibeEyebrow: "04 / Suasana Kerja Kami",
      vibeTitle: "Dedikasi dengan Semangat Keramahtamahan Bali",
      vibeDesc: "Dengarkan karya musik orisinal yang merepresentasikan semangat positif tim PT Kawan Baik Bali.",
    },
    clients: {
      eyebrow: "Portofolio Klien",
      title: "Hotel, Resort & Villa yang Bermitra Bersama Kami",
      subtitle:
        "Berikut adalah sebagian properti perhotelan, resort, dan villa di berbagai kawasan Bali yang telah mempercayakan pengadaan perlengkapan amenities mereka kepada PT Kawan Baik Bali.",
      featuredLabel: "Galeri Properti Klien",
      directoryTitle: "Direktori Klien Perhotelan & Resort",
      directorySubtitle: "Properti mitra kami tersebar di Canggu, Seminyak, Legian, Nusa Dua, Ubud, Sidemen, Munduk, hingga Pemuteran.",
      ctaTitle: "Ingin Menjadikan Properti Anda Mitra Berikutnya?",
      ctaDesc: "Hubungi tim kami untuk meminta daftar harga grosir atau jadwalkan pengiriman sampel produk ke properti Anda.",
    },
    contact: {
      eyebrow: "Hubungi Kami",
      title: "Diskusikan Kebutuhan Pengadaan Properti Anda",
      subtitle:
        "Tim sales B2B kami siap membantu pertanyaan spesifikasi produk, permintaan sampel, maupun perhitungan penawaran harga. Hubungi kami melalui saluran di bawah ini atau kunjungi kantor kami di Kerobokan.",
      officeTitle: "Kantor & Gudang Operasional",
      formTitle: "Kirim Pesan / Pertanyaan Langsung",
      formSubtitle: "Pesan Anda akan diformat rapi dan diteruskan langsung ke WhatsApp tim sales kami untuk respon tercepat.",
      nameLabel: "Nama Lengkap",
      emailLabel: "Alamat Email",
      phoneLabel: "Nomor Telepon / WhatsApp",
      hotelLabel: "Nama Hotel / Villa / Perusahaan",
      messageLabel: "Rincian Pertanyaan atau Kebutuhan Produk",
      submitBtn: "Kirim Pesan via WhatsApp",
      sentNotice: "Pesan telah diarahkan ke WhatsApp. Tim kami akan segera merespons Anda.",
      mapTitle: "Lokasi Kantor & Gudang PT Kawan Baik Bali",
      openMaps: "Buka Petunjuk Arah di Google Maps",
    },
    footer: {
      tagline:
        "Mitra penyedia hotel amenities, perlengkapan kamar mandi, linen handuk, dan produk eco-hospitality untuk hotel, resort, serta villa di Bali & Indonesia.",
      navigation: "Navigasi Utama",
      categories: "Kategori Produk",
      headOffice: "Kantor & Gudang Bali",
      rights: "Seluruh hak cipta dilindungi.",
      privacy: "Kebijakan Privasi",
      terms: "Syarat & Ketentuan",
    },
    common: {
      readMore: "Pelajari Selengkapnya",
      backToProducts: "Kembali ke Katalog",
      contactUs: "Hubungi Tim Kami",
      whatsappFast: "WhatsApp B2B Sales",
      officeHours: "Senin – Sabtu: 09:00 – 17:00 WITA",
      address: "Blk. A3 No.31, Kerobokan Kaja, Kec. Kuta Utara, Kabupaten Badung, Bali 80361",
    },
  },

  en: {
    topbar: {
      location: "Warehouse & Office: Kerobokan Kaja, Badung, Bali",
      hours: "Mon – Sat · 09:00 – 17:00 WITA",
      directWa: "B2B WhatsApp Consultation",
    },
    nav: {
      home: "Home",
      products: "Product Catalog",
      about: "Company Profile",
      clients: "Client Portfolio",
      contact: "Contact",
      rfq: "Quote List",
      requestQuote: "Request Quote",
    },
    hero: {
      eyebrow: "PT Kawan Baik Bali — Hospitality Supply Partner",
      titleLine1: "Hotel Amenities Supplier",
      titleLine2: "& Hospitality Essentials in Bali",
      subtitle:
        "Supplying guest bathroom toiletries, hotel slippers, cotton towels & bed linen, dry convenience kits, sustainable eco-materials, and custom branded umbrellas to hotels, resorts, and villas across Bali and Indonesia.",
      viewProducts: "Explore Product Catalog",
      requestQuote: "Create Quotation Request (RFQ)",
      metrics: [
        { value: "Kerobokan, Bali", label: "Local Warehouse & Dispatch" },
        { value: "Custom OEM", label: "Logo Printing, Foil & Embroidery" },
        { value: "Flexible MOQ", label: "Boutique Villas to 5-Star Resorts" },
        { value: "< 24 Hours", label: "Quotation Turnaround Time" },
      ],
    },
    home: {
      clientsEyebrow: "Trusted Across Bali's Hospitality Sector",
      clientsTitle: "Supplying Boutique Villas, Hotels & Beachfront Resorts",
      clientsLink: "View Full Client Portfolio",
      catEyebrow: "01 / Product Categories",
      catTitle: "Complete In-Room & Property Supply Solutions",
      catSubtitle:
        "Six core product lines engineered to meet the daily housekeeping and guest experience standards of hotels, resorts, villas, and spas.",
      exploreCategory: "Explore Line",
      featuredEyebrow: "02 / Featured Catalog",
      featuredTitle: "Signature Products Ready for Order & Custom Branding",
      featuredSubtitle:
        "Select any item below to inspect full technical specifications or add directly to your Request for Quotation (RFQ) list.",
      viewAllCatalog: "View Complete Catalog",
      processEyebrow: "03 / B2B Procurement Flow",
      processTitle: "Streamlined & Transparent Ordering Process",
      processSubtitle:
        "We simplify hospitality procurement from initial sample evaluation and artwork approval to scheduled warehouse delivery.",
      processSteps: [
        {
          step: "01",
          title: "Select Products & Submit RFQ",
          desc: "Choose items from our catalog, specify estimated quantities and branding preferences (plain stock or custom logo), and submit your RFQ.",
        },
        {
          step: "02",
          title: "Quotation & Sample Dispatch",
          desc: "Our Bali sales team provides wholesale pricing, MOQ details, digital logo mockups, and physical product samples for your review.",
        },
        {
          step: "03",
          title: "Production & Quality Inspection",
          desc: "Orders are manufactured and prepared to agreed specifications, undergoing multi-point checks for packaging, fragrance, and stitching.",
        },
        {
          step: "04",
          title: "Scheduled Property Delivery",
          desc: "Prompt dispatch directly from our Kerobokan warehouse for Bali properties, or reliable cargo shipping across Indonesia.",
        },
      ],
      profileEyebrow: "04 / About PT Kawan Baik Bali",
      profileTitle: "A Dependable Hospitality Supply Chain Partner in Bali",
      profileP1:
        "Headquartered in Kerobokan Kaja, North Kuta, PT Kawan Baik Bali is built to deliver consistent, well-crafted, and punctual hotel amenity supplies.",
      profileP2:
        "We work closely with purchasing managers, general managers, and villa owners across Canggu, Seminyak, Legian, Ubud, Nusa Dua, and beyond.",
      profilePoints: [
        "Reliable stock management & scheduled deliveries to keep housekeeping running smoothly",
        "Both ready-to-ship neutral stock and bespoke private-label OEM production",
        "Responsive local account support based right in the heart of Bali",
      ],
      faqEyebrow: "05 / Procurement Information",
      faqTitle: "Frequently Asked Questions for Hotel Buyers",
      faqs: [
        {
          q: "What is the Minimum Order Quantity (MOQ) for your products?",
          a: "MOQ depends on the product category and branding type. Neutral/plain stock items start from 50–300 pcs, while custom-printed boxes, tubes, or embroidered slippers typically start from 300–1,000 pcs per SKU.",
        },
        {
          q: "Can we request physical samples before placing a bulk order?",
          a: "Yes. We gladly provide sample kits delivered to your hotel office or villa management in Bali so your team can evaluate material quality, scent, and finishing firsthand.",
        },
        {
          q: "What is the production lead time for custom-branded amenities?",
          a: "Neutral ready-stock items are dispatched within 1–3 business days in Bali. Custom-branded orders generally require 7–21 business days depending on artwork and packaging complexity.",
        },
        {
          q: "Do you deliver outside of Bali?",
          a: "Yes. Alongside our dedicated delivery fleet covering all regencies in Bali, we ship regularly to Lombok, Labuan Bajo, Java, and across the Indonesian archipelago.",
        },
      ],
      ctaEyebrow: "Ready to Upgrade Your Property's Guest Amenities?",
      ctaTitle: "Discuss Your Specifications & Volume Requirements With Us",
      ctaDesc:
        "Compile your required items using our online RFQ tool or contact our Kerobokan office directly for samples and consultation.",
    },
    product: {
      catEyebrow: "B2B Procurement Catalog",
      allProducts: "Complete Hotel Amenities Catalog",
      catalogSubtitle:
        "Filter our hospitality product lines by category or keyword. Click any product for full technical specifications or add items directly to your Quotation List (RFQ).",
      searchPlaceholder: "Search products (e.g., shampoo, towel, slippers, dental kit, bamboo)...",
      filterAll: "All Categories",
      showingCount: "Showing",
      productsLabel: "products",
      noResults: "No products match your current search criteria.",
      resetFilter: "Show All Products",
      specs: "Technical Specifications",
      packaging: "Packaging & Sizes",
      moq: "Minimum Order (MOQ)",
      leadTime: "Estimated Lead Time",
      addToRfq: "Add to Quote List (RFQ)",
      addedShort: "In Quote List",
      addShort: "+ Quote",
      inRfq: "Added to Quote List",
      enquireWa: "Inquire via WhatsApp",
      viewDetails: "View Specifications",
      viewAllPhotos: "View Photo Gallery",
      categoryTitle: "Hotel Amenity Categories",
      customAvailable: "Custom Logo & Private Label OEM Available",
      localBali: "Dispatched from Kerobokan Warehouse, Bali",
      qualityChecked: "Multi-Point Quality Inspection Prior to Dispatch",
      relatedProducts: "More Products in This Category",
      otherCategories: "Browse Other Categories",
      needCustomTitle: "Need Custom Packaging or Bespoke Amenity Sets?",
      needCustomDesc:
        "We tailor bottle shapes, fragrances, box finishes, and slipper embroidery to match your property's brand guidelines.",
      specLabels: {
        volume: "Volume / Capacity",
        size: "Standard Size",
        dimensions: "Dimensions",
        material: "Material / Composition",
        packaging: "Packaging Format",
        fragrance: "Fragrance Options",
        contents: "Set Contents",
        color: "Color",
        colors: "Available Colors",
        moq: "Minimum Order (MOQ)",
        customization: "Branding Options",
        leadTime: "Estimated Lead Time",
      },
    },
    rfq: {
      eyebrow: "B2B Quotation Request",
      title: "Request for Quotation (RFQ)",
      subtitle:
        "Review your selected hospitality items, adjust estimated quantities and branding preferences, and submit directly to our Bali sales team via WhatsApp or Email.",
      quickAddTitle: "Quick-Add Product to Quotation List",
      quickAddPlaceholder: "Select a product from catalog to add...",
      quickAddBtn: "Add Item",
      emptyTitle: "Your Quotation List is Currently Empty",
      emptyDesc:
        "Use the quick-add selector above to pick products immediately, or browse our full product catalog.",
      browseCatalog: "Explore Product Catalog",
      tableItem: "Selected Products",
      tableQuantity: "Estimated Quantity",
      tableBranding: "Branding Preference",
      tableNotes: "Specification Notes (Optional)",
      tableNotesPlaceholder: "e.g., 30ml tube green tea scent, 1-color gold logo print...",
      tableAction: "Remove",
      brandCustom: "Custom Property Logo",
      brandPlain: "Plain / Unbranded Stock",
      brandEco: "Eco Kraft Packaging",
      formTitle: "Property & Buyer Information",
      fullName: "Contact Person Name",
      role: "Role / Department (Purchasing / GM / Owner)",
      property: "Hotel / Resort / Villa Name",
      rooms: "Number of Rooms (Optional)",
      location: "Delivery Location (e.g., Seminyak, Ubud, Nusa Dua)",
      phone: "Phone / WhatsApp Number",
      email: "Business Email Address",
      deliveryDate: "Target Delivery Timeframe",
      extraNotes: "Additional Requirements / Sample Request",
      extraNotesPlaceholder: "Let us know if you require physical samples or monthly scheduled supply...",
      sendWhatsApp: "Submit RFQ via WhatsApp",
      sendEmail: "Submit RFQ via Email",
      printSummary: "Print / Save PDF",
      clearCart: "Clear List",
      addedToast: "added to Quote List",
      viewCart: "Open Quote List",
      directNotice:
        "Our sales team in Kerobokan, Bali will review your item list and reply with wholesale pricing, MOQ, and lead time details.",
      submittedBanner:
        "Your quotation summary has been prepared. Please complete sending via your WhatsApp or Email window.",
    },
    about: {
      eyebrow: "Company Profile",
      title: "Dedicated Hotel Amenities & Hospitality Supplier in Bali",
      subtitle:
        "Based in Kerobokan Kaja, Badung, PT Kawan Baik Bali supports hotels, resorts, villas, and wellness properties with dependable, well-crafted in-room amenities.",
      storyEyebrow: "01 / Background",
      storyTitle: "Built Around the Practical Needs of Bali's Hospitality Industry",
      storyP1:
        "PT Kawan Baik Bali was founded on a straightforward principle: every tactile detail inside a guest room — from the softness of a bath towel to the presentation of a dental kit and the scent of bath gel — shapes how guests remember your property.",
      storyP2:
        "Strategically positioned near Seminyak, Canggu, Kuta, and Denpasar, our local warehouse and operational team enable responsive communication, sample coordination, and punctual deliveries.",
      storyP3:
        "We serve as a consolidated one-stop supply partner covering personal care formulations, plush and natural woven slippers, commercial-grade towels and bed linen, dry convenience kits, sustainable bamboo and wheat-straw lines, and custom golf umbrellas.",
      pillarsEyebrow: "02 / Operational Standards",
      pillarsTitle: "Why Hospitality Buyers Partner With Us",
      pillars: [
        {
          code: "01",
          title: "Local Bali Warehouse & Fleet",
          desc: "Located in Kerobokan Kaja, North Kuta — allowing fast sample handovers, in-person consultations, and reliable delivery across Bali.",
        },
        {
          code: "02",
          title: "Custom Private Label (OEM)",
          desc: "Comprehensive branding options including screen printing, hot-foil stamping, custom box structural design, and logo embroidery.",
        },
        {
          code: "03",
          title: "Tailored Order Volumes",
          desc: "Practical MOQ structures suited for private villa management companies, boutique hotels, and large-scale resorts alike.",
        },
        {
          code: "04",
          title: "Consistent Quality Control",
          desc: "Every shipment is inspected for packaging integrity, fragrance consistency, and stitching durability prior to dispatch.",
        },
        {
          code: "05",
          title: "Sustainable Material Options",
          desc: "Plastic-reducing alternatives crafted from bamboo, wheat straw, natural linen, jute, kraft paper, and 5L bulk refill containers.",
        },
        {
          code: "06",
          title: "Long-Term Supply Reliability",
          desc: "Focused on recurring monthly supply agreements and transparent coordination with purchasing and housekeeping teams.",
        },
      ],
      segmentsEyebrow: "03 / Property Segments",
      segmentsTitle: "Hospitality Sectors We Supply",
      segments: [
        { title: "3 to 5-Star Hotels & Resorts", desc: "Scheduled monthly supply with custom-branded packaging and consistent commercial-grade quality." },
        { title: "Private Villas & Villa Management", desc: "Curated amenity sets, woven resort slippers, and hotel linen with flexible order quantities." },
        { title: "Spas, Wellness & Beach Clubs", desc: "Cabana stripe pool towels, natural slide slippers, botanical body care, and vanity essentials." },
        { title: "Corporate & Events", desc: "Heavy-duty custom-printed golf umbrellas and branded hospitality gift items." },
      ],
      vibeEyebrow: "04 / Studio Atmosphere",
      vibeTitle: "Warm Balinese Hospitality in Every Detail",
      vibeDesc: "Listen to our original studio track celebrating the spirit of partnership at PT Kawan Baik Bali.",
    },
    clients: {
      eyebrow: "Client Portfolio",
      title: "Hotels, Resorts & Villas Partnering With PT Kawan Baik Bali",
      subtitle:
        "A selection of hospitality properties across Bali that have entrusted their in-room amenities and supply requirements to our team.",
      featuredLabel: "Featured Partner Properties",
      directoryTitle: "Hospitality Partner Directory",
      directorySubtitle: "Serving properties across Canggu, Seminyak, Legian, Nusa Dua, Benoa, Ubud, Sidemen, Munduk, and Pemuteran.",
      ctaTitle: "Looking for a Dependable Amenities Partner for Your Property?",
      ctaDesc: "Request a tailored wholesale quotation or ask our team to send a physical sample kit to your office.",
    },
    contact: {
      eyebrow: "Contact Us",
      title: "Connect With Our Bali B2B Sales Team",
      subtitle:
        "Whether you need wholesale pricing, custom packaging consultations, or product samples, our team in Kerobokan is ready to assist.",
      officeTitle: "Office & Warehouse Information",
      formTitle: "Send a Direct Inquiry",
      formSubtitle: "Your inquiry will be formatted cleanly and opened in WhatsApp for immediate handling by our sales team.",
      nameLabel: "Full Name",
      emailLabel: "Email Address",
      phoneLabel: "Phone / WhatsApp Number",
      hotelLabel: "Hotel / Villa / Company Name",
      messageLabel: "Inquiry Details or Product Requirements",
      submitBtn: "Send Inquiry via WhatsApp",
      sentNotice: "Your message has been prepared for WhatsApp. Our team will respond shortly.",
      mapTitle: "PT Kawan Baik Bali Office & Warehouse Location",
      openMaps: "Open Directions in Google Maps",
    },
    footer: {
      tagline:
        "B2B hotel amenities, bathroom toiletries, hospitality linen, and sustainable room supplies for hotels, resorts, and villas in Bali & Indonesia.",
      navigation: "Navigation",
      categories: "Product Lines",
      headOffice: "Bali Office & Warehouse",
      rights: "All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
    },
    common: {
      readMore: "Read More",
      backToProducts: "Back to Catalog",
      contactUs: "Contact Sales",
      whatsappFast: "WhatsApp B2B Desk",
      officeHours: "Mon – Sat: 09:00 – 17:00 WITA",
      address: "Blk. A3 No.31, Kerobokan Kaja, North Kuta, Badung, Bali 80361",
    },
  },

  de: {
    topbar: {
      location: "Lager & Büro: Kerobokan Kaja, Badung, Bali",
      hours: "Mo – Sa · 09:00 – 17:00 WITA",
      directWa: "B2B-Beratung per WhatsApp",
    },
    nav: {
      home: "Startseite",
      products: "Produktkatalog",
      about: "Unternehmensprofil",
      clients: "Referenzen",
      contact: "Kontakt",
      rfq: "Anfrageliste",
      requestQuote: "Angebot anfordern",
    },
    hero: {
      eyebrow: "PT Kawan Baik Bali — B2B Hotelbedarf & Ausstattung",
      titleLine1: "Hotel Amenities Lieferant",
      titleLine2: "& Zimmerausstattung auf Bali",
      subtitle:
        "Zuverlässige Ausstattung für Hotels, Resorts und Privatvillen auf Bali und in ganz Indonesien: Pflegeprodukte, Hotelslipper, Handtücher, Bettwäsche, nachhaltige Eco-Artikel und bedruckte Schirme.",
      viewProducts: "Produktkatalog ansehen",
      requestQuote: "Preisanfrage erstellen (RFQ)",
      metrics: [
        { value: "Kerobokan, Bali", label: "Lokales Lager & Vertrieb" },
        { value: "OEM-Branding", label: "Logodruck, Prägung & Stickerei" },
        { value: "Flexible MOQ", label: "Für Villen bis 5-Sterne-Resorts" },
        { value: "< 24 Std.", label: "Schnelle Angebotsbearbeitung" },
      ],
    },
    home: {
      clientsEyebrow: "Vertrauenspartner der Hotellerie auf Bali",
      clientsTitle: "Lieferant für Boutique-Villen, Hotels & Strandresorts",
      clientsLink: "Alle Referenzkunden ansehen",
      catEyebrow: "01 / Produktkategorien",
      catTitle: "Komplettlösungen für Gästezimmer & Housekeeping",
      catSubtitle:
        "Sechs abgestimmte Produktlinien für den täglichen Hotel-, Resort-, Villen- und Spa-Betrieb.",
      exploreCategory: "Kategorie öffnen",
      featuredEyebrow: "02 / Ausgewählte Produkte",
      featuredTitle: "Direkt bestellbare & individualisierbare Artikel",
      featuredSubtitle:
        "Wählen Sie ein Produkt für detaillierte Spezifikationen oder fügen Sie es direkt Ihrer Preisanfrage (RFQ) hinzu.",
      viewAllCatalog: "Gesamten Katalog öffnen",
      processEyebrow: "03 / B2B-Bestellablauf",
      processTitle: "Strukturierter & transparenter Beschaffungsprozess",
      processSubtitle:
        "Von der Bemusterung und Logofreigabe bis zur pünktlichen Auslieferung an Ihr Haus.",
      processSteps: [
        {
          step: "01",
          title: "Produktauswahl & RFQ senden",
          desc: "Artikel im Katalog auswählen, gewünschte Menge und Branding-Option angeben und Anfrage absenden.",
        },
        {
          step: "02",
          title: "Angebot & Musterpaket",
          desc: "Sie erhalten Großhandelspreise, MOQ-Details, digitale Design-Entwürfe sowie physische Produktmuster.",
        },
        {
          step: "03",
          title: "Produktion & Qualitätsprüfung",
          desc: "Fertigung nach Ihren Vorgaben mit sorgfältiger Kontrolle von Verpackung, Duft und Verarbeitung.",
        },
        {
          step: "04",
          title: "Termingerechte Lieferung",
          desc: "Direktlieferung ab unserem Lager in Kerobokan auf Bali oder sicherer Versand innerhalb Indonesiens.",
        },
      ],
      profileEyebrow: "04 / Über PT Kawan Baik Bali",
      profileTitle: "Ihr verlässlicher Partner für Hotelbedarf auf Bali",
      profileP1:
        "Mit Sitz in Kerobokan Kaja, Nord-Kuta, beliefert PT Kawan Baik Bali Beherbergungsbetriebe mit hochwertigen und konsistenten Gästeartikeln.",
      profileP2:
        "Wir unterstützen Einkaufsleiter, General Manager und Villenverwaltungen in Canggu, Seminyak, Ubud, Nusa Dua und ganz Indonesien.",
      profilePoints: [
        "Planbare Lagerhaltung und pünktliche Nachlieferungen für Ihr Housekeeping",
        "Sofort verfügbare Neutralware sowie individuelle Private-Label-Produktion",
        "Persönliche Betreuung durch unser lokales Team auf Bali",
      ],
      faqEyebrow: "05 / Einkaufsinformationen",
      faqTitle: "Häufig gestellte Fragen (FAQ)",
      faqs: [
        {
          q: "Wie hoch ist die Mindestbestellmenge (MOQ)?",
          a: "Neutralware ist bereits ab 50–300 Stück erhältlich. Individuell bedruckte oder bestickte Artikel beginnen je nach Produkt meist bei 300–1.000 Stück.",
        },
        {
          q: "Können wir vorab Produktmuster anfordern?",
          a: "Ja, wir senden Ihnen gerne Musterpakete in Ihr Büro oder Ihre Unterkunft auf Bali zu.",
        },
        {
          q: "Wie lange dauert die Lieferzeit bei eigenem Hotellogo?",
          a: "Lagerware wird auf Bali innerhalb von 1–3 Werktagen geliefert. Individualisierte Bestellungen benötigen ca. 7–21 Werktage.",
        },
        {
          q: "Liefern Sie auch außerhalb von Bali?",
          a: "Ja, neben unserer eigenen Auslieferung auf Bali versenden wir regelmäßig nach Lombok, Labuan Bajo, Java und ganz Indonesien.",
        },
      ],
      ctaEyebrow: "Planen Sie Ihre nächste Amenity-Bestellung?",
      ctaTitle: "Besprechen Sie Spezifikationen & Mengen mit unserem Team",
      ctaDesc:
        "Nutzen Sie unser Online-RFQ-Formular oder kontaktieren Sie unser Büro in Kerobokan für Muster und Beratung.",
    },
    product: {
      catEyebrow: "B2B-Produktkatalog",
      allProducts: "Kompletter Hotel-Amenities-Katalog",
      catalogSubtitle:
        "Filtern Sie nach Kategorie oder Suchbegriff. Klicken Sie auf ein Produkt für technische Daten oder fügen Sie es Ihrer Anfrageliste (RFQ) hinzu.",
      searchPlaceholder: "Produkte suchen (z. B. Shampoo, Handtuch, Slipper, Bambus)...",
      filterAll: "Alle Kategorien",
      showingCount: "Angezeigt:",
      productsLabel: "Artikel",
      noResults: "Keine passenden Produkte gefunden.",
      resetFilter: "Alle Produkte anzeigen",
      specs: "Technische Spezifikationen",
      packaging: "Verpackung & Größen",
      moq: "Mindestbestellmenge (MOQ)",
      leadTime: "Lieferzeitraum",
      addToRfq: "Zur Anfrageliste (RFQ)",
      addedShort: "In Anfrageliste",
      addShort: "+ Anfrage",
      inRfq: "In der Anfrageliste",
      enquireWa: "WhatsApp Anfrage",
      viewDetails: "Spezifikationen",
      viewAllPhotos: "Fotogalerie",
      categoryTitle: "Produktkategorien",
      customAvailable: "Individuelles Hotellogo & OEM-Verpackung möglich",
      localBali: "Versand ab Lager Kerobokan, Bali",
      qualityChecked: "Qualitätsprüfung vor jeder Auslieferung",
      relatedProducts: "Weitere Artikel dieser Kategorie",
      otherCategories: "Weitere Kategorien",
      needCustomTitle: "Wünschen Sie individuelles Verpackungsdesign?",
      needCustomDesc:
        "Wir passen Flaschenformen, Düfte, Faltschachteln und Stickereien exakt an Ihr Corporate Design an.",
      specLabels: {
        volume: "Volumen / Inhalt",
        size: "Standardgröße",
        dimensions: "Abmessungen",
        material: "Material",
        packaging: "Verpackungsart",
        fragrance: "Duftnoten",
        contents: "Set-Inhalt",
        color: "Farbe",
        colors: "Verfügbare Farben",
        moq: "Mindestmenge (MOQ)",
        customization: "Branding-Optionen",
        leadTime: "Lieferzeit",
      },
    },
    rfq: {
      eyebrow: "B2B-Preisanfrage",
      title: "Preisanfrage erstellen (RFQ)",
      subtitle:
        "Überprüfen Sie Ihre ausgewählten Artikel, passen Sie Mengen und Branding-Wünsche an und senden Sie Ihre Anfrage per WhatsApp oder E-Mail.",
      quickAddTitle: "Produkt schnell zur Liste hinzufügen",
      quickAddPlaceholder: "Produkt aus dem Katalog wählen...",
      quickAddBtn: "Hinzufügen",
      emptyTitle: "Ihre Anfrageliste ist derzeit leer",
      emptyDesc:
        "Wählen Sie oben direkt Produkte aus oder durchsuchen Sie unseren Produktkatalog.",
      browseCatalog: "Zum Produktkatalog",
      tableItem: "Ausgewählte Produkte",
      tableQuantity: "Gewünschte Menge",
      tableBranding: "Branding-Art",
      tableNotes: "Anmerkungen (Optional)",
      tableNotesPlaceholder: "z. B. 30ml Tube Grüntee, 1-farbiger Logodruck...",
      tableAction: "Entfernen",
      brandCustom: "Mit eigenem Hotellogo",
      brandPlain: "Neutral / Ohne Logo",
      brandEco: "Eco-Kraftpapier-Verpackung",
      formTitle: "Hotel- & Kontaktdaten",
      fullName: "Name des Ansprechpartners",
      role: "Position (Einkauf / GM / Eigentümer)",
      property: "Name des Hotels / Resorts / der Villa",
      rooms: "Zimmeranzahl (Optional)",
      location: "Lieferort (z. B. Seminyak, Ubud)",
      phone: "Telefon / WhatsApp",
      email: "Geschäftliche E-Mail",
      deliveryDate: "Gewünschter Liefertermin",
      extraNotes: "Zusätzliche Hinweise / Musterwunsch",
      extraNotesPlaceholder: "Bitte angeben, falls Produktmuster gewünscht sind...",
      sendWhatsApp: "RFQ per WhatsApp senden",
      sendEmail: "RFQ per E-Mail senden",
      printSummary: "Drucken / PDF",
      clearCart: "Liste leeren",
      addedToast: "zur Anfrageliste hinzugefügt",
      viewCart: "Anfrageliste öffnen",
      directNotice:
        "Unser Vertriebsteam auf Bali sendet Ihnen kurzfristig ein maßgeschneidertes Großhandelsangebot.",
      submittedBanner:
        "Ihre Anfrage wurde vorbereitet. Bitte schließen Sie den Versand in WhatsApp oder Ihrem E-Mail-Programm ab.",
    },
    about: {
      eyebrow: "Unternehmensprofil",
      title: "Ihr Partner für Hotel Amenities & Gastronomiebedarf auf Bali",
      subtitle:
        "Von unserem Standort in Kerobokan Kaja, Badung, beliefern wir Hotels, Resorts, Villen und Spas mit hochwertiger Zimmerausstattung.",
      storyEyebrow: "01 / Hintergrund",
      storyTitle: "Aus der Praxis für die Hotellerie auf Bali entwickelt",
      storyP1:
        "PT Kawan Baik Bali legt höchsten Wert auf die Details im Gästezimmer — von der Saugkraft der Handtücher über hygienische Pflegesets bis hin zu angenehmen Raum- und Pflegedüften.",
      storyP2:
        "Durch unsere zentrale Lage nahe Seminyak, Canggu und Kuta gewährleisten wir kurze Reaktionszeiten, schnelle Bemusterung und verlässliche Logistik.",
      storyP3:
        "Als Komplettanbieter liefern wir Kosmetik, Slipper, Hotelwäsche, Convenience-Artikel, nachhaltige Bambus- und Weizenstroh-Serien sowie bedruckte Gästeschirme.",
      pillarsEyebrow: "02 / Leistungsmerkmale",
      pillarsTitle: "Unsere Standards für B2B-Kunden",
      pillars: [
        { code: "01", title: "Lokales Lager auf Bali", desc: "Sitz in Kerobokan Kaja für schnelle Auslieferungen und persönliche Abstimmung vor Ort." },
        { code: "02", title: "Private-Label & OEM", desc: "Individueller Logodruck, Heißfolienprägung, Maßverpackungen und Bestickung." },
        { code: "03", title: "Flexible Bestellmengen", desc: "Angepasste MOQs für Boutique-Villen ebenso wie für große Resortanlagen." },
        { code: "04", title: "Sorgfältige Qualitätskontrolle", desc: "Prüfung jeder Charge auf saubere Verarbeitung, Füllmenge und Verpackungsqualität." },
        { code: "05", title: "Nachhaltige Produktlinien", desc: "Plastikreduzierte Serien aus Bambus, Weizenstroh, Leinen, Jute und 5L-Nachfüllkanister." },
        { code: "06", title: "Verlässliche Partnerschaft", desc: "Pünktliche Rahmenlieferungen und direkte Kommunikation mit Ihrem Einkaufsteam." },
      ],
      segmentsEyebrow: "03 / Zielgruppen",
      segmentsTitle: "Objekte, die wir beliefern",
      segments: [
        { title: "3- bis 5-Sterne-Hotels & Resorts", desc: "Regelmäßige Belieferung mit gebrandeten Gästeartikeln und langlebiger Hotelwäsche." },
        { title: "Privatvillen & Villenmanagement", desc: "Stilvolle Amenity-Sets und geflochtene Slipper mit flexiblen Abnahmemengen." },
        { title: "Spas, Wellness & Beach Clubs", desc: "Gestreifte Poolhandtücher, Natur-Slipper und pflegende Kosmetikserien." },
        { title: "Firmenkunden & Events", desc: "Stabile Golfschirme mit mehrfarbigem Logodruck und repräsentative Werbeartikel." },
      ],
      vibeEyebrow: "04 / Atmosphäre",
      vibeTitle: "Balinesische Gastfreundschaft",
      vibeDesc: "Hören Sie unseren eigenen Song, der den Teamgeist von PT Kawan Baik Bali widerspiegelt.",
    },
    clients: {
      eyebrow: "Referenzen",
      title: "Hotels, Resorts & Villen, die mit uns zusammenarbeiten",
      subtitle:
        "Ein Auszug der Häuser auf Bali, die bei ihrer Gästezimmerausstattung auf PT Kawan Baik Bali setzen.",
      featuredLabel: "Ausgewählte Partnerhotels",
      directoryTitle: "Kundenverzeichnis",
      directorySubtitle: "Unsere Partner befinden sich in Canggu, Seminyak, Legian, Nusa Dua, Ubud, Sidemen, Munduk und Pemuteran.",
      ctaTitle: "Suchen Sie einen zuverlässigen Lieferanten für Ihr Haus?",
      ctaDesc: "Fordern Sie ein unverbindliches Angebot oder ein Musterpaket für Ihr Hotel an.",
    },
    contact: {
      eyebrow: "Kontakt",
      title: "Sprechen Sie mit unserem B2B-Team auf Bali",
      subtitle:
        "Kontaktieren Sie uns für Großhandelspreise, individuelle Verpackungsmuster oder einen Besuchstermin in Kerobokan.",
      officeTitle: "Büro & Warenlager",
      formTitle: "Direktanfrage senden",
      formSubtitle: "Ihre Nachricht wird übersichtlich formatiert und direkt an WhatsApp übergeben.",
      nameLabel: "Vollständiger Name",
      emailLabel: "E-Mail-Adresse",
      phoneLabel: "Telefon / WhatsApp",
      hotelLabel: "Name des Hotels / der Villa / Firma",
      messageLabel: "Ihre Anfrage oder benötigte Produkte",
      submitBtn: "Anfrage per WhatsApp senden",
      sentNotice: "Ihre Nachricht wurde für WhatsApp vorbereitet.",
      mapTitle: "Standort PT Kawan Baik Bali",
      openMaps: "Route in Google Maps öffnen",
    },
    footer: {
      tagline:
        "B2B-Lieferant für Hotel Amenities, Badkosmetik, Hotelwäsche und nachhaltige Gästeartikel auf Bali & in Indonesien.",
      navigation: "Navigation",
      categories: "Produktlinien",
      headOffice: "Büro & Lager Bali",
      rights: "Alle Rechte vorbehalten.",
      privacy: "Datenschutz",
      terms: "AGB",
    },
    common: {
      readMore: "Mehr erfahren",
      backToProducts: "Zurück zum Katalog",
      contactUs: "Vertrieb kontaktieren",
      whatsappFast: "WhatsApp B2B-Service",
      officeHours: "Mo – Sa: 09:00 – 17:00 WITA",
      address: "Blk. A3 No.31, Kerobokan Kaja, North Kuta, Badung, Bali 80361",
    },
  },

  zh: {
    topbar: {
      location: "巴厘岛仓库与办事处：Kerobokan Kaja, Badung, Bali",
      hours: "周一至周六 · 09:00 – 17:00 WITA",
      directWa: "WhatsApp B2B采购咨询",
    },
    nav: {
      home: "首页",
      products: "产品目录",
      about: "公司简介",
      clients: "合作客户",
      contact: "联系我们",
      rfq: "询价清单",
      requestQuote: "获取报价",
    },
    hero: {
      eyebrow: "PT Kawan Baik Bali — 巴厘岛酒店用品供应链伙伴",
      titleLine1: "巴厘岛专业酒店客房用品",
      titleLine2: "与洗漱布草综合供应商",
      subtitle:
        "为巴厘岛及印尼各地的星级酒店、度假村与私人别墅提供洗护沐浴品、酒店拖鞋、纯棉毛巾床品、客房日用包、天然竹木环保系列及定制Logo高尔夫礼宾伞。",
      viewProducts: "浏览产品目录",
      requestQuote: "在线创建询价单 (RFQ)",
      metrics: [
        { value: "Kerobokan, 巴厘岛", label: "本地仓储与配送中心" },
        { value: "OEM 品牌定制", label: "丝印、烫金与刺绣Logo" },
        { value: "灵活起订量", label: "适配精品别墅至五星级度假村" },
        { value: "< 24 小时", label: "B2B采购报价响应时间" },
      ],
    },
    home: {
      clientsEyebrow: "深耕巴厘岛酒店与度假村市场",
      clientsTitle: "众多精品别墅、度假酒店的长期供应伙伴",
      clientsLink: "查看全部合作酒店名录",
      catEyebrow: "01 / 核心产品线",
      catTitle: "一站式客房与酒店运营物资方案",
      catSubtitle:
        "六大专业产品类别，全面满足酒店客房部（Housekeeping）、水疗中心及泳池沙滩区域的日常运营标准。",
      exploreCategory: "查看该系列",
      featuredEyebrow: "02 / 精选客房用品",
      featuredTitle: "支持现货供应与专属Logo定制的热门单品",
      featuredSubtitle:
        "点击任意产品查看详细规格参数表，或直接添加至您的采购询价单（RFQ）中。",
      viewAllCatalog: "查看完整产品目录",
      processEyebrow: "03 / B2B 采购流程",
      processTitle: "清晰高效的酒店物资采购体验",
      processSubtitle:
        "从样品寄送、包装设计确认到巴厘岛本地仓库准时配送，全程专人跟进。",
      processSteps: [
        {
          step: "01",
          title: "选购产品并提交询价单",
          desc: "在目录中挑选所需产品，填写预估采购数量及包装方式（中性现货或定制Logo），一键提交询价。",
        },
        {
          step: "02",
          title: "获取批发报价与实物样品",
          desc: "巴厘岛销售团队将在24小时内提供阶梯批发报价、起订量说明、Logo设计效果图及实物样品。",
        },
        {
          step: "03",
          title: "规范生产与多重质检",
          desc: "严格按照确认的样品标准安排生产，出库前对包装密封、香型及车缝工艺进行全面检验。",
        },
        {
          step: "04",
          title: "准时送达酒店仓库",
          desc: "巴厘岛境内由本地车队直达配送，外岛客户通过可靠货运发往印尼全国各地。",
        },
      ],
      profileEyebrow: "04 / 关于 PT Kawan Baik Bali",
      profileTitle: "值得信赖的巴厘岛本地酒店供应链伙伴",
      profileP1:
        "PT Kawan Baik Bali 总部及仓库位于北库塔 Kerobokan Kaja，致力于为酒店行业提供品质稳定、交期可靠的客房用品。",
      profileP2:
        "我们与苍古（Canggu）、水明漾（Seminyak）、乌布（Ubud）、努沙杜瓦（Nusa Dua）等地的酒店总经理、采购部及别墅管理公司保持紧密合作。",
      profilePoints: [
        "完善的本地库存管理与定期补货机制，保障客房运营不断货",
        "同时提供无标中性现货与全套酒店专属品牌定制（OEM）",
        "扎根巴厘岛本地的服务团队，沟通顺畅、响应迅速",
      ],
      faqEyebrow: "05 / 采购常见问题",
      faqTitle: "酒店采购常见问答 (FAQ)",
      faqs: [
        {
          q: "各类产品的最低起订量（MOQ）是多少？",
          a: "具体取决于产品类别与是否定制。中性无标现货通常 50–300 件即可起订；定制印刷包装盒、软管或刺绣拖鞋一般为每款 300–1,000 件起。",
        },
        {
          q: "正式下单前可以申请实物样品吗？",
          a: "可以。我们支持向您在巴厘岛的酒店办公室或别墅管理处寄送样品包，方便您直观评估材质、香型与做工。",
        },
        {
          q: "定制酒店Logo产品的生产周期是多久？",
          a: "中性现货在巴厘岛地区 1–3 个工作日即可送达；定制Logo产品根据工艺复杂程度通常需要 7–21 个工作日。",
        },
        {
          q: "是否支持配送至巴厘岛以外的地区？",
          a: "支持。除巴厘岛全境专车配送外，我们长期通过海运/陆运物流发往龙目岛、科莫多（Labuan Bajo）、爪哇岛及印尼全境。",
        },
      ],
      ctaEyebrow: "准备好优化您的酒店客房用品了吗？",
      ctaTitle: "与我们的团队沟通您的采购规格与数量需求",
      ctaDesc:
        "使用在线 RFQ 工具生成采购清单，或直接联系我们位于 Kerobokan 的办公室预约看样。",
    },
    product: {
      catEyebrow: "B2B 采购目录",
      allProducts: "酒店客房用品完整目录",
      catalogSubtitle:
        "按类别或关键词筛选产品。点击产品卡片查看详细技术参数，或直接加入您的询价清单（RFQ）。",
      searchPlaceholder: "搜索产品（例如：洗发水、浴巾、拖鞋、牙具、竹制）...",
      filterAll: "全部类别",
      showingCount: "当前显示",
      productsLabel: "款产品",
      noResults: "未找到匹配当前搜索条件的产品。",
      resetFilter: "显示全部产品",
      specs: "产品技术参数",
      packaging: "包装与尺寸",
      moq: "最低起订量 (MOQ)",
      leadTime: "生产/交货周期",
      addToRfq: "加入询价清单 (RFQ)",
      addedShort: "已加询价",
      addShort: "+ 询价",
      inRfq: "已在询价清单中",
      enquireWa: "WhatsApp 咨询",
      viewDetails: "查看规格详情",
      viewAllPhotos: "查看图片库",
      categoryTitle: "酒店用品分类",
      customAvailable: "支持定制酒店专属 Logo 与外包装",
      localBali: "巴厘岛 Kerobokan 本地仓库直发",
      qualityChecked: "出库前经过严格品质检验",
      relatedProducts: "同类别其他产品",
      otherCategories: "浏览其他产品类别",
      needCustomTitle: "需要专属定制包装或配套组合方案？",
      needCustomDesc:
        "我们可根据贵酒店的 VI 视觉规范定制瓶型、香型、烫金纸盒及拖鞋刺绣。",
      specLabels: {
        volume: "容量规格",
        size: "标准尺寸",
        dimensions: "尺寸规格",
        material: "材质成分",
        packaging: "包装形式",
        fragrance: "香型选择",
        contents: "套盒包含",
        color: "颜色",
        colors: "可选颜色",
        moq: "最低起订量 (MOQ)",
        customization: "定制工艺",
        leadTime: "预计交货期",
      },
    },
    rfq: {
      eyebrow: "B2B 批量询价",
      title: "采购询价单 (RFQ)",
      subtitle:
        "核对您已选的酒店用品清单，调整预估采购数量与Logo定制方式，并通过 WhatsApp 或邮件一键发送至巴厘岛销售部。",
      quickAddTitle: "快速添加目录产品至询价单",
      quickAddPlaceholder: "从下拉列表中选择要添加的产品...",
      quickAddBtn: "添加至清单",
      emptyTitle: "您的询价清单目前为空",
      emptyDesc:
        "您可以使用上方的快速选择器直接添加产品，或前往产品目录页面浏览挑选。",
      browseCatalog: "浏览产品目录",
      tableItem: "已选产品明细",
      tableQuantity: "预估采购量",
      tableBranding: "Logo 定制需求",
      tableNotes: "规格备注（选填）",
      tableNotesPlaceholder: "如：30ml绿茶香型、单色烫金Logo...",
      tableAction: "移除",
      brandCustom: "定制酒店/别墅 Logo",
      brandPlain: "中性白盒/无标现货",
      brandEco: "环保牛皮纸包装",
      formTitle: "酒店物业及采购人信息",
      fullName: "联系人姓名",
      role: "职位（采购部 / 总经理 / 业主）",
      property: "酒店 / 度假村 / 别墅名称",
      rooms: "客房数量（选填）",
      location: "配送区域（如：水明漾、乌布、努沙杜瓦）",
      phone: "联系电话 / WhatsApp",
      email: "企业电子邮箱",
      deliveryDate: "期望交货时间",
      extraNotes: "其他要求 / 申请样品",
      extraNotesPlaceholder: "如需寄送样品或咨询月度长期供货协议，请在此说明...",
      sendWhatsApp: "通过 WhatsApp 发送询价单",
      sendEmail: "通过电子邮箱发送询价单",
      printSummary: "打印 / 导出 PDF",
      clearCart: "清空清单",
      addedToast: "已加入询价清单",
      viewCart: "查看询价清单",
      directNotice:
        "我们位于巴厘岛 Kerobokan 的销售团队将在收到清单后为您提供批发报价与交期安排。",
      submittedBanner:
        "询价单内容已生成，请在弹出的 WhatsApp 或邮件窗口中点击发送。",
    },
    about: {
      eyebrow: "公司简介",
      title: "专注巴厘岛酒店与度假村的客房用品供应伙伴",
      subtitle:
        "PT Kawan Baik Bali 立足巴厘岛 Badung 区 Kerobokan Kaja，为各类星级酒店、精品别墅与水疗中心提供高品质客房物资。",
      storyEyebrow: "01 / 发展背景",
      storyTitle: "深入理解巴厘岛酒店业的日常运营需求",
      storyP1:
        "PT Kawan Baik Bali 坚信，客房内的每一处细节——从浴巾的厚实吸水度、牙具盒的精致印刷到沐浴露的自然清香——都直接决定着宾客对酒店品质的评价。",
      storyP2:
        "依托毗邻水明漾、苍古与库塔的本地仓储优势，我们能够快速响应客户的看样需求、定制打样与日常补货配送。",
      storyP3:
        "我们提供涵盖洗发沐浴液、编织与毛绒拖鞋、高支纯棉布草毛巾、客房一次性易耗品、竹制与麦秆环保用品及定制礼宾伞的一站式供应服务。",
      pillarsEyebrow: "02 / 服务标准",
      pillarsTitle: "B2B 客户选择我们的核心原因",
      pillars: [
        { code: "01", title: "巴厘岛本地仓库与车队", desc: "位于 Kerobokan Kaja，支持当面洽谈看样及巴厘岛全境快速直达配送。" },
        { code: "02", title: "专业 OEM 品牌定制", desc: "提供丝网印刷、烫金烫银、专属彩盒定制及毛巾拖鞋刺绣工艺。" },
        { code: "03", title: "灵活的起订量方案", desc: "兼顾独立私人泳池别墅与大型连锁度假酒店的不同采购规模。" },
        { code: "04", title: "严格的出库品控", desc: "每批次产品均经过包装完整性、液体品质及缝线牢固度检查。" },
        { code: "05", title: "可持续环保材质系列", desc: "提供天然楠竹、小麦秸秆、亚麻、黄麻及 5L 大桶补充装，助力绿色酒店建设。" },
        { code: "06", title: "长期稳定的供货保障", desc: "支持按月度计划分批交货，与酒店采购及客房部保持高效协同。" },
      ],
      segmentsEyebrow: "03 / 服务对象",
      segmentsTitle: "我们服务的物业类型",
      segments: [
        { title: "三至五星级酒店与度假村", desc: "长期稳定的月度合约供应，配套全套酒店VI定制包装。" },
        { title: "私人别墅与别墅管理公司", desc: "富有巴厘岛度假风情的编织拖鞋、洗漱套盒与高档浴巾，起订量灵活。" },
        { title: "水疗中心与海滩俱乐部", desc: "彩色条纹泳池沙滩巾、天然藤编拖鞋及植物香薰洗护系列。" },
        { title: "企业礼品与活动定制", desc: "30英寸抗风纤维骨定制Logo高尔夫雨伞及品牌宣传礼品。" },
      ],
      vibeEyebrow: "04 / 品牌文化",
      vibeTitle: "传递巴厘岛的热情与真诚",
      vibeDesc: "聆听展现 PT Kawan Baik Bali 团队活力的原创音乐作品。",
    },
    clients: {
      eyebrow: "合作客户",
      title: "信任并与我们合作的巴厘岛酒店及度假村",
      subtitle:
        "以下为巴厘岛各区域选择 PT Kawan Baik Bali 作为客房用品与物资供应商的部分代表性酒店、度假村及别墅项目。",
      featuredLabel: "合作伙伴风采",
      directoryTitle: "合作酒店与度假村名录",
      directorySubtitle: "服务网络覆盖苍古、水明漾、雷吉安、努沙杜瓦、乌布、Sidemen、Munduk 及 Pemuteran。",
      ctaTitle: "正在为您的酒店或别墅寻找可靠的用品供应商？",
      ctaDesc: "立即联系我们获取批发报价单，或预约寄送实物样品包。",
    },
    contact: {
      eyebrow: "联系我们",
      title: "与巴厘岛 B2B 销售团队取得联系",
      subtitle:
        "无论您需要咨询产品规格、索取样品还是洽谈年度供货，我们位于 Kerobokan 的团队随时为您服务。",
      officeTitle: "办公与仓库地址",
      formTitle: "发送在线咨询",
      formSubtitle: "您的留言将自动排版并通过 WhatsApp 发送给我们的销售顾问。",
      nameLabel: "您的姓名",
      emailLabel: "电子邮箱",
      phoneLabel: "联系电话 / WhatsApp",
      hotelLabel: "酒店 / 别墅 / 公司名称",
      messageLabel: "咨询内容或采购需求说明",
      submitBtn: "通过 WhatsApp 发送咨询",
      sentNotice: "咨询内容已准备就绪，请在 WhatsApp 窗口中完成发送。",
      mapTitle: "PT Kawan Baik Bali 办公室与仓库位置",
      openMaps: "在 Google 地图中打开导航",
    },
    footer: {
      tagline:
        "巴厘岛及印尼专业的酒店客房用品、洗漱护理、酒店布草及环保洗漱套装 B2B 供应商。",
      navigation: "网站导航",
      categories: "产品系列",
      headOffice: "巴厘岛总部与仓库",
      rights: "保留所有权利。",
      privacy: "隐私政策",
      terms: "服务条款",
    },
    common: {
      readMore: "了解更多",
      backToProducts: "返回产品目录",
      contactUs: "联系销售团队",
      whatsappFast: "WhatsApp 在线客服",
      officeHours: "周一至周六: 09:00 – 17:00 WITA",
      address: "Blk. A3 No.31, Kerobokan Kaja, North Kuta, Badung, Bali 80361",
    },
  },

  ja: {
    topbar: {
      location: "倉庫・オフィス：Kerobokan Kaja, Badung, Bali",
      hours: "月〜土 · 09:00 – 17:00 WITA",
      directWa: "WhatsApp B2Bお問い合わせ",
    },
    nav: {
      home: "ホーム",
      products: "製品カタログ",
      about: "会社概要",
      clients: "導入実績",
      contact: "お問い合わせ",
      rfq: "見積リスト",
      requestQuote: "お見積り依頼",
    },
    hero: {
      eyebrow: "PT Kawan Baik Bali — ホスピタリティ用品サプライヤー",
      titleLine1: "バリ島のホテルアメニティ",
      titleLine2: "＆客室備品 専門サプライヤー",
      subtitle:
        "バリ島およびインドネシア全土のホテル、リゾート、プライベートヴィラへ、バスアメニティ、スリッパ、ホテルタオル＆リネン、ドライアメニティ、竹・麦わらエコ製品、ロゴ入り傘を安定供給。",
      viewProducts: "製品カタログを見る",
      requestQuote: "お見積りリスト作成 (RFQ)",
      metrics: [
        { value: "Kerobokan, Bali", label: "バリ島現地倉庫・配送拠点" },
        { value: "OEM ロゴ名入れ", label: "印刷・箔押し・刺繍対応" },
        { value: "柔軟な MOQ", label: "小規模ヴィラから大型リゾートまで" },
        { value: "< 24 時間", label: "迅速なお見積り回答" },
      ],
    },
    home: {
      clientsEyebrow: "バリ島のホスピタリティ業界での信頼",
      clientsTitle: "ホテル・リゾート・ヴィラへの豊富な納入実績",
      clientsLink: "導入実績一覧を見る",
      catEyebrow: "01 / 製品カテゴリー",
      catTitle: "客室・施設運営を支える6つの製品ライン",
      catSubtitle:
        "ハウスキーピングの品質基準とゲストの快適性を両立するプロフェッショナル仕様のアメニティ。",
      exploreCategory: "カテゴリーを見る",
      featuredEyebrow: "02 / 注目プロダクト",
      featuredTitle: "即納在庫＆オリジナルロゴ制作対応アイテム",
      featuredSubtitle:
        "製品をクリックして詳細スペックを確認するか、そのままお見積りリスト（RFQ）へ追加できます。",
      viewAllCatalog: "全製品カタログを開く",
      processEyebrow: "03 / お取引の流れ",
      processTitle: "シンプルで確実なB2B調達プロセス",
      processSubtitle:
        "サンプル確認・ロゴデザイン作成からバリ島内の定期配送まで一貫してサポートします。",
      processSteps: [
        {
          step: "01",
          title: "製品選択・RFQ送信",
          desc: "カタログから希望商品を選び、数量や名入れ有無を指定してRFQリストを送信します。",
        },
        {
          step: "02",
          title: "お見積り・サンプル手配",
          desc: "卸売価格、最小ロット（MOQ）、ロゴ配置イメージ、および実物サンプルをご案内します。",
        },
        {
          step: "03",
          title: "製造・品質検品",
          desc: "ご承認いただいた仕様に基づき製造・準備し、出荷前にパッケージや縫製を厳格に検品します。",
        },
        {
          step: "04",
          title: "施設への納品",
          desc: "クロボカン倉庫よりバリ島内各エリアへ直接配送、またはインドネシア各地へ発送いたします。",
        },
      ],
      profileEyebrow: "04 / PT Kawan Baik Bali について",
      profileTitle: "バリ島拠点の頼れるアメニティ・パートナー",
      profileP1:
        "北クタ・クロボカンに拠点を置く PT Kawan Baik Bali は、高品質なホテルアメニティを適正価格と確かな納期でお届けします。",
      profileP2:
        "チャングー、スミニャック、ウブド、ヌサドゥアなどのヴィラ運営会社やホテル購買部門と緊密に連携しています。",
      profilePoints: [
        "計画的な在庫管理と定期配送でハウスキーピング業務をサポート",
        "無地既製品（即納）とホテルロゴ入りOEM製作の両方に対応",
        "バリ島現地スタッフによるきめ細やかなサポート体制",
      ],
      faqEyebrow: "05 / よくあるご質問",
      faqTitle: "購買ご担当者様向け FAQ",
      faqs: [
        {
          q: "最小発注数量（MOQ）はどのくらいですか？",
          a: "無地の既製品は 50〜300個から手配可能です。オリジナルロゴ印刷や刺繍入りスリッパは1アイテムあたり 300〜1,000個前後から承ります。",
        },
        {
          q: "発注前にサンプルを取り寄せることは可能ですか？",
          a: "はい、バリ島内のオフィスや宿泊施設へ実物サンプルをお届けいたします。",
        },
        {
          q: "ロゴ名入れ商品の納期はどのくらいかかりますか？",
          a: "無地在庫品はバリ島内で 1〜3営業日以内、名入れ特注品は仕様により約 7〜21営業日となります。",
        },
        {
          q: "バリ島以外の地域へも発送できますか？",
          a: "はい、ロンボク島、ラブアンバジョ、ジャワ島などインドネシア全土への発送に対応しております。",
        },
      ],
      ctaEyebrow: "アメニティの見直し・新規導入をご検討中ですか？",
      ctaTitle: "仕様や数量についてお気軽にご相談ください",
      ctaDesc:
        "オンラインRFQフォームからの一括見積依頼、またはWhatsAppにて直接お問い合わせいただけます。",
    },
    product: {
      catEyebrow: "B2B 製品カタログ",
      allProducts: "ホテルアメニティ総合カタログ",
      catalogSubtitle:
        "カテゴリーやキーワードで検索できます。製品をクリックして詳細仕様を確認するか、お見積りリスト（RFQ）に追加してください。",
      searchPlaceholder: "製品を検索（例：シャンプー、タオル、スリッパ、竹）...",
      filterAll: "全カテゴリー",
      showingCount: "表示中：",
      productsLabel: "件",
      noResults: "条件に一致する製品が見つかりませんでした。",
      resetFilter: "すべての製品を表示",
      specs: "製品仕様・スペック",
      packaging: "包装・サイズ",
      moq: "最小発注数 (MOQ)",
      leadTime: "納期目安",
      addToRfq: "見積リスト (RFQ) に追加",
      addedShort: "リスト追加済",
      addShort: "+ 見積追加",
      inRfq: "見積リストに追加済み",
      enquireWa: "WhatsAppで質問",
      viewDetails: "詳細スペック",
      viewAllPhotos: "写真ギャラリー",
      categoryTitle: "製品カテゴリー",
      customAvailable: "ホテルロゴ印刷・OEMパッケージ対応",
      localBali: "バリ島クロボカン倉庫より出荷",
      qualityChecked: "出荷前品質検品済み",
      relatedProducts: "同カテゴリーの関連製品",
      otherCategories: "その他のカテゴリー",
      needCustomTitle: "オリジナルパッケージや特注セットをご希望ですか？",
      needCustomDesc:
        "貴施設のブランドカラーやコンセプトに合わせたパッケージ・香り・刺繍をご提案します。",
      specLabels: {
        volume: "容量",
        size: "サイズ",
        dimensions: "寸法",
        material: "素材・材質",
        packaging: "パッケージ形態",
        fragrance: "香りラインナップ",
        contents: "セット内容",
        color: "カラー",
        colors: "カラー展開",
        moq: "最小発注数 (MOQ)",
        customization: "名入れ・カスタマイズ",
        leadTime: "標準納期",
      },
    },
    rfq: {
      eyebrow: "B2B 一括お見積り",
      title: "お見積り依頼リスト (RFQ)",
      subtitle:
        "選択したアメニティの数量やロゴ仕様を確認し、WhatsAppまたはEメールでバリ島営業チームへ直接送信できます。",
      quickAddTitle: "カタログから製品をクイック追加",
      quickAddPlaceholder: "追加する製品を選択してください...",
      quickAddBtn: "追加する",
      emptyTitle: "お見積りリストに製品がありません",
      emptyDesc:
        "上のクイック追加メニューから製品を選ぶか、カタログページから追加してください。",
      browseCatalog: "製品カタログを開く",
      tableItem: "選択中の製品",
      tableQuantity: "ご希望数量",
      tableBranding: "ロゴ・包装仕様",
      tableNotes: "備考・ご要望（任意）",
      tableNotesPlaceholder: "例：30mlチューブ グリーンティーの香り、金箔ロゴ印刷...",
      tableAction: "削除",
      brandCustom: "ホテル/ヴィラ ロゴ名入れ",
      brandPlain: "無地（既製在庫）",
      brandEco: "エコクラフト紙パッケージ",
      formTitle: "ご担当者様・宿泊施設情報",
      fullName: "ご担当者名",
      role: "ご役職（購買 / 支配人 / オーナー）",
      property: "ホテル・リゾート・ヴィラ名",
      rooms: "客室数（任意）",
      location: "納品先エリア（例：スミニャック、ウブド）",
      phone: "電話番号 / WhatsApp",
      email: "業務用メールアドレス",
      deliveryDate: "ご希望納品時期",
      extraNotes: "その他ご要望・サンプル希望",
      extraNotesPlaceholder: "サンプル送付のご希望や定期配送のご相談などをご記入ください...",
      sendWhatsApp: "WhatsAppで見積依頼を送信",
      sendEmail: "メールで見積依頼を送信",
      printSummary: "印刷 / PDF保存",
      clearCart: "リストを空にする",
      addedToast: "を見積リストに追加しました",
      viewCart: "見積リストを見る",
      directNotice:
        "バリ島クロボカンの営業担当より、卸売価格・MOQ・納期の詳細をご連絡いたします。",
      submittedBanner:
        "お見積り内容を作成しました。開いたWhatsAppまたはメール画面から送信を完了してください。",
    },
    about: {
      eyebrow: "会社概要",
      title: "バリ島のホテル・ヴィラを支えるアメニティ専門サプライヤー",
      subtitle:
        "バドゥン県クロボカン・カジャに本社・倉庫を構え、バリ島およびインドネシア各地の宿泊施設へ高品質な客室備品を供給しています。",
      storyEyebrow: "01 / 私たちの歩み",
      storyTitle: "バリ島のホスピタリティ現場のニーズに応えるために",
      storyP1:
        "客室に入った瞬間からゲストが触れるタオル、スリッパ、バスアメニティの品質は、ホテルやヴィラの印象を大きく左右します。",
      storyP2:
        "スミニャック、チャングー、クタに隣接する立地を活かし、迅速なサンプル手配と安定した配送ネットワークを構築しています。",
      storyP3:
        "バスケア用品、スリッパ、リネン類、ドライアメニティ、環境に優しいバンブー＆ウィートストロー製品、ロゴ入りアンブレラまでワンストップで提供します。",
      pillarsEyebrow: "02 / 選ばれる理由",
      pillarsTitle: "B2Bパートナーとしての6つの強み",
      pillars: [
        { code: "01", title: "バリ島現地の自社倉庫", desc: "クロボカンを拠点に、迅速な配送と対面での打ち合わせ・サンプル確認が可能です。" },
        { code: "02", title: "オリジナルOEM・名入れ", desc: "シルク印刷、箔押し、特注化粧箱、刺繍など多彩なブランディングに対応。" },
        { code: "03", title: "柔軟なロット設定", desc: "プライベートヴィラから大型リゾートまで無駄のない発注数量をご提案。" },
        { code: "04", title: "徹底した品質管理", desc: "出荷前にパッケージ状態、内容量、縫製仕上がりを丁寧にチェックします。" },
        { code: "05", title: "エコ・サステナブル素材", desc: "竹、麦わら、天然麻、クラフト紙、5L詰替用タンクなど脱プラ製品が充実。" },
        { code: "06", title: "安定した長期供給", desc: "月次の定期納品スケジュール管理により、在庫切れリスクを防ぎます。" },
      ],
      segmentsEyebrow: "03 / 導入分野",
      segmentsTitle: "主な供給先カテゴリー",
      segments: [
        { title: "3〜5つ星ホテル＆リゾート", desc: "ホテルロゴ入りパッケージによる計画的な定期サプライ。" },
        { title: "プライベートヴィラ＆管理会社", desc: "リゾート感のある編み込みスリッパやアメニティセットを小ロットから。" },
        { title: "スパ・ウェルネス＆ビーチクラブ", desc: "ストライプ柄プールタオル、天然素材サンダル、アロマバス用品。" },
        { title: "コーポレート＆イベント", desc: "高耐久30インチのロゴ入りゴルフ傘やノベルティ制作。" },
      ],
      vibeEyebrow: "04 / カルチャー",
      vibeTitle: "バリ島の温かなスピリットを込めて",
      vibeDesc: "PT Kawan Baik Bali のチームスピリットを表現したオリジナルトラックをお聴きください。",
    },
    clients: {
      eyebrow: "導入実績",
      title: "PT Kawan Baik Bali のパートナーホテル＆リゾート",
      subtitle:
        "バリ島各地で当社のホテルアメニティ・客室備品をご採用いただいている宿泊施設の一部をご紹介します。",
      featuredLabel: "パートナー施設ギャラリー",
      directoryTitle: "導入クライアント一覧",
      directorySubtitle: "チャングー、スミニャック、レギャン、ヌサドゥア、ウブド、シデメン、ムンドゥック、プムトゥランなどバリ全域。",
      ctaTitle: "貴施設のアメニティ調達もぜひご相談ください",
      ctaDesc: "お見積り依頼やサンプルキットの手配など、お気軽にお問い合わせください。",
    },
    contact: {
      eyebrow: "お問い合わせ",
      title: "バリ島B2B営業デスクへのご連絡",
      subtitle:
        "製品仕様のご質問、サンプル請求、お見積り依頼など、クロボカンの担当チームが迅速に対応いたします。",
      officeTitle: "オフィス＆倉庫所在地",
      formTitle: "ダイレクトメッセージ送信",
      formSubtitle: "入力内容は整理されたフォーマットでWhatsAppへ引き継がれます。",
      nameLabel: "お名前",
      emailLabel: "メールアドレス",
      phoneLabel: "電話番号 / WhatsApp",
      hotelLabel: "ホテル・ヴィラ・会社名",
      messageLabel: "お問い合わせ内容・ご希望製品",
      submitBtn: "WhatsAppで送信する",
      sentNotice: "WhatsApp画面が開きますので送信を完了してください。",
      mapTitle: "PT Kawan Baik Bali 所在地マップ",
      openMaps: "Google マップでルートを開く",
    },
    footer: {
      tagline:
        "バリ島＆インドネシアのホテル・リゾート・ヴィラ向けホテルアメニティ、バス用品、リネン、エコ備品のB2Bサプライヤー。",
      navigation: "ナビゲーション",
      categories: "製品カテゴリー",
      headOffice: "バリ島本社・倉庫",
      rights: "All rights reserved.",
      privacy: "プライバシーポリシー",
      terms: "利用規約",
    },
    common: {
      readMore: "詳しく見る",
      backToProducts: "カタログへ戻る",
      contactUs: "お問い合わせ",
      whatsappFast: "WhatsApp B2B窓口",
      officeHours: "月〜土: 09:00 – 17:00 WITA",
      address: "Blk. A3 No.31, Kerobokan Kaja, North Kuta, Badung, Bali 80361",
    },
  },

  ru: {
    topbar: {
      location: "Склад и офис: Kerobokan Kaja, Badung, Bali",
      hours: "Пн – Сб · 09:00 – 17:00 WITA",
      directWa: "B2B консультация в WhatsApp",
    },
    nav: {
      home: "Главная",
      products: "Каталог",
      about: "О компании",
      clients: "Клиенты",
      contact: "Контакты",
      rfq: "Список RFQ",
      requestQuote: "Запросить КП",
    },
    hero: {
      eyebrow: "PT Kawan Baik Bali — Снабжение отелей и вилл",
      titleLine1: "Поставщик гостиничных",
      titleLine2: "аксессуаров и текстиля на Бали",
      subtitle:
        "Комплексные поставки косметики для номеров, тапочек, хлопковых полотенец и постельного белья, дорожных наборов, эко-аксессуаров из бамбука и брендированных зонтов для отелей, курортов и вилл на Бали и по всей Индонезии.",
      viewProducts: "Открыть каталог",
      requestQuote: "Запросить расчет (RFQ)",
      metrics: [
        { value: "Kerobokan, Bali", label: "Собственный склад на Бали" },
        { value: "OEM Брендинг", label: "Печать логотипа, тиснение, вышивка" },
        { value: "Гибкий MOQ", label: "От частных вилл до отелей 5*" },
        { value: "< 24 часов", label: "Время подготовки КП" },
      ],
    },
    home: {
      clientsEyebrow: "Нам доверяют отельеры Бали",
      clientsTitle: "Снабжаем бутик-виллы, отели и пляжные курорты",
      clientsLink: "Смотреть портфолио клиентов",
      catEyebrow: "01 / Категории продукции",
      catTitle: "Комплексные решения для оснащения номерного фонда",
      catSubtitle:
        "Шесть основных товарных направлений, разработанных по стандартам гостиничного хаускипинга.",
      exploreCategory: "Открыть категорию",
      featuredEyebrow: "02 / Популярные позиции",
      featuredTitle: "Продукция со склада и под заказ с вашим логотипом",
      featuredSubtitle:
        "Выберите товар для просмотра технических характеристик или добавьте его в список запроса коммерческого предложения (RFQ).",
      viewAllCatalog: "Весь каталог товаров",
      processEyebrow: "03 / Порядок работы B2B",
      processTitle: "Прозрачный и удобный процесс закупки",
      processSubtitle:
        "От предоставления образцов и согласования макета логотипа до регулярных поставок на склад вашего отеля.",
      processSteps: [
        {
          step: "01",
          title: "Выбор товаров и заявка RFQ",
          desc: "Добавьте нужные позиции из каталога, укажите ориентировочный тираж и тип брендирования.",
        },
        {
          step: "02",
          title: "Расчет цен и образцы",
          desc: "Менеджер на Бали направит оптовый прайс, условия MOQ, макеты с логотипом и физические образцы.",
        },
        {
          step: "03",
          title: "Производство и контроль качества",
          desc: "Комплектация и выпуск заказа с обязательной проверкой упаковки, ароматов и качества пошива.",
        },
        {
          step: "04",
          title: "Доставка на объект",
          desc: "Оперативная доставка собственным транспортом по Бали или отправка карго по всей Индонезии.",
        },
      ],
      profileEyebrow: "04 / О компании PT Kawan Baik Bali",
      profileTitle: "Надежный партнер по снабжению объектов гостеприимства",
      profileP1:
        "Компания PT Kawan Baik Bali расположена в Керобокане (Северная Кута) и специализируется на бесперебойном обеспечении отелей и вилл качественными расходными материалами и текстилем.",
      profileP2:
        "Мы работаем с управляющими компаниями, отделами закупок и владельцами вилл в Чангу, Семиньяке, Убуде, Нуса-Дуа и других регионах.",
      profilePoints: [
        "Планирование складских запасов и регулярные поставки по графику",
        "Наличие нейтральной продукции на складе и производство под СТМ (OEM)",
        "Локальная команда в самом центре туристического Бали",
      ],
      faqEyebrow: "05 / Информация для закупщиков",
      faqTitle: "Часто задаваемые вопросы (FAQ)",
      faqs: [
        {
          q: "Каков минимальный объем заказа (MOQ)?",
          a: "Нейтральная продукция без логотипа доступна от 50–300 шт. Заказы с индивидуальной печатью логотипа или вышивкой обычно начинаются от 300–1 000 шт. на позицию.",
        },
        {
          q: "Можно ли получить образцы продукции перед заказом?",
          a: "Да, мы доставляем комплекты образцов в ваш офис или на объект на Бали для оценки качества.",
        },
        {
          q: "Каковы сроки изготовления продукции с логотипом отеля?",
          a: "Нейтральные позиции со склада доставляются по Бали за 1–3 рабочих дня. Изготовление брендированной партии занимает 7–21 рабочий день.",
        },
        {
          q: "Осуществляете ли вы доставку за пределы Бали?",
          a: "Да, помимо доставки по всему острову Бали, мы регулярно отправляем заказы на Ломбок, в Лабуан-Баджо, на Яву и в другие регионы Индонезии.",
        },
      ],
      ctaEyebrow: "Планируете закупку оснащения для отеля или виллы?",
      ctaTitle: "Обсудите спецификации и объемы с нашим отделом продаж",
      ctaDesc:
        "Сформируйте список товаров через форму RFQ или свяжитесь с нашим офисом в Керобокане.",
    },
    product: {
      catEyebrow: "Каталог B2B",
      allProducts: "Полный каталог гостиничных товаров",
      catalogSubtitle:
        "Используйте фильтр по категориям или поиск по названию. Нажмите на карточку для просмотра спецификаций или добавьте товар в список RFQ.",
      searchPlaceholder: "Поиск товаров (шампунь, полотенце, тапочки, бамбук)...",
      filterAll: "Все категории",
      showingCount: "Показано",
      productsLabel: "поз.",
      noResults: "По вашему запросу ничего не найдено.",
      resetFilter: "Показать все товары",
      specs: "Технические характеристики",
      packaging: "Упаковка и размеры",
      moq: "Мин. партия (MOQ)",
      leadTime: "Срок поставки",
      addToRfq: "Добавить в список RFQ",
      addedShort: "В списке RFQ",
      addShort: "+ В запрос",
      inRfq: "Добавлено в RFQ",
      enquireWa: "Запрос в WhatsApp",
      viewDetails: "Характеристики",
      viewAllPhotos: "Фотогалерея",
      categoryTitle: "Категории товаров",
      customAvailable: "Доступно нанесение логотипа и OEM-упаковка",
      localBali: "Отгрузка со склада в Керобокане, Бали",
      qualityChecked: "Контроль качества каждой партии перед отгрузкой",
      relatedProducts: "Другие товары в этой категории",
      otherCategories: "Другие категории",
      needCustomTitle: "Требуется индивидуальная упаковка или комплектация?",
      needCustomDesc:
        "Мы разработаем дизайн коробочек, флаконов и вышивки в фирменном стиле вашего отеля.",
      specLabels: {
        volume: "Объем",
        size: "Размер",
        dimensions: "Габариты",
        material: "Материал / Состав",
        packaging: "Формат упаковки",
        fragrance: "Ароматы",
        contents: "Комплектация набора",
        color: "Цвет",
        colors: "Доступные цвета",
        moq: "Мин. заказ (MOQ)",
        customization: "Варианты брендирования",
        leadTime: "Сроки производства",
      },
    },
    rfq: {
      eyebrow: "B2B Запрос расчета",
      title: "Запрос коммерческого предложения (RFQ)",
      subtitle:
        "Проверьте выбранные позиции, укажите ориентировочное количество и параметры логотипа, затем отправьте заявку через WhatsApp или Email.",
      quickAddTitle: "Быстрое добавление товара из каталога",
      quickAddPlaceholder: "Выберите товар для добавления в список...",
      quickAddBtn: "Добавить",
      emptyTitle: "Ваш список запроса (RFQ) пуст",
      emptyDesc:
        "Выберите товары через панель быстрого добавления выше или перейдите в каталог продукции.",
      browseCatalog: "Перейти в каталог",
      tableItem: "Выбранные позиции",
      tableQuantity: "Количество",
      tableBranding: "Вариант брендирования",
      tableNotes: "Примечания к позиции",
      tableNotesPlaceholder: "Напр.: туба 30 мл зеленый чай, печать логотипа золотом...",
      tableAction: "Удалить",
      brandCustom: "С логотипом отеля / виллы",
      brandPlain: "Без логотипа (нейтральный)",
      brandEco: "Эко крафт-упаковка",
      formTitle: "Данные объекта и контактного лица",
      fullName: "Контактное лицо",
      role: "Должность (Закупки / Управляющий / Владелец)",
      property: "Название отеля / курорта / виллы",
      rooms: "Номерной фонд (необязательно)",
      location: "Район доставки (напр., Семиньяк, Убуд)",
      phone: "Телефон / WhatsApp",
      email: "Рабочий Email",
      deliveryDate: "Желаемые сроки поставки",
      extraNotes: "Дополнительные пожелания / Запрос образцов",
      extraNotesPlaceholder: "Укажите, если требуются образцы или регулярный график поставок...",
      sendWhatsApp: "Отправить RFQ через WhatsApp",
      sendEmail: "Отправить RFQ по Email",
      printSummary: "Печать / PDF",
      clearCart: "Очистить список",
      addedToast: "добавлено в список RFQ",
      viewCart: "Открыть список RFQ",
      directNotice:
        "Наш отдел продаж в Керобокане подготовит для вас расчет оптовых цен и сроков поставки.",
      submittedBanner:
        "Заявка сформирована. Пожалуйста, завершите отправку в открывшемся окне WhatsApp или почтового клиента.",
    },
    about: {
      eyebrow: "О компании",
      title: "Комплексный поставщик гостиничных принадлежностей на Бали",
      subtitle:
        "Базируясь в Керобокане (район Бадунг), PT Kawan Baik Bali обеспечивает отели, курорты, виллы и спа-центры качественной продукцией для номерного фонда.",
      storyEyebrow: "01 / История и подход",
      storyTitle: "Создано для реальных задач гостиничного бизнеса Бали",
      storyP1:
        "В PT Kawan Baik Bali мы понимаем, что впечатление гостя складывается из тактильных мелочей: мягкости полотенца, удобства тапочек, аккуратности упаковки зубного набора и тонкого аромата геля для душа.",
      storyP2:
        "Удобное расположение нашего склада рядом с Семиньяком, Чангу и Кутой позволяет оперативно предоставлять образцы и доставлять заказы.",
      storyP3:
        "Мы объединяем все ключевые категории снабжения: гостиничную косметику, тапочки, постельный и банный текстиль, индивидуальные гигиенические наборы, эко-серию из бамбука и брендированные зонты.",
      pillarsEyebrow: "02 / Стандарты работы",
      pillarsTitle: "Преимущества работы с нами",
      pillars: [
        { code: "01", title: "Склад и логистика на Бали", desc: "Офис и склад в Керобокане для быстрой отгрузки и личных встреч." },
        { code: "02", title: "Производство под вашим брендом", desc: "Шелкография, тиснение фольгой, индивидуальные коробки и вышивка." },
        { code: "03", title: "Гибкие тиражи (MOQ)", desc: "Удобные условия как для бутик-вилл, так и для крупных курортных комплексов." },
        { code: "04", title: "Контроль качества партий", desc: "Проверка герметичности упаковки, ароматов и швов перед каждой доставкой." },
        { code: "05", title: "Экологичные материалы", desc: "Изделия из бамбука, пшеничной соломы, льна, джута и канистры 5 л для рефила." },
        { code: "06", title: "Надежное долгосрочное снабжение", desc: "Стабильные ежемесячные поставки по согласованному графику." },
      ],
      segmentsEyebrow: "03 / Сегменты клиентов",
      segmentsTitle: "Для кого мы работаем",
      segments: [
        { title: "Отели и курорты 3–5 звезд", desc: "Регулярное снабжение брендированной косметикой и износостойким текстилем." },
        { title: "Частные виллы и управляющие компании", desc: "Эстетичные наборы аксессуаров и плетеные тапочки с доступным MOQ." },
        { title: "Спа, велнес и пляжные клубы", desc: "Полотенца для бассейна и пляжа, натуральные сланцы и арома-косметика." },
        { title: "Корпоративные заказы", desc: "Большие ветрозащитные зонты 30\" с нанесением логотипа компании." },
      ],
      vibeEyebrow: "04 / Атмосфера",
      vibeTitle: "Дух балийского гостеприимства",
      vibeDesc: "Послушайте музыкальную композицию, отражающую настрой команды PT Kawan Baik Bali.",
    },
    clients: {
      eyebrow: "Портфолио клиентов",
      title: "Отели, курорты и виллы, сотрудничающие с нами",
      subtitle:
        "Примеры гостиничных объектов на Бали, которые доверяют поставку аксессуаров и текстиля компании PT Kawan Baik Bali.",
      featuredLabel: "Галерея партнеров",
      directoryTitle: "Список отелей и курортов",
      directorySubtitle: "Наши клиенты расположены в Чангу, Семиньяке, Легиане, Нуса-Дуа, Убуде, Сидемене, Мундуке и Пемутеране.",
      ctaTitle: "Ищете надежного поставщика для вашего отеля или виллы?",
      ctaDesc: "Запросите оптовый прайс-лист или доставку образцов продукции на ваш объект.",
    },
    contact: {
      eyebrow: "Контакты",
      title: "Свяжитесь с нашим B2B-отделом на Бали",
      subtitle:
        "Мы готовы ответить на вопросы по спецификациям, подготовить расчет стоимости или организовать встречу в нашем офисе в Керобокане.",
      officeTitle: "Офис и склад на Бали",
      formTitle: "Отправить прямой запрос",
      formSubtitle: "Ваше сообщение будет аккуратно сформировано и открыто в WhatsApp для быстрой отправки.",
      nameLabel: "Ваше имя",
      emailLabel: "Email адрес",
      phoneLabel: "Телефон / WhatsApp",
      hotelLabel: "Название отеля / виллы / компании",
      messageLabel: "Описание запроса или список нужных позиций",
      submitBtn: "Отправить запрос в WhatsApp",
      sentNotice: "Сообщение подготовлено для отправки в WhatsApp.",
      mapTitle: "Расположение офиса и склада PT Kawan Baik Bali",
      openMaps: "Открыть маршрут в Google Картах",
    },
    footer: {
      tagline:
        "B2B-поставщик гостиничных аксессуаров, косметики, текстиля и эко-продукции для отелей, курортов и вилл на Бали и в Индонезии.",
      navigation: "Навигация",
      categories: "Категории товаров",
      headOffice: "Офис и склад на Бали",
      rights: "Все права защищены.",
      privacy: "Политика конфиденциальности",
      terms: "Условия использования",
    },
    common: {
      readMore: "Подробнее",
      backToProducts: "Назад в каталог",
      contactUs: "Связаться с нами",
      whatsappFast: "WhatsApp отдел продаж",
      officeHours: "Пн – Сб: 09:00 – 17:00 WITA",
      address: "Blk. A3 No.31, Kerobokan Kaja, North Kuta, Badung, Bali 80361",
    },
  },
};

const LanguageContext = createContext(null);

const STORAGE_LANG_KEY = "kbb_lang_preference_v1";

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    if (typeof window === "undefined") return "id";
    try {
      const saved = localStorage.getItem(STORAGE_LANG_KEY);
      if (saved && TRANSLATIONS[saved]) return saved;
      const navLang = navigator.language?.slice(0, 2)?.toLowerCase();
      if (navLang && TRANSLATIONS[navLang]) return navLang;
    } catch {
      // ignore
    }
    return "id";
  });

  const setLanguage = (newLang) => {
    if (TRANSLATIONS[newLang]) {
      setLangState(newLang);
      trackEvent("language_change", { language: newLang });
      try {
        localStorage.setItem(STORAGE_LANG_KEY, newLang);
        document.documentElement.lang = newLang;
      } catch {
        // ignore
      }
    }
  };

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const t = (path, fallback = "") => {
    const keys = path.split(".");
    let current = TRANSLATIONS[lang] || TRANSLATIONS.en;
    for (const k of keys) {
      if (current && typeof current === "object" && k in current) {
        current = current[k];
      } else {
        let fallbackVal = TRANSLATIONS.en;
        for (const fk of keys) {
          if (fallbackVal && typeof fallbackVal === "object" && fk in fallbackVal) {
            fallbackVal = fallbackVal[fk];
          } else {
            return fallback || path;
          }
        }
        return fallbackVal;
      }
    }
    return current ?? fallback ?? path;
  };

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLanguage,
        t,
        currentLangMeta:
          SUPPORTED_LANGUAGES.find((l) => l.code === lang) || SUPPORTED_LANGUAGES[0],
        supportedLanguages: SUPPORTED_LANGUAGES,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
