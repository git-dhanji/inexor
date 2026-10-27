import type { StaticImageData } from "next/image";

import comfy from "@/assets/images/comfy.jpg";
import curio from "@/assets/images/curio.jpg";
import dreamin from "@/assets/images/dreamin.jpg";
import dune01 from "@/assets/images/dune-01.jpg";
import dune02 from "@/assets/images/dune-02.jpg";
import dune03 from "@/assets/images/dune-03.jpg";
import dune04 from "@/assets/images/dune-04.jpg";
import elysian from "@/assets/images/elysian.jpg";
import orb from "@/assets/images/orb.jpg";

export type CollectionImage = {
  src: StaticImageData;
  alt: string;
  /** CSS object-position used when the image is cropped. */
  position?: string;
};

export type Collection = {
  slug: string;
  name: string;
  category: string;
  /** One line, used on cards. Verified wording only. */
  summary: string;
  story?: string[];
  attributes?: string[];
  /** Options discussed in consultation; only those that apply to this furniture type. */
  customisation: string[];
  images: CollectionImage[];
};

/*
 * Collections from the official inexor.in navigation. LAIR (dining tables) is
 * intentionally excluded: /lair-collection/ currently shows DUNE content.
 *
 * All photographs are PLACEHOLDERS from Unsplash (see IMAGE_CREDITS.md) and do
 * not depict INEXOR products. Replace them with approved INEXOR photography.
 */
export const collections: Collection[] = [
  {
    slug: "dune",
    name: "DUNE",
    category: "Sofa Collection",
    summary: "Contemporary sofas with sculptural curves, clean lines and plush upholstery.",
    story: [
      "DUNE brings contemporary design and classic elegance together. Clean, minimalist lines meet sculptural curves, finished in sumptuous upholstery.",
      "Each sofa is shaped for ergonomic comfort and made to order, with custom upholstery and modular options so it fits your space and the way you live.",
    ],
    attributes: [
      "Sculptural curves",
      "Clean, minimalist lines",
      "Plush upholstery",
      "Ergonomic comfort",
      "Modular options",
    ],
    customisation: ["Dimensions", "Upholstery fabric", "Colour palette", "Finishes", "Modular configuration", "Design accents"],
    images: [
      { src: dune01, alt: "Tan leather three-seat sofa with slim tapered legs against a white wall", position: "50% 60%" },
      { src: dune02, alt: "Sunlit living room with a tan leather sofa, white armchairs and a round coffee table" },
      { src: dune03, alt: "Ivory sofa with textured cushions beside tall windows" },
      { src: dune04, alt: "Curved green velvet sofa in a room with white panelled walls" },
    ],
  },
  {
    slug: "curio",
    name: "CURIO",
    category: "Chair Collection",
    summary: "Sculptural, artisanal chairs that pair contemporary form with comfort.",
    story: [
      "CURIO merges contemporary, sculptural design with comfort. Its chairs include desk seating designed for long hours, with back support, elegant curves and premium finishes.",
    ],
    attributes: ["Sculptural silhouette", "Ergonomic back support", "Premium finishes"],
    customisation: ["Dimensions", "Upholstery fabric", "Colour palette", "Finishes", "Design accents"],
    images: [{ src: curio, alt: "Oatmeal upholstered swivel chair on a light oak four-star base", position: "50% 75%" }],
  },
  {
    slug: "dreamin",
    name: "DREAMIN",
    category: "Bed Collection",
    summary: "Beds crafted for comfort, elegance and timeless design.",
    customisation: ["Dimensions", "Finishes", "Colour palette", "Design accents"],
    images: [{ src: dreamin, alt: "Low solid-wood bed dressed in white linen and soft neutral cushions", position: "50% 60%" }],
  },
  {
    slug: "comfy",
    name: "COMFY",
    category: "Pouffe Collection",
    summary: "Soft, cushioned pouffes designed around comfort and ergonomic support.",
    attributes: ["Soft aesthetics", "Generous cushioning", "Ergonomic support"],
    customisation: ["Dimensions", "Upholstery fabric", "Colour palette", "Finishes", "Design accents"],
    images: [{ src: comfy, alt: "Two tan leather pouffes in front of a timber coffee table", position: "50% 70%" }],
  },
  {
    slug: "orb",
    name: "ORB",
    category: "Lounger Collection",
    summary: "Lounge seating — modern relaxation, reimagined.",
    customisation: ["Dimensions", "Finishes", "Colour palette", "Design accents"],
    images: [{ src: orb, alt: "White sculptural lounge chair on a timber frame beside a palm", position: "45% 80%" }],
  },
  {
    slug: "elysian",
    name: "ELYSIAN",
    category: "Console Table Collection",
    summary: "Console tables — the definition of modern grace.",
    customisation: ["Dimensions", "Finishes", "Base material", "Colour palette", "Design accents"],
    images: [{ src: elysian, alt: "Light timber console table with slim legs and a single potted plant", position: "85% 50%" }],
  },
];

export function getCollection(slug: string) {
  return collections.find((collection) => collection.slug === slug);
}
