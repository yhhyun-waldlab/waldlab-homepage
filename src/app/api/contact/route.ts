import { NextResponse } from "next/server";

/**
 * GAS Web App 프록시 — POST /api/contact
 *
 * GAS Web App 은 /exec 엔드포인트로 POST 를 보내면 302 리다이렉트를 반환한다.
 * 브라우저 no-cors fetch 는 리다이렉트 시 body 를 버리므로 데이터가 전달되지 않는다.
 * 서버 사이드에서 리다이렉트를 수동으로 따라가 body 를 재전송한다.
 */

const GAS_URL =
  process.env.NEXT_PUBLIC_GAS_WEBAPP_URL ?? "";

export async function POST(req: Request) {
  if (!GAS_URL) {
    return NextResponse.json(
      { ok: false, error: "not_configured" },
      { status: 503 }
    );
  }

  // 브라우저에서 JSON 으로 수신
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // GAS 필드명으로 매핑 (e.parameter.XXX)
  const params = new URLSearchParams({
    solution: body.solution ?? "",
    company:  body.company  ?? "",
    name:     body.name     ?? "",
    contact:  body.contact  ?? "",
    email:    body.email    ?? "",
    message:  body.message  ?? "",
  });

  const formBody  = params.toString();
  const formHeaders: HeadersInit = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  try {
    // 1단계: /exec 로 POST (redirect: "manual" 로 302 를 잡음)
    const step1 = await fetch(GAS_URL, {
      method:   "POST",
      headers:  formHeaders,
      body:     formBody,
      redirect: "manual",
    });

    // 302 리다이렉트 → script.googleusercontent.com 로 body 재전송
    if (
      step1.status === 301 ||
      step1.status === 302 ||
      step1.status === 307 ||
      step1.status === 308
    ) {
      const location = step1.headers.get("location");
      if (!location) {
        return NextResponse.json(
          { ok: false, error: "redirect_no_location" },
          { status: 502 }
        );
      }
      const step2 = await fetch(location, {
        method:  "POST",
        headers: formHeaders,
        body:    formBody,
      });
      if (!step2.ok) {
        console.error("[api/contact] GAS redirect step failed:", step2.status);
        return NextResponse.json({ ok: false, error: "gas_error" }, { status: 502 });
      }
    }
    // 리다이렉트 없이 바로 200 이면 완료

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/contact] GAS fetch error:", err);
    return NextResponse.json({ ok: false, error: "fetch_failed" }, { status: 502 });
  }
}
