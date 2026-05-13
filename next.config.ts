import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1–2) Next 내장 이미지 최적화(Sharp → WebP 등) 전역 OFF — public 자산 바이트 그대로 전송
  images: {
    unoptimized: true,
  },
  // 5) no-transform: 중간 캐시가 이미지 바디 변환·재압축하지 못하게 함.
  //    Cloudflare Polish / Image Resizing 등은 대시보드에서 별도 OFF 필요.
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=3600, must-revalidate, no-transform",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
