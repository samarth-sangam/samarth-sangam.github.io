"use client";

import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import Typed from "components/ui/Typed";
import { LinkIconFor } from "components/ui/icons";
import { Prompt, TerminalWindow } from "components/ui/Terminal";
import type { Profile, Site, SiteLink } from "lib/types.ts";

const Line = ({ command, children }: { command: string; children: ReactNode }) => (
  <Box sx={{ mb: 2 }}>
    <Typography aria-hidden sx={{ color: "text.secondary" }}>
      <Prompt /> {command}
    </Typography>
    {children}
  </Box>
);

type HeroProps = { profile: Profile; links: SiteLink[]; site: Site; years: number };

const Hero = ({ profile, links, site, years }: HeroProps) => {
  const roles = profile.typed ?? [profile.role];
  return (
  <Container
    maxWidth="md"
    sx={{ display: "flex", alignItems: "center", py: 4 }}
  >
    <TerminalWindow title={`${site.user}@${site.host}: ~`} sx={{ width: "100%" }}>
      <Line command="whoami">
        <Typography
          component="h1"
          sx={{
            fontSize: { xs: "2.25rem", sm: "3.5rem" },
            fontWeight: 800,
            lineHeight: 1.1,
            my: 1,
            background: (t) =>
              `linear-gradient(90deg, ${(t.vars ?? t).palette.primary.main}, ${(t.vars ?? t).palette.secondary.main})`,
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {profile.name}
        </Typography>
      </Line>
      <Line command="cat role.txt">
        <Typography variant="h6" component="p" sx={{ minHeight: "2em" }}>
          <span className="sr-only">{roles.join(". ")}</span>
          <Typed strings={roles} typeSpeed={45} backSpeed={30} backDelay={1500} loop />
        </Typography>
      </Line>
      <Line command="uptime">
        <Typography>
          {years}+ years building web applications · {profile.location}
        </Typography>
      </Line>
      <Line command="ls ~/links">
        <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
          {links.map((link) => (
            <Tooltip key={link.url} title={link.label}>
              <IconButton
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${link.label} (opens in new tab)`}
                sx={{
                  border: 1,
                  borderColor: "divider",
                  transition: "transform .2s, color .2s, border-color .2s",
                  "&:hover": { transform: "translateY(-3px)", color: "primary.main", borderColor: "primary.main" },
                }}
              >
                <LinkIconFor icon={link.icon} />
              </IconButton>
            </Tooltip>
          ))}
        </Box>
      </Line>
      <Typography aria-hidden sx={{ color: "text.secondary" }}>
        <Prompt /> <span className="cursor" />
      </Typography>
    </TerminalWindow>
  </Container>
  );
};

export default Hero;
