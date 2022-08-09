import { LoggingModule } from "./logging";
import { SdkPlugin } from "./sdk-plugin";
import { SdkConfig } from "./types";
import { Signal } from "./common/signal";
import { CorePlugin } from "./core-plugin";
import { StorageModule } from "./storage";
import { PrivacyModule } from "./privacy";
import { MetaDataModule } from "./meta-data";
import { UtilsModule } from "./utils";

export class AppSdk {
  readySignal = new Signal<undefined>();
  installSignal = new Signal<SdkPlugin>();
  uninstallSignal = new Signal<undefined>();

  logging = new LoggingModule();
  storage = new StorageModule(this);
  privacy = new PrivacyModule();
  meta = new MetaDataModule(this);
  utils = new UtilsModule();

  private plugins?: SdkPlugin[] = [];
  private _isReady = false;

  private constructor(public readonly config: SdkConfig) {}

  public get isReady() {
    return this._isReady;
  }

  public static init(config: SdkConfig) {
    const sdk = new AppSdk(config);
    sdk.installPlugin(CorePlugin);
    return sdk;
  }

  public installPlugins(...plugins: SdkPlugin[]) {
    plugins.forEach(plugin => this.installPlugin(plugin));
    return this;
  }

  public installPlugin(plugin: SdkPlugin) {
    this.plugins.push(plugin);
    this.uninstallSignal.on(plugin.install(this));
    this.uninstallSignal.on(() => plugin.uninstall?.(this));
    return this;
  }

  public uninstall() {
    this.uninstallSignal.emit(undefined);
    return this;
  }

  public ready() {
    this._isReady = true;
    this.readySignal.emit(undefined);
    return this;
  }
}
