"use client";

import { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import WaldblattLogo from "@/components/ui/WaldblattLogo";

/* SafeWay 위에 연결된 서비스 라인업 */
const SERVICES = [
  "SafeLync",
  "SafeEntry",
  "SafeSync",
  "SafeStep Pro",
  "SafeStep Lite",
  "SafePaws",
];

const LIME = "#82C91E";

interface HeroSectionProps {
  t: (key: string) => string;
}

export default function HeroSection({ t }: HeroSectionProps) {
  /* 로고 노드 호버 상태 → 배경 글로우 강도 연동 */
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: "#071710" }}
    >
      {/* ══════════════════════════════════════════════════════════════
          배경 레이어
          ══════════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 pointer-events-none select-none">
        {/* 베이스 그라디언트 */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#071710] via-[#0d2b1e] to-[#1a3828]" />

        {/* 센터 라임 글로우 — 로고 호버 시 확대 + 강화 */}
        <div
          className="absolute left-1/2 -translate-x-1/2 rounded-full transition-all duration-700 ease-out"
          style={{
            top: "18%",
            width:  isLogoHovered ? "720px" : "480px",
            height: isLogoHovered ? "720px" : "480px",
            background: `radial-gradient(circle, rgba(130,201,30,${
              isLogoHovered ? 0.13 : 0.06
            }) 0%, transparent 65%)`,
          }}
        />

        {/* 우상단 정적 글로우 */}
        <div
          className="absolute -top-40 -right-20 w-[540px] h-[540px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(130,201,30,0.045) 0%, transparent 65%)",
          }}
        />

        {/* 좌하단 포레스트 글로우 */}
        <div
          className="absolute -bottom-20 -left-20 w-[440px] h-[440px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(82,183,136,0.07) 0%, transparent 65%)",
          }}
        />

        {/* 격자 패턴 */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(130,201,30,0.028) 1px, transparent 1px),
              linear-gradient(90deg, rgba(130,201,30,0.028) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      {/* ══════════════════════════════════════════════════════════════
          메인 콘텐츠
          ══════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-6">

        {/* 배지 */}
        <div
          className="hero-d1 inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8
            bg-white/[0.04] border border-white/[0.09] backdrop-blur-sm"
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: LIME }}
          />
          <span className="text-wald-400 text-[11px] font-semibold tracking-[0.22em] uppercase">
            {t("hero.badge")}
          </span>
        </div>

        {/* ── 로고 마크 + 글로우 링 ────────────────────────────────── */}
        <div className="hero-d0 relative flex items-center justify-center mb-8">
          {/* 외부 글로우 오라 */}
          <div
            className="absolute rounded-full transition-all duration-700 ease-out"
            style={{
              width:  isLogoHovered ? "260px" : "210px",
              height: isLogoHovered ? "260px" : "210px",
              background: `radial-gradient(circle, rgba(130,201,30,${
                isLogoHovered ? 0.2 : 0.08
              }) 0%, transparent 70%)`,
            }}
          />
          {/* 내부 링 */}
          <div
            className="absolute rounded-full transition-all duration-500 ease-out"
            style={{
              width:  isLogoHovered ? "172px" : "158px",
              height: isLogoHovered ? "172px" : "158px",
              border: `1px solid rgba(130,201,30,${isLogoHovered ? 0.35 : 0.12})`,
            }}
          />

          {/* 로고 심볼 — hover 상태를 배경 글로우에 전달 */}
          <WaldblattLogo
            height={130}
            markOnly
            variant="light"
            animated
            onHoverChange={setIsLogoHovered}
          />
        </div>

        {/* ── 헤드라인 ──────────────────────────────────────────────── */}
        <h1
          className="hero-d2 text-[2.8rem] sm:text-5xl lg:text-[3.8rem] text-center mb-4
            leading-[1.15] tracking-tight"
          style={{
            fontFamily: "var(--font-noto-kr)",
            fontWeight: 800,
          }}
        >
          <span className="text-white">{t("hero.titlePart1")}</span>
          <span
            style={{
              color: "#82C91E",
              textShadow:
                "0 0 18px rgba(130,201,30,0.55), 0 2px 6px rgba(130,201,30,0.25)",
            }}
          >
            {t("hero.titleHighlight")}
          </span>
          <span className="text-white">{t("hero.titlePart2")}</span>
        </h1>

        {/* 영문 태그라인 */}
        <p
          className="hero-d3 text-[11px] font-medium tracking-[0.28em] uppercase mb-5"
          style={{ color: "rgba(116,198,157,0.5)" }}
        >
          {t("hero.tagline")}
        </p>

        {/* 서브타이틀 */}
        <p
          className="hero-d4 text-base sm:text-[1.05rem] max-w-xl text-center mb-10 leading-relaxed"
          style={{
            fontFamily: "var(--font-noto-kr)",
            fontWeight: 400,
            color: "rgba(183,228,199,0.85)",
          }}
        >
          {t("hero.subtitle")}
        </p>

        {/* CTA 버튼 */}
        <div className="hero-d5 flex flex-col sm:flex-row gap-3 mb-16">
          <button
            onClick={() =>
              document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })
            }
            className="group inline-flex items-center justify-center gap-2
              px-8 py-3.5 font-bold text-sm rounded-2xl transition-all
              hover:brightness-110 active:scale-[0.98]"
            style={{ background: LIME, color: "#071710" }}
          >
            {t("hero.cta")}
            <ArrowRight
              size={15}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
          <button
            onClick={() =>
              document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })
            }
            className="inline-flex items-center justify-center gap-2
              px-8 py-3.5 text-white/80 font-medium text-sm rounded-2xl
              border border-white/[0.13] transition-all
              hover:bg-white/[0.07] hover:text-white active:scale-[0.98]
              backdrop-blur-sm"
          >
            {t("hero.ctaSecondary")}
          </button>
        </div>

        {/* ══════════════════════════════════════════════════════════
            SafeWay 플랫폼 인포그래픽
            서비스 6개 → 커넥터 라인 → SafeWay 기반 바
            ══════════════════════════════════════════════════════════ */}
        <div className="w-full max-w-3xl mx-auto">

          {/* 상단 레이블 */}
          <p className="text-center text-[10px] tracking-[0.32em] uppercase mb-5"
            style={{ color: "rgba(116,198,157,0.35)" }}>
            Platform Architecture
          </p>

          {/* 서비스 필 + 커넥터 라인 */}
          <div className="flex items-end justify-center gap-2 sm:gap-4 flex-wrap">
            {SERVICES.map((service) => (
              <div key={service} className="flex flex-col items-center gap-0">
                {/* 서비스 칩 */}
                <div
                  className="px-3 py-1.5 text-[11px] font-medium rounded-full
                    whitespace-nowrap backdrop-blur-sm"
                  style={{
                    color:        "rgba(116,198,157,0.85)",
                    border:       "1px solid rgba(116,198,157,0.2)",
                    background:   "rgba(116,198,157,0.05)",
                  }}
                >
                  {service}
                </div>
                {/* 커넥터 수직선 */}
                <div
                  style={{
                    width:      "1px",
                    height:     "28px",
                    background: "linear-gradient(to bottom, rgba(116,198,157,0.35), rgba(130,201,30,0.55))",
                  }}
                />
              </div>
            ))}
          </div>

          {/* SafeWay 기반 바 */}
          <div className="flex items-center gap-0 mt-0">
            {/* 좌측 라인 */}
            <div
              className="flex-1 h-px"
              style={{
                background: `linear-gradient(to right, transparent, rgba(130,201,30,${
                  isLogoHovered ? 0.65 : 0.4
                }))`,
                transition: "background 0.5s ease",
              }}
            />
            {/* 중앙 SafeWay 레이블 */}
            <div
              className="flex items-center gap-2 px-5 py-2 rounded-xl mx-0"
              style={{
                border:     `1px solid rgba(130,201,30,${isLogoHovered ? 0.55 : 0.28})`,
                background: `rgba(130,201,30,${isLogoHovered ? 0.1 : 0.05})`,
                boxShadow:  isLogoHovered
                  ? "0 0 24px rgba(130,201,30,0.18), 0 0 48px rgba(130,201,30,0.08)"
                  : "none",
                transition: "all 0.5s ease",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: LIME }}
              />
              <span
                className="text-[11px] font-bold tracking-[0.2em] uppercase"
                style={{ color: LIME }}
              >
                SafeWay Platform
              </span>
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: LIME, animationDelay: "0.6s" }}
              />
            </div>
            {/* 우측 라인 */}
            <div
              className="flex-1 h-px"
              style={{
                background: `linear-gradient(to left, transparent, rgba(130,201,30,${
                  isLogoHovered ? 0.65 : 0.4
                }))`,
                transition: "background 0.5s ease",
              }}
            />
          </div>

          {/* 하단 레이블 */}
          <p className="text-center text-[10px] tracking-[0.2em] mt-2.5"
            style={{ color: "rgba(82,183,136,0.35)" }}>
            {t("hero.safewayLabel")}
          </p>
        </div>
      </div>

      {/* 스크롤 인디케이터 */}
      <button
        onClick={() =>
          document.querySelector("#platform")?.scrollIntoView({ behavior: "smooth" })
        }
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center
          gap-1 transition-colors animate-bounce"
        style={{ color: "rgba(82,183,136,0.4)" }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.color = "rgba(82,183,136,0.8)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.color = "rgba(82,183,136,0.4)")
        }
        aria-label="아래로 스크롤"
      >
        <ChevronDown size={20} />
      </button>
    </section>
  );
}
