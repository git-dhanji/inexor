"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "@/components/icons";
import type { CollectionImage } from "@/content/collections";

export function Gallery({ images, name }: { images: CollectionImage[]; name: string }) {
  const [active, setActive] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const current = images[active];
  const multiple = images.length > 1;
  // Portrait photography gets a square frame so less of the piece is cropped.
  const portrait = images[0].src.height > images[0].src.width;

  function step(direction: 1 | -1) {
    setActive((index) => (index + direction + images.length) % images.length);
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className={`group relative block w-full cursor-zoom-in overflow-hidden bg-sand ${portrait ? "aspect-square" : "aspect-[4/3]"}`}
      >
        <Image
          src={current.src}
          alt={current.alt}
          fill
          sizes="(min-width: 1024px) 58vw, 100vw"
          placeholder="blur"
          loading="eager"
          fetchPriority="high"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          style={{ objectPosition: current.position }}
        />
        <span className="sr-only">View {name} image {active + 1} full screen</span>
      </button>

      {multiple && (
        <ul className="mt-4 grid grid-cols-4 gap-3" aria-label={`${name} images`}>
          {images.map((image, index) => (
            <li key={image.src.src}>
              <button
                type="button"
                onClick={() => setActive(index)}
                aria-current={index === active ? "true" : undefined}
                className={`relative block aspect-square w-full overflow-hidden transition-opacity ${
                  index === active ? "ring-1 ring-espresso ring-offset-2 ring-offset-ivory" : "opacity-70 hover:opacity-100"
                }`}
              >
                <Image src={image.src} alt="" fill sizes="(min-width: 1024px) 14vw, 25vw" className="object-cover" />
                <span className="sr-only">Show image {index + 1}: {image.alt}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      <dialog
        ref={dialogRef}
        aria-label={`${name} image viewer`}
        className="m-auto h-dvh max-h-none w-full max-w-none bg-espresso/95 p-0 text-ivory backdrop:bg-espresso/80 on-dark"
        onKeyDown={(event) => {
          if (!multiple) return;
          if (event.key === "ArrowRight") step(1);
          if (event.key === "ArrowLeft") step(-1);
        }}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between px-5 py-4 md:px-8">
            <p className="eyebrow text-ivory/70" aria-live="polite">
              {name} · {active + 1} / {images.length}
            </p>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="inline-flex h-11 w-11 items-center justify-center"
            >
              <CloseIcon width={24} height={24} />
              <span className="sr-only">Close image viewer</span>
            </button>
          </div>
          <div className="relative flex-1">
            <Image src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain" />
          </div>
          {multiple && (
            <div className="flex justify-center gap-2 py-5">
              <button
                type="button"
                onClick={() => step(-1)}
                className="inline-flex h-12 w-12 items-center justify-center border border-ivory/30 hover:border-ivory"
              >
                <ChevronLeftIcon />
                <span className="sr-only">Previous image</span>
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                className="inline-flex h-12 w-12 items-center justify-center border border-ivory/30 hover:border-ivory"
              >
                <ChevronRightIcon />
                <span className="sr-only">Next image</span>
              </button>
            </div>
          )}
        </div>
      </dialog>
    </div>
  );
}
