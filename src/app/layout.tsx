import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { Suspense } from "react";

import { Concierge } from "@/components/concierge";
import { HeaderShell, SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { site } from "@/content/site";
import { defaultOgImage, openGraphBase } from "./shared-metadata";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "INEXOR — Bespoke Luxury Furniture, Indore",
    template: "%s · INEXOR",
  },
  description: site.description,
  openGraph: {
    ...openGraphBase,
    title: "INEXOR — Bespoke Luxury Furniture, Indore",
    description: site.description,
    images: [defaultOgImage],
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f3ec",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" data-scroll-behavior="smooth" className={`${cormorant.variable} ${manrope.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-50 bg-espresso px-5 py-3 text-ivory focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Suspense fallback={<HeaderShell />}>
          <SiteHeader />
        </Suspense>
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        {/* The AI concierge appears only when an API key is configured at build time */}
        {process.env.ANTHROPIC_API_KEY && <Concierge />}
      </body>
    </html>
  );
}
