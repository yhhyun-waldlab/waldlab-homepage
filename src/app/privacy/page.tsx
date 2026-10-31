"use client";

import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { Locale } from "@/lib/i18n";
import { createTranslator } from "@/lib/i18n";
import { localeFromSearchParam } from "@/lib/legal-page-locale";
import {
  PRIVACY_INTRO_EN,
  PRIVACY_SECTIONS_EN,
} from "@/content/legal-privacy-en";

type Messages = Record<string, unknown>;

const INTRO =
  '주식회사 발트랩(이하 "회사")은 정보주체의 자유와 권리 보호를 위해 「개인정보 보호법」 및 관계 법령이 정한 바를 준수하며, 정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 다음과 같이 개인정보처리방침을 수립·공개합니다.';

const PRIVACY_SECTIONS: {
  title: string;
  paragraphs: string[];
}[] = [
  {
    title: "제1조 (개인정보의 처리 목적)",
    paragraphs: [
      "회사는 다음의 목적을 위하여 최소한의 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 관련 법령에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.",
      "1. 고객 문의 응대: 이메일 등을 통한 비즈니스 제휴, 제품 문의, 솔루션 도입 상담 및 민원 처리",
      "2. 웹사이트 시스템 안정성 확보: 부정 이용 방지, 서버 접속 통계 확인 및 서비스 품질 유지",
    ],
  },
  {
    title: "제2조 (처리하는 개인정보의 항목)",
    paragraphs: [
      "1. 문의 처리 시: 발신인 이메일 주소, 문의 내용에 포함된 이름, 소속, 연락처 등",
      "2. 웹사이트 이용 과정에서 자동으로 생성·수집되는 항목: 접속 IP 주소, 접속 일시, 브라우저 종류 및 OS 정보, 서비스 이용 기록",
    ],
  },
  {
    title: "제3조 (개인정보의 처리 및 보유 기간)",
    paragraphs: [
      "회사는 법령에 따른 개인정보 보유·이용 기간 또는 정보주체로부터 수집 시 동의받은 기간 내에서 개인정보를 처리·보유합니다.",
      "1. 고객 문의 및 상담 내역: 문의 처리 완료 후 3년간 보관(전자상거래 등에서의 소비자보호에 관한 법률 등 관계 법령 준용) 후 파기",
      "2. 웹사이트 접속 로그: 3개월 보관(통신비밀보호법 준용) 후 자동 파기",
    ],
  },
  {
    title: "제4조 (개인정보의 파기 절차 및 방법)",
    paragraphs: [
      "회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체 없이 해당 개인정보를 파기합니다.",
      "1. 전자적 파일 형태: 기록을 재생할 수 없는 기술적 방법을 사용하여 영구 삭제",
      "2. 종이 문서 형태: 분쇄기로 분쇄하거나 소각",
    ],
  },
  {
    title: "제5조 (개인정보의 제3자 제공 및 위탁)",
    paragraphs: [
      "회사는 원칙적으로 정보주체의 개인정보를 제3자에게 제공하거나 외부에 위탁하지 않습니다. 단, 정보주체의 사전 동의가 있거나 법률의 특별한 규정 등에 해당하는 경우에만 개인정보를 제공합니다.",
    ],
  },
  {
    title: "제6조 (정보주체와 법정대리인의 권리·의무 및 행사방법)",
    paragraphs: [
      "정보주체는 회사에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있으며, 회사의 대표 연락처(info@waldlab.kr)로 서면 또는 전자우편을 통해 요청하시면 지체 없이 조치하겠습니다.",
    ],
  },
  {
    title: "제7조 (개인정보 보호책임자)",
    paragraphs: [
      "회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.",
      "- 책임자: 주식회사 발트랩 개인정보 보호책임자",
      "- 문의처: info@waldlab.kr",
    ],
  },
  {
    title: "제8조 (개인정보 처리방침의 변경)",
    paragraphs: [
      "본 방침은 관련 법령 및 회사 정책에 따라 변경될 수 있으며, 개정 시 사이트를 통해 공지합니다.",
    ],
  },
];

export default function PrivacyPage() {
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
  const intro = locale === "en" ? PRIVACY_INTRO_EN : INTRO;
  const sections = locale === "en" ? PRIVACY_SECTIONS_EN : PRIVACY_SECTIONS;

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
              {t("privacy.pageTitle")}
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {t("privacy.docTitle")}
            </h1>
            <p className="mt-3 text-sm text-wald-400 leading-relaxed">
              {t("privacy.pageSubtitle")}
            </p>
          </header>

          <p className="text-sm sm:text-[15px] text-wald-300 leading-relaxed mb-10">
            {intro}
          </p>

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
                {t("privacy.supplementaryTitle")}
              </h2>
              <p className="text-sm sm:text-[15px] text-wald-300 leading-relaxed">
                {t("privacy.supplementary")}
              </p>
            </section>
          </div>
        </article>
      </main>

      <Footer t={t} locale={locale} />
    </div>
  );
}
