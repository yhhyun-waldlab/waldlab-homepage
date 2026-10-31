import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";
import { createSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/admin";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-key";

async function verifyAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token");
  if (!token) return false;
  try {
    verify(token.value, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const isAuthenticated = await verifyAuth();
  if (!isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }

  const { id } = await context.params;
  if (!id?.trim()) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const supabase = createSupabaseAdmin();

  try {
    const { error, count } = await supabase
      .from("contact_inquiries")
      .delete({ count: "exact" })
      .eq("id", id);

    if (error) {
      console.error("[api/admin/inquiries/[id]] Delete error:", error);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    if (count === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/admin/inquiries/[id]] Unexpected error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
