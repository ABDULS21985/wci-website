"use client";

import { useReportWebVitals } from "next/web-vitals";

export function WebVitals() {
  useReportWebVitals((metric) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "web_vitals", {
        event_category: "Web Vitals",
        event_label: metric.name,
        value: Math.round(
          metric.name === "CLS" ? metric.value * 1000 : metric.value
        ),
        metric_id: metric.id,
        metric_name: metric.name,
        metric_value: metric.value,
        metric_delta: metric.delta,
        non_interaction: true,
      });
    }
  });

  return null;
}
