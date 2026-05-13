import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // PNG 투명 채널 보존: Sharp가 WebP/JPEG로 재변환하지 않도록 PNG 포맷을 허용
    formats: ["image/webp"],
    dangerouslyAllowSVG: false,
  },
};

export default nextConfig;
