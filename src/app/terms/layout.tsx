import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "이용약관 | Wald Lab",
  description:
    "주식회사 발트랩 공식 웹사이트(www.waldlab.kr) 이용약관 및 이용 조건 안내.",
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
