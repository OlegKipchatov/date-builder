import { describe, expect, it } from "vitest";

import {
  getDaysDiff,
  getTodayDate,
} from "@/src/entities/date-diff/model/date-diff-utils.mjs";

describe("date-diff-utils", () => {
  it("returns 0 for equal dates", () => {
    expect(getDaysDiff("2024-05-01", "2024-05-01")).toBe(0);
  });

  it("returns the same value for swapped dates", () => {
    expect(getDaysDiff("2024-05-10", "2024-05-01")).toBe(9);
    expect(getDaysDiff("2024-05-01", "2024-05-10")).toBe(9);
  });

  it("returns today date in YYYY-MM-DD format", () => {
    expect(getTodayDate()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});
