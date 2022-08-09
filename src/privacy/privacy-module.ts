import { Signal } from "../common/signal";

export class PrivacyModule {
  private consent: boolean;

  public receivedConsentSignal = new Signal<undefined>();

  public get hasConsent() {
    return this.consent;
  }

  public awaitConsent() {
    return new Promise<void>(r => {
      if (this.hasConsent) {
        r();
      } else {
        this.receivedConsentSignal.on(r);
      }
    });
  }
}
