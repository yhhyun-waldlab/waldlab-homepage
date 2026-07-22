import { Mail, MapPin } from "lucide-react";
import WaldblattLogo from "@/components/ui/WaldblattLogo";

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

export default function Footer({ t }: FooterProps) {
  return (
    <footer id="contact" className="bg-wald-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <WaldblattLogo height={40} variant="light" />
            </div>
            <p className="text-wald-300 text-sm leading-relaxed mb-6 max-w-sm">
              {t("footer.tagline")}
            </p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-wald-400 text-sm flex-wrap">
                <Mail size={15} className="shrink-0" />
                <span>
                  <a
                    href="mailto:info@waldlab.kr"
                    className="hover:text-wald-200 transition-colors"
                  >
                    info@waldlab.kr
                  </a>
                  <span className="text-wald-500">, </span>
                  <a
                    href="mailto:yhhyun@waldlab.kr"
                    className="hover:text-wald-200 transition-colors"
                  >
                    yhhyun@waldlab.kr
                  </a>
                </span>
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
                <span
                  aria-disabled="true"
                  title="Coming soon"
                  className="text-wald-600 text-sm cursor-default select-none"
                >
                  {t("footer.privacy")}
                </span>
              </li>
              <li>
                <span
                  aria-disabled="true"
                  title="Coming soon"
                  className="text-wald-600 text-sm cursor-default select-none"
                >
                  {t("footer.terms")}
                </span>
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
