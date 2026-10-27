import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons";
import type { Collection } from "@/content/collections";

type CollectionCardProps = {
  collection: Collection;
  /** Tailwind aspect-ratio class for the image frame. */
  aspect?: string;
  sizes?: string;
  headingLevel?: "h2" | "h3";
  /** Optional position in a list, shown as an editorial numeral. */
  index?: number;
};

export function CollectionCard({
  collection,
  aspect = "aspect-[4/5]",
  sizes = "(min-width: 768px) 50vw, 100vw",
  headingLevel: Heading = "h3",
  index,
}: CollectionCardProps) {
  const image = collection.images[0];

  return (
    <Link href={`/collections/${collection.slug}`} className="group block">
      <div className={`relative overflow-hidden bg-sand ${aspect}`}>
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={sizes}
            placeholder="blur"
            className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
            style={{ objectPosition: image.position }}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="eyebrow text-taupe">Imagery coming soon</p>
          </div>
        )}
        <div
          className="absolute inset-0 bg-linear-to-t from-espresso/45 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          aria-hidden="true"
        />
        <span
          className="eyebrow absolute bottom-5 left-5 inline-flex translate-y-2 items-center gap-2 text-ivory opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100"
          aria-hidden="true"
        >
          View collection <ArrowRightIcon width={14} height={14} />
        </span>
      </div>
      <div className="mt-5 flex items-start justify-between gap-6 border-t border-line pt-5 transition-colors duration-500 group-hover:border-espresso">
        <div className="flex gap-5">
          {index !== undefined && (
            <span className="accent pt-0.5 text-xl leading-none text-bronze" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
          )}
          <div>
            <Heading className="collection-name text-2xl leading-none">{collection.name}</Heading>
            <p className="eyebrow mt-2 text-bronze">{collection.category}</p>
            <p className="mt-3 max-w-md text-taupe">{collection.summary}</p>
          </div>
        </div>
        <span className="mt-1 shrink-0 text-espresso transition-transform duration-300 group-hover:translate-x-1">
          <ArrowRightIcon />
        </span>
      </div>
    </Link>
  );
}
