import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendInquiryNotification } from "@/lib/mailer";

/**
 * Contact form submission → Supabase + Email notification
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

function generateId(): string {
  return `inquiry_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export async function POST(req: Request) {
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json(
      { ok: false, error: "not_configured" },
      { status: 503 }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  // Parse request body
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Validate required fields
  if (!body.solution || !body.company || !body.name || !body.contact || !body.email || !body.message) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }

  try {
    const inquiryId = generateId();
    const createdAt = new Date().toISOString();

    const { error } = await supabase
      .from("contact_inquiries")
      .insert({
        id: inquiryId,
        service: body.solution,
        org_name: body.company,
        contact_name: body.name,
        phone: body.contact,
        email: body.email,
        inquiry: body.message,
        status: "pending",
        created_at: createdAt,
      });

    if (error) {
      console.error("[api/contact] Supabase insert error:", error);
      return NextResponse.json({ ok: false, error: "database_error" }, { status: 500 });
    }

    // Send email notification to admin.
    // On serverless (Vercel), fire-and-forget promises are frozen after the
    // response is returned, so we MUST await the email before responding.
    // Email failure should not block inquiry submission (caught + logged).
    try {
      await sendInquiryNotification(inquiryId, body.solution, createdAt);
    } catch (err) {
      console.error("[api/contact] Email notification failed:", err);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/contact] Unexpected error:", err);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
