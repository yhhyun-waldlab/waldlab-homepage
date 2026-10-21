import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Megaphone } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { listAnnouncements } from "@/lib/announcements-store";
import {
  CATEGORY_LABELS,
  type Announcement,
  type AnnouncementCategory,
} from "@/types/announcement";
import { linkifyText } from "@/lib/linkify";

export const metadata: Metadata = {
  title: "공지 · 소식 | Wald Lab",
  description: "Wald Lab의 주요 공지와 최신 소식을 확인하세요.",
};

type Props = { searchParams?: Promise<{ lang?: string; category?: string }> };

function localText(field: { ko: string; en: string }, locale: Locale) {
  return locale === "en" ? field.en : field.ko;
}

const CATEGORY_COLORS: Record<AnnouncementCategory, { bg: string; text: string; border: string }> = {
  update: { bg: "rgba(59,130,246,0.12)", text: "rgba(96,165,250,0.9)", border: "rgba(59,130,246,0.25)" },
  "tech-news": { bg: "rgba(34,197,94,0.12)", text: "rgba(74,222,128,0.9)", border: "rgba(34,197,94,0.25)" },
  insight: { bg: "rgba(168,85,247,0.12)", text: "rgba(192,132,252,0.9)", border: "rgba(168,85,247,0.25)" },
  notice: { bg: "rgba(239,68,68,0.12)", text: "rgba(248,113,113,0.9)", border: "rgba(239,68,68,0.25)" },
  ip: { bg: "rgba(201,107,44,0.12)", text: "rgba(232,149,74,0.9)", border: "rgba(201,107,44,0.25)" },
};

/** "2026-05-01" → "2026.05.01" (ko) | "May 1, 2026" (en) */
function formatDate(iso: string, locale: Locale) {
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) return iso;
  if (locale === "en") {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];
    return `${months[parseInt(m, 10) - 1]} ${parseInt(d, 10)}, ${y}`;
  }
  return `${y}.${m}.${d}`;
}

export default async function NewsPage({ searchParams }: Props) {
  const sp = (await searchParams) ?? {};
  const locale = (sp.lang === "en" ? "en" : "ko") as Locale;
  const isKo = locale === "ko";
  const selectedCategory = sp.category as AnnouncementCategory | undefined;

  const announcements = await listAnnouncements();
  const sorted: Announcement[] = [...announcements].sort((a, b) =>
    b.date.localeCompare(a.date)
  );

  const filtered = selectedCategory
    ? sorted.filter((item) => item.category === selectedCategory)
    : sorted;

  return (
    <div className="min-h-screen bg-gradient-to-b from-wald-950 via-[#050a08] to-wald-900 text-wald-100">

      {/* 배경 그리드 */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.025]"
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
            {isKo ? "홈으로" : "Back to Home"}
          </Link>
          <div className="flex gap-2 text-xs">
            <Link
              href="/news?lang=ko"
              className={isKo ? "text-wald-ember-light font-semibold" : "text-wald-500 hover:text-wald-300 transition-colors"}
            >
              KO
            </Link>
            <span className="text-wald-700">|</span>
            <Link
              href="/news?lang=en"
              className={!isKo ? "text-wald-ember-light font-semibold" : "text-wald-500 hover:text-wald-300 transition-colors"}
            >
              EN
            </Link>
          </div>
        </div>
      </header>

      {/* 본문 */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">

        {/* 타이틀 */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-wald-800/70 border border-wald-600/35 mb-5">
            <Megaphone className="w-3.5 h-3.5 text-wald-ember-light" aria-hidden />
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-wald-300">
              News
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2">
            {isKo ? "공지 · 소식" : "News & Announcements"}
          </h1>
          <p className="text-wald-400 text-sm">
            {isKo
              ? `총 ${filtered.length}건 · 최신순 정렬`
              : `${filtered.length} entries · newest first`}
          </p>
        </div>

        {/* 카테고리 필터 */}
        <div className="mb-6 flex flex-wrap gap-2">
          <Link
            href={`/news?lang=${locale}`}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              !selectedCategory
                ? "bg-wald-800 text-white border border-wald-600"
                : "bg-wald-900/50 text-wald-400 border border-wald-800/50 hover:bg-wald-800/70"
            }`}
          >
            {isKo ? "전체" : "All"}
          </Link>
          {(Object.keys(CATEGORY_LABELS) as AnnouncementCategory[]).map((cat) => (
            <Link
              key={cat}
              href={`/news?lang=${locale}&category=${cat}`}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                selectedCategory === cat
                  ? "bg-wald-800 text-white border border-wald-600"
                  : "bg-wald-900/50 text-wald-400 border border-wald-800/50 hover:bg-wald-800/70"
              }`}
            >
              {localText(CATEGORY_LABELS[cat], locale)}
            </Link>
          ))}
        </div>

        {/* 리스트 테이블 */}
        <div className="rounded-2xl border border-wald-800/60 overflow-hidden">
          {/* 헤더 행 */}
          <div className="hidden sm:grid grid-cols-[7rem_8rem_1fr] bg-wald-900/80 border-b border-wald-800/60 px-6 py-3 text-[11px] font-semibold uppercase tracking-widest text-wald-500">
            <span>{isKo ? "날짜" : "Date"}</span>
            <span>{isKo ? "분류" : "Category"}</span>
            <span>{isKo ? "제목" : "Title"}</span>
          </div>

          {/* 데이터 행 */}
          {filtered.map((item) => (
            <details
              key={item.id}
              className="group border-b border-wald-800/40 last:border-0"
            >
              <summary className="list-none cursor-pointer">
                <div className="grid grid-cols-1 sm:grid-cols-[7rem_8rem_1fr] items-start sm:items-center gap-1 sm:gap-0 px-6 py-4 hover:bg-wald-900/50 transition-colors">
                  {/* 날짜 */}
                  <span className="tabular-nums text-xs text-wald-500 sm:text-wald-400">
                    {formatDate(item.date, locale)}
                  </span>
                  {/* 태그 */}
                  <span className="inline-flex items-center">
                    <span
                      className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full"
                      style={{
                        background: CATEGORY_COLORS[item.category as AnnouncementCategory]?.bg || "rgba(107,114,128,0.12)",
                        color: CATEGORY_COLORS[item.category as AnnouncementCategory]?.text || "rgba(156,163,175,0.9)",
                        border: `1px solid ${CATEGORY_COLORS[item.category as AnnouncementCategory]?.border || "rgba(107,114,128,0.25)"}`,
                      }}
                    >
                      {localText(item.tag, locale)}
                    </span>
                  </span>
                  {/* 제목 */}
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-white group-open:text-wald-ember-light transition-colors leading-snug">
                      {localText(item.title, locale)}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="flex-shrink-0 text-wald-600 group-open:rotate-180 transition-transform duration-200"
                      aria-hidden
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </div>
              </summary>

              {/* 펼쳤을 때 본문 */}
              <div className="px-6 pb-6 pt-2 bg-wald-950/30">
                {/* excerpt */}
                <p className="text-sm text-wald-300/90 mb-4 leading-relaxed">
                  {linkifyText(localText(item.excerpt, locale))}
                </p>
                {/* body */}
                <div className="text-sm text-wald-300/80 leading-relaxed whitespace-pre-line border-t border-wald-800/50 pt-4">
                  {linkifyText(localText(item.body, locale))}
                </div>
              </div>
            </details>
          ))}

          {filtered.length === 0 && (
            <div className="px-6 py-16 text-center text-sm text-wald-500">
              {isKo ? "해당 카테고리에 소식이 없습니다." : "No announcements in this category."}
            </div>
          )}
        </div>

      </main>
    </div>
  );
}
