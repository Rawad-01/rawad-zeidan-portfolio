import type { MetadataRoute } from "next";
import { getSiteConfiguration } from "@/lib/site-config";
import { projects } from "@/data/content";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const { siteUrl: url, isIndexable } = getSiteConfiguration();
  return url && isIndexable
    ? [
        { url: `${url}/` },
        ...projects.map((p) => ({ url: `${url}/work/${p.slug}/` })),
      ]
    : [];
}
