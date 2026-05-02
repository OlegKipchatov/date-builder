import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { getTodayDate } from '@/entities/date-diff/model/date-diff-utils'
import { DateDiffModes } from '@/entities/date-diff/model/date-diff-modes'
import { HomePageLayout } from '@/widgets/home-page-layout'

const isValidDateParam = (value: string | undefined): value is string => {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false
  }

  return !Number.isNaN(new Date(`${value}T00:00:00`).getTime())
}

const isValidMode = (value: string | undefined): boolean => {
  return Object.values(DateDiffModes).includes(value as (typeof DateDiffModes)[keyof typeof DateDiffModes])
}

export const Route = createFileRoute('/')({
  validateSearch: (search: Record<string, unknown>) => ({
    mode: typeof search.mode === 'string' ? search.mode : undefined,
    from: typeof search.from === 'string' ? search.from : undefined,
    to: typeof search.to === 'string' ? search.to : undefined,
  }),
  component: HomePage,
})

function HomePage() {
  const navigate = useNavigate({ from: '/' })
  const search = Route.useSearch()
  const today = getTodayDate()

  const mode = isValidMode(search.mode) ? search.mode : DateDiffModes.RANGE
  const from = isValidDateParam(search.from) ? search.from : today
  const to = isValidDateParam(search.to) ? search.to : today

  return (
    <HomePageLayout
      initialMode={mode}
      initialFrom={from}
      initialTo={to}
      onUrlSync={(nextMode, nextDateA, nextDateB) => {
        navigate({
          search: {
            mode: nextMode,
            from: nextDateA,
            to: nextDateB,
          },
          replace: true,
        })
      }}
    />
  )
}
