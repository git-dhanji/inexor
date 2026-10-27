# INEXOR — client showcase MVP

A four-page showcase for INEXOR, a bespoke luxury furniture brand in Indore. Built with Next.js 16 (App Router, Cache
Components), TypeScript and Tailwind CSS v4.

| Route | Purpose |
|---|---|
| `/` | Brand-led homepage: hero, proposition, featured collections, highlights, craft, process, Indore, CTA |
| `/collections` | All six verified collections |
| `/collections/[slug]` | Product-detail template (DUNE is the fully populated example) |
| `/bespoke` | Bespoke journey, customisation options, demo enquiry form, contact details |

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run typecheck
npm run build
```

Set `NEXT_PUBLIC_SITE_URL` to the deployed URL so canonical metadata, the sitemap and robots.txt use it.

## AI design concierge (optional)

A floating "Ask our concierge" chat answers visitor questions about the collections, customisation and the bespoke
process, using only the verified content in `src/content/`. It never quotes prices, sizes, timelines or phone numbers,
and points visitors to the consultation form instead. It runs on Claude (`claude-opus-5-5`, low effort, with
server-side refusal fallback enabled).

It is **off unless `ANTHROPIC_API_KEY` is set when building and running**:

```bash
ANTHROPIC_API_KEY=sk-ant-... npm run build
ANTHROPIC_API_KEY=sk-ant-... npm start
```

The endpoint is `src/app/api/concierge/route.ts`. Before going public, add rate limiting, for example at the hosting edge.

## Where things live

- `src/app/globals.css` — design tokens (colours, type scale, spacing) for "Warm Architectural Luxury"
- `src/content/site.ts` — verified business details, navigation, bespoke steps, customisation options
- `src/content/collections.ts` — collection data; optional fields (story, attributes) drive optional sections
- `src/components/` — reusable UI (header, footer, cards, rail, gallery, enquiry form, …)

## Demo limitations — read before presenting

- **Placeholder photography.** All images are from Unsplash and are not INEXOR products (see `IMAGE_CREDITS.md`).
- **The enquiry form does not send anything.** It validates input, then shows an explicit "Demo only — not sent" message.
  The submit handler in `src/components/enquiry-form.tsx` is the single place to connect a real service.
  Visitors can attach up to six photos of their space ("Share your vision"); they are previewed in the browser only.
- **Phone and WhatsApp are hidden.** The current website publishes two different numbers. Once INEXOR confirms one, set
  `site.phone` in `src/content/site.ts`; it then appears in the footer, the Bespoke contact block and the structured data.
  WhatsApp stays out until a verified business number is supplied.
- **The palette and fonts are provisional.** They still need checking against the official logo and photography.

## Open questions for INEXOR

1. Which phone number is correct, and is there a WhatsApp business number?
2. LAIR dining tables: real content and imagery (the current `/lair-collection/` page shows DUNE content).
3. Approved product, project and workshop photography; logo in vector format.
4. Dimensions, materials and finishes per collection.
5. Should Ahmedabad and Hyderabad, and the Delight Group connection, appear on the site?
6. Is the 30% OFF promotion still running? It is excluded by default.
7. Permission to reuse any Instagram content.
