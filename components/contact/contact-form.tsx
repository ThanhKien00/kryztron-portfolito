"use client";

import { useActionState, useId } from "react";
import { sendMessage } from "@/actions/send-message";
import {
  initialContactState,
  MAX_EMAIL_LENGTH,
  MAX_MESSAGE_LENGTH,
  MAX_NAME_LENGTH,
  type ContactState,
} from "@/actions/contact-state";
import { AlertIcon, CheckIcon } from "@/components/ui/icons";
import type { Dictionary } from "@/content/types";
import type { Locale } from "@/lib/locales";

type Props = {
  dict: Dictionary;
  locale: Locale;
  mailtoHref: string;
};

/**
 * `focus-visible:border-foreground`, not `border-accent`: the page spends its
 * whole accent budget on the covers, the current-role marker and the email
 * link, and the global `:focus-visible` outline already carries the focus.
 * `--destructive` is the one extra hue on the page and it only ever appears on
 * a failed validation — never at rest.
 */
const fieldClass =
  "mt-2 w-full rounded-control border border-border-strong bg-card px-3 py-2.5 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-foreground aria-invalid:border-destructive";

function StatusBanner({ state, mailtoHref, dict }: { state: ContactState } & Props) {
  if (state.status === "idle" || state.message === "") return null;

  const ok = state.status === "success";
  const Icon = ok ? CheckIcon : AlertIcon;

  return (
    <p
      className={`flex items-start gap-2 rounded-control border px-3 py-2.5 text-sm ${
        ok ? "border-foreground text-foreground" : "border-destructive text-foreground"
      }`}
    >
      <Icon className="mt-0.5 size-4 shrink-0" />
      <span>
        {state.message}
        {state.status === "unconfigured" ? (
          <>
            {" "}
            <a href={mailtoHref} className="underline underline-offset-2">
              {dict.contact.status.unconfiguredAction}
            </a>
            .
          </>
        ) : null}
      </span>
    </p>
  );
}

export function ContactForm(props: Props) {
  const { dict, locale } = props;
  const [state, formAction, pending] = useActionState(sendMessage, initialContactState);
  const id = useId();

  const nameId = `${id}-name`;
  const emailId = `${id}-email`;
  const messageId = `${id}-message`;

  return (
    <form action={formAction} className="space-y-5" noValidate>
      <input type="hidden" name="locale" value={locale} />

      {/* Honeypot — hidden from users and assistive tech, irresistible to bots. */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor={`${id}-company`}>Company</label>
        <input id={`${id}-company`} name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Name and email share a row from `sm` up: two short fields stacked
          full-width push the message box below the fold on a laptop. */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={nameId} className="label-mono text-muted-foreground">
            {dict.contact.form.name}
          </label>
          <input
            id={nameId}
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={MAX_NAME_LENGTH}
            defaultValue={state.values.name}
            placeholder={dict.contact.form.namePlaceholder}
            aria-describedby={state.fieldErrors.name ? `${nameId}-error` : undefined}
            aria-invalid={state.fieldErrors.name ? true : undefined}
            className={fieldClass}
          />
          {state.fieldErrors.name ? (
            <p id={`${nameId}-error`} className="mt-1.5 text-sm text-destructive">
              {state.fieldErrors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor={emailId} className="label-mono text-muted-foreground">
            {dict.contact.form.email}
          </label>
          <input
            id={emailId}
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={MAX_EMAIL_LENGTH}
            defaultValue={state.values.email}
            placeholder={dict.contact.form.emailPlaceholder}
            aria-describedby={state.fieldErrors.email ? `${emailId}-error` : undefined}
            aria-invalid={state.fieldErrors.email ? true : undefined}
            className={fieldClass}
          />
          {state.fieldErrors.email ? (
            <p id={`${emailId}-error`} className="mt-1.5 text-sm text-destructive">
              {state.fieldErrors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor={messageId} className="label-mono text-muted-foreground">
          {dict.contact.form.message}
        </label>
        <textarea
          id={messageId}
          name="message"
          rows={5}
          required
          maxLength={MAX_MESSAGE_LENGTH}
          defaultValue={state.values.message}
          placeholder={dict.contact.form.messagePlaceholder}
          aria-describedby={state.fieldErrors.message ? `${messageId}-error` : undefined}
          aria-invalid={state.fieldErrors.message ? true : undefined}
          className={`${fieldClass} resize-y`}
        />
        {state.fieldErrors.message ? (
          <p id={`${messageId}-error`} className="mt-1.5 text-sm text-destructive">
            {state.fieldErrors.message}
          </p>
        ) : null}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-control bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? dict.contact.form.submitting : dict.contact.form.submit}
        </button>
      </div>

      <div aria-live="polite" aria-atomic="true">
        <StatusBanner {...props} state={state} />
      </div>
    </form>
  );
}
