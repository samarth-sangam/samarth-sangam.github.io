import { createContext, useContext, type ReactNode } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import type { SxProps, Theme } from "@mui/material/styles";

import type { Site } from "lib/types.ts";

export const SiteContext = createContext<Pick<Site, "user" | "host">>({ user: "user", host: "portfolio" });
const useSite = () => useContext(SiteContext);

// Decorative shell prompt; hidden from assistive tech, callers provide the meaning in text.
export const Prompt = () => {
  const { user, host } = useSite();
  return (
    <Box component="span" aria-hidden sx={{ whiteSpace: "nowrap" }}>
      <Box component="span" sx={{ color: "primary.main" }}>
        {user}@{host}
      </Box>
      :
      <Box component="span" sx={{ color: "secondary.main" }}>~</Box>$
    </Box>
  );
};

export const TerminalWindow = ({ title, children, sx }: { title: string; children: ReactNode; sx?: SxProps<Theme> }) => (
  <Box
    sx={[
      {
        border: 1,
        borderColor: "divider",
        borderRadius: 2,
        bgcolor: "background.paper",
        boxShadow: "0 20px 60px rgba(0,0,0,.25)",
        overflow: "hidden",
      },
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}
  >
    <Box
      aria-hidden
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        px: 2,
        py: 1,
        borderBottom: 1,
        borderColor: "divider",
        bgcolor: "action.hover",
      }}
    >
      {["#ff5f56", "#ffbd2e", "#27c93f"].map((color) => (
        <Box key={color} sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: color }} />
      ))}
      <Typography variant="caption" sx={{ ml: 1, color: "text.secondary" }}>
        {title}
      </Typography>
    </Box>
    <Box sx={{ p: { xs: 2, sm: 3 } }}>{children}</Box>
  </Box>
);

// Page body. The visible h1 is a shell command; screen readers get the plain title instead.
export const Section = ({ title, command, children }: { title: string; command: string; children: ReactNode }) => (
  <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
    <Typography component="h1" variant="h6" sx={{ mb: 4, fontWeight: 400 }}>
      <span className="sr-only">{title}</span>
      <span aria-hidden>
        <Prompt /> {command}
      </span>
    </Typography>
    <Box className="reveal">{children}</Box>
  </Container>
);

export const NewTab = () => <span className="sr-only"> (opens in new tab)</span>;

export const Tag = ({ children }: { children: ReactNode }) => (
  <Box
    component="span"
    sx={{
      px: 1,
      py: 0.25,
      fontSize: "0.75rem",
      border: 1,
      borderColor: "divider",
      borderRadius: 1,
      color: "secondary.main",
      whiteSpace: "nowrap",
    }}
  >
    {children}
  </Box>
);
