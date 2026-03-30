"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import WaldblattLogo from "@/components/ui/WaldblattLogo";
import type { Locale } from "@/lib/i18n";

interface HeaderProps {
  t: (key: string) => string;
  locale: Locale;
  onLocaleChange?: (locale: Locale) => void;
  /** 도입 문의 등 다크 배경 페이지에서 항상 스크롤된 스타일(흰 배경·다크 로고) 적용 */
  forceScrolled?: boolean;
}

const navItems = [
  { key: "nav.platform", href: "#platform", isPage: false },
  { key: "nav.services", href: "#services", isPage: false },
  { key: "nav.about",    href: "#about",    isPage: false },
  { key: "nav.news",     href: "#news",     isPage: false },
];

export default function Header({ t, locale, onLocaleChange, forceScrolled = false }: HeaderProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isHome = pathname === "/";
  const showScrolled = forceScrolled || isScrolled;

  useEffect(() => {
    if (forceScrolled) return;
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [forceScrolled]);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (isHome) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        showScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-wald-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo — 홈이면 스크롤, 그 외 페이지면 홈 링크 */}
          {isHome ? (
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="flex items-center"
            >
              <WaldblattLogo height={54} variant={showScrolled ? "dark" : "light"} />
            </a>
          ) : (
            <Link href="/" className="flex items-center">
              <WaldblattLogo height={54} variant={showScrolled ? "dark" : "light"} />
            </Link>
          )}

          {/* Desktop Nav — 홈이면 앵커 스크롤, 그 외면 /#section 링크 (isPage 항목은 항상 Link) */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) =>
              item.isPage || !isHome ? (
                <Link
                  key={item.key}
                  href={item.isPage ? item.href : `/${item.href}`}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    showScrolled
                      ? "text-wald-700 hover:text-wald-900 hover:bg-wald-50"
                      : "text-white/85 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {t(item.key)}
                </Link>
              ) : (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.href)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                    showScrolled
                      ? "text-wald-700 hover:text-wald-900 hover:bg-wald-50"
                      : "text-white/85 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {t(item.key)}
                </button>
              )
            )}
          </nav>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Locale toggle */}
            {onLocaleChange && (
              <button
                onClick={() => {
                  const next = locale === "ko" ? "en" : "ko";
                  try {
                    localStorage.setItem("waldlab_locale", next);
                  } catch {
                    // ignore storage errors (private mode, blocked storage, etc.)
                  }
                  onLocaleChange(next);
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-colors ${
                  showScrolled
                    ? "text-wald-600 border border-wald-200 hover:bg-wald-50"
                    : "text-white/80 border border-white/30 hover:bg-white/10"
                }`}
              >
                {locale === "ko" ? "EN" : "KO"}
              </button>
            )}
            <Link
              href="/contact"
              className={`px-5 py-2.5 text-sm font-semibold rounded-xl transition-colors shadow-sm ${
                showScrolled
                  ? "bg-wald-800 text-white hover:bg-wald-700"
                  : "bg-white/15 text-white border border-white/25 hover:bg-white/25"
              }`}
            >
              {t("nav.getStarted")}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              showScrolled ? "text-wald-700 hover:bg-wald-50" : "text-white hover:bg-white/10"
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="메뉴 열기"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-wald-100 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navItems.map((item) =>
              item.isPage || !isHome ? (
                <Link
                  key={item.key}
                  href={item.isPage ? item.href : `/${item.href}`}
                  className="px-4 py-3 text-sm font-medium text-wald-700 rounded-lg hover:bg-wald-50 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t(item.key)}
                </Link>
              ) : (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.href)}
                  className="text-left px-4 py-3 text-sm font-medium text-wald-700 rounded-lg hover:bg-wald-50 transition-colors"
                >
                  {t(item.key)}
                </button>
              )
            )}
            <div className="pt-2 mt-2 border-t border-wald-100 flex items-center gap-2">
              {onLocaleChange && (
                <button
                  onClick={() => {
                    const next = locale === "ko" ? "en" : "ko";
                    try {
                      localStorage.setItem("waldlab_locale", next);
                    } catch {
                      // ignore storage errors
                    }
                    onLocaleChange(next);
                  }}
                  className="flex-1 py-2.5 text-sm font-semibold text-wald-600 border border-wald-200 rounded-xl hover:bg-wald-50 transition-colors"
                >
                  {locale === "ko" ? "English" : "한국어"}
                </button>
              )}
              <Link
                href="/contact"
                className="flex-1 py-2.5 bg-wald-800 text-white text-sm font-semibold rounded-xl hover:bg-wald-700 transition-colors text-center"
              >
                {t("nav.getStarted")}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
