import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  weight: ["400", "700", "800"],
  subsets: ["latin"],
  variable: "--font-noto-sans-kr",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wald Lab | 건강한 생태계를 만드는 기술",
  description:
    "발트랩은 SafeWay 데이터 플랫폼을 기반으로 원격의료, 산업 안전, 만성질환 관리, 반려동물 케어까지 — 모든 생명을 위한 스마트 헬스케어 솔루션을 제공합니다.",
  keywords: ["발트랩", "Wald Lab", "SafeWay", "헬스케어", "원격의료", "산업안전", "건강관리", "원격진료", "만성질환", "동물케어"],
  authors: [{ name: "Wald Lab Inc." }],
  icons: {
    icon: "/favicon.svg",
  },
  verification: {
    google: "xe2WUOM4X_T66IUXcKd5YBDpRVwLhXHCzY9_qwesXVU",
    other: {
      "naver-site-verification": "33b53ec6757734b8bd6e5673a480237199e3a658",
    },
  },
  openGraph: {
    title: "Wald Lab | 건강한 생태계를 만드는 기술",
    description: "SafeWay 플랫폼 기반 통합 헬스케어 솔루션",
    siteName: "Wald Lab",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`scroll-smooth ${notoSansKR.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
