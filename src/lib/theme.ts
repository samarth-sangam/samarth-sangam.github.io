import { createTheme } from "@mui/material/styles";
import type { Site } from "./types.ts";

export const buildTheme = ({ dark = {}, light = {} }: NonNullable<Site["theme"]> = {}) =>
  createTheme({
    cssVariables: { colorSchemeSelector: "class" },
    defaultColorScheme: "dark",
    colorSchemes: {
      dark: {
        palette: {
          primary: { main: dark.primary ?? "#3fb950" },
          secondary: { main: dark.secondary ?? "#58a6ff" },
          background: { default: "#0d1117", paper: "#161b22" },
          divider: "rgba(240,246,252,.12)",
        },
      },
      light: {
        palette: {
          primary: { main: light.primary ?? "#1a7f37" },
          secondary: { main: light.secondary ?? "#0969da" },
          background: { default: "#ffffff", paper: "#f6f8fa" },
          divider: "rgba(31,35,40,.15)",
        },
      },
    },
    typography: { fontFamily: "var(--font-mono), ui-monospace, monospace" },
    shape: { borderRadius: 8 },
  });
