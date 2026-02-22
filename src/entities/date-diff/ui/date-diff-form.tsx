"use client";

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
  const { dateA, dateB, daysDiff, history, setDateA, setDateB, saveCalculation } =
    useDateDiff();

  return (
    <section className={className}>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium">Date A</span>
          <input
            type="date"
            value={dateA}
            onChange={(event) => setDateA(event.target.value)}
            className="rounded-md border border-slate-300 px-3 py-2"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium">Date B</span>
          <input
            type="date"
            value={dateB}
            onChange={(event) => setDateB(event.target.value)}
            className="rounded-md border border-slate-300 px-3 py-2"
          />
        </label>
      </div>

      <div className="mt-4 rounded-md bg-slate-100 p-4 text-lg font-semibold">
        Difference: {daysDiff} day(s)
      </div>

      <button
        type="button"
        onClick={saveCalculation}
        className="mt-4 w-full rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
      >
        Вычислить
      </button>

      <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-slate-600">
        История
      </h3>

      {history.length === 0 ? (
        <p className="mt-2 text-sm text-slate-500">Записей пока нет.</p>
      ) : (
        <ul className="mt-2 space-y-3 text-sm">
          {history.map((item) => (
            <li key={item.id} className="rounded-md border border-slate-200 bg-white p-3">
              <p className="font-medium text-slate-700">
                {formatDateForHistory(item.dateA)} → {formatDateForHistory(item.dateB)}
              </p>
              <div className="my-2 h-px bg-slate-200" />
              <p className="text-slate-600">Разница: {item.daysDiff} day(s)</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
