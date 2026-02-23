"use client";

import { Button, Card, CardBody, Divider, Input } from "@heroui/react";

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

  return (
    <section className={className}>
      <div className="grid gap-4 md:grid-cols-2">
        <Input
          label="Date A"
          labelPlacement="outside"
          type="date"
          value={dateA}
          onValueChange={setDateA}
        />

        <Input
          label="Date B"
          labelPlacement="outside"
          type="date"
          value={dateB}
          onValueChange={setDateB}
        />
      </div>

      <Card className="mt-4" shadow="sm">
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
              <Card isPressable onPress={() => applyHistoryItem(item)} shadow="none">
                <CardBody className="rounded-md border border-slate-200 bg-white p-3">
                  <p className="font-medium text-slate-700">
                    {formatDateForHistory(item.dateA)} → {formatDateForHistory(item.dateB)}
                  </p>
                  <Divider className="my-2" />
                  <p className="text-slate-600">Разница: {item.daysDiff} day(s)</p>
                </CardBody>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
