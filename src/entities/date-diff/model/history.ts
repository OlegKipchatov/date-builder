import { getLS, removeLS, setLS } from "../../../shared/lib/storage.ts";

export type CalculationHistoryItem = {
  id: string;
  mode: string;
  dateA: string;
  dateB: string;
  daysDiff: number;
  timestamp: string;
};

const HISTORY_STORAGE_KEY = "date-diff-history";
const HISTORY_LIMIT = 20;

export const getHistory = (): CalculationHistoryItem[] => {
  return getLS<CalculationHistoryItem[]>(HISTORY_STORAGE_KEY, []);
};

export const addHistoryItem = (
  item: CalculationHistoryItem,
): CalculationHistoryItem[] => {
  const currentHistory = getHistory();
  const nextHistory = [item, ...currentHistory].slice(0, HISTORY_LIMIT);

  setLS(HISTORY_STORAGE_KEY, nextHistory);

  return nextHistory;
};

export const clearHistory = (): void => {
  removeLS(HISTORY_STORAGE_KEY);
};

export const historyStorageKey = HISTORY_STORAGE_KEY;
