"use client";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  DateRangePicker,
} from "@heroui/react";
import { parseDate, type DateValue } from "@internationalized/date";
import type { RangeValue } from "@react-types/shared";

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

const toRangeValue = (
  dateA: string,
  dateB: string,
): RangeValue<DateValue> | null => {
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
  const handleDateRangeChange = (value: RangeValue<DateValue> | null) => {
    if (!value) {
      return;
    }

    setDateA(value.start.toString());
    setDateB(value.end.toString());
  };

  const handleHistoryItemPress = (item: (typeof history)[number]) => {
    applyHistoryItem(item);

    if (typeof window === "undefined") {
      return;
    }

    const formElement = document.getElementById("date-diff-form");
    formElement?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="date-diff-form" className={className}>
      <div className="flex items-end gap-3">
        <DateRangePicker
          label="Диапазон дат"
          aria-label="Диапазон дат"
          labelPlacement="outside"
          value={toRangeValue(dateA, dateB)}
          onChange={handleDateRangeChange}
          visibleMonths={2}
          className="flex-1"
        />

        <Card shadow="none">
          <CardBody className="p-0 text-lg font-semibold">
            Разница: {daysDiff} дн.
          </CardBody>
        </Card>

        <Button color="primary" onPress={saveCalculation}>
          Вычислить
        </Button>
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <h3 className="text-2xl font-bold text-slate-800">
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
                isHoverable
                isPressable
                onPress={() => handleHistoryItemPress(item)}
                className="w-full"
              >
                <CardBody className="font-medium text-slate-700">
                  {formatDateForHistory(item.dateA)} →{" "}
                  {formatDateForHistory(item.dateB)}
                </CardBody>
                <CardFooter className="text-slate-600">
                  Разница: {item.daysDiff} дн.
                </CardFooter>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
