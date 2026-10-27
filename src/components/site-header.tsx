"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { ButtonLink } from "@/components/button";
import { CloseIcon, InstagramIcon, MenuIcon } from "@/components/icons";
import { mainNav, site } from "@/content/site";

function isActive(pathname: string | null, href: string) {
  if (!pathname || href.includes("#")) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Header with active-link state; reads the pathname so it renders inside Suspense. */
export function SiteHeader() {
  const pathname = usePathname();
  return <HeaderShell pathname={pathname} />;
}

export function HeaderShell({ pathname = null }: { pathname?: string | null }) {
  const menuRef = useRef<HTMLDialogElement>(null);

  // Close the mobile menu after navigating.
  useEffect(() => {
    menuRef.current?.close();
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-ivory/90 backdrop-blur-md supports-[backdrop-filter]:bg-ivory/80">
      <div className="site-container flex h-18 items-center justify-between gap-8">
        <Link href="/" className="wordmark text-lg" aria-label="INEXOR home">
          {site.name}
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-10">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`eyebrow inline-flex min-h-11 items-center border-b transition-colors duration-300 ${
                      active ? "border-bronze text-espresso" : "border-transparent text-taupe hover:text-espresso"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <ButtonLink href="/bespoke#enquire" className="hidden lg:inline-flex">
          Book a consultation
        </ButtonLink>

        <button
          type="button"
          className="-mr-2 inline-flex h-11 w-11 items-center justify-center md:hidden"
          aria-haspopup="dialog"
          onClick={() => menuRef.current?.showModal()}
        >
          <MenuIcon width={24} height={24} />
          <span className="sr-only">Open menu</span>
        </button>
      </div>

      <dialog
        ref={menuRef}
        aria-label="Menu"
        className="m-0 h-dvh max-h-none w-full max-w-none bg-ivory p-0 text-espresso backdrop:bg-espresso/40"
      >
        <div className="site-container flex h-full flex-col">
          <div className="flex h-18 items-center justify-between border-b border-line">
            <span className="wordmark text-lg">{site.name}</span>
            <button
              type="button"
              className="-mr-2 inline-flex h-11 w-11 items-center justify-center"
              onClick={() => menuRef.current?.close()}
            >
              <CloseIcon width={24} height={24} />
              <span className="sr-only">Close menu</span>
            </button>
          </div>
          <nav aria-label="Mobile" className="flex-1 py-10">
            <ul className="border-t border-line">
              {[{ href: "/", label: "Home" }, ...mainNav].map((item, index) => (
                <li key={item.href} className="border-b border-line">
                  <Link
                    href={item.href}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className="flex items-baseline gap-5 py-4 aria-[current=page]:text-bronze"
                    onClick={() => menuRef.current?.close()}
                  >
                    <span className="eyebrow text-bronze" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-h1">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-6 border-t border-line py-8">
            <ButtonLink href="/bespoke#enquire" className="w-full" onClick={() => menuRef.current?.close()}>
              Book a consultation
            </ButtonLink>
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
      </dialog>
    </header>
  );
}
