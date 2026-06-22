/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Primary configuration paths
  readonly VITE_DOCS_URL?: string;
  readonly VITE_TERMS_URL?: string;
  readonly VITE_PRIVACY_URL?: string;
  readonly VITE_API_BASE_URL?: string;

  // Legacy fallback aliases
  readonly VITE_DOCS?: string;
  readonly VITE_TERMS?: string;
  readonly VITE_PRIVACY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}