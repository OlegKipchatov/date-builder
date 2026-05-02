import { addDays, getMonthEndDate } from "./date-diff-utils.mjs";

export const getPresetDates = (preset, today) => {
  if (preset === "today") {
    return { dateA: today, dateB: today };
  }

  if (preset === "plus7") {
    return { dateA: today, dateB: addDays(today, 7) };
  }

  if (preset === "plus30") {
    return { dateA: today, dateB: addDays(today, 30) };
  }

  return { dateA: today, dateB: getMonthEndDate(today) };
};
