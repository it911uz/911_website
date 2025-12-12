import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  logging: {
    fetches: {
      fullUrl: true,
      hmrRefreshes: true,
    },
  },

  poweredByHeader: false,
  typedRoutes: true,
  output: "standalone",

  transpilePackages: ["@t3-oss/env-nextjs", "@t3-oss/env-core"],

  images: {
    qualities: [75, 100]
  },

  reactCompiler: true,

  experimental: {
    inlineCss: true,
    dynamicOnHover: true,
    turbopackFileSystemCacheForDev: true,
    optimizePackageImports: [
      "@dnd-kit/core",
      "@dnd-kit/modifiers",
      "@dnd-kit/sortable",
      "@dnd-kit/utilities",
      "@hookform/resolvers",
      "@next/third-parties",
      "@radix-ui/react-accordion",
      "@radix-ui/react-alert-dialog",
      "@radix-ui/react-avatar",
      "@radix-ui/react-checkbox",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-label",
      "@radix-ui/react-popover",
      "@radix-ui/react-select",
      "@radix-ui/react-separator",
      "@radix-ui/react-slot",
      "@radix-ui/react-tabs",
      "@radix-ui/react-tooltip",
      "@t3-oss/env-core",
      "@t3-oss/env-nextjs",
      "@tanstack/react-query",
      "@tanstack/react-query-devtools",
      "apexcharts",
      "class-variance-authority",
      "clsx",
      "date-fns",
      "dayjs",
      "embla-carousel-react",
      "framer-motion",
      "input-otp",
      "ky",
      "lucide-react",
      "next-auth",
      "next-intl",
      "next-themes",
      "nuqs",
      "react-apexcharts",
      "react-day-picker",
      "react-headless-pagination",
      "react-hook-form",
      "react-responsive",
      "react-scroll-parallax",
      "react-select",
      "simple-parallax-js",
      "sonner",
      "suneditor",
      "suneditor-react",
      "tailwind-merge",
      "tw-animate-css",
      "zod"
    ],
  },

  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Developed-By", value: "IT 911" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        {
          key: "Permissions-Policy",
          value: "camera=(), microphone=(), geolocation=(), interest-cohort=()"
        },
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload"
        },
        {
          key: "Content-Security-Policy",
          value: `
            default-src 'self';
            script-src 'self' 'unsafe-inline' 'unsafe-eval' https:;
            style-src 'self' 'unsafe-inline' https:;
            img-src 'self' blob: data: https:;
            font-src 'self' https:;
            connect-src 'self' https:;
            frame-ancestors 'none';
          `.replace(/\n/g, "")
        }
      ],
    },
    {
      source: "/:path*{/}?",
      headers: [
        { key: "X-Accel-Buffering", value: "no" },
        { key: "Cache-Control", value: "no-store" }
      ],
    }
  ],
};

const withNextIntl = createNextIntlPlugin({
  experimental: {
    createMessagesDeclaration: "./messages/ru.json",
  },
});

export default withNextIntl(nextConfig);
