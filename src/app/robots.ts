import { MetadataRoute } from "next";

const BASE_URL = "https://waldlab.kr";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/logo-test/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
