"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { Megaphone, X } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import type { Locale } from "@/lib/i18n";

interface NewsSectionProps {
  t: (key: string) => string;
  locale: Locale;
}

type LoadState = "pending" | "ready" | "fallback";

type StaticCardId = "1" | "2" | "3";

type AnnouncementItem = {
  id: string;
  tag: string;
  title: string;
  excerpt: string;
  body: string;
  date: string;
};

function staticNewsKeyPrefix(card: StaticCardId): "news.card1" | "news.card2" | "news.card3" {
  if (card === "2") return "news.card2";
  if (card === "3") return "news.card3";
  return "news.card1";
}

type ModalState =
  | { kind: "announcement"; item: AnnouncementItem }
  | { kind: "static"; card: StaticCardId }
  | null;

export default function NewsSection({ t, locale }: NewsSectionProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const [loadState, setLoadState] = useState<LoadState>("pending");
  const [announcementItems, setAnnouncementItems] = useState<AnnouncementItem[]>([]);
  const [modal, setModal] = useState<ModalState>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoadState("pending");
      try {
        const res = await fetch(`/api/announcements?limit=3&lang=${locale}`);
        const data = (await res.json()) as {
          ok: boolean;
          items?: AnnouncementItem[];
        };
        if (cancelled) return;
        if (data.ok && Array.isArray(data.items) && data.items.length > 0) {
          setAnnouncementItems(data.items);
          setLoadState("ready");
        } else {
          setLoadState("fallback");
        }
      } catch {
        if (!cancelled) setLoadState("fallback");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [locale]);

  useEffect(() => {
    if (!modal) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModal(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    queueMicrotask(() => closeBtnRef.current?.focus());
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [modal]);

  const staticCards = [
    {
      id: "1" as const,
      interactive: true,
      tag: t("news.card1.tag"),
      title: t("news.card1.title"),
      excerpt: t("news.card1.excerpt"),
      date: t("news.card1.date"),
    },
    {
      id: "2" as const,
      interactive: true,
      tag: t("news.card2.tag"),
      title: t("news.card2.title"),
      excerpt: t("news.card2.excerpt"),
      date: t("news.card2.date"),
    },
    {
      id: "3" as const,
      interactive: true,
      tag: t("news.card3.tag"),
      title: t("news.card3.title"),
      excerpt: t("news.card3.excerpt"),
      date: t("news.card3.date"),
    },
  ];

  const archiveHref = `/news?lang=${locale}`;

  return (
    <>
      <section
        id="news"
        className="relative py-20 lg:py-28 bg-gradient-to-b from-wald-950 via-[#050a08] to-wald-900 border-t border-wald-800/60 overflow-hidden"
        aria-labelledby={`${titleId}-heading`}
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 right-0 h-80 w-80 rounded-full bg-wald-700/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-wald-ember-glow blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `
                linear-gradient(90deg, rgba(82,183,136,0.5) 1px, transparent 1px),
                linear-gradient(rgba(201,107,44,0.35) 1px, transparent 1px)
              `,
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 lg:mb-14">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-wald-800/70 border border-wald-600/35 mb-4">
                  <Megaphone className="w-3.5 h-3.5 text-wald-ember-light" aria-hidden />
                  <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-wald-300">
                    {t("news.badge")}
                  </span>
                </div>
                <h2
                  id={`${titleId}-heading`}
                  className="text-3xl sm:text-4xl font-bold text-white tracking-tight"
                >
                  {t("news.title")}
                </h2>
                <p className="mt-3 text-wald-300/90 text-sm sm:text-base max-w-xl leading-relaxed">
                  {t("news.subtitle")}
                </p>
              </div>
              <Link
                href={archiveHref}
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-wald-400 hover:text-wald-ember-light transition-colors flex-shrink-0"
              >
                {t("news.viewAll")}
                <span aria-hidden>→</span>
              </Link>
            </div>
          </FadeIn>

          {loadState === "pending" ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6" aria-busy="true">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="min-h-[220px] rounded-2xl border border-wald-800/60 bg-wald-900/30 p-6 animate-pulse"
                >
                  <div className="h-3 w-20 bg-wald-800 rounded" />
                  <div className="mt-4 h-3 w-16 bg-wald-800/80 rounded" />
                  <div className="mt-4 h-5 w-full bg-wald-800/70 rounded" />
                  <div className="mt-3 h-3 w-full bg-wald-800/50 rounded" />
                  <div className="mt-3 h-3 w-4/5 bg-wald-800/50 rounded" />
                  <p className="mt-8 text-xs text-wald-600">{t("news.sheetLoading")}</p>
                </div>
              ))}
            </div>
          ) : loadState === "ready" ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
              {announcementItems.map((item, index) => (
                <FadeIn key={item.id} delay={index * 90}>
                  <button
                    type="button"
                    onClick={() => setModal({ kind: "announcement", item })}
                    className="group w-full text-left h-full min-h-[220px] flex flex-col rounded-2xl border border-wald-700/45 border-l-[3px] border-l-wald-ember bg-wald-900/55 backdrop-blur-sm p-6 shadow-lg shadow-black/25 transition-all duration-300 hover:border-wald-500/50 hover:bg-wald-900/75 hover:shadow-[0_20px_50px_-12px_rgba(201,107,44,0.18)] focus:outline-none focus-visible:ring-2 focus-visible:ring-wald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-wald-950"
                  >
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-wald-ember-light">
                      {item.tag || "—"}
                    </span>
                    <span className="mt-2 text-xs text-wald-500 tabular-nums">{item.date || "—"}</span>
                    <h3 className="mt-3 text-lg font-bold text-white leading-snug group-hover:text-wald-100 transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-wald-300/85 leading-relaxed flex-1">
                      {item.excerpt ||
                        (item.body
                          ? item.body.length > 120
                            ? `${item.body.slice(0, 120)}…`
                            : item.body
                          : "")}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-wald-400 group-hover:text-wald-ember-light transition-colors">
                      {t("news.readMore")}
                      <span className="translate-x-0 group-hover:translate-x-1 transition-transform" aria-hidden>
                        →
                      </span>
                    </span>
                  </button>
                </FadeIn>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
                {staticCards.map((card, index) => (
                  <FadeIn key={card.id} delay={index * 90}>
                    {card.interactive ? (
                      <button
                        type="button"
                        onClick={() =>
                          setModal({
                            kind: "static",
                            card: card.id,
                          })
                        }
                        className="group w-full text-left h-full min-h-[220px] flex flex-col rounded-2xl border border-wald-700/45 border-l-[3px] border-l-wald-ember bg-wald-900/55 backdrop-blur-sm p-6 shadow-lg shadow-black/25 transition-all duration-300 hover:border-wald-500/50 hover:bg-wald-900/75 hover:shadow-[0_20px_50px_-12px_rgba(201,107,44,0.18)] focus:outline-none focus-visible:ring-2 focus-visible:ring-wald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-wald-950"
                      >
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-wald-ember-light">
                          {card.tag}
                        </span>
                        <span className="mt-2 text-xs text-wald-500 tabular-nums">{card.date}</span>
                        <h3 className="mt-3 text-lg font-bold text-white leading-snug group-hover:text-wald-100 transition-colors">
                          {card.title}
                        </h3>
                        <p className="mt-2 text-sm text-wald-300/85 leading-relaxed flex-1">{card.excerpt}</p>
                        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-wald-400 group-hover:text-wald-ember-light transition-colors">
                          {t("news.readMore")}
                          <span className="translate-x-0 group-hover:translate-x-1 transition-transform" aria-hidden>
                            →
                          </span>
                        </span>
                      </button>
                    ) : (
                      <div className="h-full min-h-[220px] flex flex-col rounded-2xl border border-wald-800/70 bg-wald-950/40 p-6 opacity-85">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-wald-500">
                          {card.tag}
                        </span>
                        <span className="mt-2 text-xs text-wald-600 tabular-nums">{card.date}</span>
                        <h3 className="mt-3 text-lg font-semibold text-wald-200/90 leading-snug">{card.title}</h3>
                        <p className="mt-2 text-sm text-wald-500 leading-relaxed flex-1">{card.excerpt}</p>
                        <div className="mt-5 h-px w-12 bg-wald-800 rounded-full" />
                      </div>
                    )}
                  </FadeIn>
                ))}
              </div>
            </>
          )}

          <div className="mt-10 flex justify-center">
            <Link
              href={archiveHref}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-wald-400 hover:text-wald-ember-light border border-wald-800/60 hover:border-wald-600/60 bg-wald-900/40 hover:bg-wald-900/70 transition-all"
            >
              {t("news.viewAll")}
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {modal ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8" role="presentation">
          <button
            type="button"
            className="absolute inset-0 bg-black/75 backdrop-blur-sm cursor-default"
            aria-label={t("news.close")}
            onClick={() => setModal(null)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${titleId}-dialog-title`}
            className="relative w-full max-w-lg max-h-[min(90vh,640px)] overflow-y-auto rounded-2xl border border-wald-700/60 bg-gradient-to-br from-wald-900 via-wald-950 to-[#040806] p-6 sm:p-8 shadow-2xl shadow-black/50 animate-[modal-in_0.3s_ease-out_both]"
          >
            <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r from-wald-500 via-wald-400 to-wald-ember" />
            <button
              ref={closeBtnRef}
              type="button"
              onClick={() => setModal(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-wald-400 hover:text-white hover:bg-wald-800/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-wald-400"
              aria-label={t("news.close")}
            >
              <X size={20} />
            </button>

            {modal.kind === "announcement" ? (
              <>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-wald-ember-light mb-2">
                  {modal.item.tag || "—"}
                </p>
                <p className="text-xs text-wald-500 mb-3 tabular-nums">{modal.item.date || "—"}</p>
                <h3 id={`${titleId}-dialog-title`} className="text-xl sm:text-2xl font-bold text-white pr-10 leading-snug">
                  {modal.item.title}
                </h3>
                <div className="mt-6 text-sm text-wald-200/90 leading-relaxed whitespace-pre-line">
                  {(modal.item.body || modal.item.excerpt || "").trim() || "—"}
                </div>
              </>
            ) : modal.kind === "static" ? (
              <>
                {(() => {
                  const pre = staticNewsKeyPrefix(modal.card);
                  return (
                    <>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-wald-ember-light mb-2">
                        {t(`${pre}.tag`)}
                      </p>
                      <p className="text-xs text-wald-500 mb-3 tabular-nums">
                        {t(`${pre}.date`)}
                      </p>
                      <h3 id={`${titleId}-dialog-title`} className="text-xl sm:text-2xl font-bold text-white pr-10 leading-snug">
                        {t(`${pre}.detailTitle`)}
                      </h3>
                      <div className="mt-6 space-y-4 text-sm text-wald-200/90 leading-relaxed">
                        <p className="whitespace-pre-line">{t(`${pre}.detailP1`)}</p>
                        <p className="whitespace-pre-line">{t(`${pre}.detailP2`)}</p>
                        <p className="whitespace-pre-line">{t(`${pre}.detailP3`)}</p>
                      </div>
                    </>
                  );
                })()}
              </>
            ) : null}

            <button
              type="button"
              onClick={() => setModal(null)}
              className="mt-8 w-full sm:w-auto px-6 py-3 rounded-xl bg-wald-700/50 text-wald-100 text-sm font-semibold border border-wald-600/40 hover:bg-wald-600/50 hover:border-wald-500/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-wald-400"
            >
              {t("news.close")}
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
