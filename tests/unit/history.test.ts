import { describe, expect, it } from "vitest";

import {
  addHistoryItem,
  clearHistory,
  getHistory,
  historyStorageKey,
} from "@/src/entities/date-diff/model/history";

describe("history", () => {
  it("returns empty history by default", () => {
    expect(getHistory()).toEqual([]);
  });

  it("adds new items to the beginning", () => {
    const first = {
      id: "1",
      dateA: "2024-01-01",
      dateB: "2024-01-10",
      daysDiff: 9,
      timestamp: "2024-01-11T00:00:00.000Z",
    };
    const second = {
      id: "2",
      dateA: "2024-02-01",
      dateB: "2024-02-03",
      daysDiff: 2,
      timestamp: "2024-02-03T00:00:00.000Z",
    };

    addHistoryItem(first);
    const result = addHistoryItem(second);

    expect(result.map((item) => item.id)).toEqual(["2", "1"]);
  });

  it("clears persisted history", () => {
    addHistoryItem({
      id: "x",
      dateA: "2024-01-01",
      dateB: "2024-01-02",
      daysDiff: 1,
      timestamp: "2024-01-02T00:00:00.000Z",
    });

    clearHistory();

    expect(getHistory()).toEqual([]);
    expect(window.localStorage.getItem(historyStorageKey)).toBeNull();
  });
});
