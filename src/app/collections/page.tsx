import type { Metadata } from "next";

import { ButtonLink } from "@/components/button";
import { CollectionCard } from "@/components/collection-card";
import { Section, SectionHeading } from "@/components/section";
import { collections } from "@/content/collections";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Explore INEXOR's bespoke furniture collections: DUNE sofas, CURIO chairs, DREAMIN beds, COMFY pouffes, ORB loungers and ELYSIAN console tables.",
};

export default function CollectionsPage() {
  return (
    <>
      <Section className="pb-0!">
        <div className="site-container">
          <div className="grid gap-8 md:grid-cols-12">
            <SectionHeading
              as="h1"
              eyebrow="Collections"
              title={
                <>
                  Six collections, <em className="accent text-bronze">each made to your measure</em>
                </>
              }
              className="md:col-span-7"
            />
            <p className="text-taupe md:col-span-4 md:col-start-9 md:self-end">
              Every INEXOR collection is a starting point. Dimensions, finishes, fabrics and details can be tailored to
              your space through our bespoke process.
            </p>
          </div>

          <nav aria-label="Collection index" className="mt-14 border-y border-line">
            <ul className="no-scrollbar -mx-5 flex overflow-x-auto px-5 md:mx-0 md:grid md:grid-cols-6 md:px-0">
              {collections.map((collection, index) => (
                <li key={collection.slug} className="shrink-0 md:border-l md:border-line md:first:border-l-0">
                  <a
                    href={`#${collection.slug}`}
                    className="group flex min-h-11 items-baseline gap-3 py-5 pr-8 md:flex-col md:gap-1 md:px-5 md:first:pl-0"
                  >
                    <span className="accent text-sm text-bronze" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="collection-name text-lg transition-colors group-hover:text-bronze">
                      {collection.name}
                    </span>
                    <span className="hidden text-xs text-taupe md:block">{collection.category}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Section>

      <Section>
        <ul className="site-container grid gap-x-10 gap-y-16 md:grid-cols-2 md:gap-y-28">
          {collections.map((collection, index) => (
            <li key={collection.slug} id={collection.slug} className={`reveal ${index % 2 === 1 ? "md:mt-40" : ""}`}>
              <CollectionCard collection={collection} index={index} headingLevel="h2" />
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="sand" aria-labelledby="bespoke-cta-heading">
        <div className="site-container flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="bespoke-cta-heading"
            eyebrow="Bespoke"
            title="Looking for something entirely your own?"
            intro="Share your space and requirements, and we'll design a piece around them."
          />
          <ButtonLink href="/bespoke#enquire" arrow className="self-start md:self-auto">
            Start a bespoke enquiry
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
