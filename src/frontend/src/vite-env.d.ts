/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL of the REST API. Empty/undefined enables demo (mock) mode. */
  readonly VITE_API_URL?: string;
  /** Request timeout in milliseconds. */
  readonly VITE_API_TIMEOUT_MS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
