import { execFileSync } from "node:child_process";
import type { Project } from "./types.ts";

const QUERY = `query($login: String!) {
  user(login: $login) {
    pinnedItems(first: 6, types: REPOSITORY) {
      nodes {
        ... on Repository {
          name
          description
          url
          homepageUrl
          languages(first: 5, orderBy: { field: SIZE, direction: DESC }) { nodes { name } }
          repositoryTopics(first: 10) { nodes { topic { name } } }
        }
      }
    }
  }
}`;

interface Repo {
  name: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  languages: { nodes: { name: string }[] };
  repositoryTopics: { nodes: { topic: { name: string } }[] };
}

const https = (url: string | null) => (url && /^https:\/\//.test(url) ? url : undefined);

// Topics are lowercase ("javascript"), languages are not ("JavaScript").
const uniqueIgnoreCase = (names: string[]) => {
  const seen = new Set<string>();
  return names.filter((n) => !seen.has(n.toLowerCase()) && seen.add(n.toLowerCase()));
};

export const toProjects = (repos: Repo[]): Project[] =>
  repos.map((repo) => ({
    name: repo.name,
    description: repo.description ?? "",
    stack: uniqueIgnoreCase([...repo.languages.nodes.map((l) => l.name), ...repo.repositoryTopics.nodes.map((t) => t.topic.name)]),
    github: https(repo.url),
    url: https(repo.homepageUrl),
  }));

// Pinned items are GraphQL-only, so a token is required: Actions provides GITHUB_TOKEN, locally the gh CLI's login is used.
const githubToken = () => {
  if (process.env.GITHUB_TOKEN) return process.env.GITHUB_TOKEN;
  try {
    return execFileSync("gh", ["auth", "token"], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
  } catch {
    throw new Error("set GITHUB_TOKEN or run `gh auth login`");
  }
};

export async function fetchPinnedRepos(login: string): Promise<Project[]> {
  try {
    const token = githubToken();
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: { Authorization: `bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ query: QUERY, variables: { login } }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const { data, errors } = await res.json();
    if (errors?.length) throw new Error(errors[0].message);
    return toProjects(data.user.pinnedItems.nodes);
  } catch (err) {
    console.warn(`GitHub pinned repos unavailable, projects section hidden: ${(err as Error).message}`);
    return [];
  }
}
