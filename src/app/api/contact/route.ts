import { NextResponse } from "next/server";
import { sendInquiryNotification } from "@/lib/mailer";
import { createSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/admin";
import { createClient } from "@supabase/supabase-js";

/**
 * Contact form submission → Supabase + Email notification
 */

function generateId(): string {
  return `inquiry_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function createContactSupabaseClient() {
  if (isSupabaseConfigured()) {
    return createSupabaseAdmin();
  }
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
  if (!url || !anon) return null;
  return createClient(url, anon);
}

export async function POST(req: Request) {
  const supabase = createContactSupabaseClient();
  if (!supabase) {
    return NextResponse.json(
      { ok: false, error: "not_configured" },
      { status: 503 }
    );
  }

  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  if (!body.solution || !body.company || !body.name || !body.contact || !body.email || !body.message) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }

  try {
    const inquiryId = generateId();
    const createdAt = new Date().toISOString();
    const position = (body.position ?? "").trim();

    const { error } = await supabase.from("contact_inquiries").insert({
      id: inquiryId,
      service: body.solution,
      org_name: body.company,
      contact_name: body.name,
      position: position || null,
      phone: body.contact,
      email: body.email,
      inquiry: body.message,
      status: "pending",
      created_at: createdAt,
    });

    if (error) {
      console.error("[api/contact] Supabase insert error:", error.message, error.code, error.details);
      return NextResponse.json({ ok: false, error: "database_error" }, { status: 500 });
    }

    try {
      await sendInquiryNotification(inquiryId, body.solution, createdAt, position);
    } catch (err) {
      console.error("[api/contact] Email notification failed:", err);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/contact] Unexpected error:", err);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
