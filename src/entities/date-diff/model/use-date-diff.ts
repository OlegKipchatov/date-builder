"use client";

import { useMemo, useState } from "react";

import { getDaysDiff, getTodayDate } from "./date-diff-utils.mjs";

export type UseDateDiffResult = {
  dateA: string;
  dateB: string;
  daysDiff: number;
  setDateA: (value: string) => void;
  setDateB: (value: string) => void;
};

export const useDateDiff = (): UseDateDiffResult => {
  const [dateA, setDateA] = useState<string>(() => getTodayDate());
  const [dateB, setDateB] = useState<string>("2000-01-01");

  const daysDiff = useMemo(() => {
    return getDaysDiff(dateA, dateB);
  }, [dateA, dateB]);

  return {
    dateA,
    dateB,
    daysDiff,
    setDateA,
    setDateB,
  };
};
