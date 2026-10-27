import Image from "next/image";

import craft from "@/assets/images/craft.jpg";
import cta from "@/assets/images/cta.jpg";
import hero from "@/assets/images/hero.jpg";
import madeInIndore from "@/assets/images/made-in-indore.jpg";
import railBed from "@/assets/images/rail-bed.jpg";
import railChair from "@/assets/images/rail-chair.jpg";
import railSlipper from "@/assets/images/rail-slipper.jpg";
import railSofa from "@/assets/images/rail-sofa.jpg";
import { ButtonLink } from "@/components/button";
import { CollectionCard } from "@/components/collection-card";
import { CtaBanner } from "@/components/cta-banner";
import { ProcessSteps } from "@/components/process-steps";
import { ProductRail, type RailItem } from "@/components/product-rail";
import { Eyebrow, Section, SectionHeading } from "@/components/section";
import { getCollection } from "@/content/collections";
import { site } from "@/content/site";

const featured = ["dune", "curio", "dreamin"].map((slug) => getCollection(slug)!);

const highlights: RailItem[] = [
  { src: railSofa, alt: "Rust upholstered sofa with a blush cushion", label: "DUNE", href: "/collections/dune" },
  { src: railBed, alt: "Timber bed dressed in rust and ivory linen", label: "DREAMIN", href: "/collections/dreamin" },
  { src: railChair, alt: "Grey upholstered dining chair on light oak legs", label: "CURIO", href: "/collections/curio" },
  { src: railSlipper, alt: "Mustard button-tufted slipper chair", label: "CURIO", href: "/collections/curio" },
];

const pillars = [
  { title: "Materials", body: "High-quality wood, durable metals and luxurious upholstery fabrics, chosen for longevity." },
  { title: "Detailing", body: "Meticulous attention to detail, from the first sketch to the final finish." },
  { title: "Ergonomics", body: "Proportions and comfort customised to the way you sit, lounge and rest." },
];

const heroFacts = ["Designed and made in Indore", "Tailored to your space", "A four-step bespoke process"];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FurnitureStore",
  name: "INEXOR",
  description: site.description,
  url: site.url,
  email: site.emails.general,
  ...(site.phone ? { telephone: site.phone } : {}),
  sameAs: [site.instagram],
  address: {
    "@type": "PostalAddress",
    streetAddress: "604, Vibrant Business Tower, Geeta Bhavan",
    addressLocality: "Indore",
    addressRegion: "Madhya Pradesh",
    postalCode: "452010",
    addressCountry: "IN",
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      {/* Hero */}
      <section aria-labelledby="hero-heading" className="on-dark relative isolate overflow-hidden text-ivory">
        <Image
          src={hero}
          alt="Warm, light-filled living room with a low sofa, timber accents and natural textures"
          fill
          sizes="100vw"
          placeholder="blur"
          preload
          className="-z-10 object-cover object-[50%_60%]"
        />
        <div className="absolute inset-0 -z-10 bg-linear-to-t from-espresso/85 via-espresso/35 to-espresso/10" aria-hidden="true" />
        <div className="site-container flex min-h-[38rem] flex-col justify-end pb-10 pt-32 md:h-[calc(100dvh-4.5rem)] md:max-h-[60rem] md:pb-12">
          <Eyebrow className="rise flex items-center gap-4 text-ivory/85">
            <span className="h-px w-10 bg-bronze-soft" aria-hidden="true" />
            Bespoke furniture · Indore
          </Eyebrow>
          <h1 id="hero-heading" className="text-display rise mt-6 max-w-4xl text-balance [--rise-delay:120ms]">
            Your vision, <em className="accent text-bronze-soft">our craftsmanship.</em>
          </h1>
          <p className="rise mt-6 max-w-lg text-lg text-ivory/90 [--rise-delay:240ms]">
            Sofas, beds, chairs and occasional pieces, designed around your space and handcrafted in our Indore factory.
          </p>
          <div className="rise mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 [--rise-delay:360ms]">
            <ButtonLink href="/bespoke#enquire" variant="light">
              Book a consultation
            </ButtonLink>
            <ButtonLink href="/collections" variant="text" arrow className="text-ivory">
              Explore collections
            </ButtonLink>
          </div>
          <ul className="rise mt-14 grid gap-4 border-t border-ivory/25 pt-6 text-sm text-ivory/85 sm:grid-cols-3 [--rise-delay:480ms]">
            {heroFacts.map((fact) => (
              <li key={fact} className="flex items-center gap-3">
                <span className="size-1.5 rounded-full bg-bronze-soft" aria-hidden="true" />
                {fact}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Proposition */}
      <Section aria-labelledby="proposition-heading">
        <div className="site-container grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <Eyebrow>The INEXOR approach</Eyebrow>
            <h2 id="proposition-heading" className="text-h1 mt-5 text-balance">
              Furniture designed around your space, <em className="accent text-bronze">and made to last beyond it.</em>
            </h2>
          </div>
          <div className="reveal md:col-span-4 md:col-start-9 md:self-end">
            <p className="text-taupe">
              INEXOR creates bespoke furniture that pairs contemporary design with timeless appeal. Every piece brings
              together artisanal craftsmanship, premium materials and ergonomic customisation, so it complements your
              space and the way you live.
            </p>
            <ButtonLink href="/bespoke" variant="text" arrow className="mt-6">
              How bespoke works
            </ButtonLink>
          </div>
        </div>
      </Section>

      {/* Featured collections */}
      <Section aria-labelledby="collections-heading" className="pt-0!">
        <div className="site-container">
          <div className="flex flex-col gap-6 border-t border-line pt-12 md:flex-row md:items-end md:justify-between">
            <SectionHeading id="collections-heading" eyebrow="Collections" title="Signature collections" />
            <ButtonLink href="/collections" variant="text" arrow className="self-start md:self-auto">
              All collections
            </ButtonLink>
          </div>
          <div className="mt-12 grid gap-12 md:grid-cols-12 md:gap-8">
            <div className="reveal md:col-span-7">
              <CollectionCard collection={featured[0]} index={0} aspect="aspect-[4/5]" sizes="(min-width: 768px) 58vw, 100vw" />
            </div>
            <div className="grid gap-12 md:col-span-5">
              {featured.slice(1).map((collection, index) => (
                <div key={collection.slug} className="reveal">
                  <CollectionCard collection={collection} index={index + 1} aspect="aspect-[4/3]" sizes="(min-width: 768px) 42vw, 100vw" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Product highlights */}
      <Section tone="sand" aria-labelledby="highlights-heading">
        <div className="site-container">
          <SectionHeading
            id="highlights-heading"
            eyebrow="Selected pieces"
            title={
              <>
                Shaped by hand, <em className="accent text-bronze">finished with care</em>
              </>
            }
            intro="A glimpse across the collections. Every piece can be tailored in size, finish and fabric."
          />
          <div className="mt-12">
            <ProductRail items={highlights} labelledBy="highlights-heading" />
          </div>
        </div>
      </Section>

      {/* Craft philosophy */}
      <Section tone="espresso" spaced={false} aria-labelledby="craft-heading">
        <div className="grid md:grid-cols-2">
          <div className="relative min-h-[22rem] overflow-hidden md:min-h-[44rem]">
            <Image
              src={craft}
              alt="Designer's hands drafting with a ruler on a timber desk"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              placeholder="blur"
              className="object-cover"
            />
          </div>
          <div className="flex items-center px-5 py-20 md:px-12 lg:px-20">
            <div className="max-w-lg">
              <SectionHeading
                id="craft-heading"
                eyebrow="Craft"
                title={
                  <>
                    Traditional craftsmanship, <em className="accent text-bronze-soft">modern innovation.</em>
                  </>
                }
                dark
              />
              <dl className="mt-12 space-y-8">
                {pillars.map((pillar, index) => (
                  <div key={pillar.title} className="reveal grid grid-cols-[3rem_1fr] border-t border-ivory/15 pt-6">
                    <span className="accent text-2xl leading-none text-bronze-soft" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <dt className="eyebrow text-bronze-soft">{pillar.title}</dt>
                      <dd className="mt-3 text-ivory/85">{pillar.body}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </Section>

      {/* Bespoke process */}
      <Section aria-labelledby="process-heading">
        <div className="site-container">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              id="process-heading"
              eyebrow="Bespoke"
              title="From your space to your piece, in four steps"
            />
            <ButtonLink href="/bespoke" variant="text" arrow className="self-start md:self-auto">
              The bespoke journey
            </ButtonLink>
          </div>
          <div className="mt-14">
            <ProcessSteps />
          </div>
        </div>
      </Section>

      {/* Made in Indore — stands in for a projects gallery until verified project photography is supplied */}
      <Section tone="sand" spaced={false} aria-labelledby="indore-heading">
        <div className="grid md:grid-cols-12">
          <div className="flex items-center px-5 py-20 md:order-2 md:col-span-5 md:px-12 lg:px-16">
            <div>
              <SectionHeading
                id="indore-heading"
                eyebrow="Made in Indore"
                title={
                  <>
                    Designed and crafted <em className="accent text-bronze">close to home</em>
                  </>
                }
                intro="From our office at Geeta Bhavan to our factory on Sanwer Road, INEXOR furniture is designed and made in Indore."
              />
              <div className="mt-10 grid gap-8 sm:grid-cols-2">
                {[site.office, site.factory].map((place) => (
                  <address key={place.label} className="not-italic">
                    <p className="eyebrow text-bronze">{place.label}</p>
                    <p className="mt-3 text-[0.9375rem] text-taupe">
                      {place.lines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </p>
                  </address>
                ))}
              </div>
            </div>
          </div>
          <div className="relative min-h-[22rem] md:order-1 md:col-span-7 md:min-h-[38rem]">
            <Image
              src={madeInIndore}
              alt="Open-plan living space with a timber feature wall and a low sofa"
              fill
              sizes="(min-width: 768px) 58vw, 100vw"
              placeholder="blur"
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      <CtaBanner
        image={cta}
        title="Share your space. We'll design around it."
        body="Send us a few photos and your requirements, and our team will take it from there."
      />
    </>
  );
}
