# Vercel deployment

Configured for Next.js static export, Node 24.x, `npm ci --ignore-scripts`, `npm run build`, and output directory `out`. The repository root is the project root. `vercel.json` supplies the build settings and basic response headers. No database, email service or application secret is needed.

## Connect and deploy

1. Sign in to your Vercel account and import `Rawad-01/rawad-zeidan-portfolio` from GitHub. Grant the Vercel GitHub integration access to this repository if requested.
2. Use the Next.js framework preset, repository root and `main` as the production branch. Retain the checked-in build/install/output settings and Node 24.x.
3. Start deployment. Vercel supplies the real production domain; no domain is guessed in this source.
4. Check the returned production URL, both case studies, posters, GitHub/email actions, robots, sitemap and social image. A prepared repository does not imply a deployed site.

Git integration enables future deployments from the repository. For CLI deployment, link the intended account/project first and connect the Git repository deliberately. Local `.vercel/` linkage is ignored by Git.

## Production metadata and previews

`src/lib/site-config.ts` uses an explicit `NEXT_PUBLIC_SITE_URL`, otherwise `https://` plus Vercel's real `VERCEL_PROJECT_PRODUCTION_URL`. Only an HTTPS origin is accepted: credentials, paths, queries and fragments are rejected.

Production builds enable indexing when an origin is available. Preview/development builds remain noindex, disallow crawling and emit an empty sitemap even when a production origin is known. Their canonical/social references point to production. Local builds without an origin remain noindex. Attach custom domains in Vercel before overriding the URL and rebuilding.

Run `npm run test:metadata`, `npm run build` and `npm run typecheck`. Browser validation is documented in the main README.

## Films

This repository contains real posters and credits. Large viewing files are excluded from Git and CLI source uploads. Until media URLs are configured, the hosted source-only gallery offers viewing-request email links, without broken play buttons.

To enable playback, configure `BOUKRA_VIDEO_URL` and `OMAN_VIDEO_URL` as approved public HTTPS MP4/WebM file URLs and redeploy. These values become public; do not include credentials or private service tokens. Watch-page URLs are not direct media files. Delivery must support the correct MIME type and byte ranges. Review storage/bandwidth and account billing before choosing a host; this configuration creates no paid media service.

See [media instructions](media.md) for titles, captions/transcripts and audio description. Both complete viewing copies remain in the local portfolio workspace.

## File boundaries

`.vercelignore` excludes local environments, generated output, reports, tools, credentials and large media from CLI uploads. Deploy from the clean portfolio repository, never the parent university workspace. Only `out/` is served as website content. Originals remain untouched.

Official references: [Git deployments](https://vercel.com/docs/deployments/git), [configuration](https://vercel.com/docs/project-configuration/vercel-json), [system variables](https://vercel.com/docs/environment-variables/system-environment-variables), [Node versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions).
