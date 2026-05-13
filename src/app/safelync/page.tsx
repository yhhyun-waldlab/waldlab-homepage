"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import WaldblattLogo from "@/components/ui/WaldblattLogo";
import Footer from "@/components/layout/Footer";
import type { Locale } from "@/lib/i18n";
import { createTranslator } from "@/lib/i18n";
import {
  SafeLyncIcon,
  SafeEntryIcon,
  SafeSyncIcon,
  SafeStepProIcon,
} from "@/components/ui/SafeIcons";
import {
  Video,
  FileSignature,
  Network,
  ShieldCheck,
  Globe2,
  Landmark,
  CheckCircle2,
  ArrowRight,
  Lock,
  ClipboardList,
  Building2,
  Server,
  Layers,
  ChevronRight,
  Star,
  Award,
  ArrowLeftRight,
  Cpu,
  GitMerge,
} from "lucide-react";

/* ─── Brand ──────────────────────────────────────────────────────── */
const BLUE = "#228BE6";
const BLUE_LIGHT = "rgba(34,139,230,0.15)";
const BLUE_BORDER = "rgba(34,139,230,0.3)";

/* ─── 메인 페이지 ────────────────────────────────────────────────── */
export default function SafeLyncPage() {
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

      {/* ── 1. HERO ─────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0d2b1e 0%, #0f3460 55%, #071710 100%)" }}
      >
        {/* 배경 글로우 */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[32rem] h-[32rem] rounded-full opacity-10"
            style={{ background: `radial-gradient(circle, ${BLUE}, transparent)` }} />
          <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full opacity-8"
            style={{ background: "radial-gradient(circle, #52b788, transparent)" }} />
        </div>

        {/* 상단 nav */}
        <div className="relative z-10 flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-8 pt-6 pb-2">
          <Link href="/" className="flex items-center">
            <WaldblattLogo height={54} variant="light" />
          </Link>
          <div className="flex items-center gap-4 text-xs text-wald-400">
            <Link href="/#services" className="hover:text-wald-200 transition-colors">
              {t("safelyncPage.nav.services")}
            </Link>
            <Link href="/contact"
              className="bg-wald-700 hover:bg-wald-600 text-wald-100 px-3 py-1.5 rounded-lg font-medium transition-colors">
              {t("safelyncPage.nav.contact")}
            </Link>
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
                  <SafeLyncIcon size={13} color="rgba(116,198,157,0.7)" stemColor="rgba(116,198,157,0.4)" />
                  {t("safelyncPage.hero.badge")}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
                  style={{ background: BLUE_LIGHT, border: `1px solid ${BLUE_BORDER}`, color: BLUE }}>
                  <Globe2 size={11} /> {t("safelyncPage.hero.badgeStandard")}
                </span>
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
                {t("safelyncPage.hero.title1")}<br />
                <span style={{ color: BLUE }}>{t("safelyncPage.hero.title2")}</span>
              </h1>
              <p className="text-wald-300 text-lg leading-relaxed mb-8">
                {t("safelyncPage.hero.desc1")}<br />
                {t("safelyncPage.hero.desc2")}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all hover:scale-105"
                  style={{ background: BLUE }}>
                  {t("safelyncPage.hero.ctaPrimary")} <ArrowRight size={16} />
                </Link>
                <button
                  onClick={() => document.getElementById("techbg")?.scrollIntoView({ behavior: "smooth" })}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-wald-200 border border-wald-700 hover:border-wald-500 transition-colors">
                  {t("safelyncPage.hero.ctaSecondary")}
                </button>
              </div>
            </div>

            {/* 통계 카드 */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Globe2,   statKey: "standard" },
                { icon: Landmark, statKey: "sector" },
                { icon: Network,  statKey: "global" },
                { icon: Star,     statKey: "years" },
              ].map(({ icon: Icon, statKey }) => (
                <div key={statKey}
                  className="rounded-2xl p-5 border"
                  style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(34,139,230,0.18)" }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                    style={{ background: BLUE_LIGHT }}>
                    <Icon size={18} style={{ color: BLUE }} />
                  </div>
                  <div className="text-xs text-wald-400 mb-1">{t(`safelyncPage.hero.stats.${statKey}.label`)}</div>
                  <div className="text-lg font-bold text-white">{t(`safelyncPage.hero.stats.${statKey}.value`)}</div>
                  <div className="text-xs text-wald-500 mt-0.5">{t(`safelyncPage.hero.stats.${statKey}.sub`)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. 핵심 가치 ─────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 bg-wald-50 text-wald-700 text-xs font-bold rounded-full border border-wald-200 tracking-widest uppercase mb-4">
              {t("safelyncPage.value.sectionBadge")}
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-wald-900 mb-4">
              {t("safelyncPage.value.title")}<br />
              <span style={{ color: BLUE }}>{t("safelyncPage.value.titleHighlight")}</span>
            </h2>
            <p className="text-wald-600 text-base max-w-2xl mx-auto leading-relaxed">
              {t("safelyncPage.value.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Video,         key: "consult",      accent: BLUE },
              { icon: FileSignature, key: "prescription", accent: "#7950F2" },
              { icon: Network,       key: "collab",       accent: "#20C997" },
            ].map(({ icon: Icon, key, accent }) => (
              <div key={key} className="bg-white rounded-2xl p-7 border border-wald-100 hover:border-wald-200 hover:shadow-lg transition-all group">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: `${accent}18`, border: `1.5px solid ${accent}30` }}>
                  <Icon size={22} style={{ color: accent }} />
                </div>
                <h3 className="text-lg font-bold text-wald-900 mb-3">{t(`safelyncPage.value.cards.${key}.title`)}</h3>
                <p className="text-wald-600 text-sm leading-relaxed">{t(`safelyncPage.value.cards.${key}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2.5. 협진 아키텍처 ───────────────────────────────────────── */}
      <section
        className="py-20 lg:py-28 relative overflow-hidden"
        style={{
          background: "#060f09",
          backgroundImage:
            "linear-gradient(rgba(34,139,230,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(34,139,230,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      >
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8">

          {/* 섹션 헤더 */}
          <div className="text-center mb-14">
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded text-[10px] font-black tracking-[0.25em] uppercase mb-5"
              style={{ background: "rgba(34,139,230,0.1)", border: `1px solid rgba(34,139,230,0.25)`, color: BLUE, fontFamily: "monospace" }}
            >
              <Cpu size={11} /> {t("safelyncPage.arch.sectionBadge")}
            </span>
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3 tracking-tight">
              {t("safelyncPage.arch.title")}
            </h2>
            <p className="text-xs text-wald-500 leading-relaxed font-mono max-w-xl mx-auto">
              {`// ${t("safelyncPage.arch.subtitle")}`}
            </p>
          </div>

          {/* SafeWay → SafeLync 계층 시각화 */}
          <div className="flex flex-col items-center mb-10">
            {/* SafeWay Foundation bar */}
            <div
              className="w-full max-w-lg rounded px-5 py-3 flex items-center justify-between"
              style={{ background: "rgba(130,201,30,0.08)", border: "1px solid rgba(130,201,30,0.25)" }}
            >
              <span className="text-[13px] font-mono font-bold tracking-widest uppercase" style={{ color: "#82C91E" }}>
                {t("safelyncPage.arch.foundationLabel")}
              </span>
              <span className="text-[11px] font-mono text-wald-500 tracking-widest">LAYER 0 / PLATFORM</span>
            </div>

            {/* 연결선 */}
            <div className="flex flex-col items-center py-1" style={{ gap: 0 }}>
              <div className="w-px h-5" style={{ background: "rgba(34,139,230,0.4)" }} />
              <div className="w-2 h-2 rotate-45 border-r-2 border-b-2" style={{ borderColor: BLUE }} />
            </div>

            {/* SafeLync Hub */}
            <div
              className="w-full max-w-lg rounded-xl px-6 py-4 flex items-center justify-between"
              style={{
                background: `linear-gradient(135deg, rgba(34,139,230,0.18) 0%, rgba(34,139,230,0.08) 100%)`,
                border: `1.5px solid ${BLUE_BORDER}`,
                boxShadow: `0 0 32px rgba(34,139,230,0.12)`,
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: BLUE_LIGHT }}>
                  <SafeLyncIcon size={20} color={BLUE} stemColor="rgba(255,255,255,0.3)" />
                </div>
                <div>
                  <div className="text-white font-bold text-sm">{t("safelyncPage.arch.hubLabel")}</div>
                  <div className="text-[10px] font-mono mt-0.5" style={{ color: `${BLUE}99` }}>LAYER 1 / SERVICE_HUB</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <GitMerge size={14} style={{ color: BLUE }} />
                <span className="text-[10px] font-mono font-bold" style={{ color: BLUE }}>4 CHANNELS</span>
              </div>
            </div>

            {/* 하단 연결선 */}
            <div className="flex flex-col items-center py-1" style={{ gap: 0 }}>
              <div className="w-px h-5" style={{ background: "rgba(34,139,230,0.3)" }} />
            </div>
          </div>

          {/* 협진 연결 카드 2×2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                connKey: "peer",
                ServiceIcon: SafeLyncIcon,
                serviceColor: BLUE,
                channelType: "PEER",
              },
              {
                connKey: "entry",
                ServiceIcon: SafeEntryIcon,
                serviceColor: "#FD7E14",
                channelType: "EVENT",
              },
              {
                connKey: "sync",
                ServiceIcon: SafeSyncIcon,
                serviceColor: "#FA5252",
                channelType: "STREAM",
              },
              {
                connKey: "step",
                ServiceIcon: SafeStepProIcon,
                serviceColor: "#7950F2",
                channelType: "FEED",
              },
            ].map(({ connKey, ServiceIcon, serviceColor, channelType }) => (
              <div
                key={connKey}
                className="rounded-xl p-5 group hover:border-white/10 transition-all"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderLeft: `3px solid ${serviceColor}60`,
                }}
              >
                {/* 상단: 번호 + 채널 타입 */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[13px] font-mono font-black" style={{ color: serviceColor }}>
                    {t(`safelyncPage.arch.connections.${connKey}.id`)}
                  </span>
                  <span
                    className="text-[11px] font-mono font-bold px-2 py-0.5 rounded"
                    style={{ background: `${serviceColor}15`, color: `${serviceColor}bb`, border: `1px solid ${serviceColor}30` }}
                  >
                    {channelType}
                  </span>
                </div>

                {/* 라우트 레이블 */}
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0"
                    style={{ background: `${serviceColor}20` }}>
                    <ServiceIcon size={14} color={serviceColor} stemColor="rgba(255,255,255,0.2)" />
                  </div>
                  <span className="font-mono text-sm font-bold text-white/90 tracking-tight">
                    {t(`safelyncPage.arch.connections.${connKey}.route`)}
                  </span>
                </div>

                {/* 채널 식별자 */}
                <div className="font-mono text-[12px] mb-3" style={{ color: `${serviceColor}70` }}>
                  {t(`safelyncPage.arch.connections.${connKey}.channel`)}
                </div>

                {/* 제목 + 설명 */}
                <div className="pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="text-base font-bold text-white mb-1.5">
                    {t(`safelyncPage.arch.connections.${connKey}.title`)}
                  </div>
                  <p className="text-[14px] text-wald-400 leading-relaxed">
                    {t(`safelyncPage.arch.connections.${connKey}.desc`)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 하단 기술 요약 바 */}
          <div
            className="mt-8 px-5 py-3 rounded flex flex-wrap items-center justify-between gap-3"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <span className="font-mono text-[10px] text-wald-600 tracking-widest">
              PROTOCOL: HL7_FHIR_R4 · REST/WebSocket · Event-driven · Async Messaging
            </span>
            <span className="font-mono text-[10px]" style={{ color: `${BLUE}80` }}>
              SafeWay Platform v1 /{" "}
              {locale === "ko" ? "국내외 의료정보 표준 준수" : "International Medical Standards Compliant"}
            </span>
          </div>
        </div>
      </section>

      {/* ── 3. TECHNOLOGY PILLARS ────────────────────────────────────── */}
      <section
        id="technology"
        className="py-20 lg:py-28 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8">

          {/* 섹션 헤더 */}
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-black tracking-[0.22em] uppercase mb-6"
              style={{ background: BLUE_LIGHT, border: `1.5px solid ${BLUE_BORDER}`, color: BLUE }}>
              <Cpu size={13} /> {t("safelyncPage.tech.sectionBadge")}
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-wald-900 mb-5 leading-tight">
              {t("safelyncPage.tech.title").split("\n").map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
            </h2>
            <p className="text-wald-500 text-base max-w-xl mx-auto leading-relaxed">
              {t("safelyncPage.tech.subtitle")}
            </p>
          </div>

          {/* 2×2 필라 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {([
              { key: "interop",  icon: ArrowLeftRight, accent: BLUE,       tags: ["HL7 FHIR R4 v4.0.1", "LOINC", "UCUM", "KCD"] },
              { key: "samd",     icon: ClipboardList,  accent: "#20C997",  tags: ["Unit Test", "SaMD", "식약처 / MFDS", "CE-MDR", "Traceability"] },
              { key: "security", icon: Lock,           accent: "#7950F2",  tags: ["Privacy by Design", "RBAC", "ISMS-P"] },
              { key: "org",      icon: Building2,      accent: "#FD7E14",  tags: ["Multi-tenancy", "Clinic Isolation", "Recursive Org Chart"] },
            ] as const).map(({ key, icon: Icon, accent, tags }) => (
              <div
                key={key}
                className="rounded-2xl p-7 border border-wald-100 hover:border-wald-200 hover:shadow-md transition-all group"
              >
                {/* 아이콘 + 뱃지 */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${accent}15` }}
                  >
                    <Icon size={20} style={{ color: accent }} />
                  </div>
                  <span
                    className="text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full"
                    style={{ background: `${accent}12`, color: accent, border: `1px solid ${accent}30` }}
                  >
                    {t(`safelyncPage.tech.pillars.${key}.badge`)}
                  </span>
                </div>

                {/* 제목 */}
                <h3 className="text-lg font-bold text-wald-900 mb-3">
                  {t(`safelyncPage.tech.pillars.${key}.title`)}
                </h3>

                {/* 설명 */}
                <p className="text-wald-500 text-sm leading-relaxed mb-5">
                  {t(`safelyncPage.tech.pillars.${key}.desc`)}
                </p>

                {/* 기술 태그 */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-wald-100">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold"
                      style={{ background: `${accent}10`, color: accent, border: `1px solid ${accent}25` }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. TECHNICAL BACKGROUND ──────────────────────────────────── */}
      <section
        id="techbg"
        className="py-20 lg:py-32 relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, #071710 0%, #0d2b1e 60%, #071710 100%)" }}
      >
        {/* 배경 워터마크 — WaldblattLogo */}
        <div className="absolute top-0 right-0 w-[480px] h-[480px] pointer-events-none opacity-[0.035] translate-x-24 -translate-y-12">
          <WaldblattLogo height={480} variant="light" animated={false} />
        </div>
        {/* 배경 글로우 장식 */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-0 w-80 h-80 rounded-full opacity-5"
            style={{ background: `radial-gradient(circle, ${BLUE}, transparent)` }} />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-5"
            style={{ background: "radial-gradient(circle, #52b788, transparent)" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">

          {/* 섹션 헤더 */}
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-black tracking-[0.22em] uppercase mb-6"
              style={{ background: BLUE_LIGHT, border: `1.5px solid ${BLUE_BORDER}`, color: BLUE }}>
              <Globe2 size={13} />
              {t("safelyncPage.techbg.sectionBadge")}
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-5 leading-tight">
              {t("safelyncPage.techbg.title")}
            </h2>
            <p className="text-wald-400 text-base max-w-2xl mx-auto leading-relaxed mb-8">
              {t("safelyncPage.techbg.subtitle")}
            </p>

            {/* 검증된 국가급 시스템 전문가 그룹 뱃지 */}
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 px-7 py-5 rounded-2xl"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(34,139,230,0.25)" }}>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: BLUE_LIGHT, border: `1px solid ${BLUE_BORDER}` }}>
                <Award size={22} style={{ color: BLUE }} />
              </div>
              <div className="text-left">
                <div className="text-white font-black text-base mb-0.5">
                  {t("safelyncPage.techbg.credentialBadge")}
                </div>
                <p className="text-wald-400 text-xs leading-relaxed max-w-md">
                  {t("safelyncPage.techbg.credentialDesc")}
                </p>
              </div>
            </div>
          </div>

          {/* Global + Public 두 기둥 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">

            {/* 글로벌 프로젝트 */}
            <div className="rounded-2xl p-7 lg:p-8"
              style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${BLUE_BORDER}` }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: BLUE_LIGHT }}>
                  <Globe2 size={20} style={{ color: BLUE }} />
                </div>
                <span className="text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full"
                  style={{ background: BLUE_LIGHT, color: BLUE, border: `1px solid ${BLUE_BORDER}` }}>
                  {t("safelyncPage.techbg.global.label")}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{t("safelyncPage.techbg.global.title")}</h3>
              <p className="text-wald-400 text-sm leading-relaxed mb-5">{t("safelyncPage.techbg.global.desc")}</p>

              <ul className="space-y-2.5">
                {["point1","point2","point3","point4"].map((pt) => (
                  <li key={pt} className="flex items-start gap-2.5 text-sm text-wald-300">
                    <ChevronRight size={14} className="mt-0.5 flex-shrink-0" style={{ color: BLUE }} />
                    {t(`safelyncPage.techbg.global.${pt}`)}
                  </li>
                ))}
              </ul>

              {/* 대륙 칩 */}
              <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t"
                style={{ borderColor: "rgba(34,139,230,0.15)" }}>
                {(locale === "ko"
                  ? ["유럽", "아시아", "남미"]
                  : ["Europe", "Asia", "Latin America"]
                ).map((c) => (
                  <span key={c} className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ background: "rgba(255,255,255,0.06)", color: "rgba(116,198,157,0.8)", border: "1px solid rgba(116,198,157,0.2)" }}>
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* 국내 공공기관 */}
            <div className="rounded-2xl p-7 lg:p-8"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(82,183,136,0.25)" }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(82,183,136,0.15)" }}>
                  <Landmark size={20} className="text-wald-300" />
                </div>
                <span className="text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full"
                  style={{ background: "rgba(82,183,136,0.12)", color: "#52b788", border: "1px solid rgba(82,183,136,0.25)" }}>
                  {t("safelyncPage.techbg.public.label")}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{t("safelyncPage.techbg.public.title")}</h3>
              <p className="text-wald-400 text-sm leading-relaxed mb-5">{t("safelyncPage.techbg.public.desc")}</p>

              {/* 4대 부문 섹터 칩 그리드 */}
              <div className="grid grid-cols-2 gap-3">
                {(["defense","corrections","public","emergency"] as const).map((sec) => (
                  <div key={sec}
                    className="rounded-xl p-3.5"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(116,198,157,0.12)" }}>
                    <div className="text-white font-bold text-sm mb-1">
                      {t(`safelyncPage.techbg.public.sectors.${sec}.name`)}
                    </div>
                    <div className="text-wald-400 text-xs leading-snug">
                      {t(`safelyncPage.techbg.public.sectors.${sec}.desc`)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 국제 표준 준수 스트립 */}
          <div className="rounded-2xl p-7 lg:p-8 mb-8"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(116,198,157,0.12)" }}>
            <div className="mb-5">
              <h3 className="text-white font-bold text-lg mb-2">{t("safelyncPage.techbg.standards.title")}</h3>
              <p className="text-wald-400 text-sm leading-relaxed max-w-2xl">
                {t("safelyncPage.techbg.standards.subtitle")}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {(["fhir","dicom","icd","openapi","pki"] as const).map((std) => (
                <div key={std}
                  className="rounded-xl px-4 py-3 text-center group hover:border-blue-500/40 transition-all"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-2"
                    style={{ background: BLUE_LIGHT }}>
                    <CheckCircle2 size={14} style={{ color: BLUE }} />
                  </div>
                  <div className="text-white text-xs font-black mb-0.5">
                    {t(`safelyncPage.techbg.standards.${std}.name`)}
                  </div>
                  <div className="text-wald-500 text-[10px] leading-snug">
                    {t(`safelyncPage.techbg.standards.${std}.desc`)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 이종 시스템 협진 하이라이트 */}
          <div className="rounded-2xl p-7 lg:p-8 mb-12"
            style={{
              background: "linear-gradient(135deg, rgba(34,139,230,0.12) 0%, rgba(13,43,30,0.8) 100%)",
              border: `1px solid ${BLUE_BORDER}`,
            }}>
            <div className="flex flex-col lg:flex-row items-start gap-6">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ background: BLUE_LIGHT, border: `1.5px solid ${BLUE_BORDER}` }}>
                  <Layers size={26} style={{ color: BLUE }} />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-3">
                  {t("safelyncPage.techbg.interop.title")}
                </h3>
                <p className="text-wald-300 text-sm leading-relaxed mb-5">
                  {t("safelyncPage.techbg.interop.desc")}
                </p>
                {/* 기술 태그 */}
                <div className="flex flex-wrap gap-2">
                  {["EMR", "HIS", "PACS"].map((tag) => (
                    <span key={tag}
                      className="px-3 py-1 rounded-full text-xs font-semibold font-mono"
                      style={{ background: "rgba(34,139,230,0.12)", color: `${BLUE}cc`, border: `1px solid ${BLUE_BORDER}` }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 요약 통계 바 */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {(["years","sectors","continents","standards"] as const).map((k) => (
              <div key={k}
                className="rounded-2xl p-5 text-center"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(116,198,157,0.12)" }}>
                <div className="text-2xl font-black mb-1" style={{ color: BLUE }}>
                  {t(`safelyncPage.techbg.stats.${k}.value`)}
                </div>
                <div className="text-wald-400 text-xs leading-snug">
                  {t(`safelyncPage.techbg.stats.${k}.label`)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. 핵심 기능 ─────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 bg-wald-50 text-wald-700 text-xs font-bold rounded-full border border-wald-200 tracking-widest uppercase mb-4">
              {t("safelyncPage.features.sectionBadge")}
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-wald-900 mb-4">
              {t("safelyncPage.features.title")}
            </h2>
            <p className="text-wald-600 text-base max-w-xl mx-auto">
              {t("safelyncPage.features.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: Video,         key: "video",         accent: BLUE },
              { icon: Server,        key: "emr",           accent: "#20C997" },
              { icon: FileSignature, key: "prescription",  accent: "#7950F2" },
              { icon: Lock,          key: "security",      accent: "#FA5252" },
              { icon: Building2,     key: "multisite",     accent: "#FD7E14" },
              { icon: ClipboardList, key: "audit",         accent: "#82C91E" },
            ].map(({ icon: Icon, key, accent }) => (
              <div key={key}
                className="rounded-2xl p-6 border border-wald-100 hover:border-wald-200 hover:shadow-md transition-all group">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${accent}12` }}>
                  <Icon size={20} style={{ color: accent }} />
                </div>
                <h3 className="font-bold text-wald-900 mb-2">
                  <span className="block text-[11px] font-bold tracking-[0.12em] uppercase text-wald-500 mb-1.5">
                    {t(`safelyncPage.features.cards.${key}.eyebrow`)}
                  </span>
                  {t(`safelyncPage.features.cards.${key}.title`)}
                </h3>
                <p className="text-wald-500 text-sm leading-relaxed mb-4">
                  {t(`safelyncPage.features.cards.${key}.desc`)}
                </p>
                <ul className="space-y-2.5 text-sm border-t border-wald-100 pt-4">
                  {([1, 2, 3] as const).map((i) => (
                    <li key={i} className="leading-snug">
                      <span className="font-semibold text-wald-800">
                        {t(`safelyncPage.features.cards.${key}.point${i}Label`)}:
                      </span>{" "}
                      <span className="text-wald-600">{t(`safelyncPage.features.cards.${key}.point${i}Desc`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. CTA ──────────────────────────────────────────────────── */}
      <section
        className="py-20 lg:py-28"
        style={{ background: "linear-gradient(135deg, #0f3460 0%, #0d2b1e 100%)" }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-8 text-center">
          <div className="w-14 h-14 rounded-2xl mx-auto mb-6 flex items-center justify-center"
            style={{ background: BLUE_LIGHT, border: `1px solid ${BLUE_BORDER}` }}>
            <ShieldCheck size={28} style={{ color: BLUE }} />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            {t("safelyncPage.cta.title1")}<br />
            {t("safelyncPage.cta.title2")}
          </h2>
          <p className="text-wald-300 text-base mb-8 leading-relaxed">
            {t("safelyncPage.cta.desc1")}<br />
            {t("safelyncPage.cta.desc2")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white transition-all hover:scale-105"
              style={{ background: BLUE }}>
              {t("safelyncPage.cta.primaryButton")} <ArrowRight size={18} />
            </Link>
            <Link href="/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-wald-200 border border-wald-700 hover:border-wald-500 transition-colors">
              {t("safelyncPage.cta.secondaryButton")}
            </Link>
          </div>
        </div>
      </section>

      <Footer t={t} />
    </main>
  );
}
