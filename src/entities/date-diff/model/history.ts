import { getLS, removeLS, setLS } from "@/src/shared/lib/storage";

export type CalculationHistoryItem = {
  id: string;
  dateA: string;
  dateB: string;
  daysDiff: number;
  timestamp: string;
};

const HISTORY_STORAGE_KEY = "date-diff-history";

export const getHistory = (): CalculationHistoryItem[] => {
  return getLS<CalculationHistoryItem[]>(HISTORY_STORAGE_KEY, []);
};

export const addHistoryItem = (
  item: CalculationHistoryItem,
): CalculationHistoryItem[] => {
  const currentHistory = getHistory();
  const nextHistory = [item, ...currentHistory];

  setLS(HISTORY_STORAGE_KEY, nextHistory);

  return nextHistory;
};

export const clearHistory = (): void => {
  removeLS(HISTORY_STORAGE_KEY);
};

export const historyStorageKey = HISTORY_STORAGE_KEY;
