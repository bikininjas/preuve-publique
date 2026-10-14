import type { NextConfig } from "next";

const DOSSIER_CACHE = "public, s-maxage=3600, stale-while-revalidate=86400";
const SHARE_IMAGE_CACHE = "public, s-maxage=86400, stale-while-revalidate=604800";

const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
];

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  reactStrictMode: true,
  async headers() {
    return [
      { source: "/:path*", headers: SECURITY_HEADERS },
      {
        source: "/dossiers/:slug",
        headers: [{ key: "Cache-Control", value: DOSSIER_CACHE }],
      },
      {
        source: "/dossiers/:slug/opengraph-image",
        headers: [{ key: "Cache-Control", value: SHARE_IMAGE_CACHE }],
      },
    ];
  },
};

export default nextConfig;
