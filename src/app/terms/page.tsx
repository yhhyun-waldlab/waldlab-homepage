"use client";

import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { Locale } from "@/lib/i18n";
import { createTranslator } from "@/lib/i18n";
import { localeFromSearchParam } from "@/lib/legal-page-locale";
import { TERMS_SECTIONS_EN } from "@/content/legal-terms-en";

type Messages = Record<string, unknown>;

const TERMS_SECTIONS: {
  title: string;
  paragraphs: string[];
}[] = [
  {
    title: "제1조 (목적)",
    paragraphs: [
      '본 약관은 주식회사 발트랩(이하 "회사")이 제공하는 공식 웹사이트(이하 "사이트")의 이용 조건 및 절차, 이용자와 회사 간의 권리, 의무 및 책임 사항을 규정함을 목적으로 합니다.',
    ],
  },
  {
    title: "제2조 (용어의 정의)",
    paragraphs: [
      '1. "사이트"란 회사가 서비스 및 제품 정보, 회사 소개 등을 이용자에게 제공하기 위하여 운영하는 웹사이트(www.waldlab.kr)를 말합니다.',
      '2. "이용자"란 본 사이트에 접속하여 본 약관에 따라 회사가 제공하는 콘텐츠 및 정보를 열람하거나 이용하는 자를 말합니다.',
      '3. "콘텐츠"란 사이트에 게시된 텍스트, 이미지, 그래픽, 상표, 로고, 디자인, 영상, 문서 자료 등 일체의 정보를 의미합니다.',
    ],
  },
  {
    title: "제3조 (약관의 효력 및 변경)",
    paragraphs: [
      "1. 본 약관은 사이트 내에 게시함으로써 효력이 발생합니다.",
      "2. 회사는 관련 법령을 위배하지 않는 범위 내에서 본 약관을 개정할 수 있으며, 개정된 약관은 사이트에 공지함으로써 효력을 발생합니다.",
    ],
  },
  {
    title: "제4조 (지식재산권 및 저작권의 보호)",
    paragraphs: [
      "1. 사이트에 게시된 모든 콘텐츠와 SafeWay, SafeLync, SafeEntry, SafeSync, SafeStep, SafeStep Center, SafePaws 등 회사의 제품명, 상표, 서비스표, 상호, 기술 문서 및 디자인에 대한 저작권 및 기타 지식재산권은 회사에 귀속됩니다.",
      "2. 이용자는 회사의 사전 서면 승낙 없이 사이트의 정보를 무단 복제, 배포, 전송, 변형, 출판, 방송 또는 기타 상업적 목적으로 활용하거나 제3자에게 이용하게 할 수 없습니다.",
      "3. 사이트 내 상표 및 로고를 무단 도용하거나 침해하는 행위는 관련 법령에 따라 민·형사상 책임을 질 수 있습니다.",
    ],
  },
  {
    title: "제5조 (면책 조항)",
    paragraphs: [
      "1. 사이트에서 제공하는 모든 정보는 회사 및 서비스의 이해를 돕기 위한 소개 자료이며, 상업적 거래나 의료적 판단, 법적 결정의 직접적인 근거로 사용될 수 없습니다.",
      "2. 회사는 사이트에 게재된 콘텐츠의 완전성, 정확성, 신뢰성, 최신성에 대해 합리적인 노력을 기울이나, 이를 무조건적으로 보증하지는 않으며 사전 고지 없이 수정되거나 보완될 수 있습니다.",
      "3. 회사는 천재지변, 정보통신망 장애, 시스템 유지보수 등 회사의 합리적 통제 범위를 벗어난 사유로 사이트 이용에 장애가 발생하거나 데이터가 손실된 경우 이에 대한 책임을 지지 않습니다.",
    ],
  },
  {
    title: "제6조 (외부 링크에 대한 책임 배제)",
    paragraphs: [
      "1. 본 사이트는 이용자의 편의를 위해 제3자의 웹사이트로 연결되는 링크를 포함할 수 있습니다.",
      "2. 회사는 링크된 제3자 웹사이트의 콘텐츠, 개인정보 보호정책, 서비스 운영 및 이용 과정에서 발생하는 제반 문제에 대해 어떠한 통제 권한이나 보증 책임을 지지 않으며, 이로 인해 발생한 손해에 대해 일체의 법적 책임을 부담하지 않습니다.",
    ],
  },
  {
    title: "제7조 (준거법 및 관할 법원)",
    paragraphs: [
      "1. 본 약관의 해석 및 회사와 이용자 간의 분쟁에 대해서는 대한민국 법률을 적용합니다.",
      "2. 사이트 이용과 관련하여 분쟁이 발생할 경우, 회사의 본점 소재지를 관할하는 법원을 전속 관할 법원으로 합니다.",
    ],
  },
];

export default function TermsPage() {
  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window === "undefined") return "ko";
    const params = new URLSearchParams(window.location.search);
    const fromUrl = localeFromSearchParam(params.get("lang"));
    if (fromUrl) return fromUrl;
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
        /* ignore */
      }
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromUrl = localeFromSearchParam(params.get("lang"));
    if (fromUrl) {
      setLocale(fromUrl);
      try {
        window.localStorage.setItem("waldlab_locale", fromUrl);
      } catch {
        /* ignore */
      }
    }
  }, []);

  useEffect(() => {
    import(`@/messages/${locale}.json`)
      .then((mod) => setMessages(mod.default))
      .catch(() =>
        import("@/messages/ko.json").then((mod) => setMessages(mod.default))
      );
  }, [locale]);

  if (!messages) {
    return (
      <div className="min-h-screen bg-wald-950 flex items-center justify-center">
        <div className="text-wald-400 text-sm">Loading…</div>
      </div>
    );
  }

  const t = createTranslator(messages);
  const sections = locale === "en" ? TERMS_SECTIONS_EN : TERMS_SECTIONS;

  return (
    <div className="min-h-screen bg-wald-950 text-white flex flex-col">
      <Header
        t={t}
        locale={locale}
        onLocaleChange={setPersistedLocale}
        forceScrolled
      />

      <main className="flex-1 relative pt-28 pb-16 px-4 sm:px-6">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[640px] h-[320px] rounded-full bg-wald-800/25 blur-3xl" />
        </div>

        <article className="relative z-10 max-w-4xl mx-auto">
          <header className="mb-10 text-center sm:text-left border-b border-wald-800/70 pb-8">
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-wald-ember-light mb-3">
              {t("terms.pageTitle")}
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {t("terms.docTitle")}
            </h1>
            <p className="mt-3 text-sm text-wald-400 leading-relaxed">
              {t("terms.pageSubtitle")}
            </p>
          </header>

          <div className="space-y-8">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-lg font-semibold text-wald-100 mb-3">
                  {section.title}
                </h2>
                <div className="space-y-3 text-sm sm:text-[15px] text-wald-300 leading-relaxed">
                  {section.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </section>
            ))}

            <section className="pt-6 border-t border-wald-800/70">
              <h2 className="text-lg font-semibold text-wald-100 mb-3">
                {t("terms.supplementaryTitle")}
              </h2>
              <p className="text-sm sm:text-[15px] text-wald-300 leading-relaxed">
                {t("terms.supplementary")}
              </p>
            </section>
          </div>
        </article>
      </main>

      <Footer t={t} locale={locale} />
    </div>
  );
}
