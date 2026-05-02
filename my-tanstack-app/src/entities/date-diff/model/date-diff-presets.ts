import { addDays, getMonthEndDate } from './date-diff-utils'

export const getPresetDates = (preset: string, today: string) => {
  if (preset === 'today') {
    return { dateA: today, dateB: today }
  }

  if (preset === 'plus7') {
    return { dateA: today, dateB: addDays(today, 7) }
  }

  if (preset === 'plus30') {
    return { dateA: today, dateB: addDays(today, 30) }
  }

  return { dateA: today, dateB: getMonthEndDate(today) }
}
