import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const MIN_FORM_AGE_MS = 3 * 1000;
const MAX_FORM_AGE_MS = 60 * 60 * 1000;
const requestLog = new Map<string, number[]>();

type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  website: string;
  formStartedAt: string;
};

function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function getClientAddress(request: NextRequest) {
  return (
    request.headers.get('x-nf-client-connection-ip') ??
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    'unknown'
  );
}

function isRateLimited(address: string, now: number) {
  const recentRequests = (requestLog.get(address) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
  );

  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestLog.set(address, recentRequests);
    return true;
  }

  recentRequests.push(now);
  requestLog.set(address, recentRequests);

  requestLog.forEach((timestamps, key) => {
    if (timestamps.every((timestamp) => now - timestamp >= RATE_LIMIT_WINDOW_MS)) {
      requestLog.delete(key);
    }
  });

  return false;
}

function validatePayload(value: unknown): ContactPayload | null {
  if (!value || typeof value !== 'object') return null;
  const body = value as Record<string, unknown>;
  const { name, email, phone, subject, message, website, formStartedAt } = body;

  if (
    !isString(name) ||
    !isString(email) ||
    (phone !== undefined && !isString(phone)) ||
    !isString(subject) ||
    !isString(message) ||
    !isString(website) ||
    !isString(formStartedAt)
  ) {
    return null;
  }

  const payload = {
    name: name.trim(),
    email: email.trim(),
    phone: isString(phone) ? phone.trim() : '',
    subject: subject.trim(),
    message: message.trim(),
    website: website.trim(),
    formStartedAt: formStartedAt.trim(),
  };

  if (
    !payload.name ||
    payload.name.length > 100 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email) ||
    payload.email.length > 254 ||
    payload.phone.length > 40 ||
    !payload.subject ||
    payload.subject.length > 150 ||
    !payload.message ||
    payload.message.length > 5000 ||
    Object.values(payload).some((field) => /[\u0000-\u001f\u007f]/.test(field))
  ) {
    return null;
  }

  return payload;
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_TO_EMAIL;
  const sender = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !recipient || !sender) {
    console.error('Contact email is not configured: RESEND_API_KEY, CONTACT_TO_EMAIL, and RESEND_FROM_EMAIL are required.');
    return NextResponse.json(
      { success: false, error: "Le service d'envoi n'est pas configuré. Veuillez réessayer plus tard." },
      { status: 503 },
    );
  }

  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (contentLength > 12_000) {
    return NextResponse.json(
      { success: false, error: 'Le formulaire est trop volumineux.' },
      { status: 413 },
    );
  }

  let rawPayload: unknown;
  try {
    rawPayload = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: 'Les données du formulaire sont invalides.' },
      { status: 400 },
    );
  }

  const payload = validatePayload(rawPayload);
  if (!payload) {
    return NextResponse.json(
      { success: false, error: 'Veuillez vérifier les champs du formulaire et réessayer.' },
      { status: 400 },
    );
  }

  if (payload.website) {
    return NextResponse.json({ success: false, error: "L'envoi du message a échoué." }, { status: 400 });
  }

  const now = Date.now();
  const formStartedAt = Number(payload.formStartedAt);
  if (
    !Number.isFinite(formStartedAt) ||
    now - formStartedAt < MIN_FORM_AGE_MS ||
    now - formStartedAt > MAX_FORM_AGE_MS
  ) {
    return NextResponse.json(
      { success: false, error: 'Veuillez actualiser la page puis réessayer.' },
      { status: 400 },
    );
  }

  if (isRateLimited(getClientAddress(request), now)) {
    return NextResponse.json(
      { success: false, error: 'Trop de tentatives. Veuillez patienter quelques minutes avant de réessayer.' },
      { status: 429 },
    );
  }

  const resend = new Resend(apiKey);
  try {
    const { error } = await resend.emails.send({
      from: sender,
      to: recipient,
      replyTo: payload.email,
      subject: `Portfolio : ${payload.subject}`,
      text: [
        `Nom : ${payload.name}`,
        `E-mail : ${payload.email}`,
        `Téléphone : ${payload.phone || 'Non renseigné'}`,
        '',
        'Message :',
        payload.message,
      ].join('\n'),
    });

    if (error) {
      console.error('Resend failed to send the contact email:', error);
      return NextResponse.json(
        { success: false, error: "Le message n'a pas pu être envoyé. Veuillez réessayer plus tard." },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error('Contact email request failed:', error);
    return NextResponse.json(
      { success: false, error: "Le message n'a pas pu être envoyé. Veuillez réessayer plus tard." },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true });
}
