"use client";

import { useState } from "react";
import { Shield, Link2, Lightbulb } from "lucide-react";

const LEAF_ANIM_STYLE = `
  @keyframes leafFloat {
    0%, 100% { transform: translateX(0px) rotate(0deg); }
    25%      { transform: translateX(-6px) rotate(-4deg); }
    50%      { transform: translateX(0px) rotate(2deg); }
    75%      { transform: translateX(6px) rotate(4deg); }
  }
  @keyframes leafBreath {
    0%, 100% { opacity: 0.85; transform: scale(1); }
    50%       { opacity: 1;    transform: scale(1.05); }
  }
  .leaf-float  { animation: leafFloat  4s ease-in-out infinite; }
  .leaf-breath { animation: leafBreath 3s ease-in-out infinite; }
`;

interface AboutSectionProps {
  t: (key: string) => string;
}

/* 고정된 별 위치 데이터 (Math.random 대체 → SSR 안전) */
const STARS = [
  { w: 2,   top:  3, left:  8, op: 0.5 },
  { w: 1.5, top:  7, left: 25, op: 0.3 },
  { w: 2.5, top:  5, left: 45, op: 0.6 },
  { w: 1,   top: 12, left: 62, op: 0.4 },
  { w: 2,   top:  9, left: 78, op: 0.5 },
  { w: 1.5, top: 15, left: 90, op: 0.3 },
  { w: 2,   top: 20, left:  5, op: 0.4 },
  { w: 1,   top: 22, left: 18, op: 0.6 },
  { w: 2.5, top: 18, left: 35, op: 0.3 },
  { w: 1.5, top: 25, left: 50, op: 0.5 },
  { w: 2,   top: 28, left: 68, op: 0.4 },
  { w: 1,   top: 30, left: 82, op: 0.6 },
  { w: 2,   top: 35, left: 14, op: 0.3 },
  { w: 1.5, top: 32, left: 28, op: 0.5 },
  { w: 2.5, top: 38, left: 55, op: 0.4 },
  { w: 1,   top: 40, left: 72, op: 0.6 },
  { w: 2,   top:  2, left: 40, op: 0.4 },
  { w: 1.5, top:  8, left: 55, op: 0.5 },
  { w: 2,   top: 14, left: 10, op: 0.3 },
  { w: 1,   top: 19, left: 88, op: 0.4 },
  { w: 2.5, top: 25, left: 95, op: 0.5 },
  { w: 1.5, top: 33, left: 42, op: 0.3 },
  { w: 2,   top: 37, left: 22, op: 0.6 },
  { w: 1,   top: 11, left: 73, op: 0.4 },
  { w: 2,   top: 28, left: 88, op: 0.5 },
  { w: 1.5, top:  4, left: 65, op: 0.3 },
  { w: 2,   top: 16, left: 48, op: 0.4 },
  { w: 1,   top: 39, left: 60, op: 0.5 },
  { w: 2.5, top: 23, left:  2, op: 0.6 },
  { w: 1.5, top: 30, left: 30, op: 0.3 },
];

const values = [
  { key: "value1", icon: Shield },
  { key: "value2", icon: Link2 },
  { key: "value3", icon: Lightbulb },
];

export default function AboutSection({ t }: AboutSectionProps) {
  const [leafHovered, setLeafHovered] = useState(false);

  const nodeGlow = leafHovered
    ? { filter: "drop-shadow(0 0 4px #82C91E) drop-shadow(0 0 8px #a8ff3c)", opacity: 1, transition: "filter 0.3s, opacity 0.3s" }
    : { filter: "none", opacity: 0.72, transition: "filter 0.3s, opacity 0.3s" };

  const nodeMainGlow = leafHovered
    ? { filter: "drop-shadow(0 0 5px #82C91E) drop-shadow(0 0 10px #a8ff3c)", transition: "filter 0.3s" }
    : { filter: "none", transition: "filter 0.3s" };

  return (
    <section id="about" className="py-24 lg:py-32 bg-surface">
      <style>{LEAF_ANIM_STYLE}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text content */}
          <div>
            <span className="inline-block px-4 py-1.5 bg-wald-50 text-wald-700 text-xs font-bold rounded-full border border-wald-200 tracking-widest uppercase mb-6">
              {t("about.badge")}
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-wald-900 mb-6 leading-tight">
              {t("about.title").split("\n").map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
            </h2>
            <p className="text-wald-700 text-base leading-relaxed mb-5">
              {t("about.description1")}
            </p>
            {t("about.description2").split("\n\n").map((para, i) => (
              <p key={i} className="text-wald-600 text-base leading-relaxed mb-4 last:mb-10">
                {para.split(/(\*\*[^*]+\*\*)/).map((chunk, j) =>
                  chunk.startsWith("**") && chunk.endsWith("**")
                    ? <strong key={j} className="font-bold">{chunk.slice(2, -2)}</strong>
                    : chunk
                )}
              </p>
            ))}

            {/* Values */}
            <div className="flex flex-col gap-4">
              {values.map(({ key, icon: Icon }) => (
                <div key={key} className="flex items-start gap-4 p-4 rounded-xl border border-wald-100 bg-white hover:border-wald-300 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-wald-800 flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-wald-300" />
                  </div>
                  <div>
                    <h4 className="font-bold text-wald-900 text-sm mb-1">
                      {t(`about.${key}Title`)}
                    </h4>
                    <p className="text-wald-600 text-xs leading-relaxed">
                      {t(`about.${key}Desc`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual */}
          <div className="relative">
            {/* Forest illustration card */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-wald-800 to-wald-950 aspect-[4/5] max-w-md mx-auto">
              {/* Sky gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-wald-900/80 via-wald-800 to-wald-950" />

              {/* Stars — 고정 값으로 SSR 수화 불일치 방지 */}
              {STARS.map((s, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-white"
                  style={{
                    width:   s.w + "px",
                    height:  s.w + "px",
                    top:     s.top + "%",
                    left:    s.left + "%",
                    opacity: s.op,
                  }}
                />
              ))}

              {/* Trees silhouette */}
              <div className="absolute bottom-0 left-0 right-0 h-3/5">
                {/* Background trees */}
                {[...Array(8)].map((_, i) => (
                  <div
                    key={`btree-${i}`}
                    className="absolute bottom-0"
                    style={{
                      left: `${i * 14 + 2}%`,
                      width: "10%",
                    }}
                  >
                    <div
                      className="bg-wald-900 mx-auto"
                      style={{
                        width: "100%",
                        height: `${80 + i * 10}px`,
                        clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                        opacity: 0.6,
                      }}
                    />
                  </div>
                ))}

                {/* Foreground trees */}
                {[...Array(5)].map((_, i) => (
                  <div
                    key={`ftree-${i}`}
                    className="absolute bottom-0"
                    style={{
                      left: `${i * 22 + 3}%`,
                      width: "16%",
                    }}
                  >
                    <div
                      className="bg-wald-800 mx-auto"
                      style={{
                        width: "100%",
                        height: `${130 + i * 15}px`,
                        clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                        opacity: 0.9,
                      }}
                    />
                  </div>
                ))}

                {/* Ground */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-wald-900 rounded-t-full" />
              </div>

              {/* Moon with Waldlab leaf logo */}
              <div
                className="absolute top-10 right-10 w-20 h-20 rounded-full bg-wald-200/30 border border-wald-300/20 flex items-center justify-center cursor-pointer"
                style={{ transition: "background 0.3s, box-shadow 0.3s", boxShadow: leafHovered ? "0 0 16px 4px rgba(130,201,30,0.25)" : "none", background: leafHovered ? "rgba(130,201,30,0.12)" : undefined }}
                onMouseEnter={() => setLeafHovered(true)}
                onMouseLeave={() => setLeafHovered(false)}
              >
                <div className="leaf-float">
                  <svg viewBox="5 3 50 63" width="44" height="44" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 34,64 C 13,58 7,37 22,14 C 27,6 36,5 39,9 C 47,15 52,37 44,55 C 41,62 38,64 34,64 Z"
                      fill="none" stroke="#C8E0D0" strokeWidth="2.6" strokeLinejoin="round" strokeLinecap="round"
                      style={{ transition: "stroke 0.3s", stroke: leafHovered ? "#a8ffc0" : "#C8E0D0" }}/>
                    <path d="M 34,62 C 32,50 33,34 37,12"
                      stroke="#A0C4B0" strokeWidth="1.8" fill="none" strokeLinecap="round"
                      style={{ transition: "stroke 0.3s", stroke: leafHovered ? "#c8ffd8" : "#A0C4B0" }}/>
                    <line x1="33" y1="50" x2="43" y2="46" stroke="#82C91E" strokeWidth="1.3" strokeLinecap="round"/>
                    <circle cx="33" cy="50" r="2.6" fill="#82C91E" style={nodeMainGlow}/>
                    <circle cx="43" cy="46" r="1.9" fill="#82C91E" style={nodeGlow}/>
                    <line x1="33" y1="38" x2="16" y2="35" stroke="#82C91E" strokeWidth="1.3" strokeLinecap="round"/>
                    <circle cx="33" cy="38" r="2.6" fill="#82C91E" style={nodeMainGlow}/>
                    <circle cx="16" cy="35" r="1.9" fill="#82C91E" style={nodeGlow}/>
                    <line x1="35" y1="26" x2="44" y2="22" stroke="#82C91E" strokeWidth="1.3" strokeLinecap="round"/>
                    <circle cx="35" cy="26" r="2.4" fill="#82C91E" style={nodeMainGlow}/>
                    <circle cx="44" cy="22" r="1.7" fill="#82C91E" style={nodeGlow}/>
                  </svg>
                </div>
              </div>

              {/* Bottom text overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-wald-950 to-transparent">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-md bg-wald-400/30 flex items-center justify-center">
                    <div className="leaf-breath">
                      <svg viewBox="5 3 50 63" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                        <path d="M 34,64 C 13,58 7,37 22,14 C 27,6 36,5 39,9 C 47,15 52,37 44,55 C 41,62 38,64 34,64 Z"
                          fill="none" stroke="#C8E0D0" strokeWidth="2.6" strokeLinejoin="round" strokeLinecap="round"/>
                        <path d="M 34,62 C 32,50 33,34 37,12"
                          stroke="#A0C4B0" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                        <line x1="33" y1="50" x2="43" y2="46" stroke="#82C91E" strokeWidth="1.3" strokeLinecap="round"/>
                        <circle cx="33" cy="50" r="2.6" fill="#82C91E"/>
                        <circle cx="43" cy="46" r="1.9" fill="#82C91E" opacity="0.72"/>
                        <line x1="33" y1="38" x2="16" y2="35" stroke="#82C91E" strokeWidth="1.3" strokeLinecap="round"/>
                        <circle cx="33" cy="38" r="2.6" fill="#82C91E"/>
                        <circle cx="16" cy="35" r="1.9" fill="#82C91E" opacity="0.72"/>
                        <line x1="35" y1="26" x2="44" y2="22" stroke="#82C91E" strokeWidth="1.3" strokeLinecap="round"/>
                        <circle cx="35" cy="26" r="2.4" fill="#82C91E"/>
                        <circle cx="44" cy="22" r="1.7" fill="#82C91E" opacity="0.72"/>
                      </svg>
                    </div>
                  </div>
                  <span className="text-wald-300 text-xs font-bold tracking-widest uppercase">
                    {t("about.waldMeaning")}
                  </span>
                </div>
                <p className="text-wald-200 text-sm font-medium leading-snug">
                  {t("about.forestQuote")}<br />{t("about.forestQuote2")}
                </p>
              </div>
            </div>

            {/* Floating stat cards */}
            <div className="absolute -left-4 top-1/4 bg-white rounded-2xl shadow-xl border border-wald-100 p-4 w-36">
              <div className="text-2xl font-bold text-wald-800 mb-0.5">6+</div>
              <div className="text-xs text-wald-600 font-medium leading-tight">{t("about.statCard1Line1")}<br />{t("about.statCard1Line2")}</div>
            </div>
            <div className="absolute -right-4 bottom-1/3 bg-wald-800 rounded-2xl shadow-xl p-4 w-36">
              <div className="text-2xl font-bold text-wald-300 mb-0.5">SafeWay</div>
              <div className="text-xs text-wald-400 font-medium leading-tight">{t("about.statCard2Line1")}<br />{t("about.statCard2Line2")}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
