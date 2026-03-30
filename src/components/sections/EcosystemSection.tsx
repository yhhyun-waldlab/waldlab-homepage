"use client";

import { useState } from "react";
import { Database } from "lucide-react";
import {
  SafeLyncIcon,
  SafeEntryIcon,
  SafeSyncIcon,
  SafeStepProIcon,
  SafeStepLiteIcon,
  type SafeIconProps,
} from "@/components/ui/SafeIcons";
import { SafePawsIcon } from "@/components/ui/SafePawsIcon";

interface EcosystemSectionProps {
  t: (key: string) => string;
}

/* 서비스 라인업과 동일한 아이콘·색상 */
const services: Array<{
  key: string;
  Icon: React.ComponentType<SafeIconProps>;
  label: string;
  color: string;
  angle: number;
}> = [
  { key: "safelync",    Icon: SafeLyncIcon,     label: "SafeLync",      color: "#228BE6", angle: 270 },
  { key: "safeentry",   Icon: SafeEntryIcon,     label: "SafeEntry",     color: "#FD7E14", angle: 330 },
  { key: "safesync",    Icon: SafeSyncIcon,     label: "SafeSync",      color: "#FA5252", angle: 30  },
  { key: "safesteppro", Icon: SafeStepProIcon,  label: "SafeStep Pro",  color: "#7950F2", angle: 90  },
  { key: "safesteplit", Icon: SafeStepLiteIcon, label: "SafeStep Lite", color: "#20C997", angle: 150 },
  { key: "safepaws",    Icon: SafePawsIcon,     label: "SafePaws",      color: "#FD7E14", angle: 210 },
];

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

export default function EcosystemSection({ t }: EcosystemSectionProps) {
  const [activeService, setActiveService] = useState<string | null>(null);

  const cx = 300;
  const cy = 300;
  const outerR = 200;
  const nodeSize = 44;

  return (
    <section className="py-24 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-wald-50 text-wald-700 text-xs font-bold rounded-full border border-wald-200 tracking-widest uppercase mb-4">
            {t("ecosystem.badge")}
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold text-wald-900 mb-5 leading-tight">
            {t("ecosystem.title").split("\n").map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </h2>
          <p className="text-wald-600 text-lg max-w-2xl mx-auto leading-relaxed">
            {t("ecosystem.subtitle")}
          </p>
        </div>

        {/* Ecosystem Diagram */}
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* SVG Diagram */}
          <div className="flex-shrink-0 w-full max-w-[600px] mx-auto lg:mx-0">
            <svg
              viewBox="0 0 600 600"
              className="w-full h-auto"
              style={{ filter: "drop-shadow(0 20px 40px rgba(13,43,30,0.08))" }}
            >
              {/* Background circle */}
              <circle cx={cx} cy={cy} r={outerR + 40} fill="#f5f7f5" stroke="#e5ede8" strokeWidth="1" />

              {/* Connection lines */}
              {services.map((svc) => {
                const pos = polarToCartesian(cx, cy, outerR, svc.angle);
                const isActive = activeService === svc.key;
                return (
                  <line
                    key={`line-${svc.key}`}
                    x1={cx}
                    y1={cy}
                    x2={pos.x}
                    y2={pos.y}
                    stroke={isActive ? svc.color : "#2d6a4f"}
                    strokeWidth={isActive ? 2.5 : 1.5}
                    strokeDasharray={isActive ? "none" : "5 4"}
                    opacity={isActive ? 0.8 : 0.3}
                    style={{ transition: "all 0.3s ease" }}
                  />
                );
              })}

              {/* Orbital ring */}
              <circle
                cx={cx}
                cy={cy}
                r={outerR}
                fill="none"
                stroke="#2d6a4f"
                strokeWidth="1"
                strokeDasharray="4 6"
                opacity="0.2"
              />

              {/* Service nodes */}
              {services.map((svc) => {
                const pos = polarToCartesian(cx, cy, outerR, svc.angle);
                const isActive = activeService === svc.key;
                const Icon = svc.Icon;
                const iconColor = isActive ? "white" : svc.color;
                const stemColor = isActive ? "rgba(255,255,255,0.75)" : "#1A3828";

                return (
                  <g
                    key={svc.key}
                    transform={`translate(${pos.x - nodeSize / 2}, ${pos.y - nodeSize / 2})`}
                    onClick={() => setActiveService(isActive ? null : svc.key)}
                    style={{ cursor: "pointer" }}
                  >
                    {/* Node bg */}
                    <rect
                      width={nodeSize}
                      height={nodeSize}
                      rx="12"
                      fill={isActive ? svc.color : "white"}
                      stroke={isActive ? svc.color : "#e5ede8"}
                      strokeWidth={isActive ? 0 : 2}
                      style={{ transition: "all 0.3s ease", filter: isActive ? `drop-shadow(0 4px 12px ${svc.color}60)` : "none" }}
                    />
                    {/* 서비스 라인업과 동일한 SafeIcons */}
                    <foreignObject width={nodeSize} height={nodeSize}>
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "color 0.3s ease",
                        }}
                      >
                        <Icon size={22} color={iconColor} stemColor={stemColor} />
                      </div>
                    </foreignObject>
                    {/* Label */}
                    <text
                      x={nodeSize / 2}
                      y={nodeSize + 16}
                      textAnchor="middle"
                      fontSize="10"
                      fontWeight="600"
                      fill={isActive ? svc.color : "#1f5c3e"}
                      style={{ transition: "fill 0.3s ease" }}
                    >
                      {svc.label}
                    </text>
                  </g>
                );
              })}

              {/* Center: SafeWay */}
              <circle
                cx={cx}
                cy={cy}
                r={72}
                fill="#1a4731"
                style={{ filter: "drop-shadow(0 8px 24px rgba(26,71,49,0.4))" }}
              />
              <circle cx={cx} cy={cy} r={60} fill="none" stroke="#52b788" strokeWidth="1.5" opacity="0.4" />
              <circle cx={cx} cy={cy} r={48} fill="none" stroke="#52b788" strokeWidth="1" opacity="0.2" />

              {/* SafeWay text */}
              <text x={cx} y={cy - 10} textAnchor="middle" fontSize="11" fontWeight="700" fill="#74c69d" letterSpacing="2">
                SafeWay
              </text>
              <text x={cx} y={cy + 8} textAnchor="middle" fontSize="8" fill="#52b788" opacity="0.8" letterSpacing="1">
                PLATFORM
              </text>
              <foreignObject x={cx - 12} y={cy + 16} width={24} height={24}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", color: "#52b788", opacity: 0.7 }}>
                  <Database size={16} />
                </div>
              </foreignObject>
            </svg>
          </div>

          {/* Service detail panel */}
          <div className="flex-1 w-full">
            {activeService ? (
              (() => {
                const svc = services.find((s) => s.key === activeService)!;
                const Icon = svc.Icon;
                return (
                  <div
                    key={activeService}
                    className="rounded-2xl border-2 p-8"
                    style={{ borderColor: svc.color + "40", backgroundColor: svc.color + "08" }}
                  >
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                      style={{ backgroundColor: svc.color + "15" }}
                    >
                      <Icon size={26} color={svc.color} />
                    </div>
                    <div
                      className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-3"
                      style={{ backgroundColor: svc.color + "15", color: svc.color }}
                    >
                      {t(`services.${activeService}.category`)}
                    </div>
                    <h3 className="text-2xl font-bold text-wald-900 mb-3">{svc.label}</h3>
                    <p className="text-wald-600 leading-relaxed mb-6">
                      {t(`services.${activeService}.desc`)}
                    </p>
                    <div className="flex items-center gap-2 text-sm font-medium text-wald-500">
                      <Database size={14} className="text-wald-400" />
                      <span>{t("ecosystem.platformLabel")}</span>
                    </div>
                  </div>
                );
              })()
            ) : (
              <div className="rounded-2xl border border-wald-100 bg-surface p-8">
                <div className="w-14 h-14 rounded-2xl bg-wald-50 flex items-center justify-center mb-5">
                  <Database size={26} className="text-wald-600" />
                </div>
                <h3 className="text-2xl font-bold text-wald-900 mb-3">SafeWay Ecosystem</h3>
                <p className="text-wald-600 leading-relaxed mb-6">
                  {t("ecosystem.panelHint")}
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {services.map((svc) => {
                    const Icon = svc.Icon;
                    return (
                      <button
                        key={svc.key}
                        onClick={() => setActiveService(svc.key)}
                        className="flex flex-col items-center gap-2 p-3 rounded-xl border border-wald-100 hover:border-wald-300 transition-colors"
                      >
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: svc.color + "15" }}
                        >
                          <Icon size={16} color={svc.color} />
                        </div>
                        <span className="text-xs font-semibold text-wald-700 text-center leading-tight">
                          {svc.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
