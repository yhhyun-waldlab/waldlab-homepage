"use client";

/**
 * WaldblattLogo · v2.2
 *
 * LogoComponent  — 독립 애니메이션 단위 (다른 레이아웃 업데이트와 완전 분리)
 *   · 잎 드리프트  : motion.g  animate={{ rotate:[-1.5,1.5,-1.5] }}
 *                   style={{ transformBox:"fill-box", transformOrigin:"bottom center" }}
 *   · 노드 글로우  : useAnimation × 3  +  onPointerEnter/Leave
 *                   (whileHover variants 전파 방식 대신 직접 제어 → 드리프트와 충돌 없음)
 *   · 접근성      : useReducedMotion() 훅
 *   · z-index     : SVG position:relative / z-index:10
 */

import React, { useCallback, memo } from "react";
import { motion, useAnimation } from "framer-motion";

/* ── 브랜드 색상 ─────────────────────────────────────────────────────── */
const LIME = "#82C91E";

/* ── 노드 공통 style ─────────────────────────────────────────────────── */
const NODE_STYLE: React.CSSProperties = {
  transformBox:    "fill-box",
  transformOrigin: "center",
};

/* ── 노드 초기 상태 ──────────────────────────────────────────────────── */
const NODE_INITIAL = { scale: 1, filter: "drop-shadow(0 0 0px #82C91E)" };

/* ══════════════════════════════════════════════════════════════════════
   LogoComponent
   독립 컴포넌트: 잎 드리프트 + 노드 글로우를 모두 자체 관리.
   외부의 레이아웃/애니메이션 변경에 영향받지 않음.
   ══════════════════════════════════════════════════════════════════════ */
interface LogoComponentProps {
  leafStroke:     string;
  midrib:         string;
  animated:       boolean;
  onHoverChange?: (v: boolean) => void;
}

const LogoComponent = memo(function LogoComponent(props: LogoComponentProps) {
  const { leafStroke, midrib, onHoverChange } = props;
  /* 노드 그룹별 개별 AnimationControls */
  const ctrl0 = useAnimation();
  const ctrl1 = useAnimation();
  const ctrl2 = useAnimation();

  /* 호버 진입 — 0 / 0.25 / 0.5 s delay로 순차 글로우 */
  const glowIn = useCallback(() => {
    onHoverChange?.(true);
    ctrl0.start({ scale: 1.5, filter: "drop-shadow(0 0 8px #82C91E)",
      transition: { delay: 0,    duration: 0.35, ease: [0.4, 0, 0.2, 1] } });
    ctrl1.start({ scale: 1.5, filter: "drop-shadow(0 0 8px #82C91E)",
      transition: { delay: 0.25, duration: 0.35, ease: [0.4, 0, 0.2, 1] } });
    ctrl2.start({ scale: 1.5, filter: "drop-shadow(0 0 8px #82C91E)",
      transition: { delay: 0.5,  duration: 0.35, ease: [0.4, 0, 0.2, 1] } });
  }, [ctrl0, ctrl1, ctrl2, onHoverChange]);

  /* 호버 이탈 — 전체 즉시 복귀 */
  const glowOut = useCallback(() => {
    onHoverChange?.(false);
    ctrl0.start({ ...NODE_INITIAL, transition: { duration: 0.2 } });
    ctrl1.start({ ...NODE_INITIAL, transition: { duration: 0.2 } });
    ctrl2.start({ ...NODE_INITIAL, transition: { duration: 0.2 } });
  }, [ctrl0, ctrl1, ctrl2, onHoverChange]);

  return (
    /* onPointerEnter/Leave: SVG <g> 수준에서 직접 처리 (whileHover 전파 방식 배제) */
    <g onPointerEnter={glowIn} onPointerLeave={glowOut}>
      {/* 투명 히트박스 — 잎 바깥 여백도 호버 감지 */}
      <rect x="0" y="0" width="62" height="72" fill="transparent" />

      {/* ── 드리프트 그룹 ─────────────────────────────────────────────
          transformBox:"fill-box" → 자신의 bounding-box 기준 좌표계
          transformOrigin:"bottom center" → 잎 하단 중앙 기준 회전
          ─────────────────────────────────────────────────────────── */}
      <motion.g
        style={{
          transformBox:    "fill-box",
          transformOrigin: "bottom center",
        } as React.CSSProperties}
        initial={{ rotate: 0 }}
        animate={{ rotate: [-2, 2, -2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* 비대칭 잎 외곽선 */}
        <motion.path
          d="M 34,64 C 13,58 7,37 22,14 C 27,6 36,5 39,9 C 47,15 52,37 44,55 C 41,62 38,64 34,64 Z"
          fill="none"
          stroke={leafStroke}
          strokeWidth="2.6"
          strokeLinejoin="round"
          strokeLinecap="round"
          style={{
            transformBox:    "fill-box",
            transformOrigin: "bottom center",
          } as React.CSSProperties}
        />
        {/* S자 잎맥 줄기 */}
        <motion.path
          d="M 34,62 C 32,50 33,34 37,12"
          fill="none"
          stroke={midrib}
          strokeWidth="1.8"
          strokeLinecap="round"
          style={{
            transformBox:    "fill-box",
            transformOrigin: "bottom center",
          } as React.CSSProperties}
        />

        {/* ── 노드 그룹 1 · 하단 오른쪽 측맥 ── */}
        <line x1="33" y1="50" x2="43" y2="46"
          stroke={LIME} strokeWidth="1.3" strokeLinecap="round" />
        <motion.circle cx="33" cy="50" r="2.6" fill={LIME}
          style={NODE_STYLE} initial={NODE_INITIAL} animate={ctrl0} />
        <motion.circle cx="43" cy="46" r="1.9" fill={LIME}
          style={NODE_STYLE} initial={NODE_INITIAL} animate={ctrl0} />

        {/* ── 노드 그룹 2 · 중단 왼쪽 측맥 ── */}
        <line x1="33" y1="38" x2="16" y2="35"
          stroke={LIME} strokeWidth="1.3" strokeLinecap="round" />
        <motion.circle cx="33" cy="38" r="2.6" fill={LIME}
          style={NODE_STYLE} initial={NODE_INITIAL} animate={ctrl1} />
        <motion.circle cx="16" cy="35" r="1.9" fill={LIME}
          style={NODE_STYLE} initial={NODE_INITIAL} animate={ctrl1} />

        {/* ── 노드 그룹 3 · 상단 오른쪽 측맥 ── */}
        <line x1="35" y1="26" x2="44" y2="22"
          stroke={LIME} strokeWidth="1.3" strokeLinecap="round" />
        <motion.circle cx="35" cy="26" r="2.4" fill={LIME}
          style={NODE_STYLE} initial={NODE_INITIAL} animate={ctrl2} />
        <motion.circle cx="44" cy="22" r="1.7" fill={LIME}
          style={NODE_STYLE} initial={NODE_INITIAL} animate={ctrl2} />
      </motion.g>
    </g>
  );
});

/* ══════════════════════════════════════════════════════════════════════
   WaldblattLogo — 퍼블릭 컴포넌트 (사이즈·색상·reduced-motion 처리)
   ══════════════════════════════════════════════════════════════════════ */
export interface WaldblattLogoProps {
  height?:        number;
  markOnly?:      boolean;
  layout?:        "horizontal" | "stacked";
  variant?:       "dark" | "light";
  animated?:      boolean;
  className?:     string;
  onHoverChange?: (isHovered: boolean) => void;
}

export default function WaldblattLogo({
  height        = 44,
  markOnly      = false,
  layout        = "horizontal",
  variant       = "dark",
  animated      = true,
  className     = "",
  onHoverChange,
}: WaldblattLogoProps) {
  const isLight      = variant === "light";
  const leafStroke   = isLight ? "#FFFFFF"                : "#1A3828";
  const midrib       = isLight ? "rgba(255,255,255,0.65)" : "#2A6347";
  const wordmarkFill = isLight ? "#FFFFFF"                : "#1A3828";
  const koreanFill   = isLight ? "rgba(255,255,255,0.50)" : "#52A878";
  const dividerColor = isLight ? "rgba(255,255,255,0.22)" : "#C8E0D0";

  const markWidth    = Math.round(height * (68  / 72));
  const fullWidth    = Math.round(height * (310 / 72));
  const stackHeight  = height;
  const stackWidth   = Math.round(height * (150 / 115));

  const wmStyle: React.CSSProperties = {
    fontFamily:    "'Manrope','Inter','Helvetica Neue',Arial,sans-serif",
    fontSize:      28,
    fontWeight:    800,
    letterSpacing: "-0.8px",
  };
  const krStyle: React.CSSProperties = {
    fontFamily:    "'Noto Sans KR','Apple SD Gothic Neo','Malgun Gothic',sans-serif",
    fontSize:      10.5,
    fontWeight:    400,
    letterSpacing: "3.5px",
  };

  /* 헤더 내 다른 요소에 가려지지 않도록 z-index 보장 */
  const svgStyle: React.CSSProperties = {
    position: "relative",
    zIndex:   10,
  };

  const logoProps: LogoComponentProps = {
    leafStroke,
    midrib,
    animated,
    onHoverChange,
  };

  if (layout === "stacked") {
    return (
      <svg
        width={stackWidth} height={stackHeight} viewBox="0 0 150 115"
        fill="none" xmlns="http://www.w3.org/2000/svg"
        role="img" aria-label="Wald Lab"
        className={className}
        overflow="visible"
        style={svgStyle}
      >
        <g transform="translate(41, 2)">
          <LogoComponent {...logoProps} />
        </g>
        <text x="75" y="95"  fill={wordmarkFill} style={{ ...wmStyle, fontSize: 26 }} textAnchor="middle">Wald Lab</text>
        <text x="75" y="111" fill={koreanFill}   style={{ ...krStyle, letterSpacing: "2.5px" }} textAnchor="middle">주식회사 발트 랩</text>
      </svg>
    );
  }

  if (markOnly) {
    return (
      <svg
        width={markWidth} height={height} viewBox="0 0 68 72"
        fill="none" xmlns="http://www.w3.org/2000/svg"
        role="img" aria-label="Wald Lab"
        className={className}
        overflow="visible"
        style={svgStyle}
      >
        <LogoComponent {...logoProps} />
      </svg>
    );
  }

  return (
    <svg
      width={fullWidth} height={height} viewBox="0 0 310 72"
      fill="none" xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="Wald Lab"
      className={className}
      overflow="visible"
      style={svgStyle}
    >
      <LogoComponent {...logoProps} />
      <line x1="65" y1="13" x2="65" y2="59"
        stroke={dividerColor} strokeWidth="1.5" strokeLinecap="round" />
      <text x="77" y="43" fill={wordmarkFill} style={wmStyle}>Wald Lab</text>
      <text x="79" y="57" fill={koreanFill}   style={krStyle}>발트 랩</text>
    </svg>
  );
}
