"use client";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  DateRangePicker,
  Divider,
} from "@heroui/react";
import { parseDate, type DateValue } from "@internationalized/date";
import type { RangeValue } from "@react-types/shared";
import { useState } from "react";

import { useDateDiff } from "../model/use-date-diff";

export type DateDiffFormProps = {
  className?: string;
};

const formatDateForHistory = (value: string): string => {
  const [year, month, day] = value.split("-");

  if (!year || !month || !day) {
    return value;
  }

  return `${Number(day)}.${Number(month)}.${year}`;
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

export const DateDiffForm = ({ className }: DateDiffFormProps) => {
  const {
    dateA,
    dateB,
    daysDiff,
    history,
    setDateA,
    setDateB,
    saveCalculation,
    applyHistoryItem,
    clearSavedHistory,
  } = useDateDiff();
  const [isReverseOrder, setIsReverseOrder] = useState<boolean>(dateA > dateB);

  const handleDateRangeChange = (value: RangeValue<DateValue> | null) => {
    if (!value) {
      return;
    }

    const startValue = value.start.toString();
    const endValue = value.end.toString();

    if (isReverseOrder) {
      setDateA(endValue);
      setDateB(startValue);

      return;
    }

    setDateA(startValue);
    setDateB(endValue);
  };

  const handleReverseOrderToggle = () => {
    setIsReverseOrder((current) => !current);
    setDateA(dateB);
    setDateB(dateA);
  };

  return (
    <section className={className}>
      <DateRangePicker
        label="Date range"
        aria-label="Date range"
        labelPlacement="outside"
        value={toRangeValue(dateA, dateB)}
        onChange={handleDateRangeChange}
        visibleMonths={2}
      />

      <Button className="mt-3" variant="light" onPress={handleReverseOrderToggle}>
        {isReverseOrder ? "Порядок: B → A" : "Порядок: A → B"}
      </Button>

      <Card className="mt-4" shadow="none">
        <CardBody className="text-lg font-semibold">
          Difference: {daysDiff} day(s)
        </CardBody>
      </Card>

      <Button className="mt-4 w-full" color="primary" onPress={saveCalculation}>
        Вычислить
      </Button>

      <div className="mt-6 flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-600">
          История
        </h3>

        {history.length > 0 ? (
          <Button size="sm" variant="light" onPress={clearSavedHistory}>
            Очистить
          </Button>
        ) : null}
      </div>

      {history.length === 0 ? (
        <p className="mt-2 text-sm text-slate-500">Записей пока нет.</p>
      ) : (
        <ul className="mt-2 space-y-3 text-sm">
          {history.map((item) => (
            <li key={item.id}>
              <Card
                isPressable
                onPress={() => applyHistoryItem(item)}
                className="w-full"
              >
                <CardBody className="font-medium text-slate-700">
                  {formatDateForHistory(item.dateA)} → {formatDateForHistory(item.dateB)}
                </CardBody>
                <Divider />
                <CardFooter className="text-slate-600">
                  Разница: {item.daysDiff} day(s)
                </CardFooter>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
