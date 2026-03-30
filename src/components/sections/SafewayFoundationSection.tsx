"use client";

/**
 * SafewayFoundationSection
 *
 * "Powered by SafeWay" — SafeWay가 모든 서비스의 뿌리임을 시각화하는 섹션.
 *
 * 시각 구조:
 *   - 5개 서비스 노드 (상단)
 *   - 베지어 커브 라인 (SafeWay → 각 서비스)
 *   - animateMotion 파티클 (SafeWay에서 각 서비스로 흐르는 데이터 플로우)
 *   - SafeWay 중앙 노드 (하단 중앙, 글로잉)
 */

import { Video, ShieldCheck, Activity, HeartPulse, Database } from "lucide-react";
import { SafePawsIcon } from "@/components/ui/SafeIcons";

const LIME = "#82C91E";

/* SVG 좌표 상수 */
const CX = 500;   // SafeWay 중심 X
const CY = 390;   // SafeWay 중심 Y
const NODE_Y = 80; // 서비스 노드 Y

const SERVICE_NODES = [
  { key: "SafeLync",  x: 80,  icon: Video,       delay: "0s"   },
  { key: "SafeEntry", x: 270, icon: ShieldCheck,  delay: "0.5s" },
  { key: "SafeSync",  x: 500, icon: Activity,     delay: "1s"   },
  { key: "SafeStep",  x: 730, icon: HeartPulse,   delay: "1.5s" },
  { key: "SafePaws",  x: 920, icon: SafePawsIcon, delay: "2s"   },
];

/* SafeWay → 각 서비스 베지어 경로 (SVG d 속성) */
function buildPath(sx: number): string {
  // 직선에서 곡선으로 자연스럽게 벌어지도록 중간 컨트롤 포인트를 서비스 쪽으로 이동
  const midY = (CY + NODE_Y) / 2; // ≈ 235
  return `M ${CX} ${CY} C ${CX} ${midY} ${sx} ${midY} ${sx} ${NODE_Y + 28}`;
}

interface SafewayFoundationSectionProps {
  t: (key: string) => string;
}

export default function SafewayFoundationSection({ t }: SafewayFoundationSectionProps) {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(to bottom, #0a2016, #071710)" }}
    >
      {/* 상단 구분선 */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(130,201,30,0.18), transparent)" }}
      />

      {/* 배경 라임 글로우 (중앙 하단) */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: "50%", bottom: "0",
          transform: "translateX(-50%)",
          width: "600px", height: "300px",
          background: "radial-gradient(ellipse at bottom, rgba(130,201,30,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-4">

        {/* 섹션 헤더 */}
        <div className="text-center mb-4">
          <span
            className="inline-block px-4 py-1.5 text-[11px] font-bold rounded-full
              tracking-[0.2em] uppercase mb-6"
            style={{
              background: "rgba(130,201,30,0.07)",
              border:     "1px solid rgba(130,201,30,0.2)",
              color:      "rgba(130,201,30,0.7)",
            }}
          >
            The Infrastructure
          </span>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
            Powered by{" "}
            <span style={{
              background: "linear-gradient(130deg, #82C91E 0%, #52b788 60%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              SafeWay
            </span>
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: "rgba(116,198,157,0.6)" }}>
            {t("platform.description")}
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          SVG 트리 라인 아트
          — SafeWay 중심 노드에서 5개 서비스로 데이터가 흐르는 시각화
          ══════════════════════════════════════════════════════════════ */}
      <div className="w-full overflow-hidden" style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <svg
          viewBox="0 0 1000 480"
          preserveAspectRatio="xMidYMid meet"
          className="w-full"
          style={{ overflow: "visible" }}
        >
          {/* 패스 정의 (animateMotion에서 참조) */}
          <defs>
            {SERVICE_NODES.map((svc) => (
              <path
                key={`path-def-${svc.key}`}
                id={`path-${svc.key}`}
                d={buildPath(svc.x)}
              />
            ))}

            {/* SafeWay 노드 글로우 필터 */}
            <filter id="safeway-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* 서비스 노드 글로우 필터 */}
            <filter id="node-glow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ── 연결 라인 (정적 구조선) ────────────────────────────── */}
          {SERVICE_NODES.map((svc) => (
            <use
              key={`line-${svc.key}`}
              href={`#path-${svc.key}`}
              fill="none"
              stroke="rgba(116,198,157,0.18)"
              strokeWidth="1.5"
              strokeDasharray="4 6"
            />
          ))}

          {/* ── 데이터 플로우 파티클
              SafeWay → 각 서비스로 흐르는 라임 점 ─────────────────── */}
          {SERVICE_NODES.map((svc) => (
            <g key={`particle-${svc.key}`}>
              {/* 메인 파티클 */}
              <circle r="3.5" fill={LIME} opacity="0.9"
                filter="url(#node-glow)">
                <animateMotion
                  dur="2.8s"
                  repeatCount="indefinite"
                  begin={svc.delay}
                  calcMode="spline"
                  keyTimes="0;1"
                  keySplines="0.4 0 0.6 1"
                >
                  <mpath href={`#path-${svc.key}`} />
                </animateMotion>
              </circle>
              {/* 뒤따르는 작은 파티클 */}
              <circle r="2" fill={LIME} opacity="0.5">
                <animateMotion
                  dur="2.8s"
                  repeatCount="indefinite"
                  begin={`calc(${svc.delay} + 0.15s)`}
                  calcMode="spline"
                  keyTimes="0;1"
                  keySplines="0.4 0 0.6 1"
                >
                  <mpath href={`#path-${svc.key}`} />
                </animateMotion>
              </circle>
            </g>
          ))}

          {/* ── 서비스 노드 ─────────────────────────────────────────── */}
          {SERVICE_NODES.map((svc) => {
            const IconCmp = svc.icon;
            return (
              <g key={`node-${svc.key}`} transform={`translate(${svc.x}, ${NODE_Y})`}>
                {/* 외부 링 */}
                <circle r="28" fill="none"
                  stroke="rgba(130,201,30,0.2)" strokeWidth="1" />
                {/* 노드 배경 */}
                <circle r="22"
                  fill="#0d2b1e"
                  stroke="rgba(130,201,30,0.35)"
                  strokeWidth="1.2"
                  filter="url(#node-glow)"
                />
                {/* 아이콘 (foreignObject) */}
                <foreignObject x="-11" y="-11" width="22" height="22">
                  <div style={{
                    width: "100%", height: "100%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: LIME,
                  }}>
                    {svc.key === "SafePaws"
                      ? <IconCmp size={14} color={LIME} />
                      : <IconCmp size={14} />
                    }
                  </div>
                </foreignObject>
                {/* 레이블 */}
                <text
                  y="44"
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="600"
                  fill="rgba(116,198,157,0.8)"
                  fontFamily="inherit"
                >
                  {svc.key}
                </text>
              </g>
            );
          })}

          {/* ── SafeWay 중심 노드 ─────────────────────────────────── */}
          {/* 외부 pulse 링 */}
          <circle cx={CX} cy={CY} r="76" fill="none"
            stroke="rgba(130,201,30,0.08)" strokeWidth="1">
            <animate attributeName="r" values="76;88;76" dur="4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0.1;0.5" dur="4s" repeatCount="indefinite" />
          </circle>
          <circle cx={CX} cy={CY} r="60" fill="none"
            stroke="rgba(130,201,30,0.14)" strokeWidth="1">
            <animate attributeName="r" values="60;70;60" dur="4s" begin="0.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;0.15;0.6" dur="4s" begin="0.5s" repeatCount="indefinite" />
          </circle>

          {/* 메인 원 */}
          <circle cx={CX} cy={CY} r="50"
            fill="#071710"
            stroke="rgba(130,201,30,0.5)"
            strokeWidth="1.5"
            filter="url(#safeway-glow)"
          />
          <circle cx={CX} cy={CY} r="42"
            fill="none"
            stroke="rgba(130,201,30,0.15)"
            strokeWidth="1"
          />

          {/* Database 아이콘 */}
          <foreignObject x={CX - 14} y={CY - 28} width="28" height="28">
            <div style={{
              width: "100%", height: "100%",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: LIME,
            }}>
              <Database size={18} />
            </div>
          </foreignObject>

          {/* SafeWay 텍스트 */}
          <text x={CX} y={CY + 8} textAnchor="middle"
            fontSize="11" fontWeight="800" letterSpacing="2.5"
            fill={LIME} fontFamily="inherit">
            SafeWay
          </text>
          <text x={CX} y={CY + 22} textAnchor="middle"
            fontSize="8" letterSpacing="2"
            fill="rgba(116,198,157,0.5)" fontFamily="inherit">
            PLATFORM
          </text>
        </svg>
      </div>

      {/* 플랫폼 핵심 특징 */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "통합 데이터 파이프라인",   sub: "Unified Pipeline"     },
            { label: "실시간 분석 엔진",         sub: "Real-time Analytics"  },
            { label: "의료 보안·컴플라이언스",   sub: "HL7 FHIR Compliant"   },
            { label: "확장형 Open API",          sub: "Third-party Ready"    },
          ].map((feat) => (
            <div
              key={feat.label}
              className="rounded-xl px-4 py-3 text-center"
              style={{
                background: "rgba(255,255,255,0.025)",
                border:     "1px solid rgba(116,198,157,0.1)",
              }}
            >
              <p className="text-white text-[12px] font-semibold mb-0.5 leading-snug">
                {feat.label}
              </p>
              <p className="text-[10px]" style={{ color: "rgba(116,198,157,0.45)" }}>
                {feat.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
