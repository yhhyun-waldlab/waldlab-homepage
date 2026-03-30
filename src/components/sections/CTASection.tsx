import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

interface CTASectionProps {
  t: (key: string) => string;
}

export default function CTASection({ t }: CTASectionProps) {
  const titleLines = t("cta.title").split("\n");

  return (
    <section className="py-24 lg:py-32 bg-gradient-to-br from-wald-950 via-wald-900 to-wald-800 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-wald-700/20 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full bg-wald-600/15 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(116,198,157,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(116,198,157,1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-wald-700/50 border border-wald-600/40 mb-8">
          <div className="w-1.5 h-1.5 rounded-full bg-wald-400 animate-pulse" />
          <span className="text-wald-300 text-xs font-semibold tracking-widest uppercase">
            Contact Us
          </span>
        </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          {titleLines.map((line, i) => (
            <span key={i} className="block">
              {i === 1 ? <span className="text-wald-400">{line}</span> : line}
            </span>
          ))}
        </h2>

        {/* Subtitle */}
        <p className="text-wald-300 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          {t("cta.subtitle")}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-wald-400 text-wald-950 font-bold text-sm rounded-2xl hover:bg-wald-300 transition-all shadow-lg shadow-wald-900/50"
          >
            {t("cta.primary")}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <button className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-wald-800/60 text-white font-semibold text-sm rounded-2xl border border-wald-600/40 hover:bg-wald-700/60 transition-all backdrop-blur-sm">
            <Play size={15} className="text-wald-400" />
            {t("cta.secondary")}
          </button>
        </div>

        {/* Email hint */}
        <p className="mt-8 text-wald-600 text-sm">
          {t("cta.emailHintPrefix")}
          <a
            href="mailto:info@waldlab.kr"
            className="text-wald-400 hover:text-wald-300 transition-colors underline underline-offset-2"
          >
            info@waldlab.kr
          </a>
          {t("cta.emailHintSuffix")}
        </p>
      </div>
    </section>
  );
}
