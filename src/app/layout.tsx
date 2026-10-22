import type { Metadata } from "next";
import { getSiteConfiguration } from "@/lib/site-config";
import "@fontsource-variable/manrope";
import "@fontsource/instrument-serif/latin-400-italic.css";
import "./globals.css";
const { siteUrl, isIndexable } = getSiteConfiguration();
export const metadata: Metadata = {
  title: {
    default: "Rawad Zeidan — Systems × Stories",
    template: "%s | Rawad Zeidan",
  },
  description:
    "Software Developer & Creative Technologist based in Lebanon. Explore selected software projects, API and QA experience, and original AI-generated films.",
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  authors: [{ name: "Rawad Zeidan" }],
  openGraph: {
    title: "Rawad Zeidan — Systems × Stories",
    description: "I build the systems. I create the stories.",
    type: "website",
    locale: "en_US",
    ...(siteUrl
      ? {
          url: siteUrl,
          images: [
            {
              url: "/social-card.png",
              width: 1200,
              height: 630,
              alt: "Rawad Zeidan — Systems × Stories",
            },
          ],
        }
      : {}),
  },
  twitter: {
    card: "summary_large_image",
    ...(siteUrl ? { images: [`${siteUrl}/social-card.png`] } : {}),
    title: "Rawad Zeidan — Systems × Stories",
    description: "Software Developer & Creative Technologist",
  },
  robots: { index: isIndexable, follow: isIndexable },
  icons: { icon: "/icon.svg" },
  ...(siteUrl ? { alternates: { canonical: siteUrl } } : {}),
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
