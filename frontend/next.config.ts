import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    optimizePackageImports: [
      "@hookform/resolvers",
      "@radix-ui/react-label",
      "@radix-ui/react-popover",
      "@radix-ui/react-separator",
      "@radix-ui/react-slot",
      "class-variance-authority",
      "clsx",
      "date-fns",
      "dayjs",
      "embla-carousel-react",
      "framer-motion",
      "ky",
      "lucide-react",
      "next",
      "next-intl",
      "next-themes",
      "react",
      "react-day-picker",
      "react-dom",
      "react-hook-form",
      "react-responsive",
      "react-scroll-parallax",
      "simple-parallax-js",
      "sonner",
      "tailwind-merge",
      "tw-animate-css",
      "zod"
    ]
  },
  headers: async () => {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Developed-By",
            value: "IT 911",
          },
        ],
      },

    ];
  },
  logging: {
    fetches: {
      fullUrl: true,
      hmrRefreshes: true,
    },
  },
  poweredByHeader: false,
  typedRoutes: true,
  output: "standalone",
  images: {
    qualities: [75, 100],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
