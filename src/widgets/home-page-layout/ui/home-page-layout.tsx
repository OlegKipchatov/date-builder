import { DateDiffForm } from "@/src/entities/date-diff";
import { Suspense, type ReactNode } from "react";

export type HomePageLayoutProps = {
  children?: ReactNode;
};

export const HomePageLayout = ({ children }: HomePageLayoutProps) => {
  return (
    <main className="min-h-screen">
      <div className="mx-auto w-full max-w-7xl p-6">
        <h1 className="text-3xl font-bold">Разница в днях</h1>

        <Suspense fallback={<div className="mx-auto mt-6 max-w-xl" />}>
          <DateDiffForm className="mx-auto mt-6 max-w-xl" />
        </Suspense>

        {children}
      </div>
    </main>
  );
};
