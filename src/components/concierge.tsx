"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type SubmitEvent } from "react";

import { CloseIcon, SendIcon, SparkleIcon } from "@/components/icons";

type Message = { role: "user" | "assistant"; content: string };

const MAX_TURNS = 20;

const suggestions = [
  "Which sofa would suit a compact living room?",
  "What can I customise on a bed?",
  "How does the bespoke process work?",
  "Kya aap custom size mein bana sakte ho?",
];

/** Turns site paths in an answer (e.g. /collections/dune) into links. */
function Linkified({ text, onNavigate }: { text: string; onNavigate: () => void }) {
  const parts = text.split(/(\/(?:collections|bespoke)[\w/#?=-]*)/g);
  return parts.map((part, index) =>
    index % 2 === 1 ? (
      <Link key={index} href={part} onClick={onNavigate} className="link-underline font-semibold text-bronze">
        {part}
      </Link>
    ) : (
      part
    ),
  );
}

/** AI design concierge: answers questions about INEXOR's collections and bespoke process. */
export function Concierge() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const abortRef = useRef<AbortController>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    listRef.current?.lastElementChild?.scrollIntoView({ block: "end" });
  }, [messages]);

  useEffect(() => () => abortRef.current?.abort(), []);

  function open() {
    dialogRef.current?.showModal();
    inputRef.current?.focus();
  }

  function close() {
    dialogRef.current?.close();
  }

  async function ask(question: string) {
    const content = question.trim();
    if (!content || pending) return;
    const history: Message[] = [...messages, { role: "user", content }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setDraft("");
    setPending(true);

    const controller = new AbortController();
    abortRef.current = controller;
    let answer = "";
    try {
      const response = await fetch("/api/concierge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
        signal: controller.signal,
      });
      if (!response.ok || !response.body) throw new Error(`Concierge responded ${response.status}`);
      const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        answer += value;
        const partial = answer;
        setMessages([...history, { role: "assistant", content: partial }]);
      }
    } catch (error) {
      if (controller.signal.aborted) return;
      console.error(error);
    } finally {
      if (!controller.signal.aborted) {
        const final = answer.trim() || "Sorry, I couldn't answer just now. Please try again, or request a consultation at /bespoke#enquire";
        setMessages([...history, { role: "assistant", content: final }]);
        setPending(false);
      }
    }
  }

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    void ask(draft);
  }

  const atLimit = messages.length >= MAX_TURNS - 1;

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-haspopup="dialog"
        className="fixed bottom-5 right-5 z-40 inline-flex min-h-12 items-center gap-2 bg-espresso px-5 text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-ivory shadow-lg shadow-espresso/20 transition-colors hover:bg-espresso-hover"
      >
        <SparkleIcon className="text-bronze-soft" />
        <span className="hidden sm:inline">Ask our concierge</span>
        <span className="sm:hidden">Ask</span>
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="concierge-title"
        onClick={(event) => event.target === event.currentTarget && close()}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-ivory p-0 text-espresso backdrop:bg-espresso/30 md:inset-auto md:bottom-6 md:right-6 md:h-[min(42rem,calc(100dvh-3rem))] md:w-[27rem] md:border md:border-line md:shadow-2xl md:shadow-espresso/20"
      >
        <div className="flex h-full flex-col">
          <header className="on-dark flex items-start justify-between gap-4 bg-espresso px-6 py-5 text-ivory">
            <div>
              <p className="eyebrow flex items-center gap-2 text-bronze-soft">
                <SparkleIcon width={14} height={14} />
                AI concierge
              </p>
              <h2 id="concierge-title" className="mt-2 font-display text-2xl leading-tight">
                How can we help you design your space?
              </h2>
            </div>
            <button type="button" onClick={close} className="-mr-2 inline-flex size-11 shrink-0 items-center justify-center">
              <CloseIcon width={22} height={22} />
              <span className="sr-only">Close concierge</span>
            </button>
          </header>

          <div className="flex-1 overflow-y-auto px-6 py-6">
            {messages.length === 0 ? (
              <div>
                <p className="text-taupe">
                  Ask about our collections, what can be tailored, or how a bespoke commission works.
                </p>
                <ul className="mt-6 space-y-2">
                  {suggestions.map((suggestion) => (
                    <li key={suggestion}>
                      <button
                        type="button"
                        onClick={() => void ask(suggestion)}
                        className="w-full border border-line-strong/70 bg-surface px-4 py-3 text-left text-[0.9375rem] transition-colors hover:border-espresso"
                      >
                        {suggestion}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <ol ref={listRef} className="space-y-5" aria-live="polite" aria-busy={pending}>
                {messages.map((message, index) => (
                  <li key={index} className={message.role === "user" ? "flex justify-end" : ""}>
                    {message.role === "user" ? (
                      <p className="max-w-[85%] bg-espresso px-4 py-3 text-[0.9375rem] text-ivory">
                        <span className="sr-only">You: </span>
                        {message.content}
                      </p>
                    ) : (
                      <div className="border-l-2 border-bronze pl-4 text-[0.9375rem] whitespace-pre-line">
                        <span className="sr-only">Concierge: </span>
                        {message.content ? (
                          <Linkified text={message.content} onNavigate={close} />
                        ) : (
                          <span className="inline-flex gap-1 py-2" aria-label="Thinking">
                            {[0, 150, 300].map((delay) => (
                              <span
                                key={delay}
                                className="size-1.5 animate-pulse rounded-full bg-bronze"
                                style={{ animationDelay: `${delay}ms` }}
                              />
                            ))}
                          </span>
                        )}
                      </div>
                    )}
                  </li>
                ))}
              </ol>
            )}
          </div>

          <form onSubmit={handleSubmit} className="border-t border-line bg-surface px-4 py-4">
            {atLimit ? (
              <p className="px-2 text-sm text-taupe">
                For anything more, our team would love to help directly:{" "}
                <Link href="/bespoke#enquire" onClick={close} className="link-underline font-semibold text-espresso">
                  request a consultation
                </Link>
                .
              </p>
            ) : (
              <div className="flex items-end gap-2">
                <label htmlFor="concierge-input" className="sr-only">
                  Your question
                </label>
                <textarea
                  ref={inputRef}
                  id="concierge-input"
                  rows={1}
                  maxLength={1000}
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      void ask(draft);
                    }
                  }}
                  placeholder="Ask about a collection or your space…"
                  className="max-h-32 min-h-12 flex-1 resize-none rounded-[2px] border border-line-strong bg-ivory px-4 py-3 text-base focus:border-espresso"
                />
                <button
                  type="submit"
                  disabled={pending || !draft.trim()}
                  className="inline-flex size-12 shrink-0 items-center justify-center bg-espresso text-ivory transition-colors hover:bg-espresso-hover disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <SendIcon />
                  <span className="sr-only">Send</span>
                </button>
              </div>
            )}
            <p className="mt-3 px-2 text-xs text-taupe">
              AI answers can be imperfect. Prices, sizes and timelines are confirmed in consultation.
            </p>
          </form>
        </div>
      </dialog>
    </>
  );
}
