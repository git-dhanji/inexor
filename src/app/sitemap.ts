import type { MetadataRoute } from "next";

import { collections } from "@/content/collections";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/collections", "/bespoke", ...collections.map((collection) => `/collections/${collection.slug}`)];
  return paths.map((path) => ({ url: new URL(path, site.url).toString() }));
}
