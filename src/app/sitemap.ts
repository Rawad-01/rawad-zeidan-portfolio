import type { MetadataRoute } from "next";
import { projects } from "@/data/content";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const url = process.env.NEXT_PUBLIC_SITE_URL;
  return url
    ? [
        { url: `${url}/` },
        ...projects.map((p) => ({ url: `${url}/work/${p.slug}/` })),
      ]
    : [];
}
