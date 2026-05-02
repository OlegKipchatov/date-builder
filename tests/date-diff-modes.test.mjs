import assert from "node:assert/strict";
import test from "node:test";

import {
  buildShareText,
  DateDiffModes,
  getCalculationResult,
  getModeDescription,
} from "../src/entities/date-diff/model/date-diff-modes.mjs";

test("range mode calculates between two dates", () => {
  const result = getCalculationResult({
    mode: DateDiffModes.RANGE,
    dateA: "2024-01-01",
    dateB: "2024-01-11",
    today: "2024-01-20",
  });

  assert.equal(result, 10);
});

test("until mode calculates from today to target date", () => {
  const result = getCalculationResult({
    mode: DateDiffModes.UNTIL,
    dateA: "2024-01-01",
    dateB: "2024-01-11",
    today: "2024-01-01",
  });

  assert.equal(result, 10);
});

test("since mode calculates from date to today", () => {
  const result = getCalculationResult({
    mode: DateDiffModes.SINCE,
    dateA: "2024-01-01",
    dateB: "2024-01-11",
    today: "2024-01-21",
  });

  assert.equal(result, 20);
});

test("mode descriptions and share text are user-readable", () => {
  assert.match(getModeDescription(DateDiffModes.RANGE, 7), /Между датами/);
  assert.match(buildShareText({ mode: DateDiffModes.UNTIL, dateA: "", dateB: "2025-01-01", daysDiff: 4 }), /осталось/);
});
