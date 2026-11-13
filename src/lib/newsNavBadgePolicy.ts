/**
 * 공지·소식 네비 "N" 배지 — 노출 정책 (테스트 시 RECENT_DAYS만 조정하면 됨)
 */

export const NEWS_NAV_SEEN_STORAGE_KEY = "waldlab_nav_news_seen_id";

/** 최신 공지가 이 일수 이내일 때만 배지 후보 (개발·QA: 임시로 늘려 동작 확인 가능) */
export const NEWS_NAV_RECENT_DAYS = 7;

export type LatestAnnouncementMeta = { id: string; date: string };

/** ISO 날짜(YYYY-MM-DD) → 현재 시각까지 경과 일수 */
export function daysSinceAnnouncementDate(
  isoDate: string,
  now: number = Date.now()
): number {
  const posted = new Date(`${isoDate}T12:00:00`).getTime();
  if (Number.isNaN(posted)) return Number.POSITIVE_INFINITY;
  return (now - posted) / (1000 * 60 * 60 * 24);
}

export function isWithinRecentWindow(
  isoDate: string,
  recentDays: number = NEWS_NAV_RECENT_DAYS,
  now: number = Date.now()
): boolean {
  return daysSinceAnnouncementDate(isoDate, now) <= recentDays;
}

/**
 * 배지 표시 여부
 * - 최신 글이 recentDays 이내
 * - localStorage에 저장된 seenId와 최신 id가 다름 (새 글 시 재노출)
 */
export function shouldShowNewsNavBadge(
  latest: LatestAnnouncementMeta | null,
  seenId: string | null,
  dataReady: boolean,
  recentDays: number = NEWS_NAV_RECENT_DAYS,
  now: number = Date.now()
): boolean {
  if (!dataReady || !latest) return false;
  if (!isWithinRecentWindow(latest.date, recentDays, now)) return false;
  return latest.id !== seenId;
}
