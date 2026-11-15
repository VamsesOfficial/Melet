/**
 * prerender.mjs
 * Run AFTER `vite build` to inject static SEO snapshots for each route,
 * including all product categories and individual product detail pages.
 * Usage: node prerender.mjs
 */

import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { PRODUCT_CATEGORIES, PRODUCTS } from "./src/data/index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, "dist");
const htmlPath = resolve(distDir, "index.html");
const baseHtml = readFileSync(htmlPath, "utf-8");

const STATIC_ROUTES = [
  {
    path: "/",
    outFile: "index.html",
    title: "Hotel Amenities Supplier Bali — Pabrik & Distributor Perlengkapan Hotel | PT Kawan Baik Bali",
    description:
      "PT Kawan Baik Bali adalah Hotel Amenities Supplier di Bali. Menyediakan toiletries, sabun & shampoo hotel, sandal hotel, handuk, linen, dental kit, dan eco-friendly amenities custom logo untuk hotel, resort & villa.",
    canonical: "https://www.kawanbaikbali.com/",
    body: `
      <h1>Hotel Amenities Supplier Bali — PT Kawan Baik Bali</h1>
      <p>Mitra penyedia dan distribusi perlengkapan kamar hotel, resort, villa, dan spa di Bali dengan layanan custom logo (OEM) dan pengiriman dari gudang Kerobokan Kaja, Badung.</p>
    `,
  },
  {
    path: "/products",
    outFile: "products/index.html",
    title: "Katalog Produk Hotel Amenities Supplier Bali | PT Kawan Baik Bali",
    description:
      "Katalog lengkap perlengkapan hotel, resort, dan villa di Bali: personal care, sandal hotel, dry amenities, eco-friendly bamboo amenities, handuk & linen hotel, serta payung golf custom.",
    canonical: "https://www.kawanbaikbali.com/products",
    body: `
      <h1>Katalog Produk Hotel Amenities — Supplier Bali</h1>
      <ul>
        ${PRODUCT_CATEGORIES.map(
          (c) => `<li><a href="/products/${c.slug}">${c.name}</a> — ${c.description}</li>`
        ).join("\n        ")}
      </ul>
    `,
  },
  {
    path: "/rfq",
    outFile: "rfq/index.html",
    title: "Request for Quotation (RFQ) — Penawaran Harga B2B Hotel Amenities Bali | PT Kawan Baik Bali",
    description:
      "Formulir permintaan penawaran harga (RFQ) resmi untuk pengadaan perlengkapan hotel, resort, dan villa di Bali. Dapatkan harga grosir, opsi custom logo, dan sampel produk.",
    canonical: "https://www.kawanbaikbali.com/rfq",
    body: `
      <h1>Request for Quotation (RFQ) — Hotel Amenities Supplier Bali</h1>
      <p>Susun daftar kebutuhan perlengkapan kamar hotel, resort, dan villa Anda di Bali untuk mendapatkan penawaran harga grosir B2B.</p>
    `,
  },
  {
    path: "/about",
    outFile: "about/index.html",
    title: "Profil Perusahaan — PT Kawan Baik Bali | Hotel Amenities Supplier Bali",
    description:
      "Profil perusahaan PT Kawan Baik Bali. Mitra penyedia perlengkapan kamar hotel, resort, villa, dan spa di Bali yang berpusat di Kerobokan Kaja, Badung.",
    canonical: "https://www.kawanbaikbali.com/about",
    body: `
      <h1>Tentang PT Kawan Baik Bali — Hotel Amenities Supplier Bali</h1>
      <p>Berkantor dan bergudang di Kerobokan Kaja, Kuta Utara, Badung, Bali, PT Kawan Baik Bali melayani pengadaan perlengkapan kamar tamu untuk hotel, resort, dan manajemen villa.</p>
    `,
  },
  {
    path: "/clients",
    outFile: "clients/index.html",
    title: "Portofolio Klien Hotel & Resort — PT Kawan Baik Bali | Hotel Amenities Supplier Bali",
    description:
      "Daftar hotel, resort, dan villa di Bali yang mempercayakan pengadaan perlengkapan kamar tamu (hotel amenities) kepada PT Kawan Baik Bali.",
    canonical: "https://www.kawanbaikbali.com/clients",
    body: `
      <h1>Portofolio Klien Hotel, Resort & Villa PT Kawan Baik Bali</h1>
      <p>Mitra pengadaan untuk berbagai hotel, resort, dan villa di Seminyak, Canggu, Legian, Ubud, Nusa Dua, hingga Buleleng.</p>
    `,
  },
  {
    path: "/contact",
    outFile: "contact/index.html",
    title: "Hubungi Kami — Kantor & Gudang Hotel Amenities Kerobokan Bali | PT Kawan Baik Bali",
    description:
      "Hubungi tim B2B PT Kawan Baik Bali di Blk. A3 No.31, Kerobokan Kaja, Kuta Utara, Badung, Bali. WhatsApp: +62 8810-3736-6555.",
    canonical: "https://www.kawanbaikbali.com/contact",
    body: `
      <h1>Hubungi PT Kawan Baik Bali</h1>
      <address>
        <p>Blk. A3 No.31, Kerobokan Kaja, Kec. Kuta Utara, Kabupaten Badung, Bali 80361</p>
        <p>Telp / WhatsApp: +62 8810-3736-6555</p>
        <p>Email: kawanbaik.bali@gmail.com</p>
      </address>
    `,
  },
];

const CATEGORY_ROUTES = PRODUCT_CATEGORIES.map((cat) => ({
  path: `/products/${cat.slug}`,
  outFile: `products/${cat.slug}/index.html`,
  title: cat.seo?.title || `${cat.name} | Hotel Amenities Supplier Bali | PT Kawan Baik Bali`,
  description: cat.seo?.description || cat.description,
  canonical: `https://www.kawanbaikbali.com/products/${cat.slug}`,
  body: `
    <h1>${cat.name} — Hotel Amenities Supplier Bali</h1>
    <p>${cat.description}</p>
  `,
}));

const PRODUCT_ROUTES = PRODUCTS.map((prod) => ({
  path: `/products/detail/${prod.slug}`,
  outFile: `products/detail/${prod.slug}/index.html`,
  title: `${prod.name} | Hotel Amenities Supplier Bali | PT Kawan Baik Bali`,
  description: `${prod.description} Supplier perlengkapan hotel, resort & villa di Bali.`,
  canonical: `https://www.kawanbaikbali.com/products/detail/${prod.slug}`,
  body: `
    <h1>${prod.name}</h1>
    <p>${prod.description}</p>
    <p>Category: ${prod.category} | MOQ: ${prod.specs?.moq || "Flexible"}</p>
  `,
}));

const ROUTES = [...STATIC_ROUTES, ...CATEGORY_ROUTES, ...PRODUCT_ROUTES];

let successCount = 0;

for (const route of ROUTES) {
  let html = baseHtml;

  html = html.replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`);

  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${route.description}" />`
  );

  html = html.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${route.canonical}" />`
  );

  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${route.title}" />`
  );

  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${route.description}" />`
  );

  const seoFallback = `
<div style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap" aria-hidden="true">
  <nav>
    <a href="/">Home</a>
    <a href="/products">Products</a>
    <a href="/rfq">Request Quote (RFQ)</a>
    <a href="/about">About Us</a>
    <a href="/clients">Clients</a>
    <a href="/contact">Contact</a>
  </nav>
  ${route.body}
  <footer>
    <p>© ${new Date().getFullYear()} PT Kawan Baik Bali. Hotel Amenities Supplier Bali, Indonesia.</p>
    <address>Blk. A3 No.31, Kerobokan Kaja, Kec. Kuta Utara, Kabupaten Badung, Bali 80361 | WhatsApp: +62 8810-3736-6555 | Email: kawanbaik.bali@gmail.com</address>
  </footer>
</div>`;

  html = html.replace('<div id="root">', `<div id="root">${seoFallback}`);

  const outPath = resolve(distDir, route.outFile);
  const outDir = dirname(outPath);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(outPath, html, "utf-8");

  console.log(`✅ ${route.path} → dist/${route.outFile}`);
  successCount++;
}

console.log(`\n🎉 Prerender complete — ${successCount} SEO pages generated.`);
