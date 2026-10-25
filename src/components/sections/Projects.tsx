"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import GitHubIcon from "@mui/icons-material/GitHub";
import LaunchIcon from "@mui/icons-material/Launch";

import { Section, Tag, TerminalWindow } from "components/ui/Terminal";
import type { Project } from "lib/types.ts";

const Projects = ({ projects }: { projects: Project[] }) => (
  <Section title="Projects" command="ls ~/projects">
    <Box sx={{ display: "grid", gap: 3, gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" } }}>
      {projects.map((project) => (
        <TerminalWindow
          key={project.name}
          title={`~/projects/${project.name.toLowerCase().replace(/\s+/g, "-")}`}
          sx={{
            display: "flex",
            flexDirection: "column",
            transition: "transform .2s, border-color .2s",
            "&:hover": { transform: "translateY(-4px)", borderColor: "primary.main" },
            "& > :last-child": { flex: 1, display: "flex", flexDirection: "column" },
          }}
        >
          <Typography variant="h6" component="h2" sx={{ color: "primary.main" }}>
            {project.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", my: 1.5, flex: 1 }}>
            {project.description}
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
            {project.stack?.map((item) => <Tag key={item}>{item}</Tag>)}
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            {project.github && (
              <Button size="small" startIcon={<GitHubIcon />} href={project.github} target="_blank" rel="noopener noreferrer"
                aria-label={`${project.name} source code (opens in new tab)`}>
                source
              </Button>
            )}
            {project.url && (
              <Button size="small" startIcon={<LaunchIcon />} href={project.url} target="_blank" rel="noopener noreferrer"
                aria-label={`${project.name} live demo (opens in new tab)`}>
                live
              </Button>
            )}
          </Box>
        </TerminalWindow>
      ))}
    </Box>
  </Section>
);

export default Projects;
