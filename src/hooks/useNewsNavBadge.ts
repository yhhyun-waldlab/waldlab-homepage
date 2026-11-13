"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  NEWS_NAV_SEEN_STORAGE_KEY,
  shouldShowNewsNavBadge,
  type LatestAnnouncementMeta,
} from "@/lib/newsNavBadgePolicy";

export function useNewsNavBadge() {
  const [latest, setLatest] = useState<LatestAnnouncementMeta | null>(null);
  const [seenId, setSeenId] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      setSeenId(localStorage.getItem(NEWS_NAV_SEEN_STORAGE_KEY));
    } catch {
      /* ignore */
    }

    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/announcements?limit=1");
        const data = await res.json();
        if (!cancelled && data?.ok && data.latest) {
          setLatest(data.latest as LatestAnnouncementMeta);
        }
      } catch {
        /* ignore */
      } finally {
        if (!cancelled) setLoaded(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const markNewsSeen = useCallback(async () => {
    let id = latest?.id;
    if (!id) {
      try {
        const res = await fetch("/api/announcements?limit=1");
        const data = await res.json();
        if (data?.ok && data.latest) {
          setLatest(data.latest as LatestAnnouncementMeta);
          id = data.latest.id as string;
        }
      } catch {
        return;
      }
    }
    if (!id) return;
    try {
      localStorage.setItem(NEWS_NAV_SEEN_STORAGE_KEY, id);
    } catch {
      /* ignore */
    }
    setSeenId(id);
  }, [latest?.id]);

  const showNewsBadge = useMemo(
    () => shouldShowNewsNavBadge(latest, seenId, loaded),
    [latest, seenId, loaded]
  );

  return { showNewsBadge, markNewsSeen };
}
