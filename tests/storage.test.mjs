import assert from "node:assert/strict";
import test from "node:test";

import { getLS, removeLS, setLS } from "../src/shared/lib/storage.ts";

const createLocalStorage = () => {
  const map = new Map();
  return {
    getItem: (key) => (map.has(key) ? map.get(key) : null),
    setItem: (key, value) => map.set(key, value),
    removeItem: (key) => map.delete(key),
    clear: () => map.clear(),
  };
};

test("setLS/getLS/removeLS work with valid json values", () => {
  global.window = { localStorage: createLocalStorage() };

  setLS("k", { value: 1 });
  assert.deepEqual(getLS("k", {}), { value: 1 });

  removeLS("k");
  assert.deepEqual(getLS("k", { fallback: true }), { fallback: true });

  delete global.window;
});

test("getLS returns fallback for invalid json", () => {
  const localStorage = createLocalStorage();
  localStorage.setItem("broken", "{not-json");
  global.window = { localStorage };

  assert.equal(getLS("broken", "fallback"), "fallback");

  delete global.window;
});
