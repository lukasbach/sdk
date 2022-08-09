import { v4 } from "uuid";
import { AppSdk } from "../sdk";
import { Signal } from "../common/signal";

const USER_ID_KEY = "sdk-user-id";

export class MetaDataModule {
  public readonly userId;
  public setEntrySignal = new Signal<[string, string]>();

  private _entries: Record<string, string> = {};

  public get entries() {
    return this._entries;
  }

  constructor(private sdk: AppSdk) {
    const hasUserId = this.sdk.storage.has(USER_ID_KEY);
    this.userId = sdk.storage.get(USER_ID_KEY) ?? v4();
    if (!hasUserId) {
      sdk.storage.setWithConsent(USER_ID_KEY, this.userId);
    }
  }

  public set(key: string, value: string) {
    this.setEntrySignal.emit([key, value]);
    this._entries[key] = value;
  }

  public setWithConsent(key: string, value: string) {
    if (this.sdk.privacy.hasConsent) {
      this.set(key, value);
    } else {
      this.sdk.privacy.receivedConsentSignal.on(() => this.set(key, value));
    }
  }
}
