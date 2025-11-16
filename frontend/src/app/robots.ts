import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: [
                    "/auth/",
                    "/auth/*",
                    "/admin/",
                    "/admin/*",
                ],
            },
        ],
        sitemap: "https://it911.uz/sitemap.xml",
        host: "https://it911.uz",
    };
}
