/**
 * Contact form: validation + Google Apps Script Web App submission.
 *
 * 전송 방식: POST → Google Apps Script Web App (URLSearchParams)
 *   GAS doPost()에서 e.parameter 로 각 필드 수신
 *
 * 필드 매핑:
 *   service      → solution
 *   orgName      → company
 *   contactName  → name
 *   phone        → contact
 *   email        → email
 *   inquiry      → message
 *
 * 환경변수 (.env.local):
 *   NEXT_PUBLIC_GAS_WEBAPP_URL=https://script.google.com/macros/s/...../exec
 */

export interface ContactFormData {
  service: string;
  orgName: string;
  contactName: string;
  phone: string;
  email: string;
  inquiry: string;
  privacyAgreed: boolean;
}

/* ── Validation ─────────────────────────────────────────────────────── */

/** Stricter email: no spaces, single @, valid-looking domain with TLD */
export function validateEmail(email: string): boolean {
  const trimmed = email.trim();
  if (trimmed.length < 6 || trimmed.length > 254) return false;
  if (trimmed.includes(" ") || (trimmed.match(/@/g) ?? []).length !== 1) return false;
  const [local, domain] = trimmed.split("@");
  if (!local?.length || !domain?.length) return false;
  if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/.test(local)) return false;
  const domainPart = domain.trim().toLowerCase();
  if (!/^[a-z0-9.-]+\.[a-z]{2,}$/.test(domainPart)) return false;
  return true;
}

/** Phone: 10~15 digits (KR 010... or international +XX...) */
export function validatePhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 15) return false;
  if (phone.trim().startsWith("+") && digits.length < 11) return false;
  return true;
}

/* ── GAS Web App URL ─────────────────────────────────────────────────── */

function getWebAppUrl(): string {
  if (typeof process !== "undefined") {
    const url = (process.env as Record<string, string | undefined>)[
      "NEXT_PUBLIC_GAS_WEBAPP_URL"
    ];
    if (typeof url === "string" && url.startsWith("https://script.google.com/")) {
      return url.trim();
    }
  }
  return "";
}

/* ── Submit ──────────────────────────────────────────────────────────── */

/**
 * 개인정보 동의 여부를 먼저 확인한 후 GAS Web App으로 직접 전송.
 *
 * GAS 스크립트가 JSON.parse(e.postData.contents) 로 수신하는 구조이므로
 * Content-Type: application/json + JSON body 로 POST.
 * CORS 오류 회피를 위해 mode: 'no-cors' 사용 (응답은 opaque — 전송 완료 = 성공).
 *
 * 필드명: name / contact / company / solution / message
 *
 * privacy 미동의 시 Error("privacy") throw.
 */
export async function submitToGoogleForm(data: ContactFormData): Promise<void> {
  // 1. 개인정보 동의 선확인
  if (!data.privacyAgreed) {
    throw new Error("privacy");
  }

  const url = getWebAppUrl();
  if (!url) {
    console.warn(
      "[contactForm] NEXT_PUBLIC_GAS_WEBAPP_URL 이 설정되지 않았습니다."
    );
    return;
  }

  // 2. GAS 스크립트 필드명으로 매핑 후 JSON POST
  await fetch(url, {
    method:  "POST",
    mode:    "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name:     data.contactName.trim(),
      contact:  data.phone.trim(),
      company:  data.orgName.trim(),
      solution: data.service,
      email:    data.email.trim(),
      message:  data.inquiry.trim(),
    }),
  });
}
