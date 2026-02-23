import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { useLocalStorage } from "@/src/shared/lib/useLocalStorage";

describe("useLocalStorage", () => {
  it("initializes state from fallback", () => {
    const { result } = renderHook(() => useLocalStorage("count", 1));

    expect(result.current[0]).toBe(1);
  });

  it("saves updates to localStorage", () => {
    const { result } = renderHook(() => useLocalStorage("count", 1));

    act(() => {
      result.current[1](5);
    });

    expect(window.localStorage.getItem("count")).toBe("5");
  });

  it("clears value and restores initial state", () => {
    const { result } = renderHook(() => useLocalStorage("name", "init"));

    act(() => {
      result.current[1]("changed");
    });

    act(() => {
      result.current[2]();
    });

    expect(result.current[0]).toBe("init");
    expect(window.localStorage.getItem("name")).toBe("\"init\"");
  });

  it("restores saved value from localStorage", () => {
    window.localStorage.setItem("count", "7");

    const { result } = renderHook(() => useLocalStorage("count", 1));

    expect(result.current[0]).toBe(7);
  });
});
