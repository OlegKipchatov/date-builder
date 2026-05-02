"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useLocalStorage } from "@/src/shared/lib/useLocalStorage";

import { getTodayDate } from "./date-diff-utils.mjs";
import {
  buildShareText,
  DateDiffModes,
  getCalculationResult,
  getModeDescription,
} from "./date-diff-modes.mjs";
import { getPresetDates } from "./date-diff-presets.mjs";
import {
  addHistoryItem,
  CalculationHistoryItem,
  clearHistory,
  getHistory,
  historyStorageKey,
} from "./history";

export type UseDateDiffResult = {
  mode: string;
  dateA: string;
  dateB: string;
  daysDiff: number;
  resultLabel: string;
  history: CalculationHistoryItem[];
  setMode: (value: string) => void;
  setDateA: (value: string) => void;
  setDateB: (value: string) => void;
  saveCalculation: () => void;
  applyPreset: (preset: string) => void;
  applyHistoryItem: (item: CalculationHistoryItem) => void;
  clearSavedHistory: () => void;
  copyShareText: () => Promise<boolean>;
};

const isValidDateParam = (value: string | null): value is string => {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  return !Number.isNaN(new Date(`${value}T00:00:00`).getTime());
};

const isValidMode = (value: string | null): value is string => {
  return Object.values(DateDiffModes).includes(value || "");
};

export const useDateDiff = (): UseDateDiffResult => {
  const today = useMemo(() => getTodayDate(), []);
  const [mode, setMode] = useState<string>(DateDiffModes.RANGE);
  const [dateA, setDateA] = useState<string>(today);
  const [dateB, setDateB] = useState<string>(today);
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
    const modeParam = searchParams.get("mode");

    if (isValidMode(modeParam)) {
      setMode(modeParam);
    }

    if (isValidDateParam(fromParam)) {
      setDateA(fromParam);
    }

    if (isValidDateParam(toParam)) {
      setDateB(toParam);
    }
  }, [searchParams]);

  const daysDiff = useMemo(() => {
    return getCalculationResult({ mode, dateA, dateB, today });
  }, [dateA, dateB, mode, today]);

  const resultLabel = useMemo(() => {
    return getModeDescription(mode, daysDiff);
  }, [daysDiff, mode]);

  const updateSearchParams = useCallback(
    (nextMode: string, nextDateA: string, nextDateB: string) => {
      const nextSearchParams = new URLSearchParams(searchParams.toString());
      nextSearchParams.set("mode", nextMode);
      nextSearchParams.set("from", nextDateA);
      nextSearchParams.set("to", nextDateB);

      router.replace(`${pathname}?${nextSearchParams.toString()}`, {
        scroll: false,
      });
    },
    [pathname, router, searchParams],
  );

  const saveCalculation = useCallback(() => {
    updateSearchParams(mode, dateA, dateB);

    const newHistoryItem: CalculationHistoryItem = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
      mode,
      dateA,
      dateB,
      daysDiff,
      timestamp: new Date().toISOString(),
    };

    setHistory(addHistoryItem(newHistoryItem));
  }, [dateA, dateB, daysDiff, mode, setHistory, updateSearchParams]);

  const applyPreset = useCallback(
    (preset: string) => {
      if (preset === "today") {
        const presetDates = getPresetDates(preset, today);
        setDateA(presetDates.dateA);
        setDateB(presetDates.dateB);
        return;
      }

      if (mode === DateDiffModes.RANGE || mode === DateDiffModes.UNTIL) {
        const presetDates = getPresetDates(preset, dateB || today);
        setDateB(presetDates.dateB);
        return;
      }

      const presetDates = getPresetDates(preset, dateA || today);
      setDateA(presetDates.dateB);
    },
    [dateA, dateB, mode, today],
  );

  const applyHistoryItem = useCallback(
    (item: CalculationHistoryItem) => {
      setMode(item.mode);
      setDateA(item.dateA);
      setDateB(item.dateB);
      updateSearchParams(item.mode, item.dateA, item.dateB);
    },
    [updateSearchParams],
  );

  const clearSavedHistory = useCallback(() => {
    clearHistory();
    setHistory([]);
  }, [setHistory]);

  const copyShareText = useCallback(async () => {
    const text = buildShareText({ mode, dateA, dateB, daysDiff });

    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }, [dateA, dateB, daysDiff, mode]);

  return {
    mode,
    dateA,
    dateB,
    daysDiff,
    resultLabel,
    history,
    setMode,
    setDateA,
    setDateB,
    saveCalculation,
    applyPreset,
    applyHistoryItem,
    clearSavedHistory,
    copyShareText,
  };
};
