/**
 * Google Analytics 4 (GA4) & Google Search Console helper utility.
 *
 * Configure via environment variables in `.env`:
 *   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
 *   VITE_GSC_VERIFICATION=your_google_search_console_verification_token
 */

export const GA_MEASUREMENT_ID =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_GA_MEASUREMENT_ID) ||
  "G-KAWANBAIKBALI"; // Replace with actual GA4 Measurement ID in .env or index.html

export const GSC_VERIFICATION =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_GSC_VERIFICATION) ||
  "";

export function initAnalytics() {
  if (typeof window === "undefined") return;

  // Inject Google Search Console verification tag if configured via env
  if (GSC_VERIFICATION) {
    let gscMeta = document.querySelector('meta[name="google-site-verification"]');
    if (!gscMeta) {
      gscMeta = document.createElement("meta");
      gscMeta.setAttribute("name", "google-site-verification");
      document.head.appendChild(gscMeta);
    }
    gscMeta.setAttribute("content", GSC_VERIFICATION);
  }

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
  }

  // Only load external gtag script if a real Measurement ID is provided
  if (
    GA_MEASUREMENT_ID &&
    GA_MEASUREMENT_ID !== "G-KAWANBAIKBALI" &&
    !document.getElementById("ga4-script")
  ) {
    const script = document.createElement("script");
    script.id = "ga4-script";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);
    window.gtag("config", GA_MEASUREMENT_ID, {
      send_page_view: false, // Handled by SPA router listener
    });
  }
}

export function trackPageView(path, title) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag === "function") {
    window.gtag("event", "page_view", {
      page_path: path,
      page_title: title || document.title,
      page_location: window.location.href,
    });
  }
}

export function trackEvent(eventName, params = {}) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
}
