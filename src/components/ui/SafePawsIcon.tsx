"use client";

import React from "react";

interface SafePawsIconProps {
  size?: number;
  color?: string;
  stemColor?: string;
  strokeWidth?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const SafePawsIcon = ({
  size = 24,
  color = "#FD7E14",
  className,
  style,
}: SafePawsIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    {/* 메인 패드 */}
    <ellipse cx="12" cy="16" rx="5" ry="4" fill={color} />

    {/* 발가락 — 좌 외측 */}
    <circle cx="5.5"  cy="11" r="2"   fill={color} />
    {/* 발가락 — 좌 내측 */}
    <circle cx="9.5"  cy="8.5" r="2.2" fill={color} />
    {/* 발가락 — 우 내측 */}
    <circle cx="14.5" cy="8.5" r="2.2" fill={color} />
    {/* 발가락 — 우 외측 */}
    <circle cx="18.5" cy="11" r="2"   fill={color} />
  </svg>
);

export default SafePawsIcon;
