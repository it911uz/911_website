import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  reactStrictMode: true,
	logging: {
		fetches: {
			fullUrl: true,
		},
	},
	typedRoutes: true,
	output: "standalone",
	transpilePackages: ["@t3-oss/env-nextjs", "@t3-oss/env-core"],

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
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
