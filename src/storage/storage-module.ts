import { StorageBackend } from "./storage-backend";
import { AppSdk } from "../sdk";

export class StorageModule {
  private backend: StorageBackend;

  constructor(private sdk: AppSdk) {}

  public setBackend(backend: StorageBackend) {
    this.backend = backend;
  }

  public set(key: string, value: any) {
    this.backend.set(
      key,
      typeof value === "string" ? value : "__JSON:" + JSON.stringify(value)
    );
  }

  public get(key: string) {
    const value = this.backend.get(key);
    if (value === null) {
      return null;
    }
    if (value.startsWith("__JSON:")) {
      return JSON.parse(value.substring(7));
    }
    return value;
  }

  public has(key: string) {
    return this.get(key) !== null;
  }

  public async setWithConsent(key: string, value: any) {
    this.sdk.privacy.awaitConsent().then(() => this.set(key, value));
  }
}
