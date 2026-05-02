import { getDaysDiff } from './date-diff-utils'

export const DateDiffModes = {
  RANGE: 'range',
  UNTIL: 'until',
  SINCE: 'since',
} as const

export const getModeDescription = (mode: string, daysDiff: number) => {
  if (mode === DateDiffModes.UNTIL) {
    return `До выбранной даты: ${daysDiff} дн.`
  }

  if (mode === DateDiffModes.SINCE) {
    return `С выбранной даты прошло: ${daysDiff} дн.`
  }

  return `Между датами: ${daysDiff} дн.`
}

export const getCalculationResult = ({
  mode,
  dateA,
  dateB,
  today,
}: {
  mode: string
  dateA: string
  dateB: string
  today: string
}) => {
  if (mode === DateDiffModes.RANGE) {
    return getDaysDiff(dateA, dateB)
  }

  if (mode === DateDiffModes.UNTIL) {
    return getDaysDiff(today, dateB)
  }

  return getDaysDiff(dateA, today)
}

export const buildShareText = ({
  mode,
  dateA,
  dateB,
  daysDiff,
}: {
  mode: string
  dateA: string
  dateB: string
  daysDiff: number
}) => {
  if (mode === DateDiffModes.UNTIL) {
    return `До ${dateB} осталось ${daysDiff} дн.`
  }

  if (mode === DateDiffModes.SINCE) {
    return `С ${dateA} прошло ${daysDiff} дн.`
  }

  return `Между ${dateA} и ${dateB}: ${daysDiff} дн.`
}
