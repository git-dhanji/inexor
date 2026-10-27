import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { ArrowRightIcon } from "@/components/icons";

type Variant = "primary" | "secondary" | "light" | "text";

const base =
  "inline-flex items-center justify-center gap-3 text-[0.8125rem] font-semibold uppercase tracking-[0.08em] transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "min-h-12 px-7 bg-espresso text-ivory hover:bg-espresso-hover",
  secondary: "min-h-12 px-7 border border-espresso text-espresso hover:bg-espresso hover:text-ivory",
  light: "min-h-12 px-7 bg-ivory text-espresso hover:bg-sand",
  text: "min-h-11 link-underline",
};

export function buttonClasses(variant: Variant = "primary", className = "") {
  return `${base} ${variants[variant]} ${className}`;
}

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: Variant;
  arrow?: boolean;
  children: ReactNode;
};

export function ButtonLink({ variant = "primary", arrow = false, className, children, ...props }: ButtonLinkProps) {
  return (
    <Link className={buttonClasses(variant, className)} {...props}>
      {children}
      {arrow && <ArrowRightIcon width={16} height={16} />}
    </Link>
  );
}

type ButtonProps = ComponentProps<"button"> & { variant?: Variant };

export function Button({ variant = "primary", className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonClasses(variant, className)} {...props} />;
}
