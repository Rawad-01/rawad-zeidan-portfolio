/** Production metadata uses the confirmed origin; previews remain unindexable. */
export function getSiteConfiguration(
  environment: NodeJS.ProcessEnv = process.env,
) {
  const configured = environment.NEXT_PUBLIC_SITE_URL?.trim();
  const productionHost = environment.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  const candidate =
    configured || (productionHost ? `https://${productionHost}` : undefined);
  if (!candidate) return { siteUrl: undefined, isIndexable: false };

  const url = new URL(candidate);
  if (
    url.protocol !== "https:" ||
    url.username ||
    url.password ||
    url.pathname !== "/" ||
    url.search ||
    url.hash
  ) {
    throw new Error(
      "Site URL must be an HTTPS origin without credentials, path, query or fragment.",
    );
  }
  return {
    siteUrl: url.origin,
    isIndexable:
      !environment.VERCEL_ENV || environment.VERCEL_ENV === "production",
  };
}
