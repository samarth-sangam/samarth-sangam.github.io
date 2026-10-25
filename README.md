# Samarth Sangam | Portfolio

A terminal-themed developer portfolio, live at **https://samarth-sangam.github.io**.

Built with Next.js (static export), React and MUI, and deployed to GitHub Pages. All content comes from a single [`content.yml`](content.yml), so updating the site needs no code changes.

## Features

- **One-screen pages**: Home, About, Skills, Experience, Projects, Blog and Contact. Each page's content scrolls in place. Scroll past the top or bottom to move to the previous or next page.
- **⌘K / Ctrl+K command palette** to jump to any page, project or link.
- **Dark and light themes**, saved per visitor, with no flash on load.
- **Projects** are the repos pinned on the GitHub profile, fetched at build time.
- **Blog** shows the latest Medium posts, fetched at build time.
- **Accessible**: has a skip link, landmarks and visible keyboard focus, and respects reduced-motion settings. Checked with axe against WCAG 2.2 AA.

## Quick start

Requires Node ≥ 20.9.

```sh
npm install
npm run dev      # http://localhost:3000
```

| Script              | What it does                                  |
| ------------------- | --------------------------------------------- |
| `npm run dev`       | Dev server with hot reload                    |
| `npm run build`     | Static site in `out/`                         |
| `npm start`         | Serve `out/` locally                          |
| `npm run check`     | Lint, type check and unit tests (run by CI)   |

## Editing content

Edit [`content.yml`](content.yml), then push to `main`. Any section you leave empty or remove is hidden from the page, the navigation and the ⌘K palette.

| Key          | Drives                                                        |
| ------------ | ------------------------------------------------------------- |
| `site`       | Title, description, terminal prompt and theme colours         |
| `profile`    | Name, role, typed headline and About text                     |
| `links`      | Social links (`linkedin`, `github`, `medium`, `email`, `website`) |
| `skills`     | Skill cards: SVG logo from `src/assets/icons` or a Font Awesome icon |
| `experience` | Career timeline, newest first                                 |
| `github`     | GitHub username whose **pinned repos** become Projects        |
| `blog`       | Medium username and number of posts                           |
| `contact`    | Contact heading and message                                   |

### Projects and the GitHub token

GitHub only exposes pinned repos through its GraphQL API, which requires a token. The token is used only during the build and is never included in the published site.

- **CI** uses the workflow's built-in `GITHUB_TOKEN` (read-only).
- **Locally**, the build uses your [GitHub CLI](https://cli.github.com) login (`gh auth login`), or a `GITHUB_TOKEN` environment variable if you set one.
- **Without a token**, the build prints a warning and hides the Projects section.

A card's text comes from the repo itself: its description, languages, topics and website field. Edit those on GitHub to change it.

## Project structure

```
content.yml              All site content
src/app/                 One route per page (App Router, statically exported)
src/components/layout/   App shell, header, footer, page flow (scroll paging)
src/components/sections/ Page sections (Hero, About, Skills, ...)
src/components/ui/       Shared building blocks (terminal window, icons, typed text)
src/components/command-palette/
src/lib/                 Content loading, GitHub and Medium fetchers, navigation, theme
src/lib/__tests__/       Unit tests (node:test)
```

## Deployment

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) runs on every push to `main`. It runs `npm ci`, `npm run check` and `npm run build`, makes sure the token is not in `out/`, and then deploys `out/` to GitHub Pages. Each job gets only the permissions it needs.

Pinned repos and Medium posts are fetched during the build. Pinning a repo or publishing a post shows up after the next deploy, which you can start manually from the Actions tab.

## Tech stack

Next.js 16 · React 19 · MUI 9 · TypeScript 7 · ESLint 9 · typed.js · GitHub Actions · GitHub Pages
