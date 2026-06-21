import type { AppConfig } from '@/infrastructure/config/appConfig.types';

declare global {
  interface Window {
    __APP_CONFIG__?: AppConfig;
  }
}
