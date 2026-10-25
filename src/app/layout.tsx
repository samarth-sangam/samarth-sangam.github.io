import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import { JetBrains_Mono } from "next/font/google";

import AppShell from "components/layout/AppShell";
import { getContent } from "lib/content.ts";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "styles/globals.css";

const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export async function generateMetadata(): Promise<Metadata> {
  const { site } = await getContent();
  return {
    title: { default: site.title, template: `%s | ${site.title}` },
    description: site.description,
    manifest: "/manifest.json",
    icons: { icon: "/favicon.ico", apple: "/logo192.png" },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d1117",
  colorScheme: "dark light",
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const content = await getContent();
  return (
    <html lang="en" className={mono.variable} suppressHydrationWarning>
      <body>
        {/* Applies the saved scheme before paint to avoid a flash */}
        <InitColorSchemeScript attribute="class" defaultMode="dark" />
        <AppRouterCacheProvider>
          <AppShell content={content} buildYear={new Date().getFullYear()}>
            {children}
          </AppShell>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
};

export default RootLayout;
