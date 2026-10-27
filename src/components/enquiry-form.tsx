"use client";

import { useSearchParams } from "next/navigation";
import { cloneElement, useEffect, useRef, useState, type InputHTMLAttributes, type ReactElement, type SubmitEvent } from "react";

import { Button } from "@/components/button";
import { AlertIcon, InfoIcon } from "@/components/icons";
import { PhotoPicker, type Photo } from "@/components/photo-picker";
import { collections } from "@/content/collections";
import { site } from "@/content/site";

type Values = {
  name: string;
  email: string;
  phone: string;
  city: string;
  interest: string;
  message: string;
};

type Errors = Partial<Record<keyof Values, string>>;

const BESPOKE = "bespoke";

const interestOptions = [
  ...collections.map((collection) => ({ value: collection.slug, label: `${collection.name} — ${collection.category}` })),
  { value: BESPOKE, label: "Something fully bespoke" },
];

function validate(values: Values): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = "Enter your name.";
  if (!values.email.trim()) errors.email = "Enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
    errors.email = "Enter an email address in the format name@example.com.";
  if (values.phone.trim() && !/^\+?[\d\s-]{8,16}$/.test(values.phone.trim()))
    errors.phone = "Enter a valid phone number, or leave this blank.";
  if (values.message.trim().length < 10) errors.message = "Tell us a little about your space (at least 10 characters).";
  return errors;
}

/** Reads ?interest= so links like "Enquire about DUNE" pre-select the collection. Render inside Suspense. */
export function EnquiryFormWithParams() {
  const interest = useSearchParams().get("interest");
  const valid = interestOptions.some((option) => option.value === interest);
  return <EnquiryForm key={interest ?? ""} defaultInterest={valid && interest ? interest : ""} />;
}

export function EnquiryForm({ defaultInterest = "" }: { defaultInterest?: string }) {
  const initial: Values = { name: "", email: "", phone: "", city: "", interest: defaultInterest, message: "" };
  const [values, setValues] = useState<Values>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [showSummary, setShowSummary] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "demo">("idle");
  const [photos, setPhotos] = useState<Photo[]>([]);
  const summaryRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLHeadingElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  useEffect(() => {
    if (status === "demo") resultRef.current?.focus();
  }, [status]);

  function update(field: keyof Values, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    // Clear a field's error as soon as it becomes valid.
    if (errors[field]) {
      const next = validate({ ...values, [field]: value });
      setErrors((current) => ({ ...current, [field]: next[field] }));
    }
  }

  function handleBlur(field: keyof Values) {
    const next = validate(values);
    setErrors((current) => ({ ...current, [field]: next[field] }));
  }

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validate(values);
    setErrors(next);
    if (Object.keys(next).length > 0) {
      setShowSummary(true);
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setShowSummary(false);
    setStatus("submitting");
    // No backend in this demo: nothing is transmitted.
    timerRef.current = setTimeout(() => setStatus("demo"), 600);
  }

  function reset() {
    photos.forEach((photo) => URL.revokeObjectURL(photo.url));
    setPhotos([]);
    setValues(initial);
    setErrors({});
    setStatus("idle");
  }

  if (status === "demo") {
    return (
      <div className="border border-line-strong bg-surface p-8 md:p-10">
        <div className="flex items-start gap-4">
          <InfoIcon className="mt-1 shrink-0 text-bronze" width={24} height={24} />
          <div>
            <h3 ref={resultRef} tabIndex={-1} className="text-h3 outline-none">
              Demo only — this enquiry was not sent
            </h3>
            <p className="mt-3 text-taupe">
              This showcase has no backend, so your details{photos.length > 0 ? " and photos" : ""} have not been
              transmitted or stored. In production, enquiries
              will be delivered to INEXOR&apos;s enquiry inbox.
            </p>
            <p className="mt-3 text-taupe">
              To reach INEXOR today, email{" "}
              <a href={`mailto:${site.emails.enquiries}`} className="link-underline break-all text-espresso">
                {site.emails.enquiries}
              </a>
              .
            </p>
            <Button variant="secondary" className="mt-8" onClick={reset}>
              Start a new enquiry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const errorEntries = Object.entries(errors).filter(([, message]) => message) as [keyof Values, string][];

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-6" aria-describedby="form-note">
      {showSummary && errorEntries.length > 0 && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="border-l-2 border-error bg-surface p-5 outline-none focus-visible:outline-2 focus-visible:outline-error"
        >
          <p className="flex items-center gap-2 font-semibold text-error">
            <AlertIcon className="shrink-0" />
            Please check {errorEntries.length === 1 ? "1 field" : `${errorEntries.length} fields`}
          </p>
          <ul className="mt-3 space-y-1 pl-7 text-[0.9375rem]">
            {errorEntries.map(([field, message]) => (
              <li key={field}>
                <a
                  href={`#enquiry-${field}`}
                  className="link-underline text-error"
                  onClick={(event) => {
                    // Move focus into the field, not just scroll to it.
                    event.preventDefault();
                    document.getElementById(`enquiry-${field}`)?.focus();
                  }}
                >
                  {message}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="name" label="Name" required error={errors.name}>
          <input
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            onBlur={() => handleBlur("name")}
          />
        </Field>
        <Field id="email" label="Email" required error={errors.email}>
          <input
            type="email"
            autoComplete="email"
            inputMode="email"
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
            onBlur={() => handleBlur("email")}
          />
        </Field>
        <Field id="phone" label="Phone" hint="Optional" error={errors.phone}>
          <input
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={values.phone}
            onChange={(event) => update("phone", event.target.value)}
            onBlur={() => handleBlur("phone")}
          />
        </Field>
        <Field id="city" label="City" hint="Optional">
          <input
            type="text"
            autoComplete="address-level2"
            value={values.city}
            onChange={(event) => update("city", event.target.value)}
          />
        </Field>
      </div>

      <Field id="interest" label="I'm interested in" hint="Optional">
        <select value={values.interest} onChange={(event) => update("interest", event.target.value)}>
          <option value="">Not sure yet</option>
          {interestOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </Field>

      <Field id="message" label="Tell us about your space" required error={errors.message}>
        <textarea
          rows={5}
          value={values.message}
          onChange={(event) => update("message", event.target.value)}
          onBlur={() => handleBlur("message")}
        />
      </Field>

      <PhotoPicker photos={photos} onChange={setPhotos} />

      <p id="form-note" className="flex gap-3 text-sm text-taupe">
        <InfoIcon className="mt-0.5 shrink-0 text-bronze" width={18} height={18} />
        <span>
          Demo form — submissions and photos are not sent. Photos are previewed in your browser only.
        </span>
      </p>

      <Button type="submit" disabled={status === "submitting"} className="w-full sm:w-auto">
        {status === "submitting" ? "Please wait…" : "Request a consultation"}
      </Button>
    </form>
  );
}

type FieldProps = {
  id: keyof Values;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactElement<InputHTMLAttributes<HTMLElement>>;
};

const controlClasses =
  "mt-2 block w-full resize-y rounded-[2px] border bg-surface px-4 py-3 text-base text-espresso transition-colors focus:border-espresso focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze";

function Field({ id, label, required, hint, error, children }: FieldProps) {
  const inputId = `enquiry-${id}`;
  const errorId = `${inputId}-error`;

  return (
    <div>
      <label htmlFor={inputId} className="flex items-baseline justify-between gap-4 text-[0.9375rem] font-semibold">
        <span>
          {label}
          {required && (
            <span className="text-bronze" aria-hidden="true">
              {" "}
              *
            </span>
          )}
        </span>
        {hint && <span className="text-sm font-normal text-taupe">{hint}</span>}
      </label>
      {cloneElement(children, {
        id: inputId,
        name: id,
        required,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": error ? errorId : undefined,
        className: `${controlClasses} ${error ? "border-error" : "border-line-strong"}`,
      })}
      {error && (
        <p id={errorId} className="mt-2 flex items-center gap-2 text-sm text-error">
          <AlertIcon className="shrink-0" width={16} height={16} />
          {error}
        </p>
      )}
    </div>
  );
}
