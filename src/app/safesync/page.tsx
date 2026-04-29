"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import WaldblattLogo from "@/components/ui/WaldblattLogo";
import Footer from "@/components/layout/Footer";
import type { Locale } from "@/lib/i18n";
import { createTranslator } from "@/lib/i18n";
import { SafeSyncIcon, SafeLyncIcon } from "@/components/ui/SafeIcons";
import {
  Activity,
  HeartPulse,
  PersonStanding,
  Brain,
  Leaf,
  Factory,
  ClipboardCheck,
  ArrowRight,
  ShieldCheck,
  BarChart3,
  FileText,
  Building2,
  Lock,
  Award,
  Network,
  ChevronDown,
  CheckCircle2,
  MoreVertical,
  RefreshCw,
  TrendingUp,
  Bell,
} from "lucide-react";

/* ─── Brand ──────────────────────────────────────────────────────── */
const GREEN = "#52b788";       // wald-400 — calm primary accent
const GREEN_LIGHT = "rgba(82,183,136,0.12)";
const GREEN_BORDER = "rgba(82,183,136,0.25)";
const RED_RISK = "#FA5252";    // risk indicator only
const DARK_BG  = "linear-gradient(135deg, #0a2016 0%, #17402a 50%, #0a2016 100%)";

/* ─── 워크케어 대시보드 목업 ──────────────────────────────────────── */
const MOCK_ROWS = [
  { name: "김○○", dept: "생산1팀", risk: "뇌심 고위험", status: "상담완료", level: "high" },
  { name: "이○○", dept: "물류팀",  risk: "근골 경계",   status: "상담예약", level: "mid"  },
  { name: "박○○", dept: "생산2팀", risk: "정상",        status: "완료",     level: "low"  },
  { name: "최○○", dept: "안전팀",  risk: "뇌심 중위험", status: "상담중",   level: "mid"  },
  { name: "정○○", dept: "관리팀",  risk: "정상",        status: "완료",     level: "low"  },
];

function DashboardMockup({ locale }: { locale: Locale }) {
  const isKo = locale === "ko";
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-2xl mx-auto text-sm">
      {/* 헤더 */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100"
        style={{ background: "#0d2b1e" }}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "rgba(82,183,136,0.2)" }}>
            <SafeSyncIcon size={18} color={GREEN} stemColor="rgba(255,255,255,0.2)" />
          </div>
          <div>
            <div className="text-[10px] text-wald-500 font-medium">{isKo ? "근로자 상시 건강관리" : "Worker Health Management"}</div>
            <div className="text-sm font-bold text-white">SafeSync {isKo ? "보건 대시보드" : "Health Dashboard"}</div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-wald-500">
          <span>2025.11.30</span>
          <Bell size={13} className="text-wald-500" />
          <MoreVertical size={14} className="text-wald-500" />
        </div>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-4 gap-0 border-b border-gray-100">
        {[
          { label: isKo ? "전체 이용자" : "Total Users",     value: "247", color: "text-wald-700", bg: "bg-wald-50" },
          { label: isKo ? "뇌심 고위험" : "CV High Risk",    value: "12",  color: "text-red-600",  bg: "bg-red-50"  },
          { label: isKo ? "근골 증상자" : "MSK Symptoms",    value: "38",  color: "text-orange-600",bg:"bg-orange-50"},
          { label: isKo ? "상담 완료"   : "Consults Done",   value: "189", color: "text-green-700",bg: "bg-green-50"},
        ].map((s) => (
          <div key={s.label} className={`${s.bg} px-3 py-3 text-center border-r last:border-r-0 border-gray-100`}>
            <div className={`text-xl font-black ${s.color}`}>{s.value}</div>
            <div className="text-[10px] text-gray-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* 보건 현황 테이블 */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold text-gray-700">{isKo ? "오늘의 관리 현황" : "Today's Health Status"}</h3>
          <button className="text-[10px] text-wald-600 flex items-center gap-1 font-medium">
            <RefreshCw size={9} /> {isKo ? "새로고침" : "Refresh"}
          </button>
        </div>
        <div className="rounded-xl overflow-hidden border border-gray-100">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {[isKo?"이름":"Name", isKo?"부서":"Dept", isKo?"위험도":"Risk", isKo?"상태":"Status"].map((h) => (
                  <th key={h} className="py-2 px-3 text-center text-gray-400 font-semibold text-[10px]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MOCK_ROWS.map((r, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-2 px-3 text-center text-gray-700 font-medium">{r.name}</td>
                  <td className="py-2 px-3 text-center text-gray-500">{r.dept}</td>
                  <td className="py-2 px-3 text-center">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      r.level === "high" ? "bg-red-100 text-red-600" :
                      r.level === "mid"  ? "bg-orange-100 text-orange-600" :
                      "bg-green-100 text-green-700"
                    }`}>
                      {r.risk}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-center text-gray-500 text-[10px]">{r.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-3">
          <button className="text-[10px] text-wald-600 flex items-center gap-1 border border-wald-200 rounded-lg px-3 py-1.5 hover:bg-wald-50 transition-colors">
            {isKo ? "전체 목록 보기" : "View all"} <ChevronDown size={9} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── 메인 페이지 ────────────────────────────────────────────────── */
export default function SafeSyncPage() {
  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window === "undefined") return "ko";
    const saved = window.localStorage.getItem("waldlab_locale");
    return saved === "en" || saved === "ko" ? saved : "ko";
  });
  const [messages, setMessages] = useState<Record<string, unknown> | null>(null);

  const setPersistedLocale = (next: Locale) => {
    setLocale(next);
    if (typeof window !== "undefined") {
      try { window.localStorage.setItem("waldlab_locale", next); } catch { /* ignore */ }
    }
  };

  useEffect(() => {
    import(`@/messages/${locale}.json`).then((mod) => setMessages(mod.default));
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

      {/* ── 1. HERO ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: DARK_BG }}>
        {/* 배경 글로우 — 부드럽게 */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full opacity-8"
            style={{ background: `radial-gradient(circle, ${GREEN}, transparent)` }} />
          <div className="absolute bottom-0 right-1/3 w-64 h-64 rounded-full opacity-5"
            style={{ background: "radial-gradient(circle, #1a4731, transparent)" }} />
        </div>

        {/* nav */}
        <div className="relative z-10 flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-8 pt-6 pb-2">
          <Link href="/"><WaldblattLogo height={54} variant="light" /></Link>
          <div className="flex items-center gap-4 text-xs text-wald-400">
            <Link href="/#services" className="hover:text-wald-200 transition-colors">
              {t("safesyncPage.nav.services")}
            </Link>
            <Link href="/contact"
              className="bg-wald-700 hover:bg-wald-600 text-wald-100 px-3 py-1.5 rounded-lg font-medium transition-colors">
              {t("safesyncPage.nav.contact")}
            </Link>
            <button type="button"
              onClick={() => setPersistedLocale(locale === "ko" ? "en" : "ko")}
              className="px-3 py-1.5 rounded-lg font-semibold border border-white/30 text-white/80 hover:bg-white/10">
              {locale === "ko" ? "EN" : "KO"}
            </button>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* 텍스트 */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
                  style={{ background: "rgba(82,183,136,0.15)", border: `1px solid ${GREEN_BORDER}`, color: GREEN }}>
                  <SafeSyncIcon size={12} color={GREEN} stemColor="rgba(255,255,255,0.2)" />
                  {t("safesyncPage.hero.badge1")}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-wald-800/80 border border-wald-700 text-wald-300">
                  <CheckCircle2 size={11} />
                  {t("safesyncPage.hero.badge2")}
                </span>
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
                {t("safesyncPage.hero.title1")}<br />
                <span style={{ color: GREEN }}>{t("safesyncPage.hero.title2")}</span>
              </h1>
              <p className="text-wald-300 text-lg leading-relaxed mb-8">
                {t("safesyncPage.hero.desc1")}<br />
                {t("safesyncPage.hero.desc2")}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-wald-950 transition-all hover:scale-105"
                  style={{ background: GREEN }}>
                  {t("safesyncPage.hero.ctaPrimary")} <ArrowRight size={16} />
                </Link>
                <button
                  onClick={() => document.getElementById("workcare7")?.scrollIntoView({ behavior: "smooth" })}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-wald-200 border border-wald-700 hover:border-wald-500 transition-colors">
                  {t("safesyncPage.hero.ctaSecondary")}
                </button>
              </div>
            </div>

            {/* 통계 카드 */}
            <div className="grid grid-cols-2 gap-4">
              {(["workcare","algo","safelync","legal"] as const).map((k) => (
                <div key={k} className="rounded-2xl p-5 border"
                  style={{ background: "rgba(255,255,255,0.04)", borderColor: GREEN_BORDER }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: GREEN_LIGHT }}>
                    {k === "workcare"  && <ClipboardCheck size={18} style={{ color: GREEN }} />}
                    {k === "algo"      && <Activity size={18} style={{ color: GREEN }} />}
                    {k === "safelync"  && <SafeLyncIcon size={18} color={GREEN} stemColor="rgba(255,255,255,0.2)" />}
                    {k === "legal"     && <FileText size={18} style={{ color: GREEN }} />}
                  </div>
                  <div className="text-xs text-wald-400 mb-1">{t(`safesyncPage.hero.stats.${k}.label`)}</div>
                  <div className="text-lg font-bold text-white">{t(`safesyncPage.hero.stats.${k}.value`)}</div>
                  <div className="text-xs text-wald-500 mt-0.5">{t(`safesyncPage.hero.stats.${k}.sub`)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. 7대 보건관리 영역 ─────────────────────────────────────── */}
      <section id="workcare7" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 bg-wald-50 text-wald-700 text-xs font-bold rounded-full border border-wald-200 tracking-widest uppercase mb-4">
              {t("safesyncPage.workcare7.sectionBadge")}
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-wald-900 mb-4">
              {t("safesyncPage.workcare7.title")}
            </h2>
            <p className="text-wald-600 text-base max-w-2xl mx-auto leading-relaxed">
              {t("safesyncPage.workcare7.subtitle")}
            </p>
          </div>

          {/* 7개 pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {(["basic","cerebro","musculo","mental"] as const).map((k) => {
              const icons = { basic: Activity, cerebro: HeartPulse, musculo: PersonStanding, mental: Brain };
              const colors = { basic: "#52b788", cerebro: RED_RISK, musculo: "#FD7E14", mental: "#7950F2" };
              const Icon = icons[k];
              const color = colors[k];
              return (
                <div key={k} className="bg-white rounded-2xl p-6 border border-wald-100 hover:border-wald-200 hover:shadow-md transition-all">
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${color}15` }}>
                      <Icon size={18} style={{ color }} />
                    </div>
                    <span className="text-[11px] font-black text-wald-400">{t(`safesyncPage.workcare7.pillars.${k}.num`)}</span>
                  </div>
                  <h3 className="font-bold text-wald-900 text-sm mb-2">{t(`safesyncPage.workcare7.pillars.${k}.name`)}</h3>
                  <p className="text-wald-500 text-xs leading-relaxed">{t(`safesyncPage.workcare7.pillars.${k}.desc`)}</p>
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {(["lifestyle","workenv","followup"] as const).map((k) => {
              const icons = { lifestyle: Leaf, workenv: Factory, followup: ClipboardCheck };
              const colors = { lifestyle: "#20C997", workenv: "#868E96", followup: GREEN };
              const Icon = icons[k];
              const color = colors[k];
              return (
                <div key={k} className="bg-white rounded-2xl p-6 border border-wald-100 hover:border-wald-200 hover:shadow-md transition-all">
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${color}15` }}>
                      <Icon size={18} style={{ color }} />
                    </div>
                    <span className="text-[11px] font-black text-wald-400">{t(`safesyncPage.workcare7.pillars.${k}.num`)}</span>
                  </div>
                  <h3 className="font-bold text-wald-900 text-sm mb-2">{t(`safesyncPage.workcare7.pillars.${k}.name`)}</h3>
                  <p className="text-wald-500 text-xs leading-relaxed">{t(`safesyncPage.workcare7.pillars.${k}.desc`)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 3. 위험도 알고리즘 ────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 bg-wald-50 text-wald-700 text-xs font-bold rounded-full border border-wald-200 tracking-widest uppercase mb-4">
              {t("safesyncPage.algorithm.sectionBadge")}
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-wald-900 mb-4">
              {t("safesyncPage.algorithm.title")}
            </h2>
            <p className="text-wald-600 text-base max-w-2xl mx-auto leading-relaxed">
              {t("safesyncPage.algorithm.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {(["cerebro","musculo"] as const).map((k) => {
              const accent = k === "cerebro" ? RED_RISK : "#FD7E14";
              const levels = (["low","mid","high","critical"] as const);
              const levelColors = [
                "bg-green-100 text-green-700",
                "bg-yellow-100 text-yellow-700",
                "bg-orange-100 text-orange-700",
                "bg-red-100 text-red-700",
              ];
              return (
                <div key={k} className="bg-white rounded-2xl overflow-hidden border border-wald-100 shadow-sm">
                  {/* 상단 컬러 바 */}
                  <div className="h-1" style={{ background: accent }} />
                  <div className="p-6">
                    <h3 className="font-bold text-wald-900 text-base mb-5">{t(`safesyncPage.algorithm.${k}.title`)}</h3>

                    {/* 입력 지표 */}
                    <div className="mb-4">
                      <div className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: accent }}>
                        {t(`safesyncPage.algorithm.${k}.inputsLabel`)}
                      </div>
                      <div className="bg-wald-50 rounded-xl p-3 text-xs text-wald-600 leading-relaxed">
                        {t(`safesyncPage.algorithm.${k}.inputs`)}
                      </div>
                    </div>

                    {/* 화살표 */}
                    <div className="flex justify-center my-3">
                      <ChevronDown size={18} style={{ color: accent }} />
                    </div>

                    {/* 평가 엔진 */}
                    <div className="mb-4 rounded-xl p-3 text-center"
                      style={{ background: `${accent}10`, border: `1px solid ${accent}30` }}>
                      <div className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: accent }}>
                        {t(`safesyncPage.algorithm.${k}.processLabel`)}
                      </div>
                      <div className="text-sm font-bold text-wald-900">{t(`safesyncPage.algorithm.${k}.process`)}</div>
                    </div>

                    {/* 화살표 */}
                    <div className="flex justify-center my-3">
                      <ChevronDown size={18} style={{ color: accent }} />
                    </div>

                    {/* 위험도 레벨 */}
                    <div className="flex gap-2 justify-center mb-4">
                      {levels.map((lv, i) => (
                        <span key={lv} className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${levelColors[i]}`}>
                          {t(`safesyncPage.algorithm.${k}.${lv}`)}
                        </span>
                      ))}
                    </div>

                    {/* 액션 */}
                    <div className="rounded-xl p-3 flex items-center gap-2"
                      style={{ background: `${accent}08`, border: `1px solid ${accent}20` }}>
                      <ArrowRight size={13} style={{ color: accent, flexShrink: 0 }} />
                      <span className="text-xs font-semibold" style={{ color: accent }}>
                        {t(`safesyncPage.algorithm.${k}.action`)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* SafeLync 연동 브릿지 */}
          <div className="rounded-2xl p-6 lg:p-8 flex flex-col md:flex-row items-start md:items-center gap-5"
            style={{
              background: "linear-gradient(135deg, #0d2b1e 0%, #1a4731 100%)",
              border: `1px solid ${GREEN_BORDER}`,
            }}>
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: GREEN_LIGHT, border: `1px solid ${GREEN_BORDER}` }}>
              <SafeLyncIcon size={24} color={GREEN} stemColor="rgba(255,255,255,0.2)" />
            </div>
            <div>
              <div className="text-xs font-bold tracking-widest uppercase mb-1.5" style={{ color: GREEN }}>
                {t("safesyncPage.algorithm.bridge.title")}
              </div>
              <p className="text-wald-200 text-sm leading-relaxed">
                {t("safesyncPage.algorithm.bridge.desc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. 기업용 보건 대시보드 ──────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-wald-50 text-wald-700 text-xs font-bold rounded-full border border-wald-200 tracking-widest uppercase mb-4">
              {t("safesyncPage.dashboard.sectionBadge")}
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-wald-900 mb-4">
              {t("safesyncPage.dashboard.title")}
            </h2>
            <p className="text-wald-600 text-base max-w-xl mx-auto leading-relaxed">
              {t("safesyncPage.dashboard.subtitle")}
            </p>
          </div>

          {/* 대시보드 목업 */}
          <div className="flex justify-center mb-12">
            <DashboardMockup locale={locale} />
          </div>

          {/* 대시보드 기능 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {([
              { key: "realtime", Icon: TrendingUp,     accent: GREEN    },
              { key: "stats",    Icon: BarChart3,      accent: "#228BE6"},
              { key: "legal",    Icon: FileText,       accent: "#7950F2"},
              { key: "multisite",Icon: Building2,      accent: "#FD7E14"},
            ] as const).map(({ key: k, Icon, accent }) => (
              <div key={k} className="bg-white rounded-2xl p-6 border border-wald-100 hover:border-wald-200 hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${accent}12` }}>
                  <Icon size={18} style={{ color: accent }} />
                </div>
                <h3 className="font-bold text-wald-900 text-sm mb-2">{t(`safesyncPage.dashboard.features.${k}.title`)}</h3>
                <p className="text-wald-500 text-xs leading-relaxed">{t(`safesyncPage.dashboard.features.${k}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. 기술적 배경 ───────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, #071710 0%, #0d2b1e 100%)" }}>
        {/* WaldblattLogo 워터마크 */}
        <div className="absolute top-0 right-0 w-[440px] h-[440px] pointer-events-none opacity-[0.03] translate-x-20 -translate-y-8">
          <WaldblattLogo height={440} variant="light" animated={false} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 text-xs font-bold rounded-full border tracking-widest uppercase mb-4"
              style={{ background: GREEN_LIGHT, borderColor: GREEN_BORDER, color: GREEN }}>
              {t("safesyncPage.techbg.sectionBadge")}
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              {t("safesyncPage.techbg.title")}
            </h2>
            <p className="text-wald-400 text-base max-w-2xl mx-auto leading-relaxed">
              {t("safesyncPage.techbg.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {([
              { k: "workcare",     Icon: Award,      accent: GREEN    },
              { k: "public",       Icon: ShieldCheck, accent: "#52b788"},
              { k: "integration",  Icon: Network,     accent: "#74c69d"},
              { k: "security",     Icon: Lock,        accent: "#52b788"},
            ] as const).map(({ k, Icon, accent }) => (
              <div key={k} className="rounded-2xl p-7 border hover:border-wald-600 transition-all"
                style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(116,198,157,0.12)" }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${accent}18` }}>
                    <Icon size={20} style={{ color: accent }} />
                  </div>
                  <span className="text-[10px] font-black tracking-widest uppercase px-2.5 py-1 rounded-full"
                    style={{ background: GREEN_LIGHT, color: GREEN, border: `1px solid ${GREEN_BORDER}` }}>
                    {t(`safesyncPage.techbg.pillars.${k}.badge`)}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-3">{t(`safesyncPage.techbg.pillars.${k}.title`)}</h3>
                <p className="text-wald-400 text-sm leading-relaxed">{t(`safesyncPage.techbg.pillars.${k}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. CTA ──────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28" style={{ background: DARK_BG }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-8 text-center">
          <div className="w-14 h-14 rounded-2xl mx-auto mb-6 flex items-center justify-center"
            style={{ background: GREEN_LIGHT, border: `1px solid ${GREEN_BORDER}` }}>
            <SafeSyncIcon size={28} color={GREEN} stemColor="rgba(255,255,255,0.2)" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            {t("safesyncPage.cta.title1")}<br />
            <span style={{ color: GREEN }}>{t("safesyncPage.cta.title2")}</span>
          </h2>
          <p className="text-wald-300 text-base mb-8 leading-relaxed">
            {t("safesyncPage.cta.desc1")}<br />
            {t("safesyncPage.cta.desc2")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-wald-950 transition-all hover:scale-105"
              style={{ background: GREEN }}>
              {t("safesyncPage.cta.primaryButton")} <ArrowRight size={18} />
            </Link>
            <Link href="/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-wald-200 border border-wald-700 hover:border-wald-500 transition-colors">
              {t("safesyncPage.cta.secondaryButton")}
            </Link>
          </div>
        </div>
      </section>

      <Footer t={t} />
    </main>
  );
}
