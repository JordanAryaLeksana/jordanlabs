"use client";

import { useState, type FormEvent } from "react";
import { buildContactMailto } from "@/components/pages/contact/buildContactMailto";
import { Button } from "@/components/interfaces/ui/Button";
import { Typography } from "@/components/interfaces/ui/Typography/Typography";
import { EMAIL_MAILTO_URL } from "@/lib/config/links";
import { SECTION_IDS } from "@/lib/tools/types";

const INPUT_CLASS_NAME = "mt-2 h-11 w-full border border-current/35 bg-transparent px-3 font-sans text-sm outline-none focus:border-frame-green focus:ring-1 focus:ring-frame-green";

export function ContactForm() {
  const [status, setStatus] = useState("Your email application will open with the message prepared.");
  function handleSubmit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); const data = new FormData(event.currentTarget); if (String(data.get("website") ?? "")) return; setStatus("Opening your email application. The message has not been sent yet."); window.location.href = buildContactMailto(data); }
  return <section id={SECTION_IDS.contactForm} className="border-t border-current/15"><div className="mx-auto grid w-full max-w-5xl gap-8 px-6 py-14 md:grid-cols-[0.7fr_1.3fr]"><div><Typography as="p" variant="text" size="xs" className="tracking-[0.2em] opacity-55">FORMAL MESSAGE</Typography><Typography as="h2" variant="header" size="3xl" className="mt-2">Start a conversation.</Typography><Typography variant="text" size="sm" className="mt-4 max-w-sm leading-6 opacity-70">There is no server email provider configured yet. This form prepares a message in your email application.</Typography><a href={EMAIL_MAILTO_URL} className="mt-4 inline-block font-mono text-xs underline">Email Jordan directly</a></div><form onSubmit={handleSubmit} className="grid gap-5 border border-current/25 bg-[var(--bg-raised)] p-6"><div aria-hidden="true" className="absolute -left-[9999px]"><label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div><label className="font-mono text-xs">NAME<input name="name" required minLength={2} maxLength={80} autoComplete="name" className={INPUT_CLASS_NAME} /></label><label className="font-mono text-xs">EMAIL<input name="email" type="email" required maxLength={120} autoComplete="email" className={INPUT_CLASS_NAME} /></label><label className="font-mono text-xs">SUBJECT<input name="subject" required minLength={3} maxLength={120} className={INPUT_CLASS_NAME} /></label><label className="font-mono text-xs">MESSAGE<textarea name="message" required minLength={10} maxLength={2000} rows={6} className={`${INPUT_CLASS_NAME} h-auto py-3`} /></label><div className="flex flex-wrap items-center justify-between gap-3"><Typography as="p" variant="text" size="xs" aria-live="polite" className="max-w-md opacity-60">{status}</Typography><Button type="submit">Prepare email</Button></div></form></div></section>;
}
