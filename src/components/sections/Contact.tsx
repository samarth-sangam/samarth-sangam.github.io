"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SendIcon from "@mui/icons-material/Send";

import { LinkIconFor } from "components/ui/icons";
import { NewTab, Section, TerminalWindow } from "components/ui/Terminal";
import type { Content, Profile, SiteLink } from "lib/types.ts";

type ContactProps = { profile: Profile; links: SiteLink[]; contact: Content["contact"] };

const Contact = ({ profile, links, contact }: ContactProps) => (
  <Section title="Contact" command={profile.email ? `mail ${profile.email}` : "ping"}>
    <TerminalWindow title="contact" sx={{ maxWidth: 720, mx: "auto", textAlign: "center" }}>
      <Typography variant="h5" component="p" sx={{ mb: 1, fontWeight: 700 }}>
        {contact?.heading}
      </Typography>
      <Typography sx={{ color: "text.secondary", mb: 3 }}>{contact?.message}</Typography>
      {profile.email && (
        <Button variant="contained" size="large" startIcon={<SendIcon />} href={`mailto:${profile.email}`} sx={{ mb: 3 }}>
          Say hello
        </Button>
      )}
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 1 }}>
        {links.map((link) => (
          <Button
            key={link.url}
            variant="outlined"
            color="secondary"
            startIcon={<LinkIconFor icon={link.icon} />}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.label}
            <NewTab />
          </Button>
        ))}
      </Box>
    </TerminalWindow>
  </Section>
);

export default Contact;
