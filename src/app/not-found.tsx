import { ButtonLink } from "@/components/button";
import { Section, SectionHeading } from "@/components/section";

export default function NotFound() {
  return (
    <Section>
      <div className="site-container">
        <SectionHeading
          as="h1"
          eyebrow="Page not found"
          title="This page doesn't exist."
          intro="It may have moved, or the link may be incorrect."
        />
        <div className="mt-10 flex flex-wrap gap-6">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/collections" variant="secondary">
            View collections
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
