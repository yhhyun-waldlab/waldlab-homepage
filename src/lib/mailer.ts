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

  const subject = `[Wald Lab] 새로운 문의가 접수되었습니다`;

  const htmlBody = `
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>새로운 문의 접수</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow: hidden;">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0a3d2c 0%, #1a5a3f 100%); padding: 30px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">
                새로운 문의가 접수되었습니다
              </h1>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px 0; color: #333333; font-size: 16px; line-height: 1.6;">
                Wald Lab 홈페이지에 새로운 도입 문의가 접수되었습니다.
              </p>
              
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 20px 0; border: 1px solid #e0e0e0; border-radius: 6px; overflow: hidden;">
                <tr style="background-color: #f8f9fa;">
                  <td style="padding: 12px 20px; border-bottom: 1px solid #e0e0e0; font-weight: 600; color: #555555; width: 30%;">
                    문의 ID
                  </td>
                  <td style="padding: 12px 20px; border-bottom: 1px solid #e0e0e0; color: #333333; font-family: monospace;">
                    ${inquiryId}
                  </td>
                </tr>
                <tr style="background-color: #ffffff;">
                  <td style="padding: 12px 20px; border-bottom: 1px solid #e0e0e0; font-weight: 600; color: #555555;">
                    서비스
                  </td>
                  <td style="padding: 12px 20px; border-bottom: 1px solid #e0e0e0; color: #333333;">
                    ${service}
                  </td>
                </tr>
                <tr style="background-color: #f8f9fa;">
                  <td style="padding: 12px 20px; font-weight: 600; color: #555555;">
                    접수 시각
                  </td>
                  <td style="padding: 12px 20px; color: #333333;">
                    ${formattedDate}
                  </td>
                </tr>
              </table>
              
              <div style="margin: 30px 0; padding: 15px; background-color: #fff8e6; border-left: 4px solid #ffa726; border-radius: 4px;">
                <p style="margin: 0; color: #666666; font-size: 14px; line-height: 1.6;">
                  <strong>보안 안내:</strong> 개인정보 보호를 위해 문의자의 연락처 및 상세 내용은 이메일에 포함되지 않습니다.
                  전체 내용은 관리자 페이지에서 확인하실 수 있습니다.
                </p>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${dashboardUrl}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #52b788 0%, #40916c 100%); color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(82, 183, 136, 0.3);">
                  관리자 페이지에서 확인하기
                </a>
              </div>
              
              <p style="margin: 20px 0 0 0; color: #999999; font-size: 13px; line-height: 1.6;">
                관리자 페이지에 로그인하여 "문의사항" 탭에서 전체 내용을 확인하고 처리 상태를 관리할 수 있습니다.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 20px 40px; background-color: #f8f9fa; border-top: 1px solid #e0e0e0; text-align: center;">
              <p style="margin: 0; color: #999999; font-size: 12px;">
                이 메일은 Wald Lab 관리자 알림 시스템에서 자동 발송되었습니다.<br>
                © ${new Date().getFullYear()} Wald Lab. All rights reserved.
              </p>
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
