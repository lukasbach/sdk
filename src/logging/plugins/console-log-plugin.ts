import { SdkPlugin } from "../../sdk-plugin";

export const ConsoleLogPlugin: SdkPlugin = {
  name: "console-log-plugin",
  install: sdk => {
    const levels = sdk.config.logging.console.levels; // TODO from localstorage
    return sdk.logging.logSignal.on(logEvent => {
      if (levels.includes(logEvent.level)) {
        console[logEvent.level](logEvent.message, logEvent.data);
      }
    });
  },
};
