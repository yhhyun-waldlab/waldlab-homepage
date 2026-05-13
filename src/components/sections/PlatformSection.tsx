import Image from "next/image";
import Link from "next/link";
import {
  Database,
  Zap,
  Lock,
  Code2,
  ArrowRight,
} from "lucide-react";

interface PlatformSectionProps {
  t: (key: string) => string;
}

const features = [
  { key: "feature1", icon: Database },
  { key: "feature2", icon: Zap },
  { key: "feature3", icon: Lock },
  { key: "feature4", icon: Code2 },
];

export default function PlatformSection({ t }: PlatformSectionProps) {
  return (
    <section id="platform" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-wald-50 text-wald-700 text-xs font-bold rounded-full border border-wald-200 tracking-widest uppercase mb-4">
            {t("platform.badge")}
          </span>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-16 bg-gradient-to-r from-transparent to-wald-300" />
            <Image
              src="/images/SafeWay-logo.png"
              alt="SafeWay"
              height={104}
              width={400}
              className="object-contain h-20 lg:h-26 w-auto"
              priority
            />
            <div className="h-px flex-1 max-w-16 bg-gradient-to-l from-transparent to-wald-300" />
          </div>
          <p className="text-wald-600 text-base font-medium mb-6">
            {t("platform.subtitle")}
          </p>
          <p className="text-wald-700 text-lg max-w-2xl mx-auto leading-relaxed">
            {t("platform.description")}
          </p>
        </div>

        {/* Main card */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-wald-900 to-wald-800 p-8 lg:p-12 mb-8">
          {/* Background pattern */}
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />

          {/* SafeWay visual */}
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
            {/* Left: Platform visualization */}
            <div className="flex-shrink-0">
              <div className="relative w-64 h-64 flex items-center justify-center">
                {/* Outer rings */}
                <div className="absolute inset-0 rounded-full border border-wald-500/20 animate-spin-slow" />
                <div className="absolute inset-6 rounded-full border border-wald-400/25 animate-spin-reverse" />
                <div className="absolute inset-12 rounded-full border border-wald-300/30" />

                {/* Orbiting dots */}
                <div className="absolute inset-0 animate-spin-slow">
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-wald-400" />
                </div>
                <div className="absolute inset-6 animate-spin-reverse">
                  <div className="absolute top-3 right-8 w-2.5 h-2.5 rounded-full bg-wald-300" />
                </div>

                {/* Center */}
                <div className="relative z-10 w-28 h-28 rounded-3xl bg-wald-400/20 border border-wald-400/40 backdrop-blur-sm flex flex-col items-center justify-center gap-1">
                  <Database size={28} className="text-wald-300" />
                  <span className="text-wald-200 font-bold text-sm tracking-wide">SafeWay</span>
                </div>
              </div>
            </div>

            {/* Right: Description */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-wald-400/20 rounded-full border border-wald-400/30 mb-6">
                <div className="w-1.5 h-1.5 bg-wald-400 rounded-full animate-pulse" />
                <span className="text-wald-300 text-xs font-semibold tracking-wider uppercase">
                  Core Infrastructure
                </span>
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                SafeWay Platform
              </h3>
              <p className="text-wald-300 text-base leading-relaxed mb-8 max-w-lg">
                {t("platform.description")}
              </p>
              <Link
                href="/safeway"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-wald-400 text-wald-950 font-bold text-sm rounded-xl hover:bg-wald-300 transition-colors"
              >
                {t("platform.learnMore")}
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map(({ key, icon: Icon }) => (
            <div
              key={key}
              className="group p-6 rounded-2xl border border-wald-100 bg-white hover:border-wald-300 hover:shadow-lg hover:shadow-wald-100 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-wald-50 flex items-center justify-center mb-4 group-hover:bg-wald-100 transition-colors">
                <Icon size={20} className="text-wald-700" />
              </div>
              <h4 className="font-bold text-wald-900 text-sm mb-2">
                {t(`platform.${key}Title`)}
              </h4>
              <p className="text-wald-600 text-xs leading-relaxed">
                {t(`platform.${key}Desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 스핀 애니메이션은 globals.css의 .animate-spin-slow / .animate-spin-reverse 클래스 사용 */}
    </section>
  );
}
