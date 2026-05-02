import { useCallback, useMemo, useState } from 'react'

import { useLocalStorage } from '@/shared/lib/useLocalStorage'

import { getTodayDate } from './date-diff-utils'
import {
  DateDiffModes,
  buildShareText,
  getCalculationResult,
  getModeDescription,
} from './date-diff-modes'
import { getPresetDates } from './date-diff-presets'
import {
  addHistoryItem,
  historyStorageKey,
  type CalculationHistoryItem,
} from './history'

export type UseDateDiffResult = {
  mode: string
  dateA: string
  dateB: string
  daysDiff: number
  resultLabel: string
  history: CalculationHistoryItem[]
  setMode: (value: string) => void
  setDateA: (value: string) => void
  setDateB: (value: string) => void
  saveCalculation: () => void
  applyPreset: (preset: string) => void
  applyHistoryItem: (item: CalculationHistoryItem) => void
  clearSavedHistory: () => void
  copyShareText: () => Promise<boolean>
}

export const useDateDiff = ({
  initialMode,
  initialFrom,
  initialTo,
  onUrlSync,
}: {
  initialMode: string
  initialFrom: string
  initialTo: string
  onUrlSync: (nextMode: string, nextDateA: string, nextDateB: string) => void
}): UseDateDiffResult => {
  const today = useMemo(() => getTodayDate(), [])
  const [mode, setMode] = useState<string>(initialMode)
  const [dateA, setDateA] = useState<string>(initialFrom)
  const [dateB, setDateB] = useState<string>(initialTo)
  const [history, setHistory, clearHistoryState] =
    useLocalStorage<CalculationHistoryItem[]>(historyStorageKey, [])

  const daysDiff = useMemo(() => {
    return getCalculationResult({ mode, dateA, dateB, today })
  }, [dateA, dateB, mode, today])

  const resultLabel = useMemo(() => {
    return getModeDescription(mode, daysDiff)
  }, [daysDiff, mode])

  const saveCalculation = useCallback(() => {
    onUrlSync(mode, dateA, dateB)

    const newHistoryItem: CalculationHistoryItem = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
      mode,
      dateA,
      dateB,
      daysDiff,
      timestamp: new Date().toISOString(),
    }

    setHistory(addHistoryItem(newHistoryItem))
  }, [dateA, dateB, daysDiff, mode, onUrlSync, setHistory])

  const applyPreset = useCallback(
    (preset: string) => {
      if (preset === 'today') {
        const presetDates = getPresetDates(preset, today)
        setDateA(presetDates.dateA)
        setDateB(presetDates.dateB)
        return
      }

      if (mode === DateDiffModes.RANGE || mode === DateDiffModes.UNTIL) {
        const presetDates = getPresetDates(preset, dateB || today)
        setDateB(presetDates.dateB)
        return
      }

      const presetDates = getPresetDates(preset, dateA || today)
      setDateA(presetDates.dateB)
    },
    [dateA, dateB, mode, today],
  )

  const applyHistoryItem = useCallback(
    (item: CalculationHistoryItem) => {
      setMode(item.mode)
      setDateA(item.dateA)
      setDateB(item.dateB)
      onUrlSync(item.mode, item.dateA, item.dateB)
    },
    [onUrlSync],
  )

  const clearSavedHistory = useCallback(() => {
    clearHistoryState()
  }, [clearHistoryState])

  const copyShareText = useCallback(async () => {
    const text = buildShareText({ mode, dateA, dateB, daysDiff })

    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      return false
    }
  }, [dateA, dateB, daysDiff, mode])

  return {
    mode,
    dateA,
    dateB,
    daysDiff,
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
  }
}
