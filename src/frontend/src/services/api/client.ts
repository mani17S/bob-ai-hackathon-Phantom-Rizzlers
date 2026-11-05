/**
 * REST client - one place for base URL, auth header, timeouts and error
 * normalization. Feature services (see services/*.ts) call `request<T>()`,
 * never `fetch` directly.
 */

export class ApiError extends Error {
  constructor(
    readonly status: number,
    readonly payload: unknown,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

const BASE_URL = (import.meta.env.VITE_API_URL ?? "").replace(/\/+$/, "");

export const isDemoMode = BASE_URL.length === 0;

const DEFAULT_TIMEOUT_MS = Number(import.meta.env.VITE_API_TIMEOUT_MS ?? 15_000);

export interface RequestOptions<TBody = unknown> {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: TBody;
  /** Query params; `undefined` values are skipped. */
  params?: Record<string, string | number | boolean | undefined>;
  /** Optional external abort signal; combined with the internal timeout. */
  signal?: AbortSignal;
}

/** Read the token wherever it is stored - swap in your auth flow later. */
function getAuthHeader(): Record<string, string> {
  const token = localStorage.getItem("auth_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function safeJson(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

export async function request<TResult, TBody = unknown>(
  path: string,
  options: RequestOptions<TBody> = {},
): Promise<TResult> {
  const url = new URL(`${BASE_URL}${path}`, window.location.origin);

  for (const [key, value] of Object.entries(options.params ?? {})) {
    if (value !== undefined) url.searchParams.set(key, String(value));
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);
  options.signal?.addEventListener("abort", () => controller.abort());

  try {
    const response = await fetch(url, {
      method: options.method ?? "GET",
      headers: { "Content-Type": "application/json", ...getAuthHeader() },
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new ApiError(
        response.status,
        await safeJson(response),
        `Request failed: ${response.status} ${response.statusText} (${url.pathname})`,
      );
    }

    return (response.status === 204 ? undefined : await response.json()) as TResult;
  } finally {
    clearTimeout(timer);
  }
}
