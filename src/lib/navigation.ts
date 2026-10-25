import type { Content } from "./types.ts";

export type NavPage = { href: string; label: string };

// Every routed section; add a page folder under src/app and a line here.
const PAGES: (NavPage & { hasContent: (content: Content) => boolean })[] = [
  { href: "/about", label: "about", hasContent: (c) => !!c.profile.about },
  { href: "/skills", label: "skills", hasContent: (c) => !!c.skills?.length },
  { href: "/experience", label: "experience", hasContent: (c) => !!c.experience?.length },
  { href: "/projects", label: "projects", hasContent: (c) => !!c.projects?.length },
  { href: "/blog", label: "blog", hasContent: (c) => !!c.blog?.medium },
  { href: "/contact", label: "contact", hasContent: () => true },
];

export const navPages = (content: Content): NavPage[] =>
  PAGES.filter((page) => page.hasContent(content)).map(({ href, label }) => ({ href, label }));

const normalize = (path: string) => path.replace(/\/+$/, "") || "/";

// Pathnames carry a trailing slash (trailingSlash: true); hrefs don't.
export const isCurrent = (pathname: string, href: string) => normalize(pathname) === normalize(href);

export const adjacentPages = (pages: NavPage[], pathname: string): { prev?: NavPage; next?: NavPage } => {
  const order = [{ href: "/", label: "home" }, ...pages];
  const index = order.findIndex((page) => isCurrent(pathname, page.href));
  return index === -1 ? {} : { prev: order[index - 1], next: order[index + 1] };
};
