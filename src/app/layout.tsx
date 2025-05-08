"use client";
import "../styles/globals.css";
import { Toaster } from "sonner";
import { Suspense } from "react";
import StoreProvider from "./providers/StoreProvider";
import { ThemeProvider } from "./providers/ThemeProvider";
import { ThemeModeScript } from "flowbite-react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head>
        <ThemeModeScript />

        <title>..::Shenatech::..</title>
        <link rel="icon" type="image/x-icon" href="/shenatech_logo_icon.png" />
      </head>
      <body>
        <StoreProvider>
          <ThemeProvider>
            <Toaster />
            <Suspense>{children}</Suspense>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
