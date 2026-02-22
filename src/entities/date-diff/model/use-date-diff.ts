"use client";

import { useEffect, useMemo, useState } from "react";

import { getDaysDiff, getTodayDate } from "./date-diff-utils.mjs";

export type UseDateDiffResult = {
  dateA: string;
  dateB: string;
  daysDiff: number;
  setDateA: (value: string) => void;
  setDateB: (value: string) => void;
};

export const useDateDiff = (): UseDateDiffResult => {
  const [dateA, setDateA] = useState<string>("");
  const [dateB, setDateB] = useState<string>("2000-01-01");

  useEffect(() => {
    setDateA(getTodayDate());
  }, []);

  const daysDiff = useMemo(() => {
    if (!dateA || !dateB) {
      return 0;
    }

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
