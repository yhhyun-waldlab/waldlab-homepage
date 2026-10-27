/**
 * Email notification utility using nodemailer
 * 
 * Sends admin notifications via SMTP (Daum Smartwork)
 * PII (Personally Identifiable Information) is NOT included in email body.
 * Admin must log in to dashboard to view full inquiry details.
 */

import nodemailer from "nodemailer";

const MAIL_PROVIDER = process.env.MAIL_PROVIDER || "smtp";
const SMTP_HOST = process.env.SMTP_HOST || "smtp.daum.net";
const SMTP_PORT = parseInt(process.env.SMTP_PORT || "465", 10);
const SMTP_SECURE = process.env.SMTP_SECURE === "true";
const SMTP_USER = process.env.SMTP_USER || "";
const SMTP_PASS = process.env.SMTP_PASS || "";
const SMTP_FROM = process.env.SMTP_FROM || "info@waldlab.kr";
const ADMIN_NOTIFY_EMAIL = process.env.ADMIN_NOTIFY_EMAIL || "info@waldlab.kr";

/** Escape dynamic values for HTML email bodies */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Check if email notification is configured
 */
export function isMailConfigured(): boolean {
  if (MAIL_PROVIDER !== "smtp") return false;
  return !!(SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS && SMTP_FROM && ADMIN_NOTIFY_EMAIL);
}

/**
 * Send new inquiry notification to admin
 * 
 * @param inquiryId - Inquiry ID (e.g., inquiry_1234567890_abc123)
 * @param service - Selected service/solution
 * @param createdAt - ISO timestamp when inquiry was created
 */
export async function sendInquiryNotification(
  inquiryId: string,
  service: string,
  createdAt: string
): Promise<void> {
  if (!isMailConfigured()) {
    console.warn("[mailer] Email not configured, skipping notification");
    return;
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  const formattedDate = new Date(createdAt).toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const dashboardUrl = "https://www.waldlab.kr/admin/dashboard";
  const year = new Date().getFullYear();
  const safeId = escapeHtml(inquiryId);
  const safeService = escapeHtml(service);
  const safeDate = escapeHtml(formattedDate);

  const subject = `[Wald Lab] 새로운 문의가 접수되었습니다`;

  // Outlook (Word engine) compatible: nested tables + inline CSS only.
  // Avoid gradients, border-radius, box-shadow, flex, and bare <div> layout.
  const htmlBody = `
<!DOCTYPE html>
<html lang="ko" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>새로운 문의 접수</title>
  <!--[if mso]>
  <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
  </xml>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <style type="text/css">
    table { border-collapse: collapse; }
    td, th { font-family: Arial, Helvetica, sans-serif; }
  </style>
  <![endif]-->
</head>
<body style="margin:0; padding:0; background-color:#f4f4f4; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%;">
  <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#f4f4f4" style="margin:0; padding:0; width:100%; background-color:#f4f4f4; border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;">
    <tr>
      <td align="center" style="padding:24px 12px;">
        <table role="presentation" width="600" border="0" cellpadding="0" cellspacing="0" bgcolor="#ffffff" style="width:600px; max-width:600px; background-color:#ffffff; border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;">
          <!-- Header -->
          <tr>
            <td align="center" bgcolor="#0a3d2c" style="padding:28px 32px; background-color:#0a3d2c;">
              <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                <tr>
                  <td align="center" style="font-family:Arial, Helvetica, sans-serif; font-size:22px; line-height:30px; font-weight:bold; color:#ffffff;">
                    새로운 문의가 접수되었습니다
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td bgcolor="#ffffff" style="padding:32px; background-color:#ffffff;">
              <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                <tr>
                  <td style="padding:0 0 20px 0; font-family:Arial, Helvetica, sans-serif; font-size:15px; line-height:24px; color:#333333;">
                    Wald Lab 홈페이지에 새로운 도입 문의가 접수되었습니다.
                  </td>
                </tr>
              </table>

              <!-- Info rows -->
              <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse; border:1px solid #e0e0e0;">
                <tr>
                  <td width="120" bgcolor="#f8f9fa" style="width:120px; padding:12px 16px; background-color:#f8f9fa; border-bottom:1px solid #e0e0e0; font-family:Arial, Helvetica, sans-serif; font-size:13px; line-height:20px; font-weight:bold; color:#555555;">
                    문의 ID
                  </td>
                  <td bgcolor="#f8f9fa" style="padding:12px 16px; background-color:#f8f9fa; border-bottom:1px solid #e0e0e0; font-family:Consolas, 'Courier New', monospace; font-size:13px; line-height:20px; color:#333333;">
                    ${safeId}
                  </td>
                </tr>
                <tr>
                  <td width="120" bgcolor="#ffffff" style="width:120px; padding:12px 16px; background-color:#ffffff; border-bottom:1px solid #e0e0e0; font-family:Arial, Helvetica, sans-serif; font-size:13px; line-height:20px; font-weight:bold; color:#555555;">
                    서비스
                  </td>
                  <td bgcolor="#ffffff" style="padding:12px 16px; background-color:#ffffff; border-bottom:1px solid #e0e0e0; font-family:Arial, Helvetica, sans-serif; font-size:13px; line-height:20px; color:#333333;">
                    ${safeService}
                  </td>
                </tr>
                <tr>
                  <td width="120" bgcolor="#f8f9fa" style="width:120px; padding:12px 16px; background-color:#f8f9fa; font-family:Arial, Helvetica, sans-serif; font-size:13px; line-height:20px; font-weight:bold; color:#555555;">
                    접수 시각
                  </td>
                  <td bgcolor="#f8f9fa" style="padding:12px 16px; background-color:#f8f9fa; font-family:Arial, Helvetica, sans-serif; font-size:13px; line-height:20px; color:#333333;">
                    ${safeDate}
                  </td>
                </tr>
              </table>

              <!-- Spacer -->
              <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                <tr>
                  <td style="height:24px; line-height:24px; font-size:24px;">&nbsp;</td>
                </tr>
              </table>

              <!-- Security notice -->
              <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                <tr>
                  <td width="4" bgcolor="#ffa726" style="width:4px; background-color:#ffa726; font-size:0; line-height:0;">&nbsp;</td>
                  <td bgcolor="#fff8e6" style="padding:14px 16px; background-color:#fff8e6; font-family:Arial, Helvetica, sans-serif; font-size:13px; line-height:20px; color:#666666;">
                    <strong style="color:#555555;">보안 안내:</strong>
                    개인정보 보호를 위해 문의자의 연락처 및 상세 내용은 이메일에 포함되지 않습니다.
                    전체 내용은 관리자 페이지에서 확인하실 수 있습니다.
                  </td>
                </tr>
              </table>

              <!-- Spacer -->
              <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                <tr>
                  <td style="height:28px; line-height:28px; font-size:28px;">&nbsp;</td>
                </tr>
              </table>

              <!-- CTA button (bulletproof for Outlook) -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center" style="margin:0 auto; border-collapse:collapse;">
                <tr>
                  <td align="center" bgcolor="#40916c" style="background-color:#40916c;">
                    <!--[if mso]>
                    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${dashboardUrl}" style="height:44px; v-text-anchor:middle; width:260px;" arcsize="0%" stroke="f" fillcolor="#40916c">
                      <w:anchorlock/>
                      <center style="color:#ffffff; font-family:Arial, Helvetica, sans-serif; font-size:15px; font-weight:bold;">관리자 페이지에서 확인하기</center>
                    </v:roundrect>
                    <![endif]-->
                    <!--[if !mso]><!-- -->
                    <a href="${dashboardUrl}" target="_blank" style="display:inline-block; padding:14px 28px; background-color:#40916c; color:#ffffff; font-family:Arial, Helvetica, sans-serif; font-size:15px; line-height:20px; font-weight:bold; text-decoration:none; border:1px solid #40916c;">
                      관리자 페이지에서 확인하기
                    </a>
                    <!--<![endif]-->
                  </td>
                </tr>
              </table>

              <!-- Spacer -->
              <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                <tr>
                  <td style="height:24px; line-height:24px; font-size:24px;">&nbsp;</td>
                </tr>
              </table>

              <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                <tr>
                  <td style="font-family:Arial, Helvetica, sans-serif; font-size:12px; line-height:18px; color:#999999;">
                    관리자 페이지에 로그인하여 &quot;문의사항&quot; 탭에서 전체 내용을 확인하고 처리 상태를 관리할 수 있습니다.
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" bgcolor="#f8f9fa" style="padding:20px 32px; background-color:#f8f9fa; border-top:1px solid #e0e0e0;">
              <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                <tr>
                  <td align="center" style="font-family:Arial, Helvetica, sans-serif; font-size:11px; line-height:18px; color:#999999;">
                    이 메일은 Wald Lab 관리자 알림 시스템에서 자동 발송되었습니다.<br />
                    &copy; ${year} Wald Lab. All rights reserved.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  const textBody = `
[Wald Lab] 새로운 문의가 접수되었습니다

Wald Lab 홈페이지에 새로운 도입 문의가 접수되었습니다.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
문의 ID:    ${inquiryId}
서비스:     ${service}
접수 시각:  ${formattedDate}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️ 보안 안내:
개인정보 보호를 위해 문의자의 연락처 및 상세 내용은
이메일에 포함되지 않습니다.
전체 내용은 관리자 페이지에서 확인하실 수 있습니다.

👉 관리자 페이지에서 확인하기:
${dashboardUrl}

관리자 페이지에 로그인하여 "문의사항" 탭에서
전체 내용을 확인하고 처리 상태를 관리할 수 있습니다.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
이 메일은 Wald Lab 관리자 알림 시스템에서 자동 발송되었습니다.
© ${new Date().getFullYear()} Wald Lab. All rights reserved.
  `.trim();

  try {
    await transporter.sendMail({
      from: `"Wald Lab" <${SMTP_FROM}>`,
      to: ADMIN_NOTIFY_EMAIL,
      subject,
      text: textBody,
      html: htmlBody,
    });

    console.log(`[mailer] Notification sent for inquiry ${inquiryId}`);
  } catch (error) {
    console.error("[mailer] Failed to send notification:", error);
    // Don't throw - email failure should not block inquiry submission
  }
}
