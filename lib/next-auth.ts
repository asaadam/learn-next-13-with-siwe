import { Session } from 'next-auth';
import { cookies, headers } from 'next/headers';

export async function getSession(cookie: string): Promise<Session | null> {
  const response = await fetch(`http://localhost:3001/api/auth/session`, {
    headers: { cookie },
  });

  if (!response?.ok) {
    return null;
  }

  const session = await response.json();
  return Object.keys(session).length > 0 ? session : null;
}

export async function isAuth() {
  const cookie = headers().get('cookie');
  if (!cookie) return false;

  const session = await getSession(cookie);

  return !!session?.user;
}

export async function getSessionData() {
  const cookie = headers().get('cookie');
  if (!cookie) return false;

  const session = await getSession(cookie);

  return session;
}

export function getToken() {
  return cookies().get('next-auth.session-token')?.value;
}

export function getCsrfToken() {
  return cookies().get('next-auth.csrf-token')?.value;
}

export function getCallbackUrl() {
  const callbackUrl = cookies().get('next-auth.callback-url')?.value;
  if (!callbackUrl) return;

  const decodedUrl = decodeURIComponent(callbackUrl);
  const { searchParams } = new URL(decodedUrl);

  return searchParams.get('callbackUrl') ?? decodedUrl;
}
