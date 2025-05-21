"use client";
import "../styles/globals.css";
import { Toaster } from "sonner";
import { Suspense } from "react";
import StoreProvider from "./providers/StoreProvider";
import { ThemeModeScript, ThemeProvider } from "flowbite-react";
import { ManageTheme } from "@/theme/ManageTheme";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";

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
      <body suppressHydrationWarning>
        <StoreProvider>
          <ThemeProvider
            theme={ManageTheme}
            applyTheme={{
              table: "replace",
              button: "replace",
              drawer: "replace",
              sidebar: "replace",
              modal: "replace",
              alert: "replace",
              textInput: "replace",
              label: "replace",
              spinner: "replace",
              dropdown: "replace",
              pagination:"replace",
              select:"replace",
            }}
          >
            <Toaster />
            <Suspense fallback={<LoadingSkeleton />}>{children}</Suspense>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
