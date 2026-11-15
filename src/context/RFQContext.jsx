import { createContext, useContext, useState, useEffect } from "react";
import { trackEvent } from "../utils/analytics";

const RFQContext = createContext(null);

const STORAGE_KEY = "kbb_rfq_items_v1";

export function RFQProvider({ children }) {
  const [items, setItems] = useState(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [toast, setToast] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore storage errors
    }
  }, [items]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => {
      setToast((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const addItem = (product, quantity = 500, branding = "custom", notes = "") => {
    setItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.slug === product.slug);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: Number(updated[existingIndex].quantity || 0) + Number(quantity || 100),
          branding: branding || updated[existingIndex].branding,
          notes: notes || updated[existingIndex].notes,
        };
        return updated;
      }
      return [
        ...prev,
        {
          id: product.id,
          slug: product.slug,
          name: product.name,
          category: product.category,
          categorySlug: product.categorySlug,
          image: product.image,
          quantity: Number(quantity) || 500,
          unit: product.defaultUnit || "pcs",
          branding: branding || "custom",
          notes: notes || "",
        },
      ];
    });

    trackEvent("add_to_rfq", {
      item_id: product.slug,
      item_name: product.name,
      item_category: product.category,
      quantity,
    });

    showToast(product.name);
  };

  const updateItem = (slug, updates) => {
    setItems((prev) =>
      prev.map((item) => (item.slug === slug ? { ...item, ...updates } : item))
    );
  };

  const removeItem = (slug) => {
    setItems((prev) => prev.filter((item) => item.slug !== slug));
  };

  const clearItems = () => {
    setItems([]);
  };

  const isInRFQ = (slug) => items.some((item) => item.slug === slug);

  return (
    <RFQContext.Provider
      value={{
        items,
        totalItems: items.length,
        addItem,
        updateItem,
        removeItem,
        clearItems,
        isInRFQ,
        toast,
        setToast,
      }}
    >
      {children}
    </RFQContext.Provider>
  );
}

export function useRFQ() {
  const ctx = useContext(RFQContext);
  if (!ctx) {
    throw new Error("useRFQ must be used within an RFQProvider");
  }
  return ctx;
}
