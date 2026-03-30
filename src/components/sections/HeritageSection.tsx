"use client";

/**
 * HeritageSection
 *
 * 발트랩 대표 현영호의 25년+ 전문성을 시각화한 섹션.
 * — 핵심 수치에 useCountUp 카운터 애니메이션 적용
 * — 섹션 헤더·콘텐츠 블록에 FadeIn 전환 효과 적용
 * — 다국어(ko / en) 완전 지원: t() 함수로 모든 텍스트 처리
 *
 * ⚠ 중요 : 이 섹션의 모든 이력·수치는 법인(주식회사 발트랩)의 실적이 아니라
 *   대표자 및 핵심 인력의 개인 전문성(Expertise)에 기반합니다.
 */

import { useState } from "react";
import {
  Globe,
  Award,
  Layers,
  TrendingUp,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";
import FadeIn from "@/components/ui/FadeIn";

const LIME = "#82C91E";

/* ── 서브 컴포넌트: 카운터 애니메이션 통계 카드 ─────────────────────── */
function StatCard({
  target, suffix, label, sub, duration,
}: { target: number; suffix: string; label: string; sub: string; duration: number }) {
  const [hovered, setHovered] = useState(false);
  const { count, triggerRef } = useCountUp(target, duration);

  return (
    <div
      ref={triggerRef}
      className="rounded-2xl p-6 text-center transition-all duration-300"
      style={{
        background: hovered ? "rgba(130,201,30,0.07)" : "rgba(255,255,255,0.03)",
        border: `1px solid ${hovered ? "rgba(130,201,30,0.4)" : "rgba(116,198,157,0.12)"}`,
        transform: hovered ? "translateY(-3px)" : "none",
        boxShadow: hovered ? "0 8px 24px rgba(130,201,30,0.1)" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="text-4xl sm:text-5xl font-black mb-1"
        style={{
          background: "linear-gradient(130deg, #82C91E 0%, #52b788 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-white font-semibold text-sm mb-1">{label}</div>
      <div className="text-[11px]" style={{ color: "rgba(116,198,157,0.5)" }}>{sub}</div>
    </div>
  );
}

/* ── Props ──────────────────────────────────────────────────────────── */
interface HeritageSectionProps {
  t: (key: string) => string;
}

export default function HeritageSection({ t }: HeritageSectionProps) {

  /* ── 핵심 수치 ─────────────────────────────────────────────────── */
  const KEY_STATS = [
    { target: 25,  suffix: t("heritage.stat0Suffix"), label: t("heritage.stat0Label"), sub: t("heritage.stat0Sub"), duration: 1800 },
    { target: 62,  suffix: t("heritage.stat1Suffix"), label: t("heritage.stat1Label"), sub: t("heritage.stat1Sub"), duration: 1600 },
    { target: 673, suffix: t("heritage.stat2Suffix"), label: t("heritage.stat2Label"), sub: t("heritage.stat2Sub"), duration: 2200 },
    { target: 7,   suffix: t("heritage.stat3Suffix"), label: t("heritage.stat3Label"), sub: t("heritage.stat3Sub"), duration: 1200 },
  ];

  /* ── 커리어 타임라인 ────────────────────────────────────────────── */
  const TIMELINE = [
    { year: "1998", title: t("heritage.tl0Title"), org: t("heritage.tl0Org"), desc: t("heritage.tl0Desc"), side: "top"    as const },
    { year: "2003", title: t("heritage.tl1Title"), org: t("heritage.tl1Org"), desc: t("heritage.tl1Desc"), side: "bottom" as const },
    { year: "2005", title: t("heritage.tl2Title"), org: t("heritage.tl2Org"), desc: t("heritage.tl2Desc"), side: "top"    as const },
    { year: "2010", title: t("heritage.tl3Title"), org: t("heritage.tl3Org"), desc: t("heritage.tl3Desc"), side: "bottom" as const },
    { year: "2015", title: t("heritage.tl4Title"), org: t("heritage.tl4Org"), desc: t("heritage.tl4Desc"), side: "top"    as const },
    { year: "2017", title: t("heritage.tl5Title"), org: t("heritage.tl5Org"), desc: t("heritage.tl5Desc"), side: "bottom" as const },
    { year: "2022", title: t("heritage.tl6Title"), org: t("heritage.tl6Org"), desc: t("heritage.tl6Desc"), side: "top"    as const },
    { year: "2024", title: t("heritage.tl7Title"), org: t("heritage.tl7Org"), desc: t("heritage.tl7Desc"), side: "bottom" as const, highlight: true },
  ];

  /* ── 글로벌 프로젝트 ─────────────────────────────────────────────── */
  const GLOBAL_PROJECTS = [
    { country: t("heritage.gp0Country"), cc: "ua", org: "KOICA",                           project: t("heritage.gp0Project"), year: "2005~" },
    { country: t("heritage.gp1Country"), cc: "mn", org: "EDCF · KHIDI",                    project: t("heritage.gp1Project"), year: "2015~2021" },
    { country: t("heritage.gp2Country"), cc: "kh", org: "ODA · KOICA · UN ESCAP · KOTRA", project: t("heritage.gp2Project"), year: "2010~" },
    { country: t("heritage.gp3Country"), cc: "th", org: "KHIDI",                           project: t("heritage.gp3Project"), year: "2017~2020" },
    { country: t("heritage.gp4Country"), cc: "ae", org: t("heritage.gp4Org"),               project: t("heritage.gp4Project"), year: "2017" },
    { country: t("heritage.gp5Country"), cc: "br", org: t("heritage.gp5Org"),               project: t("heritage.gp5Project"), year: "2015" },
  ];

  /* ── 철학의 계승 ─────────────────────────────────────────────────── */
  const EVOLUTION = [
    {
      phase: "Phase 1", period: "2003 – 2022",
      title: t("heritage.ev0Title"), subtitle: t("heritage.ev0Subtitle"),
      points: [t("heritage.ev0P0"), t("heritage.ev0P1"), t("heritage.ev0P2")],
    },
    {
      phase: "Phase 2", period: "2005 – 2023",
      title: t("heritage.ev1Title"), subtitle: t("heritage.ev1Subtitle"),
      points: [t("heritage.ev1P0"), t("heritage.ev1P1"), t("heritage.ev1P2")],
    },
    {
      phase: "Phase 3", period: "2024 –",
      title: t("heritage.ev2Title"), subtitle: t("heritage.ev2Subtitle"),
      points: [t("heritage.ev2P0"), t("heritage.ev2P1"), t("heritage.ev2P2")],
      highlight: true,
    },
  ];

  return (
    <section
      id="heritage"
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ background: "#071710" }}
    >
      {/* 배경 장식 */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(130,201,30,0.025) 1px, transparent 1px),
              linear-gradient(90deg, rgba(130,201,30,0.025) 1px, transparent 1px)
            `,
            backgroundSize: "72px 72px",
          }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(to right, transparent, rgba(130,201,30,0.15), transparent)" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ══ 섹션 헤더 ════════════════════════════════════════════════ */}
        <FadeIn direction="up" className="text-center mb-14">
          <span
            className="inline-block px-4 py-1.5 text-[11px] font-bold rounded-full
              tracking-[0.2em] uppercase mb-5"
            style={{
              background: "rgba(130,201,30,0.08)",
              border: "1px solid rgba(130,201,30,0.25)",
              color: LIME,
            }}
          >
            {t("heritage.badge")}
          </span>

          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-5 leading-tight">
            {t("heritage.titleLine1")}
            <span
              style={{
                background: "linear-gradient(130deg, #82C91E 0%, #52b788 60%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {t("heritage.titleHighlight")}
            </span>
          </h2>

          <p className="text-base max-w-2xl mx-auto mb-6 leading-relaxed"
            style={{ color: "rgba(116,198,157,0.65)" }}>
            {t("heritage.desc")}
          </p>

          {/* 면책 고지 칩 */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[11px]"
            style={{
              background: "rgba(234,179,8,0.07)",
              border: "1px solid rgba(234,179,8,0.25)",
              color: "rgba(234,179,8,0.8)",
            }}
          >
            <AlertCircle size={13} />
            {t("heritage.chipPrefix")}
            <strong>{t("heritage.chipBold")}</strong>
            {t("heritage.chipSuffix")}
          </div>
        </FadeIn>

        {/* ══ 핵심 수치 4개 ════════════════════════════════════════════ */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {KEY_STATS.map((s, i) => (
            <FadeIn key={s.target} delay={i * 100} direction="up">
              <StatCard {...s} />
            </FadeIn>
          ))}
        </div>

        {/* ══ 커리어 타임라인 ══════════════════════════════════════════ */}
        <FadeIn direction="up" className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp size={18} style={{ color: LIME }} />
            <h3 className="text-lg font-bold text-white">{t("heritage.timelineTitle")}</h3>
          </div>

          {/* 데스크탑: 수평 타임라인 */}
          <div className="hidden lg:block relative">
            {/* 중앙 선 */}
            <div
              className="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2"
              style={{ background: "linear-gradient(to right, transparent, rgba(130,201,30,0.3), rgba(130,201,30,0.6), rgba(130,201,30,0.3), transparent)" }}
            />

            <div className="flex items-center justify-between relative">
              {TIMELINE.map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center"
                  style={{ width: `${100 / TIMELINE.length}%` }}
                >
                  {/* 상단 텍스트 */}
                  {item.side === "top" && (
                    <div className="pb-4 text-center px-1" style={{ minHeight: "90px" }}>
                      <div className="text-[11px] font-semibold mb-0.5"
                        style={{ color: item.highlight ? LIME : "rgba(116,198,157,0.7)" }}>
                        {item.year}
                      </div>
                      <div className="text-white text-[12px] font-bold leading-tight mb-1">
                        {item.title}
                      </div>
                      <div className="text-[10px] leading-snug"
                        style={{ color: "rgba(116,198,157,0.5)" }}>
                        {item.org}
                      </div>
                    </div>
                  )}
                  {item.side === "bottom" && <div style={{ minHeight: "90px" }} />}

                  {/* 도트 */}
                  <div
                    className="w-3 h-3 rounded-full relative z-10 flex-shrink-0"
                    style={{
                      background: item.highlight ? LIME : "rgba(130,201,30,0.5)",
                      boxShadow: item.highlight
                        ? `0 0 12px ${LIME}, 0 0 24px rgba(130,201,30,0.4)`
                        : "none",
                    }}
                  />

                  {/* 하단 텍스트 */}
                  {item.side === "bottom" && (
                    <div className="pt-4 text-center px-1" style={{ minHeight: "90px" }}>
                      <div className="text-[11px] font-semibold mb-0.5"
                        style={{ color: item.highlight ? LIME : "rgba(116,198,157,0.7)" }}>
                        {item.year}
                      </div>
                      <div className="text-white text-[12px] font-bold leading-tight mb-1">
                        {item.title}
                      </div>
                      <div className="text-[10px] leading-snug"
                        style={{ color: "rgba(116,198,157,0.5)" }}>
                        {item.org}
                      </div>
                    </div>
                  )}
                  {item.side === "top" && <div style={{ minHeight: "90px" }} />}
                </div>
              ))}
            </div>
          </div>

          {/* 모바일: 수직 타임라인 */}
          <div className="lg:hidden flex flex-col gap-0">
            {TIMELINE.map((item, i) => (
              <div key={i} className="flex gap-4">
                {/* 라인 + 도트 */}
                <div className="flex flex-col items-center">
                  <div
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1"
                    style={{
                      background: item.highlight ? LIME : "rgba(130,201,30,0.5)",
                      boxShadow: item.highlight ? `0 0 8px ${LIME}` : "none",
                    }}
                  />
                  {i < TIMELINE.length - 1 && (
                    <div
                      className="w-px flex-1 mt-1"
                      style={{ background: "rgba(116,198,157,0.2)", minHeight: "32px" }}
                    />
                  )}
                </div>
                {/* 텍스트 */}
                <div className="pb-6">
                  <div className="text-[11px] font-semibold mb-0.5"
                    style={{ color: item.highlight ? LIME : "rgba(116,198,157,0.6)" }}>
                    {item.year}
                  </div>
                  <div className="text-white text-sm font-bold mb-0.5">{item.title}</div>
                  <div className="text-[11px] mb-1"
                    style={{ color: "rgba(116,198,157,0.55)" }}>{item.org}</div>
                  <div className="text-[11px] leading-relaxed"
                    style={{ color: "rgba(116,198,157,0.4)" }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* ══ 글로벌 프로젝트 ══════════════════════════════════════════ */}
        <FadeIn direction="up" className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Globe size={18} style={{ color: LIME }} />
            <h3 className="text-lg font-bold text-white">{t("heritage.globalTitle")}</h3>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full"
              style={{ background: "rgba(130,201,30,0.1)", color: LIME, border: "1px solid rgba(130,201,30,0.25)" }}>
              {t("heritage.globalBadge")}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {GLOBAL_PROJECTS.map((proj) => (
              <div
                key={proj.country}
                className="rounded-xl p-5 group transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(116,198,157,0.1)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.border = "1px solid rgba(130,201,30,0.3)";
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(130,201,30,0.05)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.border = "1px solid rgba(116,198,157,0.1)";
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.025)";
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://flagcdn.com/32x24/${proj.cc}.png`}
                    width={32}
                    height={24}
                    alt={proj.country}
                    className="rounded-sm flex-shrink-0"
                    style={{ objectFit: "cover" }}
                  />
                  <div>
                    <div className="text-white font-bold text-sm">{proj.country}</div>
                    <div className="text-[10px] font-semibold"
                      style={{ color: LIME }}>{proj.org}</div>
                  </div>
                  <div className="ml-auto text-[10px]"
                    style={{ color: "rgba(116,198,157,0.4)" }}>{proj.year}</div>
                </div>
                <p className="text-[12px] leading-relaxed"
                  style={{ color: "rgba(116,198,157,0.6)" }}>
                  {proj.project}
                </p>
              </div>
            ))}
          </div>

          {/* 협력 기관 태그 */}
          <div className="mt-6 flex flex-wrap gap-2">
            {["KOICA", "EDCF (수출입은행)", "ODA", "KOTRA", "KHIDI", "UN ESCAP", t("heritage.gp5Org"), "보건복지부"].map((org) => (
              <span
                key={org}
                className="px-3 py-1 rounded-full text-[10px] font-medium"
                style={{
                  background: "rgba(116,198,157,0.06)",
                  border: "1px solid rgba(116,198,157,0.15)",
                  color: "rgba(116,198,157,0.6)",
                }}
              >
                {org}
              </span>
            ))}
          </div>
        </FadeIn>

        {/* ══ 철학의 계승: 비트케어 → SafeWay ══════════════════════════ */}
        <FadeIn direction="up" className="mb-14">
          <div className="flex items-center gap-3 mb-8">
            <Layers size={18} style={{ color: LIME }} />
            <h3 className="text-lg font-bold text-white">{t("heritage.evolutionTitle")}</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-0 relative">
            {/* 연결 화살표 (데스크탑) */}
            <div className="hidden lg:flex absolute top-10 left-[calc(33.333%-12px)] items-center z-10">
              <div className="w-6 h-px" style={{ background: "rgba(130,201,30,0.4)" }} />
              <ChevronRight size={16} style={{ color: "rgba(130,201,30,0.4)" }} />
            </div>
            <div className="hidden lg:flex absolute top-10 left-[calc(66.666%-12px)] items-center z-10">
              <div className="w-6 h-px" style={{ background: LIME }} />
              <ChevronRight size={16} style={{ color: LIME }} />
            </div>

            {EVOLUTION.map((phase, i) => (
              <div
                key={phase.phase}
                className="p-6 lg:p-7 rounded-2xl lg:rounded-none first:lg:rounded-l-2xl last:lg:rounded-r-2xl
                  mb-3 lg:mb-0 transition-all duration-300"
                style={{
                  background: phase.highlight
                    ? "rgba(130,201,30,0.08)"
                    : "rgba(255,255,255,0.025)",
                  border: `1px solid ${phase.highlight ? "rgba(130,201,30,0.35)" : "rgba(116,198,157,0.1)"}`,
                  borderRight: i < 2 ? "none" : undefined,
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{
                      background: phase.highlight ? "rgba(130,201,30,0.2)" : "rgba(116,198,157,0.08)",
                      color: phase.highlight ? LIME : "rgba(116,198,157,0.6)",
                    }}
                  >
                    {phase.phase}
                  </span>
                  <span className="text-[11px]"
                    style={{ color: "rgba(116,198,157,0.45)" }}>{phase.period}</span>
                </div>

                <h4
                  className="text-base font-bold mb-1"
                  style={{ color: phase.highlight ? LIME : "white" }}
                >
                  {phase.title}
                </h4>
                <p
                  className="text-[12px] font-medium mb-4"
                  style={{ color: phase.highlight ? "rgba(130,201,30,0.7)" : "rgba(116,198,157,0.5)" }}
                >
                  {phase.subtitle}
                </p>

                <ul className="flex flex-col gap-2">
                  {phase.points.map((pt, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: phase.highlight ? LIME : "rgba(116,198,157,0.4)" }}
                      />
                      <span className="text-[12px] leading-relaxed"
                        style={{ color: phase.highlight ? "rgba(255,255,255,0.8)" : "rgba(116,198,157,0.55)" }}>
                        {pt}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* ══ 최하단 면책 고지 박스 ════════════════════════════════════ */}
        <div
          className="rounded-xl px-6 py-4 flex items-start gap-3"
          style={{
            background: "rgba(234,179,8,0.04)",
            border: "1px solid rgba(234,179,8,0.2)",
          }}
        >
          <Award size={16} className="flex-shrink-0 mt-0.5"
            style={{ color: "rgba(234,179,8,0.7)" }} />
          <p className="text-[12px] leading-relaxed"
            style={{ color: "rgba(234,179,8,0.7)" }}>
            <strong className="font-bold">{t("heritage.disclosureTitle")}</strong> —
            {" "}{t("heritage.disclosureText")}{" "}
            <strong>{t("heritage.disclosureName")}</strong>{" "}
            {t("heritage.disclosureText2")}
          </p>
        </div>
      </div>
    </section>
  );
}
