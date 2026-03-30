/**
 * Google Sheets → CSV export → 파싱.
 * 스프레드시트는 "링크가 있는 모든 사용자 보기" 이상으로 공개되어 있어야 합니다.
 */

export type SheetNewsItem = {
  date: string;
  tag: string;
  title: string;
  excerpt: string;
  body: string;
};

const COLS: (keyof SheetNewsItem)[] = ["date", "tag", "title", "excerpt", "body"];

/** UTF-8 BOM 제거 후 RFC4180에 가까운 CSV 파싱 */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let i = 0;
  let inQuotes = false;
  const s = text.replace(/^\uFEFF/, "");

  while (i < s.length) {
    const c = s[i];
    if (inQuotes) {
      if (c === '"') {
        if (s[i + 1] === '"') {
          field += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i++;
        continue;
      }
      field += c;
      i++;
      continue;
    }
    if (c === '"') {
      inQuotes = true;
      i++;
      continue;
    }
    if (c === ",") {
      row.push(field);
      field = "";
      i++;
      continue;
    }
    if (c === "\r") {
      i++;
      if (s[i] === "\n") i++;
      row.push(field);
      field = "";
      if (row.some((x) => x.trim() !== "")) rows.push(row);
      row = [];
      continue;
    }
    if (c === "\n") {
      row.push(field);
      field = "";
      if (row.some((x) => x.trim() !== "")) rows.push(row);
      row = [];
      i++;
      continue;
    }
    field += c;
    i++;
  }
  row.push(field);
  if (row.some((x) => x.trim() !== "")) rows.push(row);
  return rows;
}

function headerToColIndex(header: string[]): Partial<Record<keyof SheetNewsItem, number>> {
  const map: Partial<Record<keyof SheetNewsItem, number>> = {};
  const norm = (h: string) => h.trim().toLowerCase();
  header.forEach((cell, i) => {
    const k = norm(cell) as keyof SheetNewsItem;
    if (COLS.includes(k)) map[k] = i;
  });
  return map;
}

export function rowsToNewsItems(rows: string[][]): SheetNewsItem[] {
  if (rows.length < 2) return [];
  const col = headerToColIndex(rows[0]);
  if (col.title === undefined) return [];

  const pick = (r: string[], key: keyof SheetNewsItem) => {
    const idx = col[key];
    return idx !== undefined && r[idx] !== undefined ? String(r[idx]).trim() : "";
  };

  const out: SheetNewsItem[] = [];
  for (let r = 1; r < rows.length; r++) {
    const line = rows[r];
    const title = pick(line, "title");
    if (!title) continue;
    out.push({
      date: pick(line, "date"),
      tag: pick(line, "tag"),
      title,
      excerpt: pick(line, "excerpt"),
      body: pick(line, "body"),
    });
  }
  return out;
}

/** 서버 전용: 환경변수에서 CSV URL 조합 */
export function getSheetCsvUrl(): string | null {
  const direct = process.env.GOOGLE_SHEET_CSV_URL?.trim();
  if (direct) return direct;
  const id = process.env.GOOGLE_SHEET_ID?.trim();
  if (!id) return null;
  const gid = process.env.GOOGLE_SHEET_GID?.trim() || "0";
  return `https://docs.google.com/spreadsheets/d/${id}/export?format=csv&gid=${gid}`;
}

export type FetchSheetNewsResult =
  | { ok: true; items: SheetNewsItem[] }
  | { ok: false; error: "not_configured" | "fetch_failed" | "parse_failed"; message?: string; items: [] };

export async function fetchSheetNews(limit?: number): Promise<FetchSheetNewsResult> {
  const url = getSheetCsvUrl();
  if (!url) return { ok: false, error: "not_configured", items: [] };

  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
      headers: {
        "User-Agent": "WaldLabHomepage/1.0 (Google Sheets CSV)",
      },
    });
    if (!res.ok) {
      return {
        ok: false,
        error: "fetch_failed",
        message: `${res.status} ${res.statusText}`,
        items: [],
      };
    }
    const text = await res.text();
    const rows = parseCsv(text);
    let items = rowsToNewsItems(rows);
    if (limit !== undefined && limit > 0) items = items.slice(0, limit);
    return { ok: true, items };
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return { ok: false, error: "fetch_failed", message, items: [] };
  }
}
