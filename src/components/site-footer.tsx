import Link from "next/link";

import { ArrowRightIcon, InstagramIcon } from "@/components/icons";
import { collections } from "@/content/collections";
import { mainNav, site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="on-dark bg-espresso text-ivory">
      <div className="site-container py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4 lg:col-span-3">
            <Link href="/" className="wordmark text-xl">
              {site.name}
            </Link>
            <p className="mt-5 max-w-xs font-display text-2xl leading-snug text-ivory/90">{site.tagline}</p>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex min-h-11 items-center gap-3 text-ivory/80 hover:text-ivory"
            >
              <InstagramIcon />
              @inexor.furniture
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>

          <nav aria-label="Collections" className="md:col-span-2">
            <h2 className="eyebrow text-bronze-soft">Collections</h2>
            <ul className="mt-5 space-y-2">
              {collections.map((collection) => (
                <li key={collection.slug}>
                  <Link href={`/collections/${collection.slug}`} className="text-ivory/80 hover:text-ivory">
                    {collection.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer" className="md:col-span-2">
            <h2 className="eyebrow text-bronze-soft">Explore</h2>
            <ul className="mt-5 space-y-2">
              <li>
                <Link href="/" className="text-ivory/80 hover:text-ivory">
                  Home
                </Link>
              </li>
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-ivory/80 hover:text-ivory">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="grid gap-8 sm:grid-cols-2 md:col-span-4 md:grid-cols-1 lg:col-span-5 lg:grid-cols-2">
            {[site.office, site.factory].map((place) => (
              <address key={place.label} className="not-italic">
                <h2 className="eyebrow text-bronze-soft">{place.label}</h2>
                <p className="mt-5 text-[0.9375rem] leading-relaxed text-ivory/80">
                  {place.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </address>
            ))}
            <div className="sm:col-span-2 md:col-span-1 lg:col-span-2">
              <h2 className="eyebrow text-bronze-soft">Email</h2>
              <ul className="mt-5 space-y-1 text-[0.9375rem]">
                {Object.values(site.emails).map((email) => (
                  <li key={email}>
                    <a href={`mailto:${email}`} className="break-all text-ivory/80 hover:text-ivory">
                      {email}
                    </a>
                  </li>
                ))}
              </ul>
              {site.phone && (
                <>
                  <h2 className="eyebrow mt-8 text-bronze-soft">Phone</h2>
                  <a href={`tel:${site.phone.replace(/\s+/g, "")}`} className="mt-5 inline-block text-ivory/80 hover:text-ivory">
                    {site.phone}
                  </a>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-t border-ivory/15 pt-10">
          <p className="text-giant text-ivory/90" aria-hidden="true">
            {site.name}
          </p>
          <a
            href="#main"
            className="eyebrow mb-2 inline-flex min-h-11 shrink-0 items-center gap-2 text-ivory/70 hover:text-ivory"
          >
            Back to top
            <ArrowRightIcon width={14} height={14} className="-rotate-90" />
          </a>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-ivory/15 pt-8 text-sm text-ivory/60 md:flex-row md:justify-between">
          <p>© INEXOR. Bespoke furniture, Indore.</p>
          <p>Demo build — photography is placeholder imagery from Unsplash, not INEXOR products.</p>
        </div>
      </div>
    </footer>
  );
}
