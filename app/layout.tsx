import type { Metadata, Viewport } from "next";
import { Providers } from "@/components/providers";
import type { ReactNode } from "react";
import "./globals.css";

export type RootLayoutProps = {
  children: ReactNode;
};

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Разница в днях",
  description: "Приложение для расчёта разницы между датами",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
