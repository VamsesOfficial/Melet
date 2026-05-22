import { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import { ScrollToTop } from "./components/ui";

import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import CategoryPage from "./pages/CategoryPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProductGalleryPage from "./pages/ProductGalleryPage";

function useDarkMode() {
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });
  return [dark, setDark];
}

function AppLayout({ dark, setDark }) {
  return (
    <div
      className="min-h-screen font-sans antialiased transition-colors duration-300"
      style={{
        fontFamily: "'Outfit', 'DM Sans', sans-serif",
        background: dark ? "#071526" : "#ffffff",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        html { scroll-behavior: smooth; }
        *, *::before, *::after { box-sizing: border-box; }
        body { margin: 0; overflow-x: hidden; }
        ::selection { background: #c9a84c; color: #fff; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: ${dark ? "#071526" : "#f0f0f0"}; }
        ::-webkit-scrollbar-thumb { background: ${dark ? "#c9a84c" : "#1a3a5c"}; border-radius: 10px; }
        img { transform: translateZ(0); }
      `}</style>

      <Header dark={dark} setDark={setDark} />

      <Routes>
        <Route path="/"                              element={<HomePage dark={dark} />} />
        <Route path="/products"                      element={<ProductsPage dark={dark} />} />
        <Route path="/products/:productSlug/gallery" element={<ProductGalleryPage dark={dark} />} />
        <Route path="/products/:slug"                element={<CategoryPage dark={dark} />} />
        <Route path="/about"                         element={<AboutPage dark={dark} />} />
        <Route path="/contact"                       element={<ContactPage dark={dark} />} />
        <Route path="*"                              element={<NotFoundPage dark={dark} />} />
      </Routes>

      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default function App() {
  const [dark, setDark] = useDarkMode();

  return (
    <BrowserRouter>
      <AppLayout dark={dark} setDark={setDark} />
    </BrowserRouter>
  );
}