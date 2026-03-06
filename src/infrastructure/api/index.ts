/**
 * Infrastructure Layer — HTTP Client
 *
 * Low-level helpers for communicating with external APIs.
 * Uses the native fetch API available in Next.js App Router.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

async function request<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`[API] ${options?.method ?? 'GET'} ${endpoint} — ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const http = {
  get: <T>(endpoint: string) =>
    request<T>(endpoint),

  post: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, { method: 'POST', body: JSON.stringify(body) }),

  put: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, { method: 'PUT', body: JSON.stringify(body) }),

  patch: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, { method: 'PATCH', body: JSON.stringify(body) }),

  delete: <T>(endpoint: string) =>
    request<T>(endpoint, { method: 'DELETE' }),
};
