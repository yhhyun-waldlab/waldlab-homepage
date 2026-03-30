import { NextResponse } from "next/server";
import { fetchSheetNews } from "@/lib/sheetNews";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limitParam = searchParams.get("limit");
  const limit = limitParam ? Math.min(Math.max(parseInt(limitParam, 10) || 0, 0), 200) : undefined;

  const result = await fetchSheetNews(limit);

  if (!result.ok) {
    return NextResponse.json(
      {
        ok: false,
        error: result.error,
        message: result.message,
        items: [],
      },
      { status: result.error === "not_configured" ? 200 : 502 }
    );
  }

  return NextResponse.json({ ok: true, items: result.items });
}
