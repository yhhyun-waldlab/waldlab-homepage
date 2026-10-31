/**
 * Contact form: validation + Google Apps Script Web App submission.
 *
 * 전송 방식: POST → Google Apps Script Web App (URLSearchParams)
 *   GAS doPost()에서 e.parameter 로 각 필드 수신
 *
 * 필드 매핑:
 *   service      → solution
 *   orgName      → company
 *   position     → position
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
  position: string;
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

/* ── Submit ──────────────────────────────────────────────────────────── */

/**
 * 개인정보 동의 여부를 먼저 확인한 후 /api/contact 를 통해 GAS 로 전송.
 *
 * 서버 라우트가 GAS 302 리다이렉트를 처리하므로 CORS 문제 없음.
 *
 * privacy 미동의 시 Error("privacy") throw.
 * 전송 실패 시 Error("submit_failed") 또는 서버 에러 코드를 throw.
 */
export async function submitToGoogleForm(data: ContactFormData): Promise<void> {
  if (!data.privacyAgreed) {
    throw new Error("privacy");
  }

  const res = await fetch("/api/contact", {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name:     data.contactName.trim(),
      contact:  data.phone.trim(),
      company:  data.orgName.trim(),
      position: data.position.trim(),
      solution: data.service,
      email:    data.email.trim(),
      message:  data.inquiry.trim(),
    }),
  });

  if (!res.ok) {
    const json = await res.json().catch(() => ({})) as { error?: string };
    throw new Error(json.error ?? "submit_failed");
  }
}
