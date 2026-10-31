"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, CheckCircle2, Loader2, AlertCircle, X } from "lucide-react";
import Header from "@/components/layout/Header";
import type { Locale } from "@/lib/i18n";
import { createTranslator } from "@/lib/i18n";
import {
  validateEmail,
  validatePhone,
  submitToGoogleForm,
} from "@/lib/contactForm";

/* ── Types ─────────────────────────────────────────────────────────── */
type Messages = Record<string, unknown>;

interface FormData {
  service: string;
  orgName: string;
  position: string;
  contactName: string;
  phone: string;
  email: string;
  inquiry: string;
  privacyAgreed: boolean;
}

interface FormErrors {
  service?: string;
  orgName?: string;
  contactName?: string;
  phone?: string;
  email?: string;
  inquiry?: string;
  privacy?: string;
}

const INITIAL_FORM: FormData = {
  service: "",
  orgName: "",
  position: "",
  contactName: "",
  phone: "",
  email: "",
  inquiry: "",
  privacyAgreed: false,
};

/* ── Input field sub-component ──────────────────────────────────────── */
function FieldLabel({ label, required }: { label: string; required?: boolean }) {
  return (
    <label className="block text-sm font-semibold text-wald-200 mb-1.5">
      {label}
      {required && <span className="text-[#82C91E] ml-1">*</span>}
    </label>
  );
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
      <AlertCircle size={11} />
      {msg}
    </p>
  );
}

/* ── Main Page ──────────────────────────────────────────────────────── */
export default function ContactPage() {
  const [locale, setLocale] = useState<Locale>("ko");
  const [messages, setMessages] = useState<Messages | null>(null);
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    import(`@/messages/${locale}.json`)
      .then((mod) => setMessages(mod.default))
      .catch(() => import("@/messages/ko.json").then((mod) => setMessages(mod.default)));
  }, [locale]);

  // 로케일 변경 시 이미 touched된 필드의 에러 문구를 새 번역으로 갱신
  useEffect(() => {
    if (!messages) return;
    const hasTouched = (Object.keys(touched) as (keyof FormData)[]).some((k) => touched[k]);
    if (!hasTouched) return;
    const allErrs = validate(form);
    setErrors((prev) => {
      const next: FormErrors = {};
      (Object.keys(prev) as (keyof FormErrors)[]).forEach((k) => {
        if (allErrs[k]) next[k] = allErrs[k];
      });
      return next;
    });
  // validate · form · touched 는 현재 렌더 클로저에서 캡처 — messages 교체 시에만 실행
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  if (!messages) {
    return (
      <div className="min-h-screen bg-wald-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-wald-700 border-t-[#82C91E] rounded-full animate-spin" />
      </div>
    );
  }

  const t = createTranslator(messages);

  const services = [
    { value: "safelync",    label: t("contact.services.safelync")    },
    { value: "safesync",    label: t("contact.services.safesync")    },
    { value: "safeentry",   label: t("contact.services.safeentry")   },
    { value: "safestep",       label: t("contact.services.safestep")       },
    { value: "safestepcenter", label: t("contact.services.safestepcenter") },
    { value: "safepaws",    label: t("contact.services.safepaws")    },
    { value: "consulting",  label: t("contact.services.consulting")  },
  ];

  /* ── Validation (연락처·이메일 형식 강화) ────────────────────────── */
  const validate = (data: FormData): FormErrors => {
    const e: FormErrors = {};
    if (!data.service) e.service = t("contact.errors.service");
    if (!data.orgName.trim()) e.orgName = t("contact.errors.orgName");
    if (!data.contactName.trim()) e.contactName = t("contact.errors.contactName");
    if (!data.phone.trim()) {
      e.phone = t("contact.errors.phone");
    } else if (!validatePhone(data.phone)) {
      e.phone = t("contact.errors.phoneInvalid");
    }
    if (!data.email.trim()) {
      e.email = t("contact.errors.email");
    } else if (!validateEmail(data.email)) {
      e.email = t("contact.errors.emailInvalid");
    }
    if (!data.inquiry.trim() || data.inquiry.trim().length < 10) {
      e.inquiry = t("contact.errors.inquiry");
    }
    if (!data.privacyAgreed) e.privacy = t("contact.errors.privacy");
    return e;
  };

  const setField = (field: keyof FormData, value: string | boolean) => {
    const next = { ...form, [field]: value };
    setForm(next);
    if (touched[field]) {
      const e = validate(next);
      setErrors((prev) => ({ ...prev, [field]: e[field as keyof FormErrors] }));
    }
  };

  const handleBlur = (field: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const e = validate(form);
    setErrors((prev) => ({ ...prev, [field]: e[field as keyof FormErrors] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = (Object.keys(INITIAL_FORM) as (keyof FormData)[]).reduce(
      (acc, k) => ({ ...acc, [k]: true }),
      {} as Partial<Record<keyof FormData, boolean>>
    );
    setTouched(allTouched);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    setSubmitError(null);
    try {
      await submitToGoogleForm(form);
      setShowSuccess(true);
    } catch (err) {
      if (err instanceof Error) {
        if (err.message === "privacy") {
          setErrors((prev) => ({ ...prev, privacy: t("contact.errors.privacy") }));
          setTouched((prev) => ({ ...prev, privacyAgreed: true }));
        } else {
          setSubmitError(t("contact.errors.submitFailed"));
        }
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setShowSuccess(false);
    setForm(INITIAL_FORM);
    setTouched({});
    setErrors({});
  };

  /* ── Input class helpers ─────────────────────────────────────────── */
  const baseInputClass =
    "w-full bg-wald-950 rounded-xl px-4 py-3 text-white text-sm placeholder:text-wald-600 focus:outline-none transition-all duration-200 border";

  const inputClass = (field: keyof FormErrors) =>
    [
      baseInputClass,
      touched[field as keyof FormData] && errors[field]
        ? "border-red-500/70 focus:border-red-400 focus:ring-1 focus:ring-red-400/30"
        : "border-wald-700 focus:border-[#82C91E] focus:ring-1 focus:ring-[#82C91E]/20",
    ].join(" ");

  const subtitleLines = t("contact.pageSubtitle").split("\n");
  return (
    <div className="min-h-screen bg-wald-950 text-white">
      <Header
        t={t}
        locale={locale}
        onLocaleChange={setLocale}
        forceScrolled
      />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-14 px-4 sm:px-6 text-center overflow-hidden">
        {/* Radial glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-wald-800/30 blur-3xl" />
          <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[300px] h-[200px] rounded-full bg-[#82C91E]/5 blur-2xl" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-wald-800/60 border border-wald-700/60 mb-6">
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: "#82C91E" }}
            />
            <span className="text-xs font-semibold tracking-widest uppercase text-wald-300">
              {t("contact.badge")}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            {t("contact.pageTitle")}
          </h1>

          {/* Subtitle */}
          <p className="text-wald-400 text-base sm:text-lg leading-relaxed">
            {subtitleLines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </p>
        </div>
      </section>

      {/* ── Form ─────────────────────────────────────────────────────── */}
      <section className="pb-32 px-4 sm:px-6">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="max-w-2xl mx-auto bg-wald-900/50 border border-wald-800/70 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-2xl shadow-black/40"
        >
          {/* ── Service Select ──────────────────────────────────────── */}
          <div className="mb-6">
            <FieldLabel label={t("contact.form.service")} required />
            <div className="relative">
                <select
                value={form.service}
                onChange={(e) => setField("service", e.target.value)}
                onBlur={() => handleBlur("service")}
                style={form.service ? { color: "#82C91E" } : undefined}
                className={[
                  inputClass("service"),
                  "appearance-none cursor-pointer pr-10",
                  !form.service ? "text-wald-600" : "",
                ].join(" ")}
              >
                <option value="" disabled className="text-wald-600">
                  {t("contact.form.servicePlaceholder")}
                </option>
                {services.map((s) => (
                  <option key={s.value} value={s.value} className="bg-wald-900 text-white">
                    {s.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-wald-500">
                <ChevronDown size={16} />
              </div>
            </div>
            <FieldError msg={touched.service ? errors.service : undefined} />
          </div>

          {/* ── Org & Position ────────────────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <FieldLabel label={t("contact.form.orgName")} required />
              <input
                type="text"
                value={form.orgName}
                onChange={(e) => setField("orgName", e.target.value)}
                onBlur={() => handleBlur("orgName")}
                placeholder={t("contact.form.orgNamePlaceholder")}
                className={inputClass("orgName")}
              />
              <FieldError msg={touched.orgName ? errors.orgName : undefined} />
            </div>
            <div>
              <FieldLabel label={t("contact.form.position")} />
              <input
                type="text"
                value={form.position}
                onChange={(e) => setField("position", e.target.value)}
                onBlur={() => handleBlur("position")}
                placeholder={t("contact.form.positionPlaceholder")}
                className={`${baseInputClass} border-wald-700 focus:border-[#82C91E] focus:ring-1 focus:ring-[#82C91E]/20`}
              />
            </div>
          </div>

          {/* ── Contact Name (full width) ─────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="sm:col-span-2">
              <FieldLabel label={t("contact.form.contactName")} required />
              <input
                type="text"
                value={form.contactName}
                onChange={(e) => setField("contactName", e.target.value)}
                onBlur={() => handleBlur("contactName")}
                placeholder={t("contact.form.contactNamePlaceholder")}
                className={inputClass("contactName")}
              />
              <FieldError msg={touched.contactName ? errors.contactName : undefined} />
            </div>
          </div>

          {/* ── Phone & Email ─────────────────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <FieldLabel label={t("contact.form.phone")} required />
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setField("phone", e.target.value)}
                onBlur={() => handleBlur("phone")}
                placeholder={t("contact.form.phonePlaceholder")}
                className={inputClass("phone")}
              />
              <FieldError msg={touched.phone ? errors.phone : undefined} />
            </div>
            <div>
              <FieldLabel label={t("contact.form.email")} required />
              <input
                type="email"
                value={form.email}
                onChange={(e) => setField("email", e.target.value)}
                onBlur={() => handleBlur("email")}
                placeholder={t("contact.form.emailPlaceholder")}
                className={inputClass("email")}
              />
              <FieldError msg={touched.email ? errors.email : undefined} />
            </div>
          </div>

          {/* ── Inquiry Textarea ────────────────────────────────────── */}
          <div className="mb-6">
            <FieldLabel label={t("contact.form.inquiry")} required />
            <textarea
              value={form.inquiry}
              onChange={(e) => setField("inquiry", e.target.value)}
              onBlur={() => handleBlur("inquiry")}
              placeholder={t("contact.form.inquiryPlaceholder")}
              rows={5}
              className={[inputClass("inquiry"), "resize-none leading-relaxed"].join(" ")}
            />
            <div className="flex items-start justify-between mt-1">
              <FieldError msg={touched.inquiry ? errors.inquiry : undefined} />
              <span className="text-xs text-wald-600 ml-auto">
                {form.inquiry.trim().length} / 10+
              </span>
            </div>
          </div>

          {/* ── Privacy Checkbox ────────────────────────────────────── */}
          <div className="mb-8">
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative mt-0.5 flex-shrink-0">
                <input
                  type="checkbox"
                  checked={form.privacyAgreed}
                  onChange={(e) => setField("privacyAgreed", e.target.checked)}
                  onBlur={() => handleBlur("privacyAgreed")}
                  className="sr-only"
                />
                <div
                  className={[
                    "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200",
                    form.privacyAgreed
                      ? "border-[#82C91E] bg-[#82C91E]/10"
                      : touched.privacyAgreed && errors.privacy
                      ? "border-red-500"
                      : "border-wald-600 group-hover:border-wald-400",
                  ].join(" ")}
                >
                  {form.privacyAgreed && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="#82C91E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </div>
              <div>
                <span className="text-sm text-wald-300 group-hover:text-wald-200 transition-colors leading-snug">
                  {t("contact.form.privacy")}
                </span>
                <p className="text-xs text-wald-600 mt-0.5">
                  {t("contact.form.privacyDesc")}
                </p>
              </div>
            </label>
            <FieldError msg={touched.privacyAgreed ? errors.privacy : undefined} />
          </div>

          {/* ── Submit Error ────────────────────────────────────────── */}
          {submitError && (
            <div className="mb-4 flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              <AlertCircle size={15} className="shrink-0" />
              {submitError}
            </div>
          )}

          {/* ── Submit Button ────────────────────────────────────────── */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            style={{
              background: submitting
                ? "linear-gradient(135deg, #5a8a2e, #4a7a24)"
                : "linear-gradient(135deg, #82C91E, #6ab317)",
              color: "#071710",
              boxShadow: submitting ? "none" : "0 4px 20px rgba(130, 201, 30, 0.25)",
            }}
          >
            {submitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                {t("contact.form.submitting")}
              </>
            ) : (
              t("contact.form.submit")
            )}
          </button>

          {/* Required fields note */}
          <p className="text-center text-xs text-wald-600 mt-4">
            <span style={{ color: "#82C91E" }}>*</span>{" "}
            {locale === "ko" ? "필수 입력 항목" : "Required fields"}
          </p>
        </form>
      </section>

      {/* ── Success Modal ────────────────────────────────────────────── */}
      {showSuccess && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          style={{ background: "rgba(7, 23, 16, 0.85)", backdropFilter: "blur(8px)" }}
        >
          <div className="relative w-full max-w-sm bg-wald-900 border border-wald-700/70 rounded-2xl p-8 shadow-2xl text-center animate-[modal-in_0.3s_ease-out_both]">
            {/* Close button */}
            <button
              onClick={handleReset}
              className="absolute top-4 right-4 p-1.5 text-wald-500 hover:text-wald-300 hover:bg-wald-800 rounded-lg transition-colors"
            >
              <X size={16} />
            </button>

            {/* Icon */}
            <div className="flex justify-center mb-5">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: "rgba(130, 201, 30, 0.1)", border: "2px solid rgba(130, 201, 30, 0.4)" }}
              >
                <CheckCircle2 size={32} style={{ color: "#82C91E" }} />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold text-white mb-3">
              {t("contact.success.title")}
            </h2>

            {/* Message */}
            <p className="text-sm text-wald-400 leading-relaxed mb-7">
              {t("contact.success.message").split("\n").map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
            </p>

            {/* Buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleReset}
                className="w-full py-3 rounded-xl font-bold text-sm transition-colors"
                style={{
                  background: "linear-gradient(135deg, #82C91E, #6ab317)",
                  color: "#071710",
                }}
              >
                {t("contact.success.close")}
              </button>
              <Link
                href="/"
                className="w-full py-3 rounded-xl text-sm font-medium text-wald-400 hover:text-white border border-wald-700 hover:border-wald-500 transition-colors text-center"
              >
                {t("contact.success.backToHome")}
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ── Footer strip ─────────────────────────────────────────────── */}
      <div className="border-t border-wald-800/50 py-6 text-center">
        <p className="text-xs text-wald-700">
          © 2026 Wald Lab Inc. All rights reserved. ·{" "}
          <a href="mailto:info@waldlab.kr" className="hover:text-wald-500 transition-colors">
            info@waldlab.kr
          </a>
        </p>
      </div>
    </div>
  );
}
