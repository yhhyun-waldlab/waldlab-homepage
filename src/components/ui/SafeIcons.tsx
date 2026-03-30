"use client";

/**
 * SafeIcons · v3.0  —  발트랩 7대 솔루션 패밀리 룩 아이콘 시스템
 *
 * 공통 DNA
 *   · 비대칭 잎 (좌하→우상, WaldblattLogo 동일 방향)
 *   · S자 잎맥 줄기 (midrib)
 *   · 원형 노드 포인트
 *   · stemColor 기본값 = 발트랩 딥그린 #1A3828
 *
 * Props
 *   size        렌더링 px (기본 24)
 *   color       서비스 강조 색 (브랜드 권장색이 기본값)
 *   stemColor   잎맥·줄기 색 (기본 #1A3828)
 *   strokeWidth 획 두께 (기본 1.75)
 *   className / style  추가 스타일
 */

import React from "react";

export interface SafeIconProps {
  size?: number;
  color?: string;
  stemColor?: string;
  strokeWidth?: number;
  className?: string;
  style?: React.CSSProperties;
}

const DS = "#1A3828"; // Default Stem — Wald deep green

/* ── 공유 잎 형태 (WaldblattLogo DNA) ──────────────────────────────── */
const BL = "M8 20 C3 14 6 5 14 3 C20 4 22 10 18 17 C15 21 11 21 8 20 Z";
const BM = "M8 19 C9 14 12 9 14 4"; // S자 잎맥

/* ════════════════════════════════════════════════════════════════
   1. SafeWayIcon  ·  라임 #82C91E
   ────────────────────────────────────────────────────────────────
   모든 서비스의 기반 플랫폼. 가장 완성도 높은 잎 노드 심볼.
   WaldblattLogo와 동일한 구조 — 줄기·잎맥·2쌍 측맥노드.
   ════════════════════════════════════════════════════════════════ */
export function SafeWayIcon({
  size = 24, color = "#82C91E", stemColor = DS,
  strokeWidth = 1.75, className, style,
}: SafeIconProps) {
  const sw = strokeWidth;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d={BL} stroke={color} strokeWidth={sw} />
      <path d={BM} stroke={stemColor} strokeWidth={sw * 0.65} />
      {/* 하단 측맥 노드 (좌) */}
      <line x1="10" y1="15"  x2="4.5" y2="13"  stroke={stemColor} strokeWidth={sw * 0.7} />
      <circle cx="10"  cy="15"  r="1.5" fill={color} />
      <circle cx="4.5" cy="13"  r="1"   fill={stemColor} />
      {/* 상단 측맥 노드 (우) */}
      <line x1="13" y1="8.5" x2="18.5" y2="7.5" stroke={stemColor} strokeWidth={sw * 0.7} />
      <circle cx="13"   cy="8.5" r="1.5" fill={color} />
      <circle cx="18.5" cy="7.5" r="1"   fill={stemColor} />
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════════
   2. SafeLyncIcon  ·  로얄 블루 #228BE6
   ────────────────────────────────────────────────────────────────
   원격의료. 잎 노드 안에 의료 십자가(+) 결합.
   십자가 위치: 잎 우상단 내부 — 의료 전문성 강조.
   ════════════════════════════════════════════════════════════════ */
export function SafeLyncIcon({
  size = 24, color = "#228BE6", stemColor = DS,
  strokeWidth = 1.75, className, style,
}: SafeIconProps) {
  const sw = strokeWidth;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d={BL} stroke={stemColor} strokeWidth={sw} />
      <path d={BM} stroke={stemColor} strokeWidth={sw * 0.65} />
      {/* 하단 측맥 노드 */}
      <line x1="10" y1="15"  x2="4.5" y2="13" stroke={stemColor} strokeWidth={sw * 0.7} />
      <circle cx="10"  cy="15" r="1.3" fill={stemColor} />
      <circle cx="4.5" cy="13" r="0.9" fill={stemColor} />
      {/* 의료 십자가 — 잎 내부 우상단 */}
      <line x1="14.5" y1="5.5" x2="14.5" y2="10.5" stroke={color} strokeWidth={sw * 1.25} />
      <line x1="12"   y1="8"   x2="17"   y2="8"    stroke={color} strokeWidth={sw * 1.25} />
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════════
   3. SafeSyncIcon  ·  레드 #FA5252
   ────────────────────────────────────────────────────────────────
   근로 현장 모니터링. 동기화 순환 화살표 + 중앙 잎 노드.
   두 반원 호 (각 끝에 화살촉) = 실시간 Sync 심볼.
   ════════════════════════════════════════════════════════════════ */
export function SafeSyncIcon({
  size = 24, color = "#FA5252", stemColor = DS,
  strokeWidth = 1.75, className, style,
}: SafeIconProps) {
  const sw = strokeWidth;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      {/* 상단 반원호 (좌→우, 시계방향) */}
      <path d="M6 12 A6 6 0 0 1 18 12" stroke={color} strokeWidth={sw} />
      {/* 화살촉 1 — (18,12) 도달 방향: 아래 */}
      <path d="M16.5 10.5 L18 12 L16.5 13.5" stroke={color} strokeWidth={sw} />
      {/* 하단 반원호 (우→좌, 시계방향) */}
      <path d="M18 12 A6 6 0 0 1 6 12" stroke={color} strokeWidth={sw} />
      {/* 화살촉 2 — (6,12) 도달 방향: 위 */}
      <path d="M7.5 13.5 L6 12 L7.5 10.5" stroke={color} strokeWidth={sw} />
      {/* 중앙 소형 잎 노드 */}
      <path
        d="M11.5 15 C9.5 12.5 10 8.5 12 7.5 C14 8.5 14.5 12.5 12.5 15 C12 15.8 11.8 15.5 11.5 15 Z"
        stroke={stemColor} strokeWidth={sw}
      />
      <line x1="11.5" y1="14.5" x2="12.5" y2="8" stroke={stemColor} strokeWidth={sw * 0.65} />
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════════
   4. SafeEntryIcon  ·  오렌지 #FD7E14
   ────────────────────────────────────────────────────────────────
   산업안전 (방실소프트 공동개발). 안전모 실루엣 + 잎 노드 DNA.
   돔 곡선 = 잎 곡선 DNA / 중앙선 = 잎맥 / 상단 원 = 노드.
   ════════════════════════════════════════════════════════════════ */
export function SafeEntryIcon({
  size = 24, color = "#FD7E14", stemColor = DS,
  strokeWidth = 1.75, className, style,
}: SafeIconProps) {
  const sw = strokeWidth;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      {/* 안전모 돔 (잎 곡선 DNA 적용) */}
      <path d="M4 16 C4 9.5 7 4.5 13 4 C19 4.5 21 9.5 21 16"
        stroke={color} strokeWidth={sw} />
      {/* 챙 */}
      <line x1="2.5" y1="16.5" x2="22.5" y2="16.5" stroke={color} strokeWidth={sw} />
      {/* 중앙선 = 잎맥 DNA */}
      <line x1="13" y1="4" x2="13" y2="16.5" stroke={stemColor} strokeWidth={sw * 0.65} />
      {/* 상단 노드 (잎 노드 DNA) */}
      <circle cx="13" cy="4" r="1.6" fill={color} stroke="none" />
      {/* 좌 측맥 = 환기구 (잎 측맥 노드 DNA) */}
      <line x1="8" y1="11.5" x2="13" y2="11.5" stroke={stemColor} strokeWidth={sw * 0.65} />
      <circle cx="8" cy="11.5" r="1" fill={stemColor} />
      {/* 챙 아래 짧은 고정 라인 (안전모 세부) */}
      <line x1="5.5" y1="16.5" x2="5"   y2="19.5" stroke={color} strokeWidth={sw * 0.7} />
      <line x1="20.5" y1="16.5" x2="21" y2="19.5" stroke={color} strokeWidth={sw * 0.7} />
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════════
   5. SafeStepProIcon  ·  딥 퍼플 #7950F2
   ────────────────────────────────────────────────────────────────
   만성질환 전문 관리. 잎 노드 + 상승 데이터 차트 결합.
   잎 = 생체 기반 / 차트 = 정밀 데이터 분석 전문성.
   ════════════════════════════════════════════════════════════════ */
export function SafeStepProIcon({
  size = 24, color = "#7950F2", stemColor = DS,
  strokeWidth = 1.75, className, style,
}: SafeIconProps) {
  const sw = strokeWidth;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      {/* 잎 (좌하 배치 — 우측 차트 공간 확보) */}
      <path
        d="M5.5 19 C2.5 14 4.5 7 10 5 C12 4.5 13 6.5 11.5 9.5 C10 12.5 7 16 5.5 19 Z"
        stroke={stemColor} strokeWidth={sw}
      />
      <line x1="5.5" y1="18.5" x2="10.5" y2="5.5" stroke={stemColor} strokeWidth={sw * 0.65} />
      {/* 잎 줄기 + 노드 */}
      <line x1="5.5" y1="19" x2="5" y2="20.5" stroke={stemColor} strokeWidth={sw} />
      <circle cx="5" cy="21.5" r="1.25" stroke={color} strokeWidth={sw} />
      {/* 차트 기준선 */}
      <line x1="13" y1="19.5" x2="22.5" y2="19.5" stroke={color} strokeWidth={sw * 0.8} />
      {/* 오름차순 바 차트 3개 */}
      <rect x="13.5" y="16"   width="2.2" height="3.5" rx="0.5" fill={color} />
      <rect x="17"   y="12"   width="2.2" height="7.5" rx="0.5" fill={color} />
      <rect x="20.5" y="7.5"  width="2.2" height="12"  rx="0.5" fill={color} />
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════════
   6. SafeStepLiteIcon  ·  민트 #20C997
   ────────────────────────────────────────────────────────────────
   일반 건강관리. Pro보다 단순하고 경쾌한 대칭 잎 형태.
   좌우 대칭 잎 + 하나의 측맥 노드만으로 '가벼움' 표현.
   ════════════════════════════════════════════════════════════════ */
export function SafeStepLiteIcon({
  size = 24, color = "#20C997", stemColor = DS,
  strokeWidth = 1.75, className, style,
}: SafeIconProps) {
  const sw = strokeWidth;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      {/* 대칭 잎 (SafeWay 비대칭과 구분되는 경쾌한 형태) */}
      <path d="M12 4 C17.5 6 18 16 12 20.5 C6 16 6.5 6 12 4 Z"
        stroke={color} strokeWidth={sw} />
      {/* 단순 잎맥 */}
      <line x1="12" y1="4" x2="12" y2="20.5" stroke={stemColor} strokeWidth={sw * 0.65} />
      {/* 측맥 노드 하나만 (Pro보다 간결) */}
      <line x1="12" y1="13" x2="7" y2="11.5" stroke={stemColor} strokeWidth={sw * 0.7} />
      <circle cx="12" cy="13"  r="1.3" fill={color} />
      <circle cx="7"  cy="11.5" r="0.9" fill={stemColor} />
      {/* 줄기 + 노드 */}
      <line x1="12" y1="20.5" x2="12" y2="22" stroke={stemColor} strokeWidth={sw} />
      <circle cx="12" cy="22" r="1.25" stroke={stemColor} strokeWidth={sw} />
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════════
   7. SafePawsIcon  —  전용 파일에서 re-export
   src/components/ui/SafePawsIcon.tsx 참조
   ════════════════════════════════════════════════════════════════ */
export { SafePawsIcon } from "./SafePawsIcon";

/* ════════════════════════════════════════════════════════════════
   색상 상수 — 서비스 카드 import용
   ════════════════════════════════════════════════════════════════ */
export const SAFE_ICON_COLORS = {
  safeWay:      "#82C91E",
  safeLync:     "#228BE6",
  safeSync:     "#FA5252",
  safeEntry:    "#FD7E14",
  safeStepPro:  "#7950F2",
  safeStepLite: "#20C997",
  safePaws:     "#FD7E14",
} as const;
