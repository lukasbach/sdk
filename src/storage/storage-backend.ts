export interface StorageBackend {
  get(key: string): string | null;
  set(key: string, value: string): void;
  clear();
}
