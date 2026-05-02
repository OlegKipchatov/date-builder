import assert from "node:assert/strict";
import test from "node:test";

import { addHistoryItem, clearHistory, getHistory, historyStorageKey } from "../src/entities/date-diff/model/history.ts";

const createLocalStorage = () => {
  const map = new Map();
  return {
    getItem: (key) => (map.has(key) ? map.get(key) : null),
    setItem: (key, value) => map.set(key, value),
    removeItem: (key) => map.delete(key),
    clear: () => map.clear(),
  };
};

const baseItem = {
  mode: "range",
  dateA: "2024-01-01",
  dateB: "2024-01-02",
  daysDiff: 1,
  timestamp: "2024-01-01T00:00:00.000Z",
};

test("history stores newest item first", () => {
  global.window = { localStorage: createLocalStorage() };

  addHistoryItem({ ...baseItem, id: "1" });
  addHistoryItem({ ...baseItem, id: "2" });

  const history = getHistory();
  assert.equal(history[0].id, "2");
  assert.equal(history[1].id, "1");

  delete global.window;
});

test("clearHistory removes saved values", () => {
  global.window = { localStorage: createLocalStorage() };

  addHistoryItem({ ...baseItem, id: "1" });
  clearHistory();

  const history = getHistory();
  assert.deepEqual(history, []);
  assert.equal(historyStorageKey, "date-diff-history");

  delete global.window;
});
