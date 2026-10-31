"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import WaldblattLogo from "@/components/ui/WaldblattLogo";
import type { Locale } from "@/lib/i18n";
import { legalPageHref } from "@/lib/legal-page-locale";

/* 사업자 정보 인라인 헬퍼 */
function BizItem({ label, value }: { label: string; value: string }) {
  return (
    <>
      <span className="text-wald-700">{label}</span>
      {" "}
      <span>{value}</span>
    </>
  );
}
function Sep() {
  return <span className="mx-2 text-wald-800 select-none">·</span>;
}

interface FooterProps {
  t: (key: string) => string;
  /** When omitted, reads waldlab_locale from localStorage on the client */
  locale?: Locale;
}

const serviceLinks = [
  { key: "footer.links.platform", href: "#platform" },
  { key: "footer.links.safelync", href: "#services" },
  { key: "footer.links.safeentry", href: "#services" },
  { key: "footer.links.safesync", href: "#services" },
  { key: "footer.links.safestep", href: "#services" },
  { key: "footer.links.safestepcenter", href: "#services" },
  { key: "footer.links.safepaws", href: "#services" },
];

export default function Footer({ t, locale: localeProp }: FooterProps) {
  const [clickCount, setClickCount] = useState(0);
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [storedLocale, setStoredLocale] = useState<Locale>("ko");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("waldlab_locale");
      if (saved === "en" || saved === "ko") setStoredLocale(saved);
    } catch {
      /* ignore */
    }
  }, []);

  const locale = localeProp ?? storedLocale;

  const handleLogoClick = () => {
    // Clear existing timer
    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current);
    }

    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount >= 3) {
      // Open admin dashboard in new tab
      window.open("/admin/dashboard", "_blank");
      setClickCount(0);
    } else {
      // Reset count after 1 second if no more clicks
      clickTimerRef.current = setTimeout(() => {
        setClickCount(0);
      }, 1000);
    }
  };

  return (
    <footer id="contact" className="bg-wald-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div
              className="mb-4 cursor-pointer select-none"
              onClick={handleLogoClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleLogoClick();
                }
              }}
              title="로고"
            >
              <WaldblattLogo height={40} variant="light" />
            </div>
            <p className="text-wald-300 text-sm leading-relaxed mb-6 max-w-sm">
              {t("footer.tagline")}
            </p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-wald-400 text-sm flex-wrap">
                <Mail size={15} className="shrink-0" />
                <a
                  href="mailto:info@waldlab.kr"
                  className="hover:text-wald-200 transition-colors"
                >
                  info@waldlab.kr
                </a>
              </div>
              <div className="flex items-center gap-2 text-wald-400 text-sm">
                <MapPin size={15} />
                <span>{t("footer.location")}</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 tracking-wide">
              {t("footer.servicesTitle")}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {serviceLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-wald-400 text-sm hover:text-wald-200 transition-colors"
                  >
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 tracking-wide">
              {t("footer.legalTitle")}
            </h3>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link
                  href={legalPageHref("/privacy", locale)}
                  className="text-wald-400 text-sm hover:text-wald-200 transition-colors"
                >
                  {t("footer.privacy")}
                </Link>
              </li>
              <li>
                <Link
                  href={legalPageHref("/terms", locale)}
                  className="text-wald-400 text-sm hover:text-wald-200 transition-colors"
                >
                  {t("footer.terms")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 사업자 정보 */}
      <div className="border-t border-wald-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
          {/* 1행: 회사 기본 정보 */}
          <p className="text-[11px] text-wald-600 leading-relaxed mb-1.5">
            <BizItem label={t("footer.bizLabelCompany")} value={t("footer.bizCompany")} />
            <Sep />
            <BizItem label={t("footer.bizLabelCeo")} value={t("footer.bizCeo")} />
            <Sep />
            <BizItem label={t("footer.bizLabelRegNum")} value={t("footer.bizRegNum")} />
            <Sep />
            <BizItem label={t("footer.bizLabelPrivacy")} value={t("footer.bizPrivacyOfficer")} />
          </p>
          {/* 2행: 주소 · 이메일 */}
          <p className="text-[11px] text-wald-600 leading-relaxed">
            <BizItem label={t("footer.bizLabelAddress")} value={t("footer.bizAddress")} />
            <Sep />
            <BizItem label={t("footer.bizLabelEmail")} value={t("footer.bizEmail")} />
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-wald-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
            <p className="text-wald-500 text-xs">{t("footer.copyright")}</p>
            <p className="text-wald-600 text-xs">
              Powered by SafeWay Platform
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
