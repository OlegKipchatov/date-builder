import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";

const createLocalStorage = () => {
  const map = new Map<string, string>();

  return {
    getItem: (key: string) => (map.has(key) ? map.get(key)! : null),
    setItem: (key: string, value: string) => {
      map.set(key, value);
    },
    removeItem: (key: string) => {
      map.delete(key);
    },
    clear: () => {
      map.clear();
    },
  };
};

Object.defineProperty(window, "localStorage", {
  value: createLocalStorage(),
  configurable: true,
});

afterEach(() => {
  window.localStorage.clear();
});
