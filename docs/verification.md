# Verification scope

Reviewed on 22 October 2026, using Windows, Node 24.14.0, npm 11.9.0 and installed Chrome through Playwright. These are measured local results, not a deployment or accessibility certification.

## Source-only candidate

- Fresh `npm ci --ignore-scripts` installation from the package lock passed.
- Production static build and strict `npm run typecheck` passed after the final case-study updates.
- Home and both case-study routes returned HTTP 200, contained one h1 each, and decoded their image elements.
- No horizontal overflow at home widths 320, 390, 768, 1024 and 1440px; both case studies also checked at 320 and 768px.
- Axe WCAG 2 A/AA and 2.1 AA scans reported zero violations in the three tested default page states. This does not cover missing film captions or all assistive-technology behavior.
- Systems/Stories works with keyboard and pointer; reduced motion disables the actual core transition; mobile navigation follows its anchor and closes.
- No MP4/WebM request occurred before film activation. With local films omitted, both genuine posters offer viewing-request email links and no broken play buttons.
- Local links/anchors resolve; both case studies link to the verified public source repositories. GitHub remote commit and tree hashes matched their reviewed local commits before these links were enabled.
- No browser page errors or console errors were recorded.
- `npm audit --json` reported zero known advisories at review time. Package scanning does not prove application security.

Evidence: [browser results](browser-checks.json), [dependency audit](dependency-audit.json), [desktop screenshot](images/portfolio-desktop.png), [mobile screenshot](images/portfolio-mobile.png). Screenshots show this application, not a fabricated mockup.

## Complete local media demonstration

The separate complete portfolio workspace retains the approved viewing derivatives and the media-enabled browser suite. Its local QA report records video metadata/playback, paused initial state, Escape dismissal and restored focus. Film binaries and private workspace audit reports are intentionally outside this source candidate. Follow [media setup](media.md) to reproduce media checks with the actual files; use `QA_MEDIA=1` only when both viewing copies are available.

## Remaining review

- Confirm final titles, full soundtrack rights, reviewed captions/transcripts and any required audio description. The player discloses missing text alternatives.
- Verify real iOS/Android devices, Safari/Firefox, screen readers, forced colors and actual zoom. Viewport emulation is not real-device testing.
- Test final hosting, HTTPS, media byte ranges, caching/security headers, bandwidth, public metadata and external viewing URLs after an approved deployment. Default local output is noindex.
- No Lighthouse score, production Core Web Vitals, load test, penetration test or broad security certification is claimed.
- Rawad confirmed permission to share selected code and figures. Exact academic contributions and a code-license decision remain open. Case studies distinguish original implementation from separately prepared validation and hardening.

## Publication link check

After the two engineering repositories were published, both portfolio builds passed again and the source-only candidate passed strict TypeScript and the browser suite. Each case-study source action was checked against its exact verified GitHub URL. This check was completed before the portfolio source commit. The film-player implementation was unchanged from the prior complete-media validation. Website deployment remains separate.
