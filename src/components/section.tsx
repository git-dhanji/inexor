import type { ComponentProps, ReactNode } from "react";

type Tone = "ivory" | "sand" | "espresso";

const tones: Record<Tone, string> = {
  ivory: "bg-ivory text-espresso",
  sand: "bg-sand text-espresso",
  espresso: "on-dark bg-espresso text-ivory",
};

type SectionProps = ComponentProps<"section"> & { tone?: Tone; spaced?: boolean };

export function Section({ tone = "ivory", spaced = true, className = "", ...props }: SectionProps) {
  return <section className={`${tones[tone]} ${spaced ? "section-space" : ""} ${className}`} {...props} />;
}

export function Eyebrow({ children, className = "text-bronze" }: { children: ReactNode; className?: string }) {
  return <p className={`eyebrow ${className}`}>{children}</p>;
}

type SectionHeadingProps = {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  as?: "h1" | "h2";
  dark?: boolean;
  className?: string;
};

export function SectionHeading({ id, eyebrow, title, intro, as: Heading = "h2", dark = false, className = "" }: SectionHeadingProps) {
  return (
    <div className={`max-w-prose ${className}`}>
      {eyebrow && <Eyebrow className={dark ? "text-bronze-soft" : "text-bronze"}>{eyebrow}</Eyebrow>}
      <Heading id={id} className={`${Heading === "h1" ? "text-h1" : "text-h2"} mt-4 text-balance`}>
        {title}
      </Heading>
      {intro && <p className={`mt-6 ${dark ? "text-ivory/80" : "text-taupe"}`}>{intro}</p>}
    </div>
  );
}
