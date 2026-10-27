"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";

export type RailItem = {
  src: StaticImageData;
  alt: string;
  label: string;
  href: string;
};

export function ProductRail({ items, labelledBy }: { items: RailItem[]; labelledBy: string }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ atStart: true, atEnd: false });
  const [progress, setProgress] = useState(0);

  function updateEdges() {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    setEdges({
      atStart: track.scrollLeft <= 4,
      atEnd: track.scrollLeft >= maxScroll - 4,
    });
    setProgress(maxScroll > 0 ? track.scrollLeft / maxScroll : 1);
  }

  function scrollByCard(direction: 1 | -1) {
    const track = trackRef.current;
    const card = track?.querySelector("li");
    if (!track || !card) return;
    track.scrollBy({ left: direction * (card.getBoundingClientRect().width + 24), behavior: "smooth" });
  }

  return (
    <div>
      <div className="mb-8 hidden justify-end gap-2 md:flex">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          disabled={edges.atStart}
          className="inline-flex h-12 w-12 items-center justify-center border border-espresso/30 transition-colors enabled:hover:border-espresso enabled:hover:bg-espresso enabled:hover:text-ivory disabled:cursor-not-allowed disabled:opacity-35"
        >
          <ChevronLeftIcon />
          <span className="sr-only">Previous pieces</span>
        </button>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          disabled={edges.atEnd}
          className="inline-flex h-12 w-12 items-center justify-center border border-espresso/30 transition-colors enabled:hover:border-espresso enabled:hover:bg-espresso enabled:hover:text-ivory disabled:cursor-not-allowed disabled:opacity-35"
        >
          <ChevronRightIcon />
          <span className="sr-only">Next pieces</span>
        </button>
      </div>
      <ul
        ref={trackRef}
        aria-labelledby={labelledBy}
        onScroll={updateEdges}
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-5 px-5 md:mx-0 md:scroll-px-0 md:px-0"
      >
        {items.map((item, index) => (
          <li key={item.src.src} className="w-[78%] shrink-0 snap-start sm:w-[45%] lg:w-[calc((100%-3rem)/3)]">
            <Link href={item.href} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden bg-ivory">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 78vw"
                  placeholder="blur"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <p className="mt-4 flex items-baseline justify-between gap-4 border-t border-espresso/15 pt-4">
                <span className="collection-name text-lg">{item.label}</span>
                <span className="accent text-lg text-bronze" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </p>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-10 h-px bg-espresso/15" aria-hidden="true">
        <div
          className="h-px origin-left bg-espresso transition-transform duration-300"
          style={{ transform: `scaleX(${Math.max(progress, 0.15)})` }}
        />
      </div>
    </div>
  );
}
