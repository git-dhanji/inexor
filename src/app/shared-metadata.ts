import type { Metadata } from "next";

import og from "@/assets/images/og.jpg";

/*
 * Metadata objects merge shallowly between segments, so a page that sets its
 * own `openGraph` must spread this base to keep the shared fields.
 */
export const openGraphBase = {
  type: "website",
  siteName: "INEXOR",
  locale: "en_IN",
} satisfies Metadata["openGraph"];

export const defaultOgImage = {
  url: og.src,
  width: og.width,
  height: og.height,
  alt: "INEXOR — bespoke luxury furniture, Indore",
};
