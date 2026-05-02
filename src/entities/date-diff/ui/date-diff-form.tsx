"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  DatePicker,
  DateRangePicker,
  Divider,
  Tab,
  Tabs,
} from "@heroui/react";
import { parseDate, today as getToday } from "@internationalized/date";
import type { DateValue } from "@internationalized/date";
import type { RangeValue } from "@react-types/shared";

import { DateDiffModes } from "../model/date-diff-modes.mjs";
import { useDateDiff } from "../model/use-date-diff";

export type DateDiffFormProps = {
  className?: string;
  onEngage?: () => void;
};

const toRangeValue = (dateA: string, dateB: string): RangeValue<DateValue> | null => {
  if (!dateA || !dateB) {
    return null;
  }

  const [startDate, endDate] = dateA <= dateB ? [dateA, dateB] : [dateB, dateA];

  return {
    start: parseDate(startDate),
    end: parseDate(endDate),
  };
};

const toDateValue = (value: string): DateValue | null => {
  if (!value) {
    return null;
  }

  return parseDate(value);
};

const formatDateRu = (value: string): string => {
  const [year, month, day] = value.split("-");
  if (!year || !month || !day) {
    return value;
  }

  return `${day}/${month}/${year}`;
};

const getModeTitle = (mode: string): string => {
  if (mode === DateDiffModes.UNTIL) {
    return "До даты";
  }

  if (mode === DateDiffModes.SINCE) {
    return "С даты";
  }

  return "Между датами";
};

export const DateDiffForm = ({ className, onEngage }: DateDiffFormProps) => {
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
  } = useDateDiff();
  const [copyStatus, setCopyStatus] = useState<"idle" | "ok" | "error">("idle");
  const [isHydrated, setIsHydrated] = useState(false);

  const maxDateValue = useMemo(() => getToday("UTC").add({ years: 20 }), []);
  const hasHistory = isHydrated && history.length > 0;

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleRangeChange = (value: RangeValue<DateValue> | null) => {
    onEngage?.();
    if (!value) {
      return;
    }

    setDateA(value.start.toString());
    setDateB(value.end.toString());
  };

  const handleSingleDateChange = (value: DateValue | null, type: "from" | "to") => {
    onEngage?.();
    if (!value) {
      return;
    }

    if (type === "from") {
      setDateA(value.toString());
      return;
    }

    setDateB(value.toString());
  };

  const handleCopy = async () => {
    onEngage?.();
    const copied = await copyShareText();
    setCopyStatus(copied ? "ok" : "error");
  };

  return (
    <section
      className={`w-full ${className ?? ""}`}
      onFocusCapture={onEngage}
      onPointerDownCapture={onEngage}
    >
      <Tabs
        aria-label="Режим расчета"
        selectedKey={mode}
        onSelectionChange={(key) => {
          onEngage?.();
          setMode(String(key));
        }}
        color="primary"
      >
        <Tab key={DateDiffModes.RANGE} title="Между датами" />
        <Tab key={DateDiffModes.UNTIL} title="До даты" />
        <Tab key={DateDiffModes.SINCE} title="С даты" />
      </Tabs>

      {mode === DateDiffModes.RANGE ? (
        <DateRangePicker
          className="mt-4 w-full"
          label="Период"
          labelPlacement="outside"
          value={toRangeValue(dateA, dateB)}
          onChange={handleRangeChange}
          visibleMonths={2}
          maxValue={maxDateValue}
        />
      ) : mode === DateDiffModes.UNTIL ? (
        <DatePicker
          className="mt-4 w-full"
          label="Дата назначения"
          labelPlacement="outside"
          value={toDateValue(dateB)}
          onChange={(value) => handleSingleDateChange(value, "to")}
          maxValue={maxDateValue}
        />
      ) : (
        <DatePicker
          className="mt-4 w-full"
          label="Начальная дата"
          labelPlacement="outside"
          value={toDateValue(dateA)}
          onChange={(value) => handleSingleDateChange(value, "from")}
          maxValue={maxDateValue}
        />
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        <Button size="sm" variant="flat" onPress={() => { onEngage?.(); applyPreset("today"); }}>Сегодня</Button>
        <Button size="sm" variant="flat" onPress={() => { onEngage?.(); applyPreset("plus7"); }}>+7 дней</Button>
        <Button size="sm" variant="flat" onPress={() => { onEngage?.(); applyPreset("plus30"); }}>+30 дней</Button>
        <Button size="sm" variant="flat" onPress={() => { onEngage?.(); applyPreset("monthEnd"); }}>Конец месяца</Button>
      </div>

      <Card className="mt-4" shadow="none">
        <CardBody className="text-lg font-semibold">{resultLabel}</CardBody>
      </Card>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <Button color="primary" onPress={() => { onEngage?.(); saveCalculation(); }}>Сохранить расчет</Button>
        <Button variant="bordered" onPress={handleCopy}>Копировать результат</Button>
      </div>

      {copyStatus === "ok" ? <p className="mt-2 text-sm text-emerald-600">Скопировано.</p> : null}
      {copyStatus === "error" ? <p className="mt-2 text-sm text-rose-600">Не удалось скопировать.</p> : null}

      <div className="mt-8 flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-600">История</h3>
        {hasHistory ? (
          <Button size="sm" variant="light" onPress={clearSavedHistory}>Очистить</Button>
        ) : null}
      </div>

      {!hasHistory ? (
        <p className="mt-2 text-sm text-slate-500">Записей пока нет.</p>
      ) : (
        <ul className="mt-2 max-h-64 space-y-3 overflow-y-auto pr-1 text-sm">
          {history.map((item) => (
            <li key={item.id}>
              <Card
                isPressable
                shadow="none"
                onPress={() => applyHistoryItem(item)}
                className="w-full border border-slate-200 bg-white"
              >
                <CardBody className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {getModeTitle(item.mode)}
                  </p>
                  <p className="text-lg font-semibold text-slate-800">
                    {formatDateRu(item.dateA)} {"→"} {formatDateRu(item.dateB)}
                  </p>
                </CardBody>
                <Divider />
                <CardFooter className="justify-between text-slate-600">
                  <span>Разница</span>
                  <span className="font-semibold text-slate-800">{item.daysDiff} дн.</span>
                </CardFooter>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
