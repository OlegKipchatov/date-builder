"use client";

import { DateDiffForm } from "@/src/entities/date-diff";
import { Suspense, type ReactNode, useCallback, useRef } from "react";

export type HomePageLayoutProps = {
  children?: ReactNode;
};

export const HomePageLayout = ({ children }: HomePageLayoutProps) => {
  const calculatorSectionRef = useRef<HTMLElement | null>(null);
  const hasAutoScrolledRef = useRef(false);

  const handleEngage = useCallback(() => {
    if (hasAutoScrolledRef.current) {
      return;
    }

    hasAutoScrolledRef.current = true;
    window.setTimeout(() => {
      calculatorSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 120);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-sky-50 text-slate-900">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <section className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">Date Builder</p>
          <h1 className="text-4xl font-black leading-tight sm:text-5xl">Калькулятор разницы дат</h1>
          <p className="max-w-3xl text-lg text-slate-600">Считайте дни между датами, до события и с выбранной даты. Сохраняйте историю локально и делитесь результатом за один клик.</p>
        </section>

        <section ref={calculatorSectionRef} className="mt-10">
          <Suspense fallback={<div className="h-[420px]" />}>
            <DateDiffForm className="mx-auto max-w-4xl" onEngage={handleEngage} />
          </Suspense>
        </section>
        {children}
      </div>
    </main>
  );
};
