import assert from "node:assert/strict";
import test from "node:test";

import { getDaysDiff } from "../src/entities/date-diff/model/date-diff-utils.mjs";

test("returns 0 for equal dates", () => {
  assert.equal(getDaysDiff("2024-05-01", "2024-05-01"), 0);
});

test("returns same value when dates are swapped", () => {
  const direct = getDaysDiff("2024-05-10", "2024-05-01");
  const swapped = getDaysDiff("2024-05-01", "2024-05-10");

  assert.equal(direct, swapped);
  assert.equal(direct, 9);
});
