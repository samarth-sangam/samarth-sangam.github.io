"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

import CommandPalette from "components/command-palette/CommandPalette";
import { buildCommands } from "components/command-palette/commands";
import Footer from "components/layout/Footer";
import Header from "components/layout/Header";
import PageFlow from "components/layout/PageFlow";
import { SiteContext } from "components/ui/Terminal";
import { adjacentPages, navPages } from "lib/navigation.ts";
import { buildTheme } from "lib/theme.ts";
import type { Content } from "lib/types.ts";

type Props = { content: Content; buildYear: number; children: ReactNode };

// Chrome shared by every page: theme, header, footer and the ⌘K command palette.
const AppShell = ({ content, buildYear, children }: Props) => {
  const [theme] = useState(() => buildTheme(content.site.theme));
  const [paletteOpen, setPaletteOpen] = useState(false);
  const pages = navPages(content);
  const pathname = usePathname();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <ThemeProvider theme={theme} defaultMode="dark">
      <CssBaseline />
      <SiteContext.Provider value={content.site}>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Box className="grid-bg" />
        <Box sx={{ height: "100dvh", display: "flex", flexDirection: "column" }}>
          <Header user={content.site.user} pages={pages} onOpenPalette={() => setPaletteOpen(true)} />
          <PageFlow key={pathname} {...adjacentPages(pages, pathname)}>
            {children}
          </PageFlow>
          <Footer name={content.profile.name} year={buildYear} />
        </Box>
        <CommandPalette
          open={paletteOpen}
          onClose={() => setPaletteOpen(false)}
          commands={buildCommands(content, pages)}
        />
      </SiteContext.Provider>
    </ThemeProvider>
  );
};

export default AppShell;
