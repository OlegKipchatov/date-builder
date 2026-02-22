import { DateDiffForm } from "@/src/entities/date-diff";
import { Suspense, type ReactNode } from "react";

export type HomePageLayoutProps = {
  children?: ReactNode;
};

export const HomePageLayout = ({ children }: HomePageLayoutProps) => {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-7xl p-6">
        <Suspense fallback={<div className="mx-auto max-w-xl" />}>
          <DateDiffForm className="mx-auto max-w-xl" />
        </Suspense>
        {children}
      </div>
    </main>
  );
};
