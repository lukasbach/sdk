import { LogLevel } from "./logging";

export interface SdkConfig {
  privacy?: {
    showCookieBanner?: boolean;
    blocking?: boolean;
    thirdPartyServices?: Array<string | { title: string; description: string }>;
  };

  logging?: {
    console?: {
      levels?: Array<LogLevel>;
    };
  };

  telemetry?: unknown;
}
