import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침 | Wald Lab",
  description:
    "주식회사 발트랩 개인정보처리방침 및 개인정보 보호 안내.",
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
