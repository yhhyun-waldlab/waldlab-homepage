"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import WaldblattLogo from "@/components/ui/WaldblattLogo";
import Footer from "@/components/layout/Footer";
import type { Locale } from "@/lib/i18n";
import { createTranslator } from "@/lib/i18n";
import {
  Shield,
  ShieldCheck,
  Lock,
  Globe2,
  Layers,
  Network,
  Activity,
  Zap,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Award,
  Key,
  GitBranch,
  BarChart3,
  Bell,
  Cpu,
  Eye,
} from "lucide-react";

/* ─── Brand ──────────────────────────────────────────────────────── */
const GREEN = "#82C91E";
const GREEN_LIGHT = "rgba(130,201,30,0.15)";
const GREEN_BORDER = "rgba(130,201,30,0.3)";

/* ─── 메인 페이지 ────────────────────────────────────────────────── */
export default function SafeWayPage() {
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
        /* ignore */
      }
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
  const ko = locale === "ko";

  return (
    <main className="min-h-screen bg-white">

      {/* ── 1. HERO ──────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #060f09 0%, #0d2b1e 45%, #071a10 100%)" }}
      >
        {/* 배경 글로우 */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 right-1/3 w-[28rem] h-[28rem] rounded-full opacity-[0.07]"
            style={{ background: `radial-gradient(circle, ${GREEN}, transparent)` }}
          />
          <div
            className="absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-5"
            style={{ background: "radial-gradient(circle, #52b788, transparent)" }}
          />
        </div>

        {/* 격자 오버레이 */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(130,201,30,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(130,201,30,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* 상단 nav */}
        <div className="relative z-10 flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-8 pt-6 pb-2">
          <Link href="/" className="flex items-center">
            <WaldblattLogo height={54} variant="light" />
          </Link>
          <div className="flex items-center gap-4 text-xs text-wald-400">
            <Link href="/#services" className="hover:text-wald-200 transition-colors">
              {ko ? "서비스" : "Services"}
            </Link>
            <Link
              href="/contact"
              className="bg-wald-700 hover:bg-wald-600 text-wald-100 px-3 py-1.5 rounded-lg font-medium transition-colors"
            >
              {ko ? "문의하기" : "Contact"}
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

        {/* Hero 본문 */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* 텍스트 */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-7">
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black tracking-[0.2em] uppercase"
                  style={{
                    background: GREEN_LIGHT,
                    border: `1px solid ${GREEN_BORDER}`,
                    color: GREEN,
                    fontFamily: "monospace",
                  }}
                >
                  <Layers size={10} /> LAYER 0 / PLATFORM
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-wald-800/80 border border-wald-700 rounded-full text-xs text-wald-300 font-bold">
                  <Shield size={11} /> SafeWay
                </span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-black text-white leading-none mb-3 tracking-tight">
                SafeWay
              </h1>
              <p className="text-xl lg:text-2xl font-medium text-wald-300 leading-snug mb-6">
                {ko
                  ? "Wald Lab 서비스 전체의\n근간 플랫폼"
                  : "The Proprietary Foundation\nUnderpinning All Wald Lab Services"}
              </p>
              <p className="text-wald-400 text-base leading-relaxed mb-8 max-w-xl">
                {ko
                  ? "SafeWay는 Wald Lab 디지털 헬스케어 시스템의 모든 서비스를 움직이는 핵심 엔진입니다. 모든 솔루션이 SafeWay 위에서 완벽하게 연결되고 작동합니다. 불필요한 복잡함은 과감히 덜어내고, 데이터의 본질과 보안에만 집중한 프레임워크. Wald Lab의 기술이 가장 강력하게 빛나는 기반입니다."
                  : "SafeWay is the core engine powering every service in Wald Lab's digital healthcare system. From SafeLync and SafeSync to SafeEntry, SafeStep, and SafePaws — every solution is seamlessly connected and operated on SafeWay. A framework that boldly strips away unnecessary complexity to focus solely on data integrity and security. The foundation where Wald Lab's technology shines at its most powerful."}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/#services"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-wald-950 transition-all hover:scale-105"
                  style={{ background: GREEN }}
                >
                  {ko ? "서비스 살펴보기" : "Explore Services"} <ArrowRight size={16} />
                </Link>
                <button
                  onClick={() =>
                    document.getElementById("security")?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-wald-200 border border-wald-700 hover:border-wald-500 transition-colors"
                >
                  {ko ? "보안 설계 보기" : "View Security Design"}
                </button>
              </div>
            </div>

            {/* 통계 카드 */}
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: Award,
                  val: "20+",
                  label: ko ? "년 원격 의료\n시스템 개발" : "Years Telehealth\nDevelopment",
                },
                {
                  icon: Globe2,
                  val: "FHIR",
                  label: ko ? "국제 표준\n데이터 설계" : "International Standard\nData Architecture",
                },
                {
                  icon: Lock,
                  val: "3×",
                  label: ko ? "계층 암호화\n보안 구조" : "Layered Encryption\nSecurity Structure",
                },
                {
                  icon: Activity,
                  val: ko ? "실시간" : "Real-time",
                  label: ko ? "데이터 분석\n인사이트" : "Data Analysis\nInsight",
                },
              ].map(({ icon: Icon, val, label }) => (
                <div
                  key={val}
                  className="rounded-2xl p-5 border"
                  style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(130,201,30,0.18)" }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                    style={{ background: GREEN_LIGHT }}
                  >
                    <Icon size={18} style={{ color: GREEN }} />
                  </div>
                  <div className="text-xl font-black text-white mb-1">{val}</div>
                  <div className="text-xs text-wald-400 leading-snug whitespace-pre-line">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. 핵심 철학 개요 ────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-surface">
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 bg-wald-50 text-wald-700 text-xs font-bold rounded-full border border-wald-200 tracking-widest uppercase mb-4">
              {ko ? "핵심 철학" : "Core Philosophy"}
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-wald-900 mb-5">
              {ko ? "복잡함을 걷어내고," : "Strip away complexity,"}
              <br />
              <span style={{ color: GREEN }}>
                {ko ? "본질에만 집중합니다" : "focus on what matters"}
              </span>
            </h2>
            <p className="text-wald-600 text-base max-w-2xl mx-auto leading-relaxed">
              {ko
                ? "SafeWay는 세 가지 핵심 원칙으로 설계되었습니다. 표준화된 데이터 구조, 타협 없는 보안, 그리고 행동 가능한 인사이트. 이 세 가지가 모든 Wald Lab 서비스의 기반입니다."
                : "SafeWay is built on three core principles: standardized data architecture, uncompromising security, and actionable insights. These three pillars form the foundation of every Wald Lab service."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                num: "01",
                icon: GitBranch,
                title: ko ? "데이터 표준 및 확장성" : "Data Standardization",
                subtitle: "Standardization",
                desc: ko
                  ? "HL7 FHIR 국제 표준을 데이터 설계 기준으로 삼아, 대형 병원·공공 시스템과의 상호운용을 염두에 둡니다."
                  : "HL7 FHIR as the data design baseline, with interoperability toward major hospital and public systems in mind.",
              },
              {
                num: "02",
                icon: Shield,
                title: ko ? "데이터 보안" : "Data Security",
                subtitle: "Security by Design",
                desc: ko
                  ? "설계 단계부터 데이터 보안을 최우선으로. 전송 구간 암호화와 저장 데이터 암호화로 개인 의료정보를 철저히 보호합니다."
                  : "Security first from the ground up. Transport encryption and data-at-rest encryption protect every piece of personal health information.",
              },
              {
                num: "03",
                icon: BarChart3,
                title: ko ? "실시간 인사이트" : "Real-time Insight",
                subtitle: "Less is More",
                desc: ko
                  ? "'Less is more' 철학에 따라 핵심 지표와 알림만 제공합니다. 노이즈 없이, 즉각적인 판단이 가능한 인터페이스입니다."
                  : "Following 'Less is more', we surface only essential metrics and alerts — giving decision-makers the clarity they need, instantly.",
              },
            ].map(({ num, icon: Icon, title, subtitle, desc }) => (
              <div
                key={num}
                className="bg-white rounded-2xl p-7 border border-wald-100 hover:border-wald-200 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{ background: GREEN_LIGHT, border: `1.5px solid ${GREEN_BORDER}` }}
                  >
                    <Icon size={22} style={{ color: GREEN }} />
                  </div>
                  <span className="text-3xl font-black" style={{ color: `${GREEN}30` }}>
                    {num}
                  </span>
                </div>
                <div
                  className="text-[10px] font-mono font-bold tracking-widest uppercase mb-1"
                  style={{ color: GREEN }}
                >
                  {subtitle}
                </div>
                <h3 className="text-lg font-bold text-wald-900 mb-3">{title}</h3>
                <p className="text-wald-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. PILLAR 1: STANDARDIZATION ─────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* 설명 */}
            <div>
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.22em] uppercase mb-5"
                style={{ background: GREEN_LIGHT, border: `1px solid ${GREEN_BORDER}`, color: GREEN }}
              >
                <Cpu size={11} /> 01 / STANDARDIZATION
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-wald-900 mb-5">
                {ko ? "데이터 표준 및 확장성" : "Data Standardization\n& Scalability"}
              </h2>
              <p className="text-wald-600 text-base leading-relaxed mb-8">
                {ko
                  ? "핵심 데이터 구조를 표준화하여 다양한 건강 측정 기기 및 외부 플랫폼과의 신속한 결합이 가능합니다. 파트너사와의 연동 비용을 최소화하고, 확장성을 최대화합니다."
                  : "By standardizing our core data structures, we enable rapid integration with diverse health devices and external platforms, minimizing integration costs while maximizing scalability."}
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: GREEN_LIGHT }}
                  >
                    <Globe2 size={18} style={{ color: GREEN }} />
                  </div>
                  <div>
                    <h4 className="font-bold text-wald-900 mb-1">FHIR-Ready Architecture</h4>
                    <p className="text-wald-600 text-sm leading-relaxed">
                      {ko
                        ? "데이터 설계에 HL7 FHIR 리소스 모델을 씁니다. 대형 병원·공공 의료 시스템과의 상호운용을 염두에 둡니다."
                        : "The HL7 FHIR resource model guides data design, with interoperability toward major hospitals and public systems in mind."}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: GREEN_LIGHT }}
                  >
                    <Network size={18} style={{ color: GREEN }} />
                  </div>
                  <div>
                    <h4 className="font-bold text-wald-900 mb-1">
                      {ko ? "유연한 연동 체계" : "Flexible Integration Framework"}
                    </h4>
                    <p className="text-wald-600 text-sm leading-relaxed">
                      {ko
                        ? "핵심 데이터 구조를 표준화하여 다양한 건강 측정 기기 및 외부 플랫폼과의 신속한 결합이 가능합니다."
                        : "Standardized core data structures enable rapid integration with diverse health measurement devices and external platforms."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 아키텍처 시각화 */}
            <div
              className="rounded-2xl p-8"
              style={{ background: "#060f09", border: "1px solid rgba(130,201,30,0.15)" }}
            >
              {/* eslint-disable react/jsx-no-comment-textnodes -- mono code-style label */}
              <div className="font-mono text-[10px] text-wald-600 mb-6 tracking-widest">
                // DATA ARCHITECTURE OVERVIEW
              </div>
              {/* eslint-enable react/jsx-no-comment-textnodes */}

              <div className="space-y-3">
                {/* External Systems */}
                <div
                  className="rounded-lg px-4 py-3 text-center"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <div className="text-[10px] font-mono text-wald-500 tracking-widest mb-2">
                    EXTERNAL SYSTEMS
                  </div>
                  <div className="flex flex-wrap justify-center gap-2">
                    {["Hospital EMR", "IoT Devices", "Public Health API"].map((s) => (
                      <span
                        key={s}
                        className="text-[10px] font-mono px-2 py-0.5 rounded"
                        style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.4)" }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 연결선 */}
                <div className="flex justify-center">
                  <div className="flex flex-col items-center">
                    <div className="w-px h-4" style={{ background: GREEN_BORDER }} />
                    <ChevronRight size={12} style={{ color: GREEN }} className="rotate-90" />
                  </div>
                </div>

                {/* FHIR Interface */}
                <div
                  className="rounded-lg px-4 py-3"
                  style={{ background: "rgba(130,201,30,0.08)", border: `1px solid ${GREEN_BORDER}` }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono font-bold" style={{ color: GREEN }}>
                      HL7 FHIR R4 Interface Layer
                    </span>
                    <span
                      className="text-[9px] font-mono px-1.5 py-0.5 rounded"
                      style={{ background: GREEN_LIGHT, color: GREEN }}
                    >
                      STANDARD
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {["Patient", "Observation", "DiagnosticReport", "MedicationRequest"].map((r) => (
                      <span
                        key={r}
                        className="text-[9px] font-mono px-1.5 py-0.5 rounded"
                        style={{ background: "rgba(130,201,30,0.1)", color: `${GREEN}99` }}
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 연결선 */}
                <div className="flex justify-center">
                  <div className="flex flex-col items-center">
                    <div className="w-px h-4" style={{ background: GREEN_BORDER }} />
                    <ChevronRight size={12} style={{ color: GREEN }} className="rotate-90" />
                  </div>
                </div>

                {/* SafeWay Core */}
                <div
                  className="rounded-lg px-4 py-3"
                  style={{ background: "rgba(130,201,30,0.12)", border: `1.5px solid ${GREEN}50` }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-mono font-black" style={{ color: GREEN }}>
                      SafeWay Core
                    </span>
                    <span className="text-[9px] font-mono text-wald-500">LAYER 0 / PLATFORM</span>
                  </div>
                  <p className="text-[10px] text-wald-500 mt-1 font-mono">
                    {ko ? "// 모든 Wald Lab 서비스의 기반" : "// Foundation for all Wald Lab services"}
                  </p>
                </div>

                {/* 연결선 */}
                <div className="flex justify-center">
                  <div className="flex flex-col items-center">
                    <div className="w-px h-4" style={{ background: GREEN_BORDER }} />
                    <ChevronRight size={12} style={{ color: GREEN }} className="rotate-90" />
                  </div>
                </div>

                {/* Services */}
                <div className="grid grid-cols-3 gap-2">
                  {(["SafeLync", "SafeEntry", "SafeSync"] as const).map((svc, i) => {
                    const colors = ["#228BE6", "#82C91E", "#FA5252"];
                    return (
                      <div
                        key={svc}
                        className="rounded-lg px-3 py-2 text-center"
                        style={{ background: `${colors[i]}15`, border: `1px solid ${colors[i]}30` }}
                      >
                        <div className="text-[10px] font-mono font-bold" style={{ color: colors[i] }}>
                          {svc}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div
                className="mt-5 pt-4 border-t flex items-center justify-between"
                style={{ borderColor: "rgba(255,255,255,0.06)" }}
              >
                <span className="font-mono text-[9px] text-wald-600">
                  HL7_FHIR_R4 · REST · WebSocket
                </span>
                <span className="font-mono text-[9px]" style={{ color: `${GREEN}60` }}>
                  SafeWay Platform v1
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. PILLAR 2: SECURITY BY DESIGN ─────────────────────────── */}
      <section
        id="security"
        className="py-20 lg:py-32 relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, #071710 0%, #0d2b1e 60%, #071710 100%)" }}
      >
        {/* 배경 워터마크 */}
        <div className="absolute top-0 right-0 w-[480px] h-[480px] pointer-events-none opacity-[0.03] translate-x-24 -translate-y-12">
          <WaldblattLogo height={480} variant="light" animated={false} />
        </div>

        {/* 배경 글로우 */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/4 left-0 w-80 h-80 rounded-full opacity-5"
            style={{ background: `radial-gradient(circle, ${GREEN}, transparent)` }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-5"
            style={{ background: "radial-gradient(circle, #52b788, transparent)" }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
          {/* 섹션 헤더 */}
          <div className="text-center mb-16">
            <span
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-black tracking-[0.22em] uppercase mb-6"
              style={{ background: GREEN_LIGHT, border: `1.5px solid ${GREEN_BORDER}`, color: GREEN }}
            >
              <Shield size={13} /> 02 / SECURITY BY DESIGN
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-5 leading-tight">
              <span style={{ color: GREEN }}>{ko ? "데이터 보안" : "Data Security"}</span>
            </h2>
            <p className="text-wald-400 text-base max-w-2xl mx-auto leading-relaxed">
              {ko
                ? "개인 의료 정보를 다루므로 국내외 보안 가이드라인을 설계와 운영에 반영합니다. 클라우드 사업자의 인프라 위에 S/W 측면의 데이터 암호화 등에 집중합니다."
                : "Personal health data is sensitive: we reflect domestic and international security guidelines in design and operations. We focus on software-layer data encryption and related controls on the cloud provider's infrastructure."}
            </p>

            {/* Security by Design 뱃지 */}
            <div
              className="inline-flex flex-col sm:flex-row items-center gap-4 px-7 py-5 rounded-2xl mt-8"
              style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${GREEN_BORDER}` }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: GREEN_LIGHT, border: `1px solid ${GREEN_BORDER}` }}
              >
                <ShieldCheck size={22} style={{ color: GREEN }} />
              </div>
              <div className="text-left">
                <div className="text-white font-black text-base mb-0.5">
                  {ko
                    ? "보안 설계 원칙 반영 (Security by Design)"
                    : "Security by Design Principle"}
                </div>
                <p className="text-wald-400 text-xs leading-relaxed max-w-md">
                  {ko
                    ? "설계 단계부터 글로벌 보안 표준을 최우선으로 고려한 아키텍처. 보안은 추가 기능이 아닌, 시스템의 근간입니다."
                    : "Architecture that prioritizes global security standards from the design stage. Security is not an add-on, but the foundation of the system."}
                </p>
              </div>
            </div>
          </div>

          {/* 3개 보안 계층 카드 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">

            {/* 계층 1: 글로벌 가이드라인 준용 */}
            <div
              className="rounded-2xl p-7"
              style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${GREEN_BORDER}` }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: GREEN_LIGHT }}
                >
                  <Award size={20} style={{ color: GREEN }} />
                </div>
                <div>
                  <div
                    className="text-[9px] font-mono font-bold tracking-widest"
                    style={{ color: GREEN }}
                  >
                    ALIGNED WITH
                  </div>
                  <div className="text-white font-bold text-sm">
                    {ko ? "글로벌 가이드라인 준용" : "Global Standards Aligned"}
                  </div>
                </div>
              </div>

              <p className="text-wald-400 text-sm leading-relaxed mb-5">
                {ko
                  ? "미(美) HIPAA 및 보건복지부 정보보호 가이드라인의 핵심 기술 요구사항에 맞춰 설계되었습니다. 우리는 행정적 절차보다 기술적 보안, 즉 데이터 자체의 암호화에 집중합니다."
                  : "Designed to align with the core technical requirements of US HIPAA and the Korean Ministry of Health & Welfare information security guidelines. We focus on technical security — data encryption — rather than administrative procedures."}
              </p>

              <div className="space-y-3">
                {[
                  {
                    label: "HIPAA",
                    desc: ko ? "핵심 기술 요구사항 준용" : "Core Technical Requirements Aligned",
                  },
                  {
                    label: ko ? "보건복지부 가이드라인" : "Korean MoHW Guidelines",
                    desc: ko ? "국내 기준 설계 반영" : "Domestic Standards Reflected",
                  },
                  {
                    label: ko ? "클라우드 물리 보안" : "Physical Security via Cloud",
                    desc: ko ? "AWS·Azure 인프라 위임" : "Delegated to AWS·Azure",
                  },
                ].map(({ label, desc }) => (
                  <div key={label} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle2
                      size={14}
                      className="mt-0.5 flex-shrink-0"
                      style={{ color: GREEN }}
                    />
                    <div>
                      <span className="text-wald-200 font-semibold">{label}</span>
                      <span className="text-wald-500 text-xs ml-1.5">{desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* 주의 문구 */}
              <div
                className="mt-5 pt-4 border-t text-[11px] text-wald-600 leading-relaxed"
                style={{ borderColor: "rgba(255,255,255,0.06)" }}
              >
                {ko
                  ? "※ 모든 항목을 인증 취득한 것이 아닌, 핵심 기술 요구사항에 맞춰 설계된 것임을 명시합니다."
                  : "※ This reflects design alignment with core technical requirements, not formal certification of all items."}
              </div>
            </div>

            {/* 계층 2: 전송 구간 보안 */}
            <div
              className="rounded-2xl p-7"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(82,183,136,0.25)",
              }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(82,183,136,0.15)" }}
                >
                  <Lock size={20} className="text-wald-300" />
                </div>
                <div>
                  <div className="text-[9px] font-mono font-bold tracking-widest text-wald-500">
                    TRANSPORT SECURITY
                  </div>
                  <div className="text-white font-bold text-sm">
                    {ko ? "전송 구간 보안" : "In-Transit Encryption"}
                  </div>
                </div>
              </div>

              <p className="text-wald-400 text-sm leading-relaxed mb-5">
                {ko
                  ? "데이터가 이동하는 모든 경로에서 암·복호화를 적용합니다. 서버-클라이언트 간 모든 통신은 다중 프로토콜로 보호됩니다."
                  : "Encryption is applied across all data transmission paths. All server-client communications are protected by multiple protocols."}
              </p>

              <div className="space-y-3">
                {[
                  {
                    proto: "IPSec",
                    desc: ko ? "네트워크 계층 패킷 암·복호화" : "Network-layer packet encryption",
                  },
                  {
                    proto: "SSL/TLS",
                    desc: ko
                      ? "전송 계층 암호화 (HTTPS 기반)"
                      : "Transport-layer encryption (HTTPS)",
                  },
                  {
                    proto: "WAP",
                    desc: ko ? "무선 구간 데이터 보안 프로토콜" : "Wireless segment security protocol",
                  },
                ].map(({ proto, desc }) => (
                  <div
                    key={proto}
                    className="flex items-center gap-3 rounded-xl px-4 py-3"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <span
                      className="font-mono text-xs font-black w-14 flex-shrink-0"
                      style={{ color: "#52b788" }}
                    >
                      {proto}
                    </span>
                    <span className="text-wald-400 text-xs">{desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 계층 3: 저장 데이터 암호화 */}
            <div
              className="rounded-2xl p-7"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(121,80,242,0.25)",
              }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(121,80,242,0.15)" }}
                >
                  <Key size={20} style={{ color: "#7950F2" }} />
                </div>
                <div>
                  <div
                    className="text-[9px] font-mono font-bold tracking-widest"
                    style={{ color: "#7950F2" }}
                  >
                    DATA AT REST
                  </div>
                  <div className="text-white font-bold text-sm">
                    {ko ? "저장 데이터 암호화" : "Data-at-Rest Encryption"}
                  </div>
                </div>
              </div>

              <p className="text-wald-400 text-sm leading-relaxed mb-5">
                {ko
                  ? "저장된 모든 의료 데이터는 용도와 민감도에 따라 적절한 알고리즘으로 암호화됩니다."
                  : "All stored medical data is encrypted with appropriate algorithms based on purpose and sensitivity level."}
              </p>

              <div className="space-y-3">
                <div
                  className="rounded-xl p-3"
                  style={{
                    background: "rgba(121,80,242,0.08)",
                    border: "1px solid rgba(121,80,242,0.2)",
                  }}
                >
                  <div
                    className="text-[10px] font-mono font-bold mb-2"
                    style={{ color: "#7950F2" }}
                  >
                    {ko ? "개인정보 — 대칭키 암호화" : "Personal Info — Symmetric Encryption"}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {["SEED", "ARIA-128", "ARIA-192", "ARIA-256"].map((algo) => (
                      <span
                        key={algo}
                        className="text-[10px] font-mono px-2 py-0.5 rounded"
                        style={{
                          background: "rgba(121,80,242,0.12)",
                          color: "#7950F2cc",
                          border: "1px solid rgba(121,80,242,0.2)",
                        }}
                      >
                        {algo}
                      </span>
                    ))}
                  </div>
                </div>
                <div
                  className="rounded-xl p-3"
                  style={{
                    background: "rgba(121,80,242,0.08)",
                    border: "1px solid rgba(121,80,242,0.2)",
                  }}
                >
                  <div
                    className="text-[10px] font-mono font-bold mb-2"
                    style={{ color: "#7950F2" }}
                  >
                    {ko ? "비밀번호 — 단방향 해시" : "Passwords — One-way Hash"}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {["SHA-224", "SHA-256", "SHA-384", "SHA-512"].map((algo) => (
                      <span
                        key={algo}
                        className="text-[10px] font-mono px-2 py-0.5 rounded"
                        style={{
                          background: "rgba(121,80,242,0.12)",
                          color: "#7950F2cc",
                          border: "1px solid rgba(121,80,242,0.2)",
                        }}
                      >
                        {algo}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 보안 집중 메시지 */}
          <div
            className="rounded-2xl p-7 lg:p-8"
            style={{
              background: `linear-gradient(135deg, rgba(130,201,30,0.08) 0%, rgba(13,43,30,0.8) 100%)`,
              border: `1px solid ${GREEN_BORDER}`,
            }}
          >
            <div className="flex flex-col lg:flex-row items-start gap-6">
              <div className="flex-shrink-0">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ background: GREEN_LIGHT, border: `1.5px solid ${GREEN_BORDER}` }}
                >
                  <Zap size={26} style={{ color: GREEN }} />
                </div>
              </div>
              <div className="flex-1">
                <div
                  className="text-[10px] font-mono font-bold tracking-widest mb-2"
                  style={{ color: GREEN }}
                >
                  WALD LAB&apos;S SECURITY FOCUS
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {ko
                    ? "우리가 집중하는 것: 데이터 자체의 보안"
                    : "Our Focus: Data-Level Security"}
                </h3>
                <p className="text-wald-300 text-sm leading-relaxed mb-5">
                  {ko
                    ? "물리 서버·네트워크 경계는 AWS·Azure 등 클라우드 사업자의 통제 범위에 둡니다. Wald Lab은 제품에서 데이터 암호화 등 애플리케이션·데이터 층 통제에 집중합니다."
                    : "Physical facilities and network perimeter sit within each cloud provider's scope; Wald Lab focuses on application- and data-layer controls such as encryption."}
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    ko ? "전송 구간 암호화" : "Transport Encryption",
                    ko ? "저장 데이터 암호화" : "Data-at-Rest Encryption",
                    ko ? "단방향 해시 처리" : "One-way Hash Processing",
                    ko ? "최소 권한 원칙" : "Principle of Least Privilege",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-semibold font-mono"
                      style={{ background: GREEN_LIGHT, color: GREEN, border: `1px solid ${GREEN_BORDER}` }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. PILLAR 3: REAL-TIME INSIGHT ──────────────────────────── */}
      <section className="py-20 lg:py-28 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

            {/* 대시보드 목업 */}
            <div
              className="rounded-2xl p-5 order-2 lg:order-1"
              style={{ background: "#f0f2f5", border: "1px solid rgba(0,0,0,0.06)" }}
            >
              <div className="bg-white rounded-xl shadow-sm p-4 mb-3">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm font-bold text-gray-900">
                    {ko ? "실시간 건강 모니터링" : "Real-time Health Monitoring"}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs text-gray-400">Live</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { label: ko ? "정상" : "Normal", val: "142", cls: "text-green-600", bg: "bg-green-50" },
                    { label: ko ? "주의" : "Warning", val: "8", cls: "text-yellow-600", bg: "bg-yellow-50" },
                    { label: ko ? "긴급" : "Critical", val: "2", cls: "text-red-600", bg: "bg-red-50" },
                  ].map(({ label, val, cls, bg }) => (
                    <div key={label} className={`${bg} rounded-xl p-3 text-center`}>
                      <div className={`text-2xl font-black ${cls}`}>{val}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{label}</div>
                    </div>
                  ))}
                </div>

                {/* 스파크라인 */}
                <div className="h-14 rounded-lg bg-gray-50 flex items-end gap-0.5 px-2 pb-2 overflow-hidden">
                  {[40, 65, 45, 80, 55, 70, 50, 85, 60, 75, 45, 90, 58, 72, 88].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm"
                      style={{
                        height: `${h}%`,
                        background: i === 14 ? GREEN : `${GREEN}55`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* 알림 목록 */}
              <div className="space-y-2">
                {[
                  {
                    level: ko ? "긴급" : "CRITICAL",
                    msg: ko
                      ? "김○○ · 혈압 이상 감지 — 즉각 조치 필요"
                      : "Patient A · Abnormal BP detected — immediate action required",
                    color: "#FA5252",
                    time: ko ? "방금 전" : "just now",
                  },
                  {
                    level: ko ? "주의" : "WARNING",
                    msg: ko
                      ? "이○○ · 산소포화도 93% — 모니터링 필요"
                      : "Patient B · SpO2 93% — monitoring required",
                    color: "#FD7E14",
                    time: "2m",
                  },
                ].map(({ level, msg, color, time }) => (
                  <div
                    key={level}
                    className="flex items-start gap-3 bg-white rounded-xl px-4 py-3 shadow-sm"
                    style={{ borderLeft: `3px solid ${color}` }}
                  >
                    <Bell size={14} style={{ color }} className="mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-black block mb-0.5" style={{ color }}>
                        {level}
                      </span>
                      <p className="text-xs text-gray-600 truncate">{msg}</p>
                    </div>
                    <span className="text-[10px] text-gray-400 flex-shrink-0">{time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 설명 */}
            <div className="order-1 lg:order-2">
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.22em] uppercase mb-5"
                style={{ background: GREEN_LIGHT, border: `1px solid ${GREEN_BORDER}`, color: GREEN }}
              >
                <Eye size={11} /> 03 / REAL-TIME INSIGHT
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-wald-900 mb-4">
                {ko ? "실시간 인사이트" : "Real-time Insight"}
              </h2>

              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-6"
                style={{ background: GREEN_LIGHT, border: `1px solid ${GREEN_BORDER}`, color: GREEN }}
              >
                &ldquo;Less is More&rdquo;
              </div>

              <p className="text-wald-600 text-base leading-relaxed mb-8">
                {ko
                  ? "'Less is more' 철학에 따라, 수집된 데이터를 실시간으로 분석하여 관리자가 즉각적으로 판단할 수 있는 핵심 지표와 알림만을 제공합니다. 데이터의 홍수가 아닌, 행동 가능한 인사이트를 제공합니다."
                  : "Following the 'Less is more' philosophy, we analyze collected data in real-time and surface only the essential metrics and alerts that enable immediate decision-making. Not a flood of data, but actionable insights."}
              </p>

              <div className="space-y-5">
                {[
                  {
                    icon: Activity,
                    title: ko ? "실시간 데이터 분석" : "Real-time Data Analysis",
                    desc: ko
                      ? "수집된 건강 데이터를 즉시 분석하여 이상 징후를 자동으로 감지합니다."
                      : "Instantly analyzes collected health data to automatically detect anomalies.",
                  },
                  {
                    icon: Bell,
                    title: ko ? "핵심 알림만 전달" : "Essential Alerts Only",
                    desc: ko
                      ? "노이즈를 걷어낸 핵심 알림만 관리자에게 전달합니다. 즉각적인 의사결정이 가능합니다."
                      : "Only essential, noise-free alerts reach administrators for immediate decision-making.",
                  },
                  {
                    icon: BarChart3,
                    title: ko ? "직관적 대시보드" : "Intuitive Dashboard",
                    desc: ko
                      ? "복잡한 데이터를 한눈에 파악할 수 있는 핵심 지표 중심의 인터페이스를 제공합니다."
                      : "Key metrics-focused interface for at-a-glance understanding of complex health data.",
                  },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: GREEN_LIGHT }}
                    >
                      <Icon size={18} style={{ color: GREEN }} />
                    </div>
                    <div>
                      <h4 className="font-bold text-wald-900 mb-1">{title}</h4>
                      <p className="text-wald-600 text-sm leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. CTA ────────────────────────────────────────────────────── */}
      <section
        className="py-20 lg:py-28"
        style={{ background: "linear-gradient(135deg, #071710 0%, #0d2b1e 100%)" }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-8 text-center">
          <div
            className="w-14 h-14 rounded-2xl mx-auto mb-6 flex items-center justify-center"
            style={{ background: GREEN_LIGHT, border: `1px solid ${GREEN_BORDER}` }}
          >
            <Shield size={28} style={{ color: GREEN }} />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            {ko ? "SafeWay가 뒷받침하는" : "Powered by SafeWay,"}
            <br />
            <span style={{ color: GREEN }}>
              {ko ? "Wald Lab의 모든 서비스" : "every Wald Lab service"}
            </span>
          </h2>
          <p className="text-wald-300 text-base mb-8 leading-relaxed">
            {ko
              ? "SafeWay는 Wald Lab이 라인업한 솔루션의 기반 플랫폼으로, 모든 서비스의 신뢰성과 보안을 책임집니다. SafeWay 위에서 구동되는 Wald Lab의 서비스를 만나보세요."
              : "SafeWay is the foundation platform for Wald Lab's lineup of solutions—ensuring reliability and security across every service. Explore Wald Lab services built on SafeWay."}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/#services"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-wald-950 transition-all hover:scale-105"
              style={{ background: GREEN }}
            >
              {ko ? "서비스 알아보기" : "Explore Services"} <ArrowRight size={18} />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-wald-200 border border-wald-700 hover:border-wald-500 transition-colors"
            >
              {ko ? "홈으로 돌아가기" : "Back to Home"}
            </Link>
          </div>
        </div>
      </section>

      <Footer t={t} />
    </main>
  );
}
