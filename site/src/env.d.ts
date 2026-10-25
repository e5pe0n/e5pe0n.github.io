interface ImportMetaEnv {
  /** Base URL of the reads proxy (api/), e.g. https://stuck-trace-api-xxxx.a.run.app */
  readonly PUBLIC_READS_API?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
