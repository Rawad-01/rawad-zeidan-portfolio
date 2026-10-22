import type { MetadataRoute } from "next";
import { getSiteConfiguration } from "@/lib/site-config";
export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots {
  const { siteUrl: url, isIndexable } = getSiteConfiguration();
  return {
    rules: {
      userAgent: "*",
      ...(isIndexable ? { allow: "/" } : { disallow: "/" }),
    },
    ...(isIndexable && url ? { sitemap: `${url}/sitemap.xml` } : {}),
  };
}
