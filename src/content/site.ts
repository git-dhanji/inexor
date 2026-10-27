/**
 * Verified INEXOR business information.
 * Source: https://inexor.in/contact-2/ and https://inexor.in/ (indexed October 2026).
 */
export const site = {
  name: "INEXOR",
  tagline: "Your vision, our craftsmanship.",
  description:
    "INEXOR designs and crafts bespoke luxury furniture in Indore — sofas, beds, chairs, pouffes, loungers and console tables made around your space.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  instagram: "https://www.instagram.com/inexor.furniture/",
  emails: {
    general: "inexor@delightgroup.net.in",
    enquiries: "inquiryinxr@delightgroup.net.in",
  },
  /*
   * The current website publishes two different numbers (+91 91113 08889 on
   * the contact page, +91 91110 33373 on the homepage). Leave unset until the
   * client confirms which one is correct; phone and WhatsApp links stay hidden.
   */
  phone: null as string | null,
  office: {
    label: "Office",
    lines: ["604, Vibrant Business Tower", "Geeta Bhavan, Indore", "Madhya Pradesh 452010"],
    mapQuery: "604 Vibrant Business Tower, Geeta Bhavan, Indore, Madhya Pradesh 452010",
  },
  factory: {
    label: "Factory",
    lines: ["Khasra No. 13, A/4, Sanwer Road", "MR 10 Road, Kumedi, Indore", "Madhya Pradesh 453551"],
    mapQuery: "Sanwer Road, Kumedi, Indore, Madhya Pradesh 453551",
  },
} as const;

export const mainNav = [
  { href: "/collections", label: "Collections" },
  { href: "/bespoke", label: "Bespoke" },
  { href: "/bespoke#enquire", label: "Contact" },
] as const;

/** The four-step bespoke journey published on the current homepage. */
export const processSteps = [
  {
    title: "Share Your Vision",
    summary: "Send us images of your space and tell us what you need.",
    detail:
      "Start with the room itself. Photos of your space, along with your requirements, give our designers the context to design around how you live.",
  },
  {
    title: "Expert Consultation",
    summary: "Talk through your needs and the possibilities with our team.",
    detail:
      "We discuss proportions, materials, comfort and finish with you, and explore what is possible for your space.",
  },
  {
    title: "Tailored Proposal",
    summary: "Receive a proposal developed around your requirements.",
    detail:
      "Your brief becomes a considered design proposal, shaped to your space, lifestyle and preferences.",
  },
  {
    title: "Artisanal Creation",
    summary: "Your piece is crafted with meticulous attention to detail.",
    detail:
      "Artisans bring the commission to life, combining traditional craftsmanship with modern techniques and premium materials.",
  },
] as const;

/** Customisation options referenced across the current website. */
export const customisationOptions = [
  "Dimensions",
  "Finishes",
  "Fabrics & upholstery",
  "Colour palette",
  "Design accents",
  "Stitching",
  "Arm style",
  "Cushioning density",
  "Leg finish",
  "Base material",
] as const;
