# Film viewing copies

The two local masters are owned creative works supplied by Rawad Zeidan. This repository contains real poster frames and descriptive credits, not the large film binaries.

## Available media

| Film ID | Proposed title | Local viewing-copy path | Source duration |
| --- | --- | --- | --- |
| `boukra` | The Shape of Tomorrow | `public/media/boukra.mp4` | Approximately 8:57 |
| `oman` | Oman, in Motion | `public/media/oman.mp4` | Approximately 2:12 |

Both originals are landscape 16:9. The prepared web copies are 1280x720 H.264/AAC. The large Boukra original was reduced from 913,363,222 bytes to 104,183,674 bytes; Oman retains its compact 35,237,471-byte streams. Masters remain untouched outside this repository.

The local portfolio workspace retains both complete viewing copies. To reproduce playback elsewhere, copy those files into the paths above or provide approved direct HTTPS media URLs using the environment variables documented in `.env.example`. No account credentials or signed service secrets belong in the client data. Values passed to the page become public.

## Missing-file behavior

At build time the server component checks local file availability. A missing film renders a real poster and an email viewing-request action. The gallery does not mount a video until a visitor deliberately opens an available film. External HTTPS URLs are owner-configured; availability and delivery rights must be verified before deploying them. No URL is tested or published automatically.

## Updating entries

`src/data/content.ts` defines each film's `title`, `workingTitle`, `description`, `poster`, `posterAlt`, `duration`, `width`, `height` and source. The image and player ratio follow those dimensions. Set `mime` to `video/webm` when appropriate; otherwise MP4 is used or inferred from the source extension.

Add reviewed captions as:

```ts
captions: [
  {src: "/captions/film.en.vtt", language: "en", label: "English"}
],
transcript: "/transcripts/film.html"
```

Create the actual files before adding the paths. Do not supply empty or machine-invented captions just to satisfy a checker. Review timing, names, meaningful sound descriptions and language. Assess audio-description needs separately.

The dialog offers native controls, keyboard Escape, focus restoration, inline mobile playback and no autoplay. Only one film can be active. Captions and transcripts are not yet supplied; the viewer discloses that limitation.

## Before release

Confirm the proposed titles, review the full soundtracks and any third-party audio rights, supply accessible text alternatives, select hosting with suitable file-size/bandwidth support, and verify seeking and playback on the actual deployment. No hosting or public distribution is authorized by this documentation.
