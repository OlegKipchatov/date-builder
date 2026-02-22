"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useLocalStorage } from "@/src/shared/lib/useLocalStorage";

import { getDaysDiff, getTodayDate } from "./date-diff-utils.mjs";
import {
  addHistoryItem,
  CalculationHistoryItem,
  clearHistory,
  getHistory,
  historyStorageKey,
} from "./history";

export type UseDateDiffResult = {
  dateA: string;
  dateB: string;
  daysDiff: number;
  history: CalculationHistoryItem[];
  setDateA: (value: string) => void;
  setDateB: (value: string) => void;
  recalculate: () => number;
  saveCalculation: () => void;
  applyHistoryItem: (item: CalculationHistoryItem) => void;
  clearSavedHistory: () => void;
};

const isValidDateParam = (value: string | null): value is string => {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  return !Number.isNaN(new Date(`${value}T00:00:00`).getTime());
};

export const useDateDiff = (): UseDateDiffResult => {
  const [dateA, setDateA] = useState<string>("");
  const [dateB, setDateB] = useState<string>("2000-01-01");
  const [daysDiff, setDaysDiff] = useState<number>(0);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [history, setHistory] = useLocalStorage<CalculationHistoryItem[]>(
    historyStorageKey,
    getHistory(),
  );

  useEffect(() => {
    const fromParam = searchParams.get("from");
    const toParam = searchParams.get("to");

    if (isValidDateParam(fromParam) && isValidDateParam(toParam)) {
      setDateA(fromParam);
      setDateB(toParam);

      return;
    }

    setDateA(getTodayDate());
  }, [searchParams]);

  const updateSearchParams = useCallback(
    (nextDateA: string, nextDateB: string) => {
      const nextSearchParams = new URLSearchParams(searchParams.toString());

      nextSearchParams.set("from", nextDateA);
      nextSearchParams.set("to", nextDateB);

      router.replace(`${pathname}?${nextSearchParams.toString()}`, {
        scroll: false,
      });
    },
    [pathname, router, searchParams],
  );

  const recalculate = useCallback((): number => {
    if (!dateA || !dateB) {
      setDaysDiff(0);
      return 0;
    }

    const nextDaysDiff = getDaysDiff(dateA, dateB);
    setDaysDiff(nextDaysDiff);

    return nextDaysDiff;
  }, [dateA, dateB]);

  useEffect(() => {
    recalculate();
  }, [recalculate]);

  const saveCalculation = useCallback(() => {
    const calculatedDaysDiff = recalculate();

    updateSearchParams(dateA, dateB);

    const newHistoryItem: CalculationHistoryItem = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
      dateA,
      dateB,
      daysDiff: calculatedDaysDiff,
      timestamp: new Date().toISOString(),
    };

    setHistory(addHistoryItem(newHistoryItem));
  }, [dateA, dateB, recalculate, setHistory, updateSearchParams]);

  const applyHistoryItem = useCallback(
    (item: CalculationHistoryItem) => {
      updateSearchParams(item.dateA, item.dateB);
      setDateA(item.dateA);
      setDateB(item.dateB);
    },
    [updateSearchParams],
  );

  const clearSavedHistory = useCallback(() => {
    clearHistory();
    setHistory([]);
  }, [setHistory]);

  return {
    dateA,
    dateB,
    daysDiff,
    history,
    setDateA,
    setDateB,
    recalculate,
    saveCalculation,
    applyHistoryItem,
    clearSavedHistory,
  };
};
