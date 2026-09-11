"use server";

import { Resend } from "resend";
import { getDictionaryFor } from "@/app/[lang]/dictionaries";
import { defaultLocale, isLocale } from "@/lib/locales";
import { profile } from "@/content/profile";
import {
  emptyValues,
  MAX_EMAIL_LENGTH,
  MAX_MESSAGE_LENGTH,
  MAX_NAME_LENGTH,
  type ContactState,
} from "./contact-state";

// Deliberately permissive: the authoritative check is whether a reply bounces,
// and over-strict regexes reject valid addresses.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendMessage(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // `next/root-params` is unavailable in Server Actions, so the locale comes in
  // as a hidden field — otherwise errors would come back in the wrong language.
  const rawLocale = String(formData.get("locale") ?? "");
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = await getDictionaryFor(locale);
  const t = dict.contact.status;

  // Honeypot: bots fill every field, humans never see this one.
  if (String(formData.get("company") ?? "").trim() !== "") {
    return { status: "success", message: t.success, fieldErrors: {}, values: emptyValues };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const values = { name, email, message };

  const fieldErrors: ContactState["fieldErrors"] = {};
  if (name.length === 0 || name.length > MAX_NAME_LENGTH) fieldErrors.name = t.invalidName;
  if (!EMAIL_PATTERN.test(email) || email.length > MAX_EMAIL_LENGTH) {
    fieldErrors.email = t.invalidEmail;
  }
  if (message.length === 0) fieldErrors.message = t.invalidMessage;
  else if (message.length > MAX_MESSAGE_LENGTH) fieldErrors.message = t.messageTooLong;

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", message: "", fieldErrors, values };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Not an error: the site is simply deployed without mail configured. The
    // form falls back to a mailto: link rather than failing the submission.
    // Values are kept so the user can copy what they wrote into an email.
    return { status: "unconfigured", message: t.unconfigured, fieldErrors: {}, values };
  }

  // `subject` becomes a raw email header line: a name containing CR/LF could
  // otherwise inject extra headers (e.g. "Evil\r\nBcc: attacker@evil.com").
  // `email` is already immune — EMAIL_PATTERN's `\s` exclusion rejects any
  // whitespace, CR/LF included — but `name` has no such restriction.
  const headerSafeName = name.replace(/[\r\n]+/g, " ");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev",
      to: process.env.CONTACT_TO_EMAIL ?? profile.email,
      replyTo: email,
      subject: `Portfolio contact — ${headerSafeName}`,
      text: `From: ${headerSafeName} <${email}>\nLocale: ${locale}\n\n${message}`,
    });

    if (error) {
      console.error("[contact] Resend rejected the message:", error);
      return { status: "error", message: t.error, fieldErrors: {}, values };
    }

    return { status: "success", message: t.success, fieldErrors: {}, values: emptyValues };
  } catch (cause) {
    console.error("[contact] Failed to send message:", cause);
    return { status: "error", message: t.error, fieldErrors: {}, values };
  }
}
