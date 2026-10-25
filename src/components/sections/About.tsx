"use client";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { Section } from "components/ui/Terminal";
import type { Profile } from "lib/types.ts";

const About = ({ profile }: { profile: Profile }) => (
  <Section title="About" command="cat about.md">
    <Box sx={{ display: "flex", gap: 4, alignItems: "center", flexDirection: { xs: "column", sm: "row" } }}>
      {/* Decorative: the name is already the page heading. */}
      <Avatar
        src={profile.avatar}
        alt=""
        aria-hidden
        sx={{ width: 140, height: 140, fontSize: 48, border: 2, borderColor: "primary.main" }}
      >
        {profile.name.split(" ").map((part) => part[0]).join("")}
      </Avatar>
      <Box>
        {(profile.about ?? "").trim().split(/\n\s*\n/).map((paragraph) => (
          <Typography key={paragraph} sx={{ mb: 2, lineHeight: 1.8 }}>
            {paragraph}
          </Typography>
        ))}
      </Box>
    </Box>
  </Section>
);

export default About;
