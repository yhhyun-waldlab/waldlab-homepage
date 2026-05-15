import type { Metadata } from "next";
import Link from "next/link";
import { fetchSheetNews } from "@/lib/sheetNews";
import { loadMessages, createTranslator } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { Megaphone, ArrowLeft, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "공지 · 소식 | Wald Lab",
  description: "Wald Lab의 주요 공지와 최신 소식을 확인하세요.",
};

type Props = { searchParams?: Promise<{ lang?: string }> };

function truncate(s: string, max: number) {
  const str = s.trim();
  if (str.length <= max) return str;
  return `${str.slice(0, max)}…`;
}

export default async function NewsPage({ searchParams }: Props) {
  const sp = (await searchParams) ?? {};
  const locale = (sp.lang === "en" ? "en" : "ko") as Locale;
  const messages = await loadMessages(locale);
  const t = createTranslator(messages);

  const result = await fetchSheetNews(50);
  const sheetItems = result.ok ? result.items : [];
  const hasSheet = sheetItems.length > 0;

  const staticCards = [
    {
      tag:     t("news.card1.tag"),
      title:   t("news.card1.title"),
      excerpt: t("news.card1.excerpt"),
      date:    t("news.card1.date"),
      body:    [
        t("news.card1.detailP1"),
        t("news.card1.detailP2"),
        t("news.card1.detailP3"),
      ].join("\n\n"),
    },
    {
      tag:     t("news.card2.tag"),
      title:   t("news.card2.title"),
      excerpt: t("news.card2.excerpt"),
      date:    t("news.card2.date"),
      body:    [
        t("news.card2.detailP1"),
        t("news.card2.detailP2"),
        t("news.card2.detailP3"),
      ].join("\n\n"),
    },
    {
      tag:     t("news.card3.tag"),
      title:   t("news.card3.title"),
      excerpt: t("news.card3.excerpt"),
      date:    t("news.card3.date"),
      body: [
        t("news.card3.detailP1"),
        t("news.card3.detailP2"),
        t("news.card3.detailP3"),
      ].join("\n\n"),
    },
  ];

  const items = hasSheet
    ? sheetItems.map((i) => ({
        tag:     i.tag  || "—",
        title:   i.title,
        excerpt: i.excerpt || (i.body ? truncate(i.body, 120) : ""),
        date:    i.date || "—",
        body:    i.body || i.excerpt || "",
      }))
    : staticCards;

  return (
    <div className="min-h-screen bg-gradient-to-b from-wald-950 via-[#050a08] to-wald-900 text-wald-100">

      {/* 배경 패턴 */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(82,183,136,0.5) 1px, transparent 1px),
            linear-gradient(rgba(201,107,44,0.35) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
        }}
      />

      {/* 헤더 */}
      <header className="relative z-10 border-b border-wald-800/70 bg-wald-950/80 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-wald-400 hover:text-wald-200 transition-colors"
          >
            <ArrowLeft size={14} />
            {locale === "ko" ? "홈으로" : "Back to Home"}
          </Link>
          <div className="flex gap-2 text-xs">
            <Link
              href="/news?lang=ko"
              className={locale === "ko" ? "text-wald-ember-light font-semibold" : "text-wald-500 hover:text-wald-300 transition-colors"}
            >
              KO
            </Link>
            <span className="text-wald-700">|</span>
            <Link
              href="/news?lang=en"
              className={locale === "en" ? "text-wald-ember-light font-semibold" : "text-wald-500 hover:text-wald-300 transition-colors"}
            >
              EN
            </Link>
          </div>
        </div>
      </header>

      {/* 메인 */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">

        {/* 페이지 타이틀 */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-wald-800/70 border border-wald-600/35 mb-5">
            <Megaphone className="w-3.5 h-3.5 text-wald-ember-light" aria-hidden />
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-wald-300">
              {t("news.badge")}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
            {t("news.title")}
          </h1>
          <p className="text-wald-300/90 text-sm sm:text-base max-w-xl leading-relaxed">
            {t("news.subtitle")}
          </p>
        </div>

        {/* 뉴스 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {items.map((item, i) => (
            <article
              key={i}
              className="flex flex-col rounded-2xl border border-wald-700/45 border-l-[3px] border-l-wald-ember bg-wald-900/55 backdrop-blur-sm p-6 shadow-lg shadow-black/25"
            >
              <span className="text-[11px] font-semibold uppercase tracking-wider text-wald-ember-light">
                {item.tag}
              </span>
              <span className="mt-2 text-xs text-wald-500 tabular-nums">{item.date}</span>
              <h2 className="mt-3 text-base font-bold text-white leading-snug flex-1">
                {item.title}
              </h2>
              {item.excerpt && (
                <p className="mt-2 text-sm text-wald-300/85 leading-relaxed">
                  {item.excerpt}
                </p>
              )}
              {item.body && item.body.trim() && (
                <details className="mt-4 group">
                  <summary className="cursor-pointer text-xs font-semibold text-wald-400 hover:text-wald-ember-light transition-colors list-none flex items-center gap-1">
                    <span className="group-open:hidden">{t("news.readMore")}</span>
                    <span className="hidden group-open:inline">{locale === "ko" ? "접기" : "Collapse"}</span>
                    <ExternalLink size={11} className="group-open:hidden" />
                  </summary>
                  <div className="mt-3 pt-3 border-t border-wald-800/60 text-xs text-wald-300/90 leading-relaxed whitespace-pre-wrap">
                    {item.body}
                  </div>
                </details>
              )}
            </article>
          ))}
        </div>

        {/* 빈 상태 */}
        {items.length === 0 && (
          <div className="rounded-2xl border border-wald-800/70 bg-wald-950/40 px-6 py-16 text-center">
            <p className="text-sm text-wald-400">
              {locale === "ko" ? "현재 등록된 소식이 없습니다." : "No announcements yet."}
            </p>
          </div> 
        )}
      </main>
    </div>
  );
}
