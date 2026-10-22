import assert from "node:assert/strict";
import { getSiteConfiguration } from "../src/lib/site-config.ts";

assert.deepEqual(getSiteConfiguration({}), {
  siteUrl: undefined,
  isIndexable: false,
});
assert.deepEqual(
  getSiteConfiguration({
    VERCEL_ENV: "production",
    VERCEL_PROJECT_PRODUCTION_URL: "portfolio.example",
  }),
  { siteUrl: "https://portfolio.example", isIndexable: true },
);
assert.deepEqual(
  getSiteConfiguration({
    VERCEL_ENV: "preview",
    VERCEL_PROJECT_PRODUCTION_URL: "portfolio.example",
  }),
  { siteUrl: "https://portfolio.example", isIndexable: false },
);
assert.deepEqual(
  getSiteConfiguration({
    VERCEL_ENV: "preview",
    NEXT_PUBLIC_SITE_URL: "https://custom.example/",
    VERCEL_PROJECT_PRODUCTION_URL: "portfolio.example",
  }),
  { siteUrl: "https://custom.example", isIndexable: false },
);
assert.deepEqual(
  getSiteConfiguration({ NEXT_PUBLIC_SITE_URL: "https://custom.example/" }),
  { siteUrl: "https://custom.example", isIndexable: true },
);
assert.equal(
  getSiteConfiguration({
    VERCEL_ENV: "development",
    NEXT_PUBLIC_SITE_URL: "https://custom.example",
  }).isIndexable,
  false,
);
for (const invalid of [
  "http://portfolio.example",
  "https://portfolio.example/path",
  "https://portfolio.example/?token=example",
  "https://portfolio.example/#section",
  "https://example:example@portfolio.example",
]) {
  assert.throws(() => getSiteConfiguration({ NEXT_PUBLIC_SITE_URL: invalid }));
}
console.log(
  "Metadata configuration checks passed: local defaults, production origin, custom override, preview/development noindex and invalid-origin rejection.",
);
