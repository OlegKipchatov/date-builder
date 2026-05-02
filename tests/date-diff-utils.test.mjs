import assert from "node:assert/strict";
import test from "node:test";

import {
  addDays,
  formatYmd,
  getDaysDiff,
  getMonthEndDate,
  getTodayDate,
} from "../src/entities/date-diff/model/date-diff-utils.mjs";

test("returns 0 for equal dates", () => {
  assert.equal(getDaysDiff("2024-05-01", "2024-05-01"), 0);
});

test("returns same value when dates are swapped", () => {
  const direct = getDaysDiff("2024-05-10", "2024-05-01");
  const swapped = getDaysDiff("2024-05-01", "2024-05-10");

  assert.equal(direct, swapped);
  assert.equal(direct, 9);
});

test("adds days to an input date", () => {
  assert.equal(addDays("2024-12-30", 3), "2025-01-02");
});

test("returns month end date", () => {
  assert.equal(getMonthEndDate("2024-02-02"), "2024-02-29");
});

test("formatYmd uses YYYY-MM-DD", () => {
  const value = formatYmd(new Date("2024-01-05T10:20:30"));
  assert.equal(value, "2024-01-05");
});

test("getTodayDate returns YYYY-MM-DD", () => {
  assert.match(getTodayDate(), /^\d{4}-\d{2}-\d{2}$/);
});
