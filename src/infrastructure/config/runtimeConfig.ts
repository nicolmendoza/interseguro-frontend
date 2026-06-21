import type { AppConfig } from './appConfig.types';

export function getGoApiUrl(): string {
  return getRequiredConfig('goApiUrl', getRuntimeConfig().goApiUrl ?? process.env.NEXT_PUBLIC_GO_API_URL);
}

export function getNodeApiUrl(): string {
  return getRequiredConfig('nodeApiUrl', getRuntimeConfig().nodeApiUrl ?? process.env.NEXT_PUBLIC_NODE_API_URL);
}

function getRuntimeConfig(): AppConfig {
  return typeof window === 'undefined' ? {} : window.__APP_CONFIG__ ?? {};
}

function getRequiredConfig(key: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Missing frontend configuration: ${key}`);
  }
  return value;
}
