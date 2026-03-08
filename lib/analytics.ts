// Type-safe analytics event tracking utility
// Gracefully no-ops when GA is not loaded

type GTagEvent = {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  [key: string]: string | number | boolean | undefined;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(
  eventName: string,
  parameters?: Record<string, string | number | boolean>
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, parameters);
  }
}

// Pre-defined event helpers
export function trackContactFormSubmit(subject: string) {
  trackEvent("contact_form_submit", {
    event_category: "engagement",
    event_label: subject,
  });
}

export function trackNewsletterSignup() {
  trackEvent("newsletter_signup", {
    event_category: "engagement",
  });
}

export function trackProductView(productName: string) {
  trackEvent("product_view", {
    event_category: "products",
    event_label: productName,
  });
}

export function trackServiceView(serviceName: string) {
  trackEvent("service_view", {
    event_category: "services",
    event_label: serviceName,
  });
}

export function trackBlogPostView(slug: string, category: string) {
  trackEvent("blog_post_view", {
    event_category: "content",
    event_label: slug,
    content_category: category,
  });
}

export function trackCTAClick(location: string, destination: string) {
  trackEvent("cta_click", {
    event_category: "engagement",
    event_label: location,
    destination: destination,
  });
}

export function trackSearchQuery(query: string) {
  trackEvent("search", {
    search_term: query,
  });
}

export function trackLanguageSwitch(fromLocale: string, toLocale: string) {
  trackEvent("language_switch", {
    event_category: "navigation",
    from_locale: fromLocale,
    to_locale: toLocale,
  });
}

export function trackDemoRequest(product: string) {
  trackEvent("demo_request", {
    event_category: "conversion",
    event_label: product,
  });
}
