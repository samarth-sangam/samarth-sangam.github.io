import assert from "node:assert/strict";
import { test } from "node:test";

import { toProjects } from "../github.ts";

test("maps pinned repos to projects, dropping non-https links", () => {
  const [project] = toProjects([
    {
      name: "chat-app",
      description: null,
      url: "https://github.com/u/chat-app",
      homepageUrl: "javascript:alert(1)",
      languages: { nodes: [{ name: "JavaScript" }] },
      repositoryTopics: { nodes: [{ topic: { name: "socket-io" } }, { topic: { name: "javascript" } }] },
    },
  ]);
  assert.deepEqual(project, {
    name: "chat-app",
    description: "",
    stack: ["JavaScript", "socket-io"],
    github: "https://github.com/u/chat-app",
    url: undefined,
  });
});
