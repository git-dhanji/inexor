"use client";

import { useEffect, useRef, useState, type ChangeEvent, type DragEvent } from "react";

import { AlertIcon, CloseIcon } from "@/components/icons";

const MAX_PHOTOS = 6;
const MAX_BYTES = 10 * 1024 * 1024;

export type Photo = { id: string; file: File; url: string };

type PhotoPickerProps = {
  photos: Photo[];
  onChange: (photos: Photo[]) => void;
};

/** "Share your vision": pick or drop photos of the space. Previews stay in the browser; nothing is uploaded. */
export function PhotoPicker({ photos, onChange }: PhotoPickerProps) {
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");
  const photosRef = useRef(photos);

  useEffect(() => {
    photosRef.current = photos;
  }, [photos]);

  // Release preview URLs when the picker unmounts.
  useEffect(() => () => photosRef.current.forEach((photo) => URL.revokeObjectURL(photo.url)), []);

  function addFiles(files: FileList | null) {
    if (!files) return;
    const accepted: Photo[] = [];
    let problem = "";
    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) problem = "Only image files can be added.";
      else if (file.size > MAX_BYTES) problem = "Each photo must be under 10 MB.";
      else if (photos.length + accepted.length >= MAX_PHOTOS) problem = `You can add up to ${MAX_PHOTOS} photos.`;
      else accepted.push({ id: `${file.name}-${file.lastModified}-${file.size}`, file, url: URL.createObjectURL(file) });
    }
    setError(problem);
    if (accepted.length) onChange([...photos, ...accepted]);
  }

  function remove(photo: Photo) {
    URL.revokeObjectURL(photo.url);
    setError("");
    onChange(photos.filter((item) => item.id !== photo.id));
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(false);
    addFiles(event.dataTransfer.files);
  }

  function handleInput(event: ChangeEvent<HTMLInputElement>) {
    addFiles(event.target.files);
    event.target.value = "";
  }

  const full = photos.length >= MAX_PHOTOS;

  return (
    <div>
      <p className="flex items-baseline justify-between gap-4 text-[0.9375rem] font-semibold" id="photos-label">
        <span>Photos of your space</span>
        <span className="text-sm font-normal text-taupe">Optional · up to {MAX_PHOTOS}</span>
      </p>

      <div
        onDragOver={(event) => {
          event.preventDefault();
          if (!full) setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`mt-2 border border-dashed p-6 text-center transition-colors ${
          dragging ? "border-bronze bg-sand" : "border-line-strong bg-surface"
        }`}
      >
        <input
          id="enquiry-photos"
          type="file"
          accept="image/*"
          multiple
          disabled={full}
          onChange={handleInput}
          aria-labelledby="photos-label"
          aria-describedby="photos-help"
          className="sr-only"
        />
        <label
          htmlFor="enquiry-photos"
          className={`inline-flex min-h-11 items-center justify-center border px-5 text-[0.8125rem] font-semibold uppercase tracking-[0.08em] transition-colors ${
            full
              ? "cursor-not-allowed border-line text-taupe"
              : "cursor-pointer border-espresso hover:bg-espresso hover:text-ivory"
          } [:focus-visible+&]:outline-2 [:focus-visible+&]:outline-offset-2 [:focus-visible+&]:outline-bronze`}
        >
          {full ? "Photo limit reached" : "Choose photos"}
        </label>
        <p id="photos-help" className="mt-3 text-sm text-taupe">
          or drag them here. Room photos help our designers understand proportions, light and finishes.
        </p>
      </div>

      {error && (
        <p role="alert" className="mt-2 flex items-center gap-2 text-sm text-error">
          <AlertIcon className="shrink-0" width={16} height={16} />
          {error}
        </p>
      )}

      {photos.length > 0 && (
        <ul className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-6" aria-label="Selected photos">
          {photos.map((photo) => (
            <li key={photo.id} className="group relative aspect-square overflow-hidden bg-sand">
              {/* Local object URL preview; next/image does not apply to blob: sources */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.url} alt={photo.file.name} className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => remove(photo)}
                className="absolute right-1 top-1 inline-flex size-8 items-center justify-center bg-espresso/80 text-ivory transition-colors hover:bg-espresso"
              >
                <CloseIcon width={16} height={16} />
                <span className="sr-only">Remove {photo.file.name}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
