import { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ScrollToTop } from "./components/ui";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import { RFQProvider } from "./context/RFQContext";
import { LanguageProvider } from "./context/LanguageContext";
import { RFQToast } from "./components/LanguageSelector";
import { initAnalytics, trackPageView } from "./utils/analytics";

const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const ProductGalleryPage = lazy(() => import("./pages/ProductGalleryPage"));
const RFQPage = lazy(() => import("./pages/RFQPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ClientsPage = lazy(() => import("./pages/ClientsPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));
const TermsOfServicePage = lazy(() => import("./pages/TermsOfServicePage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function PageLoader({ dark }) {
  return (
    <div
      className={`min-h-[60vh] flex items-center justify-center ${
        dark ? "bg-[#08111c]" : "bg-[#faf8f5]"
      }`}
    >
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-[#b58e4c]/30 border-t-[#b58e4c] animate-spin" />
        <span
          className={`text-xs font-medium tracking-wider uppercase ${
            dark ? "text-slate-400" : "text-slate-500"
          }`}
        >
          PT Kawan Baik Bali
        </span>
      </div>
    </div>
  );
}

function AppShell() {
  const [dark, setDark] = useState(false);
  const location = useLocation();

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    trackPageView(location.pathname + location.search, document.title);
  }, [location]);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        dark
          ? "dark bg-[#08111c] text-slate-100"
          : "bg-[#faf8f5] text-slate-800"
      }`}
    >
      <Header dark={dark} setDark={setDark} />

      <Suspense fallback={<PageLoader dark={dark} />}>
        <Routes>
          <Route path="/" element={<HomePage dark={dark} />} />
          <Route path="/products" element={<ProductsPage dark={dark} />} />
          <Route
            path="/products/detail/:productSlug"
            element={<ProductDetailPage dark={dark} />}
          />
          <Route
            path="/products/:slug/gallery"
            element={<ProductGalleryPage dark={dark} />}
          />
          <Route
            path="/products/:slug"
            element={<CategoryPage dark={dark} />}
          />
          <Route path="/rfq" element={<RFQPage dark={dark} />} />
          <Route path="/about" element={<AboutPage dark={dark} />} />
          <Route path="/clients" element={<ClientsPage dark={dark} />} />
          <Route path="/contact" element={<ContactPage dark={dark} />} />
          <Route
            path="/privacy-policy"
            element={<PrivacyPolicyPage dark={dark} />}
          />
          <Route
            path="/terms-of-service"
            element={<TermsOfServicePage dark={dark} />}
          />
          <Route path="*" element={<NotFoundPage dark={dark} />} />
        </Routes>
      </Suspense>

      <Footer dark={dark} />
      <RFQToast dark={dark} />
      <ScrollToTop />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <RFQProvider>
          <AppShell />
        </RFQProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}
