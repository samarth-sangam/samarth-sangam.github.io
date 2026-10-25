import type { NavPage } from "lib/navigation.ts";
import type { Content } from "lib/types.ts";

export type Command = { label: string; hint: string; href: string };

export const buildCommands = ({ profile, links = [], projects = [] }: Content, pages: NavPage[]): Command[] => [
  { label: "cd ~", hint: "home", href: "/" },
  ...pages.map(({ href, label }) => ({ label: `cd ~/${label}`, hint: "page", href })),
  ...(profile.email ? [{ label: "mail", hint: profile.email, href: `mailto:${profile.email}` }] : []),
  ...links.map((link) => ({ label: `open ${link.label.toLowerCase()}`, hint: "link", href: link.url })),
  ...projects.flatMap((project) =>
    project.url ? [{ label: `open ${project.name}`, hint: "project", href: project.url }] : []
  ),
];
