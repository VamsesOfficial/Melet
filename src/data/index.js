// ─── SHARED DATA ─────────────────────────────────────────────────────────────

export const PRODUCT_CATEGORIES = [
  {
    id: 1,
    slug: "personal-care",
    name: "Personal Care Essentials",
    description: "Premium shampoo, conditioner, shower gel, body lotion, and soap crafted for a luxurious in-room experience.",
    image: "/images/prod-01-shampoo-classic.jpg",
    items: ["Shampoo", "Conditioner", "Shower Gel", "Body Lotion", "Bar Soap"],
    color: "#1a3a5c",
    accent: "#2c6e8a",
    seo: {
      title: "Personal Care Hotel Amenities Bali | Shampoo, Conditioner, Shower Gel | PT Kawan Baik Bali",
      description: "Supplier personal care hotel amenities Bali: shampoo, conditioner, shower gel, body lotion, bar soap. HALAL & POM certified. Supply 500+ hotels di Bali & Indonesia.",
    },
  },
  {
    id: 2,
    slug: "comfort-items",
    name: "Comfort Items",
    description: "Hotel-grade towels, plush bathrobes, and slippers designed to deliver superior softness and lasting durability.",
    image: "/images/prod-14-hotel-slippers.jpg",
    items: ["Bath Towels", "Bathrobe", "Hotel Slippers", "Face Towel", "Bath Mat"],
    color: "#c9a84c",
    accent: "#e0b84e",
    seo: {
      title: "Hotel Towels, Bathrobes & Slippers Supplier Bali | PT Kawan Baik Bali",
      description: "Supplier handuk hotel, bathrobe & slippers Bali. 600 GSM 100% cotton towels, terry bathrobe custom embroidery, anti-slip slippers. Kualitas 5-star untuk hotel & resort Bali.",
    },
  },
  {
    id: 3,
    slug: "convenience-goods",
    name: "Convenience Goods",
    description: "Cotton buds, shower caps, combs, tissue, sewing kits, shoe shine, and all daily essentials guests expect.",
    image: "/images/prod-16-shower-cap.jpg",
    items: ["Cotton Buds", "Shower Cap", "Comb", "Tissue", "Sewing Kit"],
    color: "#2c6e8a",
    accent: "#3d8ca8",
    seo: {
      title: "Convenience Goods Hotel Amenities Bali | Cotton Buds, Shower Cap, Comb | PT Kawan Baik Bali",
      description: "Supplier convenience goods hotel Bali: cotton buds, shower cap, sisir, tissue, sewing kit, shoe shine. Semua kebutuhan tamu hotel tersedia. Fast delivery seluruh Bali & Indonesia.",
    },
  },
  {
    id: 4,
    slug: "eco-friendly",
    name: "Eco-Friendly Solutions",
    description: "Sustainable, biodegradable amenity lines made from responsibly sourced materials — guests love them, the planet does too.",
    image: "/images/prod-11-hotel-soap.jpg",
    items: ["Bamboo Toothbrush", "Refillable Dispensers", "Natural Soap", "Organic Shampoo"],
    color: "#3a7d44",
    accent: "#4a9c56",
    seo: {
      title: "Eco-Friendly Hotel Amenities Supplier Bali | Bamboo, Organic, Biodegradable | PT Kawan Baik Bali",
      description: "Supplier eco-friendly hotel amenities Bali: bamboo toothbrush, refillable dispensers, natural soap, organic shampoo. Solusi sustainable untuk hotel & resort ramah lingkungan di Bali.",
    },
  },
];

export const PRODUCTS = [
  {
    id: 1,
    slug: "shampoo-classic",
    name: "Shampoo Classic",
    category: "Personal Care",
    categorySlug: "personal-care",
    image: "/images/prod-01-shampoo-classic.jpg",
    description: "Hair shampoo with green tea extract, 25ml — classic formula for daily hotel use.",
    gallery: [
      // { src: "/images/shampoo-classic-1.jpg", caption: "Kemasan 25ml" },
      // { src: "/images/shampoo-classic-2.jpg", caption: "Display hotel" },
    ],
  },
  {
    id: 2,
    slug: "shampoo-aromatherapy",
    name: "Shampoo Aromatherapy",
    category: "Personal Care",
    categorySlug: "personal-care",
    image: "/images/prod-02-shampoo-aromatherapy.jpg",
    description: "Aromatherapy shampoo with aloe vera extract, 25–30ml. Refreshing and nourishing.",
    gallery: [
      // { src: "/images/shampoo-aromatherapy-1.jpg", caption: "Kemasan 30ml" },
    ],
  },
  {
    id: 3,
    slug: "hair-conditioner",
    name: "Hair Conditioner",
    category: "Personal Care",
    categorySlug: "personal-care",
    image: "/images/prod-03-hair-conditioner.jpg",
    description: "Hair conditioner classic with green tea, 25ml. Leaves hair smooth and manageable.",
    gallery: [
      // { src: "/images/hair-conditioner-1.jpg", caption: "" },
    ],
  },
  {
    id: 4,
    slug: "shower-gel-classic",
    name: "Shower Gel Classic",
    category: "Personal Care",
    categorySlug: "personal-care",
    image: "/images/prod-04-shower-gel-classic.jpg",
    description: "Body shower gel with green tea, 25ml. Refreshing fragrance, gentle on skin.",
    gallery: [
      // { src: "/images/shower-gel-classic-1.jpg", caption: "" },
    ],
  },
  {
    id: 5,
    slug: "shower-gel-aromatherapy",
    name: "Shower Gel Aromatherapy",
    category: "Personal Care",
    categorySlug: "personal-care",
    image: "/images/prod-05-shower-gel-aromatherapy.jpg",
    description: "Aromatherapy shower gel, 30ml. POM-certified, produced locally in Bali.",
    gallery: [
      // { src: "/images/shower-gel-aromatherapy-1.jpg", caption: "" },
    ],
  },
  {
    id: 6,
    slug: "body-lotion-aromatherapy",
    name: "Body Lotion Aromatherapy",
    category: "Personal Care",
    categorySlug: "personal-care",
    image: "/images/prod-06-body-lotion-aromatherapy.jpg",
    description: "Moisturising body lotion with aromatherapy, 30ml. POM-certified, Bungan Jepun Bali.",
    gallery: [
      // { src: "/images/body-lotion-aromatherapy-1.jpg", caption: "" },
    ],
  },
  {
    id: 7,
    slug: "body-lotion-classic",
    name: "Body Lotion Classic",
    category: "Personal Care",
    categorySlug: "personal-care",
    image: "/images/prod-07-body-lotion-classic.jpg",
    description: "Body lotion classic with green tea, 25ml. Smooth and hydrating for daily use.",
    gallery: [
      // { src: "/images/body-lotion-classic-1.jpg", caption: "" },
    ],
  },
  {
    id: 8,
    slug: "bath-foam",
    name: "Bath Foam",
    category: "Personal Care",
    categorySlug: "personal-care",
    image: "/images/prod-08-bath-foam.jpg",
    description: "Luxury bath foam in elegant blue bottle, 25ml. Fragrant and skin-friendly.",
    gallery: [
      // { src: "/images/bath-foam-1.jpg", caption: "" },
    ],
  },
  {
    id: 9,
    slug: "liquid-soap",
    name: "Liquid Soap",
    category: "Personal Care",
    categorySlug: "personal-care",
    image: "/images/prod-09-liquid-soap.jpg",
    description: "Gentle liquid soap in premium bottle, 25ml. POM-certified, made in Indonesia.",
    gallery: [
      // { src: "/images/liquid-soap-1.jpg", caption: "" },
    ],
  },
  {
    id: 10,
    slug: "bar-soap",
    name: "Bar Soap",
    category: "Personal Care",
    categorySlug: "personal-care",
    image: "/images/prod-10-bar-soap.jpg",
    description: "Wrapped bar soap 15gr, HALAL-certified. Classic hotel presentation.",
    gallery: [
      // { src: "/images/bar-soap-1.jpg", caption: "" },
    ],
  },
  {
    id: 11,
    slug: "hotel-soap",
    name: "Hotel Soap",
    category: "Personal Care",
    categorySlug: "personal-care",
    image: "/images/prod-11-hotel-soap.jpg",
    description: "Hotel soap bar 25gr, premium pleated wrap. HALAL-certified, elegant finish.",
    gallery: [
      // { src: "/images/hotel-soap-1.jpg", caption: "" },
    ],
  },
  {
    id: 12,
    slug: "bath-towel",
    name: "Bath Towel",
    category: "Comfort Items",
    categorySlug: "comfort-items",
    image: "/images/prod-12-bath-towel.jpg",
    description: "600 GSM 100% cotton bath towels with hotel-grade absorbency and durability.",
    gallery: [
      // { src: "/images/bath-towel-1.jpg", caption: "" },
    ],
  },
  {
    id: 13,
    slug: "bathrobe",
    name: "Bathrobe",
    category: "Comfort Items",
    categorySlug: "comfort-items",
    image: "/images/prod-13-bathrobe.jpg",
    description: "Ultra-soft 100% cotton terry bathrobe. Custom embroidery available.",
    gallery: [
      // { src: "/images/bathrobe-1.jpg", caption: "" },
    ],
  },
  {
    id: 14,
    slug: "hotel-slippers",
    name: "Hotel Slippers",
    category: "Comfort Items",
    categorySlug: "comfort-items",
    image: "/images/prod-14-hotel-slippers.jpg",
    description: "Closed-toe or open-toe slippers with non-slip sole, elegant and durable.",
    gallery: [
      // { src: "/images/hotel-slippers-1.jpg", caption: "" },
    ],
  },
  {
    id: 15,
    slug: "cotton-buds",
    name: "Cotton Buds",
    category: "Convenience Goods",
    categorySlug: "convenience-goods",
    image: "/images/prod-15-cotton-buds.jpg",
    description: "100% pure cotton buds, safely designed and individually sealed.",
    gallery: [
      // { src: "/images/cotton-buds-1.jpg", caption: "" },
    ],
  },
  {
    id: 16,
    slug: "shower-cap",
    name: "Shower Cap",
    category: "Convenience Goods",
    categorySlug: "convenience-goods",
    image: "/images/prod-16-shower-cap.jpg",
    description: "Waterproof PE shower cap, individually wrapped in elegant packaging.",
    gallery: [
      // { src: "/images/shower-cap-1.jpg", caption: "" },
    ],
  },
  {
    id: 17,
    slug: "eco-bamboo-kit",
    name: "Eco Bamboo Kit",
    category: "Eco-Friendly",
    categorySlug: "eco-friendly",
    image: "/images/prod-17-eco-bamboo-kit.jpg",
    description: "Bamboo toothbrush + biodegradable packaging — the sustainable amenity guests love.",
    gallery: [
      // { src: "/images/eco-bamboo-kit-1.jpg", caption: "" },
    ],
  },
];

export const WHY_ITEMS = [
  { title: "Local Expertise",          desc: "Deeply rooted in Bali's hospitality industry, we understand what hotels and resorts truly need to impress their guests." },
  { title: "Clever Innovation",        desc: "We continuously develop new amenity solutions — from refillable dispenser systems to eco packaging — staying ahead of industry trends." },
  { title: "Exceptional Service",      desc: "Dedicated account managers, flexible MOQ, fast delivery across Bali and all of Indonesia. Your deadlines are our priority." },
  { title: "Sustainable Commitment",   desc: "We offer a full eco-friendly product line and partner with manufacturers who share our commitment to environmental responsibility." },
  { title: "Quality Assurance",        desc: "Every product is quality-checked before delivery. We supply 5-star resorts, boutique hotels, and villa complexes across Bali." },
  { title: "Trusted Partnership",      desc: "We build long-term relationships — not just transactions. Our clients return because we genuinely care about their success." },
];

export const GALLERY_PHOTOS = [
  "/images/prod-02-shampoo-aromatherapy.jpg",
  "/images/prod-08-bath-foam.jpg",
  "/images/prod-03-hair-conditioner.jpg",
  "/images/prod-07-body-lotion-classic.jpg",
];

export const CONTACT_INFO = [
  { label: "Phone",   value: "+62 8810 3736 6555",                                         href: "tel:+62881037366555" },
  { label: "Email",   value: "kawanbaik.bali@gmail.com",                                   href: "mailto:kawanbaik.bali@gmail.com" },
  { label: "Website", value: "www.kawanbaikbali.com",                                       href: "https://kawanbaikbali.com" },
  { label: "Address", value: "Blk. A3 No.31, Kerobokan Kaja, Kec. Kuta Utara, Kabupaten Badung, Bali 80361", href: "#" },
];