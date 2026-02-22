"use client";

import { useCallback, useEffect, useState } from "react";

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
  clearSavedHistory: () => void;
};

export const useDateDiff = (): UseDateDiffResult => {
  const [dateA, setDateA] = useState<string>("");
  const [dateB, setDateB] = useState<string>("2000-01-01");
  const [daysDiff, setDaysDiff] = useState<number>(0);
  const [history, setHistory] = useLocalStorage<CalculationHistoryItem[]>(
    historyStorageKey,
    getHistory(),
  );

  useEffect(() => {
    setDateA(getTodayDate());
  }, []);

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

    const newHistoryItem: CalculationHistoryItem = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
      dateA,
      dateB,
      daysDiff: calculatedDaysDiff,
      timestamp: new Date().toISOString(),
    };

    setHistory(addHistoryItem(newHistoryItem));
  }, [dateA, dateB, recalculate, setHistory]);

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
    clearSavedHistory,
  };
};
