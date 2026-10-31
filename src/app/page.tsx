"use client";

import { useState, useEffect } from "react";
import type { Locale } from "@/lib/i18n";
import { createTranslator } from "@/lib/i18n";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import PlatformSection from "@/components/sections/PlatformSection";
import ServicesSection from "@/components/sections/ServicesSection";
import EcosystemSection from "@/components/sections/EcosystemSection";
import AboutSection from "@/components/sections/AboutSection";
import CTASection from "@/components/sections/CTASection";
import NewsSection from "@/components/sections/NewsSection";
import SafewayFoundationSection from "@/components/sections/SafewayFoundationSection";
import HeritageSection from "@/components/sections/HeritageSection";

type Messages = Record<string, unknown>;

export default function HomePage() {
  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window === "undefined") return "ko";
    const saved = window.localStorage.getItem("waldlab_locale");
    return saved === "en" || saved === "ko" ? saved : "ko";
  });
  const [messages, setMessages] = useState<Messages | null>(null);

  const setPersistedLocale = (next: Locale) => {
    setLocale(next);
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem("waldlab_locale", next);
      } catch {
        // ignore storage errors
      }
    }
  };

  useEffect(() => {
    import(`@/messages/${locale}.json`)
      .then((mod) => setMessages(mod.default))
      .catch(() => import("@/messages/ko.json").then((mod) => setMessages(mod.default)));
  }, [locale]);

  if (!messages) {
    return (
      <div className="min-h-screen bg-wald-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-wald-800 flex items-center justify-center animate-pulse">
            <span className="text-wald-400 font-bold">W</span>
          </div>
          <div className="w-24 h-1 bg-wald-800 rounded-full overflow-hidden">
            <div className="h-full bg-wald-400 rounded-full animate-[loading_1.5s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>
    );
  }

  const t = createTranslator(messages);

  return (
    <main className="min-h-screen">
      <Header t={t} locale={locale} onLocaleChange={setPersistedLocale} />
      <HeroSection t={t} />
      <PlatformSection t={t} />
      <ServicesSection t={t} />
      <EcosystemSection t={t} />
      <AboutSection t={t} />
      <HeritageSection t={t} />
      <SafewayFoundationSection t={t} />
      <CTASection t={t} />
      <NewsSection t={t} locale={locale} />
      <Footer t={t} locale={locale} />
    </main>
  );
}
