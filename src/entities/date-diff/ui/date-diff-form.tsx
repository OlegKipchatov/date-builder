"use client";

import { useDateDiff } from "../model/use-date-diff";

export type DateDiffFormProps = {
  className?: string;
};

export const DateDiffForm = ({ className }: DateDiffFormProps) => {
  const { dateA, dateB, daysDiff, setDateA, setDateB } = useDateDiff();

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
    </section>
  );
};
