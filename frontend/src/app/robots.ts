import type { MetadataRoute } from "next";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://example.com").replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/"],
      disallow: [
        "/admin",
        "/admin/",
        "/api/",
        "/checkout",
        "/profile",
        "/profile/",
        "/cart",
        "/login",
        "/register",
        "/*?sort=",
        "/*?page=",
        "/*?minPrice=",
        "/*?maxPrice=",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
