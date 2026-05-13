"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import {
  SafeLyncIcon,
  SafeSyncIcon,
  SafeEntryIcon,
  SafeStepProIcon,
  SafeStepLiteIcon,
  SafePawsIcon,
  type SafeIconProps,
} from "@/components/ui/SafeIcons";

const LIME = "#82C91E";

interface ServicesSectionProps {
  t: (key: string) => string;
}

type ServiceDef = {
  key: string;
  Icon: React.ComponentType<SafeIconProps>;
  color: string;
  href: string | null;
  codev: boolean;
};

/* 확정 6대 서비스 (SafeWay는 기반 플랫폼 — 카드 미표시) */
const SERVICES: ServiceDef[] = [
  { key: "safelync",    Icon: SafeLyncIcon,     color: "#228BE6", href: "/safelync",   codev: false },
  { key: "safesync",    Icon: SafeSyncIcon,     color: "#FA5252", href: "/safesync",   codev: false },
  { key: "safeentry",   Icon: SafeEntryIcon,    color: "#FD7E14", href: "/safeentry",  codev: true  },
  { key: "safesteppro", Icon: SafeStepProIcon,  color: "#7950F2", href: null,          codev: false },
  { key: "safesteplit", Icon: SafeStepLiteIcon, color: "#20C997", href: null,          codev: false },
  { key: "safepaws",    Icon: SafePawsIcon,     color: "#FD7E14", href: null,          codev: false },
];

function ServiceCard({
  svc,
  t,
}: {
  svc: ServiceDef;
  t: (key: string) => string;
}) {
  const [hovered, setHovered] = useState(false);

  const inner = (
    <div
      className="relative rounded-2xl p-6 cursor-pointer transition-all duration-300 h-full"
      style={{
        background: "rgba(255,255,255,0.03)",
        border:     `1px solid ${hovered ? "rgba(130,201,30,0.45)" : "rgba(116,198,157,0.12)"}`,
        boxShadow:  hovered
          ? "0 0 0 1px rgba(130,201,30,0.15), 0 8px 32px rgba(130,201,30,0.12)"
          : "none",
        transform:  hovered ? "translateY(-3px)" : "translateY(0)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* 호버 배경 글로우 */}
      <div
        className="absolute inset-0 rounded-2xl transition-opacity duration-300 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at top left, rgba(130,201,30,0.06) 0%, transparent 60%)",
          opacity: hovered ? 1 : 0,
        }}
      />

      <div className="relative z-10 flex flex-col h-full">
        {/* 상단: 아이콘 + 카테고리 배지 */}
        <div className="flex items-start justify-between mb-5">
          {/* 아이콘 박스 */}
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center transition-colors duration-300"
            style={{
              background: hovered
                ? `${svc.color}22`
                : "rgba(116,198,157,0.08)",
            }}
          >
            <svc.Icon
              size={22}
              color={hovered ? svc.color : "rgba(116,198,157,0.6)"}
              stemColor={hovered ? "rgba(255,255,255,0.28)" : "rgba(116,198,157,0.28)"}
              strokeWidth={1.75}
            />
          </div>

          {/* 카테고리 배지 + Co-developed 배지 */}
          <div className="flex flex-col items-end gap-1.5">
            <span
              className="px-2.5 py-1 text-[10px] font-bold tracking-wide rounded-full transition-colors duration-300"
              style={{
                background: hovered ? "rgba(130,201,30,0.12)" : "rgba(116,198,157,0.07)",
                color:      hovered ? LIME : "rgba(116,198,157,0.6)",
                border:     `1px solid ${hovered ? "rgba(130,201,30,0.3)" : "rgba(116,198,157,0.15)"}`,
              }}
            >
              {t(`services.${svc.key}.category`)}
            </span>
            {svc.codev && (
              <span
                className="px-2 py-0.5 text-[9px] font-medium rounded-full"
                style={{
                  background:    "rgba(255,255,255,0.04)",
                  color:         "rgba(180,180,180,0.5)",
                  border:        "1px solid rgba(180,180,180,0.14)",
                  fontFamily:    "'Manrope','Inter',sans-serif",
                  letterSpacing: "0.05em",
                }}
              >
                Co-developed
              </span>
            )}
          </div>
        </div>

        {/* 서비스명 */}
        <h3
          className="text-lg font-bold mb-2.5 transition-colors duration-300"
          style={{ color: hovered ? "#ffffff" : "rgba(255,255,255,0.85)" }}
        >
          {t(`services.${svc.key}.name`)}
        </h3>

        {/* 설명 */}
        <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: "rgba(116,198,157,0.65)" }}>
          {t(`services.${svc.key}.desc`)}
        </p>

        {/* 하단 CTA */}
        <div
          className="flex items-center gap-1.5 text-sm font-semibold transition-all duration-300 mt-auto"
          style={{ color: hovered ? LIME : "rgba(116,198,157,0.5)" }}
        >
          <span>{svc.href ? t("services.viewMore") : t("services.comingSoon")}</span>
          <ArrowRight
            size={13}
            style={{ transform: hovered ? "translateX(4px)" : "translateX(0)", transition: "transform 0.3s" }}
          />
        </div>

        {/* SafeEntry — 공동개발 표기 */}
        {svc.codev && (
          <p
            className="text-[9px] mt-3 pt-2.5 tracking-wide"
            style={{
              color:         "rgba(116,198,157,0.38)",
              borderTop:     "1px solid rgba(116,198,157,0.09)",
              fontFamily:    "'Manrope','Inter',sans-serif",
              letterSpacing: "0.04em",
            }}
          >
            Jointly developed with Bangsil Soft
          </p>
        )}
      </div>
    </div>
  );

  if (svc.href) {
    return (
      <Link href={svc.href} className="block h-full">
        {inner}
      </Link>
    );
  }
  return inner;
}

export default function ServicesSection({ t }: ServicesSectionProps) {
  return (
    <section
      id="services"
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ background: "#0a2016" }}
    >
      {/* 배경 테두리 선 */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(to right, transparent, rgba(130,201,30,0.2), transparent)" }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(to right, transparent, rgba(130,201,30,0.2), transparent)" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 섹션 헤더 */}
        <FadeIn direction="up" className="text-center mb-14">
          <span
            className="inline-block px-4 py-1.5 text-[11px] font-bold rounded-full tracking-[0.2em] uppercase mb-5"
            style={{
              background: "rgba(130,201,30,0.08)",
              border:     "1px solid rgba(130,201,30,0.25)",
              color:      LIME,
            }}
          >
            {t("services.badge")}
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-5 leading-tight">
            {t("services.title").split("\n").map((line, i) => (
              <span key={i} className="block">
                {i === 1
                  ? <span style={{ color: LIME }}>{line}</span>
                  : line}
              </span>
            ))}
          </h2>
          <p className="text-base max-w-2xl mx-auto leading-relaxed"
            style={{ color: "rgba(116,198,157,0.65)" }}>
            {t("services.subtitle")}
          </p>
        </FadeIn>

        {/* 서비스 카드 그리드 — 6개 × 3열 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((svc, i) => (
            <FadeIn key={svc.key} delay={i * 80} direction="up">
              <ServiceCard svc={svc} t={t} />
            </FadeIn>
          ))}
        </div>

        {/* SafeWay 연결 안내 */}
        <FadeIn direction="up" delay={200} className="mt-14 flex items-center justify-center gap-3">
          <div
            className="h-px flex-1 max-w-[120px]"
            style={{ background: "linear-gradient(to right, transparent, rgba(130,201,30,0.3))" }}
          />
          <span className="text-[11px] tracking-[0.2em] uppercase"
            style={{ color: "rgba(130,201,30,0.5)" }}>
            All powered by SafeWay Platform
          </span>
          <div
            className="h-px flex-1 max-w-[120px]"
            style={{ background: "linear-gradient(to left, transparent, rgba(130,201,30,0.3))" }}
          />
        </FadeIn>

      </div>
    </section>
  );
}
