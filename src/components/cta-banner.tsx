import Image, { type StaticImageData } from "next/image";

import { ButtonLink } from "@/components/button";
import { Eyebrow } from "@/components/section";

type CtaBannerProps = {
  image: StaticImageData;
  title: string;
  body: string;
  eyebrow?: string;
  href?: string;
  cta?: string;
};

export function CtaBanner({ image, title, body, eyebrow = "Begin your commission", href = "/bespoke#enquire", cta = "Book a consultation" }: CtaBannerProps) {
  return (
    <section aria-labelledby="cta-heading" className="on-dark relative isolate overflow-hidden text-ivory">
      <Image src={image} alt="" fill sizes="100vw" placeholder="blur" className="-z-10 object-cover" />
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-espresso/85 via-espresso/65 to-espresso/45" aria-hidden="true" />
      <div className="site-container flex min-h-[32rem] flex-col items-start justify-center py-24 md:min-h-[38rem]">
        <Eyebrow className="flex items-center gap-4 text-bronze-soft">
          <span className="h-px w-10 bg-bronze-soft" aria-hidden="true" />
          {eyebrow}
        </Eyebrow>
        <h2 id="cta-heading" className="text-display mt-6 max-w-3xl text-balance">
          {title}
        </h2>
        <p className="mt-6 max-w-xl text-lg text-ivory/90">{body}</p>
        <ButtonLink href={href} variant="light" arrow className="mt-10">
          {cta}
        </ButtonLink>
      </div>
    </section>
  );
}
