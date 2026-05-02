import type { DateValue } from '@internationalized/date'
import { parseDate, today as getToday } from '@internationalized/date'
import {
  Button,
  Calendar,
  DateField,
  DatePicker,
  DateRangePicker,
  Label,
  RangeCalendar,
  Separator,
  Tabs,
} from '@heroui/react'
import { useEffect, useMemo, useState } from 'react'

import { DateDiffModes } from '../model/date-diff-modes'
import { useDateDiff } from '../model/use-date-diff'

export type DateDiffFormProps = {
  className?: string
  onEngage?: () => void
  initialMode: string
  initialFrom: string
  initialTo: string
  onUrlSync: (nextMode: string, nextDateA: string, nextDateB: string) => void
}

const formatDateRu = (value: string): string => {
  const [year, month, day] = value.split('-')
  if (!year || !month || !day) {
    return value
  }

  return `${day}/${month}/${year}`
}

const toRangeValue = (
  dateA: string,
  dateB: string,
): { start: DateValue; end: DateValue } | null => {
  if (!dateA || !dateB) {
    return null
  }

  const [startDate, endDate] = dateA <= dateB ? [dateA, dateB] : [dateB, dateA]

  return {
    start: parseDate(startDate),
    end: parseDate(endDate),
  }
}

const toDateValue = (value: string): DateValue | null => {
  if (!value) {
    return null
  }

  return parseDate(value)
}

const getModeTitle = (mode: string): string => {
  if (mode === DateDiffModes.UNTIL) {
    return 'До даты'
  }

  if (mode === DateDiffModes.SINCE) {
    return 'С даты'
  }

  return 'Между датами'
}

export const DateDiffForm = ({
  className,
  onEngage,
  initialMode,
  initialFrom,
  initialTo,
  onUrlSync,
}: DateDiffFormProps) => {
  const {
    mode,
    dateA,
    dateB,
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
  } = useDateDiff({ initialMode, initialFrom, initialTo, onUrlSync })

  const [copyStatus, setCopyStatus] = useState<'idle' | 'ok' | 'error'>('idle')
  const [isHydrated, setIsHydrated] = useState(false)

  const maxDateValue = useMemo(() => getToday('UTC').add({ years: 20 }), [])
  const hasHistory = isHydrated && history.length > 0

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  const handleCopy = async () => {
    onEngage?.()
    const copied = await copyShareText()
    setCopyStatus(copied ? 'ok' : 'error')
  }

  return (
    <section
      className={`w-full ${className ?? ''}`}
      onFocusCapture={onEngage}
      onPointerDownCapture={onEngage}
    >
      <Tabs
        selectedKey={mode}
        onSelectionChange={(key) => {
          onEngage?.()
          setMode(String(key))
        }}
      >
        <Tabs.ListContainer>
          <Tabs.List aria-label="Режим расчета">
            <Tabs.Tab id={DateDiffModes.RANGE}>
              Между датами
              <Tabs.Indicator />
            </Tabs.Tab>
            <Tabs.Tab id={DateDiffModes.UNTIL}>
              До даты
              <Tabs.Indicator />
            </Tabs.Tab>
            <Tabs.Tab id={DateDiffModes.SINCE}>
              С даты
              <Tabs.Indicator />
            </Tabs.Tab>
          </Tabs.List>
        </Tabs.ListContainer>
      </Tabs>

      {mode === DateDiffModes.RANGE ? (
        <DateRangePicker
          className="mt-4 w-full"
          value={toRangeValue(dateA, dateB)}
          maxValue={maxDateValue}
          onChange={(value) => {
            onEngage?.()
            if (!value) return
            setDateA(value.start.toString())
            setDateB(value.end.toString())
          }}
        >
          <Label>Период</Label>
          <DateField.Group fullWidth>
            <DateField.Input slot="start">{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
            <DateRangePicker.RangeSeparator />
            <DateField.Input slot="end">{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
            <DateField.Suffix>
              <DateRangePicker.Trigger>
                <DateRangePicker.TriggerIndicator />
              </DateRangePicker.Trigger>
            </DateField.Suffix>
          </DateField.Group>
        </DateRangePicker>
      ) : mode === DateDiffModes.UNTIL ? (
        <DatePicker className="mt-4 w-full" value={toDateValue(dateB)} maxValue={maxDateValue} onChange={(value) => { onEngage?.(); if (value) setDateB(value.toString()) }}>
          <Label>Дата назначения</Label>
          <DateField.Group fullWidth>
            <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
            <DateField.Suffix>
              <DatePicker.Trigger>
                <DatePicker.TriggerIndicator />
              </DatePicker.Trigger>
            </DateField.Suffix>
          </DateField.Group>
          <DatePicker.Popover>
            <Calendar aria-label="Дата назначения" />
          </DatePicker.Popover>
        </DatePicker>
      ) : (
        <DatePicker className="mt-4 w-full" value={toDateValue(dateA)} maxValue={maxDateValue} onChange={(value) => { onEngage?.(); if (value) setDateA(value.toString()) }}>
          <Label>Начальная дата</Label>
          <DateField.Group fullWidth>
            <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
            <DateField.Suffix>
              <DatePicker.Trigger>
                <DatePicker.TriggerIndicator />
              </DatePicker.Trigger>
            </DateField.Suffix>
          </DateField.Group>
          <DatePicker.Popover>
            <Calendar aria-label="Начальная дата" />
          </DatePicker.Popover>
        </DatePicker>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        <Button size="sm" variant="tertiary" onPress={() => { onEngage?.(); applyPreset('today') }}>Сегодня</Button>
        <Button size="sm" variant="tertiary" onPress={() => { onEngage?.(); applyPreset('plus7') }}>+7 дней</Button>
        <Button size="sm" variant="tertiary" onPress={() => { onEngage?.(); applyPreset('plus30') }}>+30 дней</Button>
        <Button size="sm" variant="tertiary" onPress={() => { onEngage?.(); applyPreset('monthEnd') }}>Конец месяца</Button>
      </div>

      <p className="mt-4 text-4xl font-bold text-slate-900">{resultLabel}</p>

      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <Button fullWidth variant="primary" onPress={() => { onEngage?.(); saveCalculation() }}>Сохранить расчет</Button>
        <Button fullWidth variant="outline" onPress={handleCopy}>Копировать результат</Button>
      </div>

      {copyStatus === 'ok' ? <p className="mt-2 text-sm text-emerald-600">Скопировано.</p> : null}
      {copyStatus === 'error' ? <p className="mt-2 text-sm text-rose-600">Не удалось скопировать.</p> : null}

      <div className="mt-8 flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-600">История</h3>
        {hasHistory ? <Button size="sm" variant="tertiary" onPress={clearSavedHistory}>Очистить</Button> : null}
      </div>

      {!hasHistory ? (
        <p className="mt-2 text-sm text-slate-500">Записей пока нет.</p>
      ) : (
        <ul className="mt-2 max-h-64 space-y-3 overflow-y-auto pr-1 text-sm">
          {history.map((item) => (
            <li key={item.id}>
              <Button fullWidth variant="tertiary" className="h-auto justify-start rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left hover:bg-slate-50" onPress={() => applyHistoryItem(item)}>
                <div className="w-full space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{getModeTitle(item.mode)}</p>
                  <p className="text-lg font-semibold text-slate-800">{formatDateRu(item.dateA)} {'→'} {formatDateRu(item.dateB)}</p>
                  <Separator />
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Разница</span>
                    <span className="font-semibold text-slate-800">{item.daysDiff} дн.</span>
                  </div>
                </div>
              </Button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
