import type { MetadataRoute } from "next";
export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots {
  const url = process.env.NEXT_PUBLIC_SITE_URL;
  return {
    rules: { userAgent: "*", ...(url ? { allow: "/" } : { disallow: "/" }) },
    ...(url ? { sitemap: `${url}/sitemap.xml` } : {}),
  };
}
