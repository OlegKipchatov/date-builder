import type { ReactNode } from "react";

export type HomePageLayoutProps = {
  children?: ReactNode;
};

export const HomePageLayout = ({ children }: HomePageLayoutProps) => {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-7xl p-6">{children}</div>
    </main>
  );
};
