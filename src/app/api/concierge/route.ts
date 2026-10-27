import Anthropic from "@anthropic-ai/sdk";

import { collections } from "@/content/collections";
import { customisationOptions, processSteps, site } from "@/content/site";

const MAX_TURNS = 20;
const MAX_CHARS = 1000;

/* Everything the concierge may state comes from the verified site content. */
const knowledge = [
  `Brand: ${site.name}. ${site.description} Tagline: "${site.tagline}"`,
  "Collections:",
  ...collections.map((c) =>
    [
      `- ${c.name} (${c.category}), page /collections/${c.slug}: ${c.summary}`,
      c.story ? `  Story: ${c.story.join(" ")}` : "",
      c.attributes ? `  Design attributes: ${c.attributes.join(", ")}.` : "",
      `  Can be tailored in: ${c.customisation.join(", ")}.`,
    ]
      .filter(Boolean)
      .join("\n"),
  ),
  "Bespoke process (details on /bespoke):",
  ...processSteps.map((step, index) => `${index + 1}. ${step.title}: ${step.detail}`),
  `Customisation options overall: ${customisationOptions.join(", ")}.`,
  `Office: ${site.office.lines.join(", ")}. Factory: ${site.factory.lines.join(", ")}.`,
  `Email: ${site.emails.general} (general), ${site.emails.enquiries} (enquiries). Instagram: @inexor.furniture.`,
  "Consultation requests: /bespoke#enquire",
].join("\n");

const system = `You are the INEXOR design concierge on INEXOR's website. INEXOR designs and handcrafts bespoke luxury furniture in Indore, India.

Help visitors find a suitable collection, understand what can be customised, and take the next step: requesting a consultation.

Use only the facts below. INEXOR has not published prices, delivery times, dimensions, warranties, discounts or a phone number, so never state or estimate any of these. When asked, say the team confirms them during the consultation and point to /bespoke#enquire. If you don't know something, say so plainly.

Write warmly and briefly, like a knowledgeable showroom host: two to four short sentences, plain text without markdown headings or bullet symbols. Mention relevant pages by their path (for example /collections/dune) so they become links. Reply in the visitor's language, including Hindi or Hinglish. Politely steer unrelated requests back to furniture and interiors.

<facts>
${knowledge}
</facts>`;

type ChatMessage = { role: "user" | "assistant"; content: string };

function parseMessages(body: unknown): ChatMessage[] | null {
  if (!body || typeof body !== "object" || !Array.isArray((body as { messages?: unknown }).messages)) return null;
  const messages = (body as { messages: unknown[] }).messages;
  if (messages.length === 0 || messages.length > MAX_TURNS) return null;
  const parsed: ChatMessage[] = [];
  for (const [index, item] of messages.entries()) {
    const { role, content } = (item ?? {}) as Partial<ChatMessage>;
    const expected = index % 2 === 0 ? "user" : "assistant";
    if (role !== expected || typeof content !== "string" || !content.trim() || content.length > MAX_CHARS) return null;
    parsed.push({ role, content: content.trim() });
  }
  return parsed.at(-1)?.role === "user" ? parsed : null;
}

export async function POST(request: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ error: "The concierge is not configured." }, { status: 503 });
  }

  const messages = parseMessages(await request.json().catch(() => null));
  if (!messages) return Response.json({ error: "Invalid conversation." }, { status: 400 });

  const client = new Anthropic();
  const stream = client.beta.messages.stream({
    model: "claude-opus-5-5",
    max_tokens: 8000,
    output_config: { effort: "low" },
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    cache_control: { type: "ephemeral" },
    system,
    messages,
  });

  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        const final = await stream.finalMessage();
        if (final.stop_reason === "refusal") {
          controller.enqueue(
            encoder.encode("I'm not able to help with that here, but our team would be glad to talk it through: /bespoke#enquire"),
          );
        }
      } catch (error) {
        console.error("Concierge request failed", error instanceof Anthropic.APIError ? error.status : error);
        controller.enqueue(
          encoder.encode("\n\nSorry, I couldn't finish that answer. Please try again, or reach the team via /bespoke#enquire"),
        );
      } finally {
        controller.close();
      }
    },
    cancel() {
      stream.abort();
    },
  });

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
  });
}
