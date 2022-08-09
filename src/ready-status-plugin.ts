import { SdkPlugin } from "./sdk-plugin";
import { composeHandlers } from "./common/compose-handlers";

export const ReadyStatusPlugin: SdkPlugin = {
  name: "ready-status-plugin",
  install: sdk => {
    const plugins: string[] = [];
    const onInstall = sdk.installSignal.on(plugin => {
      if (sdk.isReady) {
        sdk.logging.log(`Plugin installed after ready signal: ${plugin.name}`);
      } else {
        plugins.push(plugin.name);
      }
    });
    const onReady = sdk.readySignal.on(() => {
      sdk.logging.log("Sdk is ready");
      plugins.forEach(plugin => {
        sdk.logging.log(`Plugin installed: ${plugin}`);
      });
    });
    return composeHandlers(onInstall, onReady);
  },
};
