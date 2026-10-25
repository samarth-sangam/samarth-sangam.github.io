"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { SkillLogo } from "components/ui/icons";
import { Section, Tag } from "components/ui/Terminal";
import type { Skill } from "lib/types.ts";

const Skills = ({ skills }: { skills: Skill[] }) => (
  <Section title="Skills" command="ls ~/skills">
    <Box
      component="ul"
      sx={{
        listStyle: "none",
        p: 0,
        m: 0,
        display: "grid",
        gap: 2,
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
      }}
    >
      {skills.map((skill) => (
        <Box
          component="li"
          key={skill.name}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1.5,
            p: 2,
            border: 1,
            borderColor: "divider",
            borderRadius: 2,
            bgcolor: "background.paper",
            transition: "transform .2s, border-color .2s, box-shadow .2s",
            "&:hover": {
              transform: "translateY(-4px)",
              borderColor: "primary.main",
              boxShadow: (t) => `0 0 24px ${t.alpha((t.vars ?? t).palette.primary.main, 0.2)}`,
            },
          }}
        >
          <SkillLogo logo={skill.logo} faIcon={skill.faIcon} color={skill.color} />
          <Typography variant="body2" sx={{ fontWeight: 700 }}>
            {skill.name}
          </Typography>
          {skill.items && skill.items.length > 0 && (
            <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 0.75 }}>
              {skill.items.map((item) => <Tag key={item}>{item}</Tag>)}
            </Box>
          )}
        </Box>
      ))}
    </Box>
  </Section>
);

export default Skills;
