import { AppSdk } from "./sdk";

export interface SdkPlugin {
  name: string;
  install: (sdk: AppSdk) => undefined | (() => void);
  uninstall?: (sdk: AppSdk) => void;
}
