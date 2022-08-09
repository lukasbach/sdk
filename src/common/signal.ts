export class Signal<T> {
  private listeners = new Array<(value: T) => void>();

  public on(callback?: (value: T) => void) {
    if (callback) {
      this.listeners.push(callback);
      return () => this.off(callback);
    }
  }

  public off(callback?: (value: T) => void) {
    if (callback) {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    }
  }

  public emit(value: T) {
    this.listeners.forEach(callback => callback(value));
  }

  public clear(): void {
    this.listeners = [];
  }
}
