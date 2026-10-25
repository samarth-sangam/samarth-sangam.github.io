"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { Section, Tag } from "components/ui/Terminal";
import type { Role as RoleData } from "lib/types.ts";

const Role = ({ role, current }: { role: RoleData; current: boolean }) => (
  <Box component="li" sx={{ position: "relative", pl: 4, pb: 5 }}>
    <Box
      aria-hidden
      sx={{
        position: "absolute",
        left: -7,
        top: 6,
        width: 12,
        height: 12,
        borderRadius: "50%",
        bgcolor: current ? "primary.main" : "background.default",
        border: 2,
        borderColor: "primary.main",
        boxShadow: current ? (t) => `0 0 0 4px ${t.alpha((t.vars ?? t).palette.primary.main, 0.2)}` : "none",
      }}
    />
    <Typography variant="caption" sx={{ color: "secondary.main" }}>
      {role.period}
    </Typography>
    <Typography variant="h6" component="h2">
      {role.title}{" "}
      <Box component="span" sx={{ color: "text.secondary" }}>
        @ {role.company}
      </Box>
    </Typography>
    {role.summary && (
      <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
        {role.summary}
      </Typography>
    )}
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1.5 }}>
      {role.stack?.map((item) => <Tag key={item}>{item}</Tag>)}
    </Box>
  </Box>
);

const Experience = ({ experience }: { experience: RoleData[] }) => (
  <Section title="Experience" command="git log --career">
    <Box component="ol" sx={{ listStyle: "none", m: 0, p: 0, ml: 1, borderLeft: 2, borderColor: "divider" }}>
      {experience.map((role, i) => (
        <Role key={`${role.company}-${role.title}`} role={role} current={i === 0} />
      ))}
    </Box>
  </Section>
);

export default Experience;
