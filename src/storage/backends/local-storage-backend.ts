import { StorageBackend } from "../storage-backend";

export const LocalStorageBackend: StorageBackend = {
  get(key: string) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  },

  set(key: string, value: string) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      // ignore
    }
  },

  clear() {
    try {
      localStorage.clear();
    } catch (e) {
      // ignore
    }
  },
};
