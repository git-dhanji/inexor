import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { openGraphBase } from "@/app/shared-metadata";
import { ButtonLink } from "@/components/button";
import { CollectionCard } from "@/components/collection-card";
import { Gallery } from "@/components/gallery";
import { Eyebrow, Section, SectionHeading } from "@/components/section";
import { collections, getCollection } from "@/content/collections";

// Render unknown slugs to static output before responding, so notFound() returns a real 404 status.
export const ensureStatic = "navigation";

// Leave room for the floating concierge button beside the mobile enquiry bar.
const conciergeEnabled = Boolean(process.env.ANTHROPIC_API_KEY);

export function generateStaticParams() {
  return collections.map((collection) => ({ slug: collection.slug }));
}

export async function generateMetadata({ params }: PageProps<"/collections/[slug]">): Promise<Metadata> {
  const collection = getCollection((await params).slug);
  if (!collection) return {};
  const title = `${collection.name} — ${collection.category}`;
  const [image] = collection.images;
  return {
    title,
    description: collection.summary,
    openGraph: {
      ...openGraphBase,
      title: `${title} · INEXOR`,
      description: collection.summary,
      images: [{ url: image.src.src, width: image.src.width, height: image.src.height, alt: image.alt }],
    },
  };
}

export default async function CollectionPage({ params }: PageProps<"/collections/[slug]">) {
  const collection = getCollection((await params).slug);
  if (!collection) notFound();

  const others = collections.filter((item) => item.slug !== collection.slug).slice(0, 3);
  const enquireHref = `/bespoke?interest=${collection.slug}#enquire`;
  const glance = [
    ["Type", collection.category.replace(/ Collection$/, "")],
    ["Crafted in", "Indore"],
    ["Commission", "Bespoke"],
  ] as const;

  return (
    <>
      <Section className="pt-10! md:pt-14!">
        <div className="site-container">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-taupe">
              <li>
                <Link href="/collections" className="link-underline hover:text-espresso">
                  Collections
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-espresso">
                {collection.name}
              </li>
            </ol>
          </nav>

          <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Gallery images={collection.images} name={collection.name} />
            </div>

            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <Eyebrow>{collection.category}</Eyebrow>
                <h1 className="collection-name mt-4 text-[clamp(2.75rem,6vw,4.5rem)] leading-none">{collection.name}</h1>
                <p className="accent mt-5 text-2xl leading-snug text-bronze">{collection.summary}</p>
                {collection.story && (
                  <div className="mt-6 space-y-4 text-taupe">
                    {collection.story.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                )}

                <dl className="mt-10 grid grid-cols-3 border-y border-line text-sm">
                  {glance.map(([term, detail]) => (
                    <div key={term} className="border-l border-line py-4 pl-4 first:border-l-0 first:pl-0">
                      <dt className="eyebrow text-taupe">{term}</dt>
                      <dd className="mt-1 font-semibold">{detail}</dd>
                    </div>
                  ))}
                </dl>

                {collection.attributes && (
                  <div className="mt-10">
                    <h2 className="eyebrow text-espresso">Design attributes</h2>
                    <ul className="mt-4 grid gap-x-6 sm:grid-cols-2">
                      {collection.attributes.map((attribute) => (
                        <li key={attribute} className="flex items-center gap-3 border-b border-line py-3">
                          <span className="size-1.5 shrink-0 rounded-full bg-bronze" aria-hidden="true" />
                          {attribute}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
                  <ButtonLink href={enquireHref}>Enquire about {collection.name}</ButtonLink>
                  <ButtonLink href="/bespoke" variant="text" arrow>
                    How bespoke works
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="sand" aria-labelledby="customise-heading">
        <div className="site-container grid gap-10 md:grid-cols-12">
          <SectionHeading
            id="customise-heading"
            eyebrow="Make it yours"
            title={`Tailor ${collection.name} to your space`}
            intro="Specifications are developed with you during consultation. Options can include:"
            className="md:col-span-5"
          />
          <ol className="grid grid-cols-2 gap-x-8 md:col-span-6 md:col-start-7 md:self-end">
            {collection.customisation.map((option, index) => (
              <li key={option} className="flex items-baseline gap-4 border-b border-line-strong/60 py-4">
                <span className="accent text-bronze" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {option}
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section aria-labelledby="others-heading">
        <div className="site-container">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading id="others-heading" eyebrow="Continue exploring" title="Other collections" />
            <ButtonLink href="/collections" variant="text" arrow className="self-start md:self-auto">
              All collections
            </ButtonLink>
          </div>
          <ul className="mt-12 grid gap-12 md:grid-cols-3 md:gap-8">
            {others.map((item) => (
              <li key={item.slug}>
                <CollectionCard collection={item} aspect="aspect-[4/5]" sizes="(min-width: 768px) 33vw, 100vw" />
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Keeps the enquiry one tap away on small screens; rests above the footer once the page ends */}
      <div className="sticky bottom-0 z-30 border-t border-line bg-ivory/95 backdrop-blur-md lg:hidden">
        <div className={`site-container flex items-center justify-between gap-4 py-3 ${conciergeEnabled ? "pr-28!" : ""}`}>
          <p className="min-w-0">
            <span className="collection-name block truncate text-lg leading-tight">{collection.name}</span>
            <span className="block truncate text-xs text-taupe">{collection.category}</span>
          </p>
          <ButtonLink href={enquireHref} className="shrink-0 px-5!">
            Enquire
          </ButtonLink>
        </div>
      </div>
    </>
  );
}
