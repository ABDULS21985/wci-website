import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // Required for next-intl with Turbopack in Next.js 16
  // See: https://www.buildwithmatija.com/blog/fix-nextintl-turbopack-error
  turbopack: {},
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Redirect /blog/* to /blogs/* (singular to plural)
      {
        source: "/blog/:slug",
        destination: "/blogs/:slug",
        permanent: true,
      },
      {
        source: "/blog",
        destination: "/blogs",
        permanent: true,
      },
      // Redirect with locale prefix
      {
        source: "/:locale/blog/:slug",
        destination: "/:locale/blogs/:slug",
        permanent: true,
      },
      {
        source: "/:locale/blog",
        destination: "/:locale/blogs",
        permanent: true,
      },
    ];
  },
  output: "standalone",
};

export default withNextIntl(nextConfig);
