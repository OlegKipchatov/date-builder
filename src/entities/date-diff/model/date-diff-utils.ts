const MS_IN_DAY = 1000 * 60 * 60 * 24

const pad = (value: number) => String(value).padStart(2, '0')

export const formatYmd = (date: Date) => {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

const toUtcDate = (date: string) => {
  const [year, month, day] = date.split('-').map(Number)

  return Date.UTC(year, month - 1, day)
}

export const getTodayDate = () => {
  return formatYmd(new Date())
}

export const addDays = (date: string, days: number) => {
  const nextDate = new Date(`${date}T00:00:00`)
  nextDate.setDate(nextDate.getDate() + days)

  return formatYmd(nextDate)
}

export const getMonthEndDate = (date: string) => {
  const currentDate = new Date(`${date}T00:00:00`)
  const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)

  return formatYmd(monthEnd)
}

export const getDaysDiff = (dateA: string, dateB: string) => {
  const dateATimestamp = toUtcDate(dateA)
  const dateBTimestamp = toUtcDate(dateB)

  return Math.abs(Math.round((dateATimestamp - dateBTimestamp) / MS_IN_DAY))
}
