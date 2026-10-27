import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";

import bespokeHero from "@/assets/images/bespoke-hero.jpg";
import { ButtonLink } from "@/components/button";
import { EnquiryForm, EnquiryFormWithParams } from "@/components/enquiry-form";
import { InstagramIcon } from "@/components/icons";
import { ProcessSteps } from "@/components/process-steps";
import { Eyebrow, Section, SectionHeading } from "@/components/section";
import { customisationOptions, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Bespoke Furniture & Consultation",
  description:
    "Commission bespoke furniture from INEXOR in four steps: share your vision, consult with our experts, receive a tailored proposal, and see it crafted by artisans.",
};

export default function BespokePage() {
  return (
    <>
      <section aria-labelledby="bespoke-heading" className="on-dark relative isolate overflow-hidden text-ivory">
        <Image
          src={bespokeHero}
          alt="Calm, neutral living room with a sectional sofa, round coffee table and pouffe"
          fill
          sizes="100vw"
          placeholder="blur"
          preload
          className="-z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-linear-to-t from-espresso/85 via-espresso/50 to-espresso/30" aria-hidden="true" />
        <div className="site-container flex min-h-[30rem] flex-col justify-end pb-14 pt-28 md:min-h-[36rem] md:pb-20">
          <Eyebrow className="rise flex items-center gap-4 text-ivory/85">
            <span className="h-px w-10 bg-bronze-soft" aria-hidden="true" />
            Bespoke by INEXOR
          </Eyebrow>
          <h1 id="bespoke-heading" className="text-display rise mt-6 max-w-3xl text-balance [--rise-delay:120ms]">
            Furniture made for one space: <em className="accent text-bronze-soft">yours.</em>
          </h1>
          <p className="rise mt-6 max-w-xl text-lg text-ivory/90 [--rise-delay:240ms]">
            Personalised design, artisanal craftsmanship and premium materials, shaped around your space and lifestyle.
          </p>
          <div className="rise mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 [--rise-delay:360ms]">
            <ButtonLink href="#enquire" variant="light">
              Request a consultation
            </ButtonLink>
            <ButtonLink href="#journey-heading" variant="text" arrow className="text-ivory">
              See how it works
            </ButtonLink>
          </div>
        </div>
      </section>

      <Section aria-labelledby="journey-heading">
        <div className="site-container">
          <SectionHeading
            id="journey-heading"
            eyebrow="The journey"
            title={
              <>
                Four steps from idea <em className="accent text-bronze">to heirloom</em>
              </>
            }
            intro="A considered, collaborative process — you stay involved from the first photo to the finished piece."
          />
          <div className="mt-14">
            <ProcessSteps detailed />
          </div>
        </div>
      </Section>

      <Section tone="sand" aria-labelledby="options-heading">
        <div className="site-container grid gap-10 md:grid-cols-12">
          <SectionHeading
            id="options-heading"
            eyebrow="Make it yours"
            title="What you can customise"
            intro="Every commission is different. These are some of the details we tailor with you."
            className="md:col-span-5"
          />
          <ol className="grid grid-cols-2 gap-x-8 md:col-span-6 md:col-start-7 md:self-end">
            {customisationOptions.map((option, index) => (
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

      <Section aria-labelledby="enquire-heading" id="enquire">
        <div className="site-container grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading
              id="enquire-heading"
              eyebrow="Enquire"
              title="Request a consultation"
              intro="Tell us about your space and what you have in mind. Fields marked * are required."
            />
            <div className="mt-10">
              <Suspense fallback={<EnquiryForm />}>
                <EnquiryFormWithParams />
              </Suspense>
            </div>
          </div>

          <aside aria-labelledby="contact-heading" className="lg:col-span-4 lg:col-start-9">
            <div className="border-t-2 border-bronze bg-sand p-6 sm:p-8 lg:sticky lg:top-28">
              <h2 id="contact-heading" className="text-h2">
                Visit or write to us
              </h2>
              <div className="mt-8 space-y-8">
                {[site.office, site.factory].map((place) => (
                  <address key={place.label} className="not-italic">
                    <p className="eyebrow text-bronze">{place.label}</p>
                    <p className="mt-3 text-taupe">
                      {place.lines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </p>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.mapQuery)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline mt-3 inline-block text-sm font-semibold"
                    >
                      Open in Google Maps<span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </address>
                ))}
                <div>
                  <p className="eyebrow text-bronze">Email</p>
                  <ul className="mt-3 space-y-1">
                    {Object.values(site.emails).map((email) => (
                      <li key={email}>
                        <a href={`mailto:${email}`} className="link-underline break-all">
                          {email}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                {site.phone && (
                  <div>
                    <p className="eyebrow text-bronze">Phone</p>
                    <a href={`tel:${site.phone.replace(/\s+/g, "")}`} className="link-underline mt-3 inline-block">
                      {site.phone}
                    </a>
                  </div>
                )}
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-3 text-taupe hover:text-espresso"
                >
                  <InstagramIcon />
                  @inexor.furniture
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
