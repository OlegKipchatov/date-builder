import assert from "node:assert/strict";
import test from "node:test";

import { getPresetDates } from "../src/entities/date-diff/model/date-diff-presets.mjs";

test("today preset uses same date", () => {
  const result = getPresetDates("today", "2024-05-05");
  assert.equal(result.dateA, "2024-05-05");
  assert.equal(result.dateB, "2024-05-05");
});

test("plus7 preset adds seven days", () => {
  const result = getPresetDates("plus7", "2024-05-05");
  assert.equal(result.dateB, "2024-05-12");
});

test("month end preset resolves end of month", () => {
  const result = getPresetDates("monthEnd", "2024-02-05");
  assert.equal(result.dateB, "2024-02-29");
});
