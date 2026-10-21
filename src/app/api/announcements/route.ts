import { NextRequest, NextResponse } from "next/server";
import type { Locale } from "@/lib/i18n";
import { listAnnouncements } from "@/lib/announcements-store";

function formatDisplayDate(iso: string, locale: Locale): string {
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) return iso;
  if (locale === "en") {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];
    const mi = parseInt(m, 10) - 1;
    if (mi < 0 || mi > 11) return iso;
    return `${months[mi]} ${parseInt(d, 10)}, ${y}`;
  }
  return `${y}.${m}.${d}`;
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const rawLimit = parseInt(searchParams.get("limit") ?? "50", 10);
  const limit = Number.isFinite(rawLimit)
    ? Math.min(Math.max(rawLimit, 1), 100)
    : 50;
  const lang = (searchParams.get("lang") === "en" ? "en" : "ko") as Locale;

  try {
    const announcements = await listAnnouncements();
    const sorted = [...announcements].sort((a, b) =>
      b.date.localeCompare(a.date)
    );
    const slice = sorted.slice(0, limit);

    const items = slice.map((a) => ({
      id: a.id,
      tag: lang === "en" ? a.tag.en : a.tag.ko,
      title: lang === "en" ? a.title.en : a.title.ko,
      excerpt: lang === "en" ? a.excerpt.en : a.excerpt.ko,
      body: lang === "en" ? a.body.en : a.body.ko,
      date: formatDisplayDate(a.date, lang),
    }));

    return NextResponse.json({ ok: true, items });
  } catch (error) {
    console.error("GET /api/announcements:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to load announcements" },
      { status: 500 }
    );
  }
}
