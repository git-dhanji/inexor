import { processSteps } from "@/content/site";

/** The four-step bespoke journey. `detailed` shows the longer copy used on /bespoke. */
export function ProcessSteps({ detailed = false }: { detailed?: boolean }) {
  return (
    <ol className={`grid gap-12 ${detailed ? "md:grid-cols-2 md:gap-x-16 md:gap-y-16" : "md:grid-cols-2 lg:grid-cols-4 lg:gap-8"}`}>
      {processSteps.map((step, index) => (
        <li
          key={step.title}
          className="reveal relative border-t border-line-strong pt-8 before:absolute before:-top-[5px] before:left-0 before:size-2.5 before:rounded-full before:bg-bronze"
        >
          <span className="accent block text-6xl leading-none text-bronze" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="text-h3 mt-6">
            <span className="sr-only">Step {index + 1}: </span>
            {step.title}
          </h3>
          <p className="mt-3 max-w-md text-taupe">{detailed ? step.detail : step.summary}</p>
        </li>
      ))}
    </ol>
  );
}
