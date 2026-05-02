import { describe, expect, it } from "vitest";

import { getLS, removeLS, setLS } from "@/src/shared/lib/storage";

describe("storage", () => {
  it("reads fallback when value is missing", () => {
    expect(getLS("missing", 10)).toBe(10);
  });

  it("writes and reads JSON values", () => {
    setLS("k", { value: 42 });

    expect(getLS("k", { value: 0 })).toEqual({ value: 42 });
  });

  it("returns fallback for invalid JSON", () => {
    window.localStorage.setItem("broken", "{not-json");

    expect(getLS("broken", "fallback")).toBe("fallback");
  });

  it("removes values", () => {
    setLS("to-remove", "x");
    removeLS("to-remove");

    expect(window.localStorage.getItem("to-remove")).toBeNull();
  });
});
