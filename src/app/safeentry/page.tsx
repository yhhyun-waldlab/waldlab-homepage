"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import WaldblattLogo from "@/components/ui/WaldblattLogo";
import Footer from "@/components/layout/Footer";
import type { Locale } from "@/lib/i18n";
import { createTranslator } from "@/lib/i18n";
import {
  ShieldCheck,
  Scale,
  FileText,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Activity,
  Thermometer,
  Droplets,
  HeartPulse,
  Users,
  BarChart3,
  RefreshCw,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreVertical,
  Wifi,
  Calendar,
  ArrowRight,
  Building2,
  Zap,
  Database,
  Bell,
} from "lucide-react";

/* ─── PMIS 진단 결과 화면 목업 ───────────────────────────────────────── */
function MeasurementMockup() {
  return (
    <div className="bg-[#F0F2F5] rounded-2xl overflow-hidden shadow-2xl w-full max-w-2xl mx-auto text-sm">
      {/* 헤더 */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 36 36" width="22" height="22" fill="none">
              <line x1="8" y1="12" x2="28" y2="12" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="10" y1="18" x2="26" y2="18" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="12" y1="24" x2="24" y2="24" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <div className="text-[10px] text-gray-500 font-medium leading-none mb-0.5">자율안전 솔루션</div>
            <div className="text-base font-bold text-gray-900 leading-none">PMIS 진단키트</div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>2025.11.28(금) 오전 08:15:55</span>
          <MoreVertical size={16} className="text-gray-400" />
        </div>
      </div>

      {/* 본문 */}
      <div className="p-3 flex gap-3">
        {/* 측정자 정보 */}
        <div className="bg-white rounded-xl p-3 w-28 flex-shrink-0 flex flex-col items-center gap-2 shadow-sm">
          <div className="text-xs font-semibold text-gray-700">측정자 정보</div>
          <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center">
            <Users size={24} className="text-gray-400" />
          </div>
          <div className="text-center">
            <div className="font-bold text-gray-900 text-sm">홍길동</div>
            <div className="text-xs text-gray-500">100456</div>
            <div className="text-xs text-gray-500">** 팀</div>
          </div>
        </div>

        {/* 측정 결과 카드 그리드 */}
        <div className="flex-1 grid grid-cols-2 gap-2">
          {/* 혈압 */}
          <div className="bg-white rounded-xl p-3 shadow-sm">
            <div className="flex items-center gap-1.5 mb-1.5">
              <div className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center">
                <Activity size={12} className="text-red-500" />
              </div>
              <span className="text-xs font-semibold text-gray-700">혈압 (BP)</span>
            </div>
            <div className="text-red-600 font-bold text-xl leading-tight">160 / 110
              <span className="text-xs font-normal text-gray-500 ml-1">mmHg</span>
            </div>
            <div className="text-xs text-gray-500 mt-0.5 mb-2">75 bpm</div>
            <button className="w-full bg-blue-600 text-white text-xs rounded-lg py-1.5 flex items-center justify-center gap-1 font-medium">
              <RefreshCw size={10} /> 재측정
            </button>
          </div>

          {/* 체온 */}
          <div className="bg-white rounded-xl p-3 shadow-sm">
            <div className="flex items-center gap-1.5 mb-1.5">
              <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center">
                <Thermometer size={12} className="text-blue-500" />
              </div>
              <span className="text-xs font-semibold text-gray-700">체온 (Temp)</span>
            </div>
            <div className="text-red-600 font-bold text-xl leading-tight">39.5
              <span className="text-xs font-normal text-gray-500 ml-1">°C</span>
            </div>
            <div className="mt-0.5 mb-2 h-4" />
            <button className="w-full bg-blue-600 text-white text-xs rounded-lg py-1.5 flex items-center justify-center gap-1 font-medium">
              <RefreshCw size={10} /> 재측정
            </button>
          </div>

          {/* 산소포화도 */}
          <div className="bg-white rounded-xl p-3 shadow-sm">
            <div className="flex items-center gap-1.5 mb-1.5">
              <div className="w-6 h-6 rounded-full bg-pink-50 flex items-center justify-center">
                <HeartPulse size={12} className="text-pink-500" />
              </div>
              <span className="text-xs font-semibold text-gray-700">산소포화도 (SpO2)</span>
            </div>
            <div className="text-red-600 font-bold text-xl leading-tight">91
              <span className="text-xs font-normal text-gray-500 ml-1">%</span>
            </div>
            <div className="text-xs text-gray-500 mt-0.5 mb-2">75 bpm</div>
            <button className="w-full bg-blue-600 text-white text-xs rounded-lg py-1.5 flex items-center justify-center gap-1 font-medium">
              <RefreshCw size={10} /> 재측정
            </button>
          </div>

          {/* 알코올 */}
          <div className="bg-white rounded-xl p-3 shadow-sm">
            <div className="flex items-center gap-1.5 mb-1.5">
              <div className="w-6 h-6 rounded-full bg-purple-50 flex items-center justify-center">
                <Droplets size={12} className="text-purple-500" />
              </div>
              <span className="text-xs font-semibold text-gray-700">알코올 (BAC)</span>
            </div>
            <div className="text-gray-900 font-bold text-xl leading-tight">0.03
              <span className="text-xs font-normal text-gray-500 ml-1">%</span>
            </div>
            <div className="mt-0.5 mb-2 h-4" />
            <button className="w-full bg-blue-600 text-white text-xs rounded-lg py-1.5 flex items-center justify-center gap-1 font-medium">
              <RefreshCw size={10} /> 재측정
            </button>
          </div>
        </div>
      </div>

      {/* 하단 결과 바 */}
      <div className="px-3 pb-3 flex gap-2">
        <div className="flex-1 bg-red-600 rounded-xl py-3 flex items-center justify-center">
          <span className="text-white font-bold text-sm">업무 배제 — 사유 : 고혈압 2기, 고열</span>
        </div>
        <button className="bg-blue-700 text-white rounded-xl px-5 font-bold text-sm">확인</button>
      </div>
    </div>
  );
}

/* ─── 관리자 대시보드 목업 ───────────────────────────────────────────── */
const RECORDS = [
  { name: "홍길동", id: "100456", measured: "2025.11.30 07:30", confirmed: "2025.11.30 07:30", result: "업무가능",  reason: "—" },
  { name: "홍길동", id: "100456", measured: "2025.11.30 07:30", confirmed: "2025.11.30 07:30", result: "업무배제",  reason: "고혈압, 고열" },
  { name: "홍길동", id: "100456", measured: "2025.11.30 07:30", confirmed: "2025.11.30 07:30", result: "업무배제",  reason: "알코올" },
  { name: "홍길동", id: "100456", measured: "2025.11.30 07:30", confirmed: "2025.11.30 07:30", result: "업무배제",  reason: "고혈압, 고열" },
  { name: "홍길동", id: "100456", measured: "2025.11.30 07:30", confirmed: "2025.11.30 07:30", result: "업무가능",  reason: "—" },
  { name: "홍길동", id: "100456", measured: "2025.11.30 07:30", confirmed: "2025.11.30 07:30", result: "업무가능",  reason: "—" },
];

function DashboardMockup() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-2xl mx-auto text-sm">
      {/* 헤더 */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 36 36" width="22" height="22" fill="none">
              <line x1="8" y1="12" x2="28" y2="12" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="10" y1="18" x2="26" y2="18" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="12" y1="24" x2="24" y2="24" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <div className="text-[10px] text-gray-500 font-medium leading-none mb-0.5">자율안전 솔루션</div>
            <div className="text-base font-bold text-gray-900 leading-none">PMIS 진단키트</div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>2025.11.28(금) 오전 08:15:55</span>
          <Wifi size={14} className="text-gray-400" />
          <MoreVertical size={16} className="text-gray-400" />
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-base font-bold text-gray-900 mb-3">측정기록 확인</h3>

        {/* 필터 바 */}
        <div className="bg-gray-50 rounded-xl p-3 mb-3 flex flex-wrap items-center gap-2">
          <span className="text-xs text-gray-600 font-medium">조회 기간</span>
          <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg px-2 py-1 text-xs">
            <span>2025.11.01</span>
            <Calendar size={10} className="text-gray-400" />
          </div>
          <span className="text-gray-400 text-xs">~</span>
          <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg px-2 py-1 text-xs">
            <span>2025.11.01</span>
            <Calendar size={10} className="text-gray-400" />
          </div>
          <button className="bg-blue-600 text-white text-xs rounded-lg px-2.5 py-1 font-bold">15일</button>
          <button className="bg-white border border-gray-200 text-xs rounded-lg px-2.5 py-1 text-gray-600">3개월</button>
          <button className="bg-white border border-gray-200 text-xs rounded-lg px-2.5 py-1 text-gray-600">6개월</button>
          <label className="flex items-center gap-1 text-xs text-gray-600 cursor-pointer">
            <div className="w-3.5 h-3.5 rounded bg-blue-600 flex items-center justify-center">
              <svg viewBox="0 0 10 10" width="8" height="8"><path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" /></svg>
            </div>
            당일업무 배제자
          </label>
          <div className="ml-auto flex items-center gap-1.5">
            <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-400">
              <Search size={10} /> 검색어 입력
            </div>
            <button className="bg-blue-700 text-white text-xs rounded-lg px-3 py-1 font-bold">조회</button>
          </div>
        </div>

        {/* 테이블 */}
        <div className="rounded-xl overflow-hidden border border-gray-100">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {["이름", "사번", "측정시간", "조치 확인시간", "결과", "배제사유"].map((h) => (
                  <th key={h} className="py-2.5 px-3 text-center text-gray-500 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RECORDS.map((r, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-2 px-3 text-center text-gray-800">{r.name}</td>
                  <td className="py-2 px-3 text-center text-gray-600">{r.id}</td>
                  <td className="py-2 px-3 text-center text-gray-600">{r.measured}</td>
                  <td className="py-2 px-3 text-center text-gray-600">{r.confirmed}</td>
                  <td className="py-2 px-3 text-center">
                    <span className={`font-bold ${r.result === "업무가능" ? "text-green-600" : "text-red-600"}`}>
                      {r.result}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-center text-gray-500">{r.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 페이지네이션 */}
        <div className="flex items-center justify-center gap-1 mt-3">
          {[ChevronsLeft, ChevronLeft].map((Icon, i) => (
            <button key={i} className="w-6 h-6 rounded flex items-center justify-center text-gray-400 hover:bg-gray-100">
              <Icon size={12} />
            </button>
          ))}
          {[1, 2, 3, 4, 5].map((p) => (
            <button key={p} className={`w-6 h-6 rounded text-xs font-medium ${p === 1 ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-gray-100"}`}>
              {p}
            </button>
          ))}
          {[ChevronRight, ChevronsRight].map((Icon, i) => (
            <button key={i} className="w-6 h-6 rounded flex items-center justify-center text-gray-400 hover:bg-gray-100">
              <Icon size={12} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── 메인 페이지 ────────────────────────────────────────────────────── */
export default function SafeEntryPage() {
  const [activeTab, setActiveTab] = useState<"measurement" | "dashboard">("measurement");

  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window === "undefined") return "ko";
    const saved = window.localStorage.getItem("waldlab_locale");
    return saved === "en" || saved === "ko" ? saved : "ko";
  });
  const [messages, setMessages] = useState<Record<string, unknown> | null>(null);

  const setPersistedLocale = (next: Locale) => {
    setLocale(next);
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem("waldlab_locale", next);
      } catch {
        // ignore storage errors
      }
    }
  };

  useEffect(() => {
    import(`@/messages/${locale}.json`)
      .then((mod) => setMessages(mod.default))
      .catch(() => import("@/messages/ko.json").then((mod) => setMessages(mod.default)));
  }, [locale]);

  if (!messages) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-10 h-10 rounded-xl bg-wald-800/60 animate-pulse" />
      </main>
    );
  }

  const t = createTranslator(messages);

  return (
    <main className="min-h-screen bg-white">

      {/* ── 1. HERO ─────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0d2b1e 0%, #1a4731 50%, #0a2016 100%)" }}
      >
        {/* 배경 노이즈 글로우 */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #82C91E, transparent)" }} />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #52b788, transparent)" }} />
        </div>

        {/* 간단 nav */}
        <div className="relative z-10 flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-8 pt-6 pb-2">
          <Link href="/" className="flex items-center">
            <WaldblattLogo height={54} variant="light" />
          </Link>
          <div className="flex items-center gap-4 text-xs text-wald-400">
            <Link href="/#services" className="hover:text-wald-200 transition-colors">{t("safeentryPage.nav.services")}</Link>
            <Link href="/contact" className="bg-wald-700 hover:bg-wald-600 text-wald-100 px-3 py-1.5 rounded-lg font-medium transition-colors">{t("safeentryPage.nav.contact")}</Link>
              <button
                type="button"
                onClick={() => setPersistedLocale(locale === "ko" ? "en" : "ko")}
                className="px-3 py-1.5 rounded-lg font-semibold transition-colors border border-white/30 text-white/80 hover:bg-white/10 hover:text-white"
              >
                {locale === "ko" ? "EN" : "KO"}
              </button>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* 텍스트 */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-wald-800/80 border border-wald-700 rounded-full text-xs text-wald-300 font-bold tracking-widest uppercase">
                  <ShieldCheck size={12} /> SafeEntry
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
                  style={{ background: "rgba(130,201,30,0.15)", border: "1px solid rgba(130,201,30,0.3)", color: "#82C91E" }}>
                  <Scale size={12} /> {t("safeentryPage.hero.badgeArticle")}
                </span>
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
                {t("safeentryPage.hero.titleLine1")}<br />
                <span style={{ color: "#82C91E" }}>{t("safeentryPage.hero.titleHighlight")}</span> {t("safeentryPage.hero.titleTime")}
              </h1>
              <p className="text-wald-300 text-lg leading-relaxed mb-8">
                {t("safeentryPage.hero.desc1")}<br />
                {t("safeentryPage.hero.desc2")}
                {t("safeentryPage.hero.desc3")}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-wald-950 transition-all hover:scale-105"
                  style={{ background: "#82C91E" }}>
                  {t("safeentryPage.hero.ctaPrimary")} <ArrowRight size={16} />
                </Link>
                <button
                  onClick={() => document.getElementById("mockup")?.scrollIntoView({ behavior: "smooth" })}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-wald-200 border border-wald-700 hover:border-wald-500 transition-colors">
                  {t("safeentryPage.hero.ctaSecondary")}
                </button>
              </div>
            </div>

            {/* 통계 카드들 */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Scale,         label: t("safeentryPage.stats.legal.label"),        value: t("safeentryPage.stats.legal.value"),        sub: t("safeentryPage.stats.legal.sub") },
                { icon: Clock,         label: t("safeentryPage.stats.deadline.label"),    value: t("safeentryPage.stats.deadline.value"),    sub: t("safeentryPage.stats.deadline.sub") },
                { icon: AlertTriangle, label: t("safeentryPage.stats.exemption.label"),   value: t("safeentryPage.stats.exemption.value"),   sub: t("safeentryPage.stats.exemption.sub") },
                {
                  icon: FileText,
                  label: t("safeentryPage.stats.items.label"),
                  value: (
                    <>
                      {t("safeentryPage.stats.items.valueMain")}
                      <span className="text-xs font-normal opacity-90">{t("safeentryPage.stats.items.note")}</span>
                    </>
                  ),
                  sub: t("safeentryPage.stats.items.sub"),
                },
              ].map(({ icon: Icon, label, value, sub }) => (
                <div key={label}
                  className="rounded-2xl p-5 border"
                  style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(116,198,157,0.15)" }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                    style={{ background: "rgba(130,201,30,0.15)" }}>
                    <Icon size={18} style={{ color: "#82C91E" }} />
                  </div>
                  <div className="text-xs text-wald-400 mb-1">{label}</div>
                  <div className="text-lg font-bold text-white">{value}</div>
                  <div className="text-xs text-wald-500 mt-0.5">{sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. 법적 의무 섹션 ────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 bg-wald-50 text-wald-700 text-xs font-bold rounded-full border border-wald-200 tracking-widest uppercase mb-4">
              {t("safeentryPage.legal.sectionBadge")}
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-wald-900 mb-4">
              {t("safeentryPage.legal.titleLine1")}<br />
              {t("safeentryPage.legal.titleLine2")}
            </h2>
            <p className="text-wald-600 text-base max-w-2xl mx-auto">
              {t("safeentryPage.legal.intro1")}
              <br />
              {t("safeentryPage.legal.intro2")}
            </p>
          </div>

          {/* 3열 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: Scale,
                color: "bg-wald-800",
                iconColor: "text-wald-300",
                badge: t("safeentryPage.legal.cards.employer.badge"),
                title: t("safeentryPage.legal.cards.employer.title"),
                items: [
                  t("safeentryPage.legal.cards.employer.items.1"),
                  t("safeentryPage.legal.cards.employer.items.2"),
                  t("safeentryPage.legal.cards.employer.items.3"),
                  t("safeentryPage.legal.cards.employer.items.4"),
                ],
              },
              {
                icon: CheckCircle2,
                color: "bg-wald-700",
                iconColor: "text-wald-300",
                badge: t("safeentryPage.legal.cards.exemption.badge"),
                title: t("safeentryPage.legal.cards.exemption.title"),
                items: [
                  t("safeentryPage.legal.cards.exemption.items.1"),
                  t("safeentryPage.legal.cards.exemption.items.2"),
                  t("safeentryPage.legal.cards.exemption.items.3"),
                  t("safeentryPage.legal.cards.exemption.items.4"),
                ],
              },
              {
                icon: FileText,
                color: "bg-wald-600",
                iconColor: "text-wald-200",
                badge: t("safeentryPage.legal.cards.report.badge"),
                title: t("safeentryPage.legal.cards.report.title"),
                items: [
                  t("safeentryPage.legal.cards.report.items.1"),
                  t("safeentryPage.legal.cards.report.items.2"),
                  t("safeentryPage.legal.cards.report.items.3"),
                  t("safeentryPage.legal.cards.report.items.4"),
                ],
              },
            ].map(({ icon: Icon, color, iconColor, badge, title, items }) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-wald-100 hover:border-wald-300 hover:shadow-lg transition-all">
                <div className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center mb-4`}>
                  <Icon size={20} className={iconColor} />
                </div>
                <div className="text-xs text-wald-500 font-bold tracking-wide mb-2">{badge}</div>
                <h3 className="text-lg font-bold text-wald-900 mb-4">{title}</h3>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-wald-700">
                      <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: "#82C91E" }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* 면제 기준 인포그래픽 */}
          <div className="bg-wald-900 rounded-2xl p-6 lg:p-8">
            <div className="flex items-center gap-2 mb-6">
              <AlertTriangle size={18} style={{ color: "#82C91E" }} />
              <h3 className="text-white font-bold text-base">{t("safeentryPage.legal.exemptionSummary.title")}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl p-5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(130,201,30,0.2)" }}>
                <div className="text-xs font-bold tracking-widest mb-2" style={{ color: "#82C91E" }}>
                  {t("safeentryPage.legal.exemptionSummary.leftHeading")}
                </div>
                <div className="text-wald-300 text-sm leading-relaxed">
                  {t("safeentryPage.legal.exemptionSummary.leftHazards")}
                </div>
              </div>
              <div className="rounded-xl p-5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(116,198,157,0.15)" }}>
                <div className="text-xs font-bold tracking-widest mb-2 text-wald-300">
                  {t("safeentryPage.legal.exemptionSummary.rightHeading")}
                </div>
                <div className="text-wald-400 text-sm leading-relaxed">
                  {t("safeentryPage.legal.exemptionSummary.rightDesc1")}
                  <br />
                  {t("safeentryPage.legal.exemptionSummary.rightDesc2")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. 실제 UI 목업 섹션 ─────────────────────────────────────────── */}
      <section id="mockup"
        className="py-20 lg:py-28"
        style={{ background: "linear-gradient(180deg, #ffffff 0%, #f5f7f5 100%)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-wald-50 text-wald-700 text-xs font-bold rounded-full border border-wald-200 tracking-widest uppercase mb-4">
              {t("safeentryPage.mockup.sectionBadge")}
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-wald-900 mb-4">
              {t("safeentryPage.mockup.title")}
            </h2>
            <p className="text-wald-600 text-base max-w-xl mx-auto">
              {t("safeentryPage.mockup.captionLine1")}
              <br />
              {t("safeentryPage.mockup.captionLine2")}
            </p>
          </div>

          {/* 탭 */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex gap-1 bg-wald-100 p-1 rounded-xl">
              {[
                { key: "measurement", label: t("safeentryPage.mockup.tabs.measurement"), icon: Activity },
                { key: "dashboard",   label: t("safeentryPage.mockup.tabs.dashboard"),   icon: BarChart3 },
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key as typeof activeTab)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    activeTab === key
                      ? "bg-wald-800 text-white shadow"
                      : "text-wald-600 hover:text-wald-800"
                  }`}
                >
                  <Icon size={15} />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* 목업 영역 */}
          <div className="flex justify-center">
            {activeTab === "measurement" ? <MeasurementMockup /> : <DashboardMockup />}
          </div>

          {/* 측정 항목 설명 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {[
              { icon: Activity,  color: "text-red-500",    bg: "bg-red-50",    label: t("safeentryPage.mockup.items.bp.label"),    desc: t("safeentryPage.mockup.items.bp.desc") },
              { icon: Thermometer, color: "text-blue-500", bg: "bg-blue-50",   label: t("safeentryPage.mockup.items.temp.label"),  desc: t("safeentryPage.mockup.items.temp.desc") },
              { icon: HeartPulse, color: "text-pink-500",  bg: "bg-pink-50",   label: t("safeentryPage.mockup.items.spo2.label"), desc: t("safeentryPage.mockup.items.spo2.desc") },
              { icon: Droplets,  color: "text-purple-500", bg: "bg-purple-50", label: t("safeentryPage.mockup.items.bac.label"),  desc: t("safeentryPage.mockup.items.bac.desc") },
            ].map(({ icon: Icon, color, bg, label, desc }) => (
              <div key={label} className="bg-white rounded-xl p-4 border border-wald-100 text-center">
                <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                  <Icon size={18} className={color} />
                </div>
                <div className="font-bold text-wald-900 text-sm mb-1">{label}</div>
                <div className="text-wald-500 text-xs leading-relaxed whitespace-pre-line">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. 주요 기능 & 특장점 ────────────────────────────────────────── */}
      <section
        className="py-20 lg:py-28"
        style={{ background: "linear-gradient(180deg, #0d2b1e 0%, #071710 100%)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 text-xs font-bold rounded-full border tracking-widest uppercase mb-4"
              style={{ background: "rgba(130,201,30,0.15)", borderColor: "rgba(130,201,30,0.3)", color: "#82C91E" }}>
              {t("safeentryPage.features.sectionBadge")}
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              {t("safeentryPage.features.title")}
            </h2>
            <p className="text-wald-400 text-base max-w-xl mx-auto">
              {t("safeentryPage.features.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: Zap,
                title: t("safeentryPage.features.cards.instant.title"),
                desc: t("safeentryPage.features.cards.instant.desc"),
              },
              {
                icon: Scale,
                title: t("safeentryPage.features.cards.legal.title"),
                desc: t("safeentryPage.features.cards.legal.desc"),
              },
              {
                icon: Bell,
                title: t("safeentryPage.features.cards.site.title"),
                desc: t("safeentryPage.features.cards.site.desc"),
              },
              {
                icon: Database,
                title: t("safeentryPage.features.cards.storage.title"),
                desc: t("safeentryPage.features.cards.storage.desc"),
              },
              {
                icon: BarChart3,
                title: t("safeentryPage.features.cards.dashboard.title"),
                desc: t("safeentryPage.features.cards.dashboard.desc"),
              },
              {
                icon: Building2,
                title: t("safeentryPage.features.cards.multiSite.title"),
                desc: t("safeentryPage.features.cards.multiSite.desc"),
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title}
                className="rounded-2xl p-6 border group hover:border-[rgba(130,201,30,0.4)] transition-all duration-300"
                style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(116,198,157,0.1)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-colors group-hover:bg-[rgba(130,201,30,0.2)]"
                  style={{ background: "rgba(130,201,30,0.1)" }}>
                  <Icon size={18} style={{ color: "#82C91E" }} />
                </div>
                <h3 className="text-white font-bold mb-2">{title}</h3>
                <p className="text-wald-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. 도입 전후 비교 ────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-surface">
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-wald-900 mb-3">{t("safeentryPage.comparison.title")}</h2>
            <p className="text-wald-600 text-base">{t("safeentryPage.comparison.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Before */}
            <div className="bg-white rounded-2xl p-6 border border-red-100">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertTriangle size={16} className="text-red-500" />
                </div>
                <span className="font-bold text-gray-800">{t("safeentryPage.comparison.beforeLabel")}</span>
              </div>
              <ul className="space-y-3">
                {[
                  t("safeentryPage.comparison.before.items.1"),
                  t("safeentryPage.comparison.before.items.2"),
                  t("safeentryPage.comparison.before.items.3"),
                  t("safeentryPage.comparison.before.items.4"),
                  t("safeentryPage.comparison.before.items.5"),
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="mt-0.5 flex-shrink-0 text-red-400">✕</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            {/* After */}
            <div className="bg-white rounded-2xl p-6 border border-wald-200">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-full bg-wald-100 flex items-center justify-center">
                  <CheckCircle2 size={16} className="text-wald-600" />
                </div>
                <span className="font-bold text-wald-900">{t("safeentryPage.comparison.afterLabel")}</span>
              </div>
              <ul className="space-y-3">
                {[
                  t("safeentryPage.comparison.after.items.1"),
                  t("safeentryPage.comparison.after.items.2"),
                  t("safeentryPage.comparison.after.items.3"),
                  t("safeentryPage.comparison.after.items.4"),
                  t("safeentryPage.comparison.after.items.5"),
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2 text-sm text-wald-700">
                    <span className="mt-0.5 flex-shrink-0" style={{ color: "#82C91E" }}>✓</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. CTA ──────────────────────────────────────────────────────── */}
      <section
        className="py-20 lg:py-28"
        style={{ background: "linear-gradient(135deg, #1a4731, #0d2b1e)" }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-8 text-center">
          <div className="w-14 h-14 rounded-2xl mx-auto mb-6 flex items-center justify-center"
            style={{ background: "rgba(130,201,30,0.15)", border: "1px solid rgba(130,201,30,0.3)" }}>
            <ShieldCheck size={28} style={{ color: "#82C91E" }} />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            {t("safeentryPage.cta.titleLine1")}<br />
            {t("safeentryPage.cta.titleLine2")}
          </h2>
          <p className="text-wald-300 text-base mb-8 leading-relaxed">
            {t("safeentryPage.cta.desc1")}<br />
            {t("safeentryPage.cta.desc2")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-wald-950 transition-all hover:scale-105"
              style={{ background: "#82C91E" }}>
              {t("safeentryPage.cta.primaryButton")} <ArrowRight size={18} />
            </Link>
            <Link href="/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-wald-200 border border-wald-700 hover:border-wald-500 transition-colors">
              {t("safeentryPage.cta.secondaryButton")}
            </Link>
          </div>
        </div>
      </section>

      {/* ── 7. 전략적 파트너십 섹션 ─────────────────────────────────── */}
      <section
        className="py-14 lg:py-18 border-t"
        style={{ background: "#f8f9f8", borderColor: "rgba(0,0,0,0.06)" }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-8">

          {/* 레이블 */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px flex-1 max-w-16" style={{ background: "rgba(0,0,0,0.1)" }} />
            <span
              className="text-[10px] font-semibold tracking-[0.22em]"
              style={{
                color: "rgba(80,80,80,0.55)",
                fontFamily: "'Manrope','Inter',sans-serif",
                textTransform: "uppercase",
              }}
            >
              {locale === "ko" ? "전략적 기술 제휴" : "Strategic Technology Alliance"}
            </span>
            <div className="h-px flex-1 max-w-16" style={{ background: "rgba(0,0,0,0.1)" }} />
          </div>

          {/* 핵심 문구 */}
          <p
            className="text-center text-sm leading-relaxed mb-10"
            style={{
              color: "rgba(40,40,40,0.55)",
              fontFamily: "'Manrope','Inter',sans-serif",
              letterSpacing: "0.01em",
            }}
          >
            {locale === "ko"
              ? "(주)발트랩과 (주)방실소프트의 전략적 기술 제휴로 탄생한 솔루션입니다."
              : "A solution born from a strategic technology alliance between Wald Lab and BangsilSoft."}
          </p>

          {/* 로고 슬롯 */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">

            {/* Wald Lab */}
            <div
              className="flex items-center justify-center px-8 py-5 rounded-2xl flex-1 max-w-[220px]"
              style={{
                background: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(0,0,0,0.07)",
              }}
            >
              <WaldblattLogo height={40} variant="dark" animated={false} />
            </div>

            {/* 구분자 */}
            <div className="flex sm:flex-col items-center gap-1.5 flex-shrink-0">
              <div className="w-8 h-px sm:w-px sm:h-8" style={{ background: "rgba(0,0,0,0.1)" }} />
              <span
                className="text-[11px] font-light"
                style={{ color: "rgba(0,0,0,0.2)", fontFamily: "'Manrope','Inter',sans-serif" }}
              >
                ×
              </span>
              <div className="w-8 h-px sm:w-px sm:h-8" style={{ background: "rgba(0,0,0,0.1)" }} />
            </div>

            {/* BangsilSoft */}
            <div
              className="flex items-center justify-center px-8 py-5 rounded-2xl flex-1 max-w-[220px]"
              style={{
                background: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(0,0,0,0.07)",
              }}
            >
              <span
                className="text-base font-bold tracking-tight"
                style={{ color: "rgba(40,40,40,0.7)", fontFamily: "'Manrope','Inter',sans-serif" }}
              >
                Bangsil<span style={{ color: "rgba(40,40,40,0.45)" }}>Soft</span>
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 푸터 (문의하기와 동일) */}
      <Footer t={t} />
    </main>
  );
}
