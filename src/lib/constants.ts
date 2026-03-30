export const SITE_NAME = "Wald Lab";
export const SITE_URL = "https://waldlab.co.kr";
export const SITE_DESCRIPTION =
  "발트랩은 SafeWay 데이터 플랫폼을 기반으로 원격의료, 산업 안전, 만성질환 관리, 반려동물 케어까지 — 모든 생명을 위한 스마트 헬스케어 솔루션을 제공합니다.";

export const NAV_LINKS = [
  { key: "nav.platform", href: "#platform" },
  { key: "nav.services", href: "#services" },
  { key: "nav.about", href: "#about" },
  { key: "nav.contact", href: "#contact" },
] as const;

export const SERVICE_KEYS = [
  "safelync",
  "safeentry",
  "safesync",
  "safesteppro",
  "safesteplit",
  "safepaws",
] as const;

export type ServiceKey = (typeof SERVICE_KEYS)[number];
