import test from "node:test";
import assert from "node:assert/strict";
import { adjacentPages, isCurrent, navPages } from "../navigation.ts";
import type { Content } from "../types.ts";

const content = {
  site: { title: "t", description: "d", user: "u", host: "h" },
  profile: { name: "n", role: "r", location: "l", careerStart: 2019, about: "hi" },
  skills: [],
  projects: [{ name: "p", description: "d" }],
} satisfies Content;

test("lists only pages that have content", () => {
  assert.deepEqual(
    navPages(content).map((page) => page.href),
    ["/about", "/projects", "/contact"]
  );
});

test("matches the current page with or without a trailing slash", () => {
  assert.ok(isCurrent("/about/", "/about"));
  assert.ok(isCurrent("/about", "/about"));
  assert.ok(!isCurrent("/", "/about"));
  assert.ok(isCurrent("/", "/"));
});

test("adjacent pages follow home, then nav order, with no wrap-around", () => {
  const pages = navPages(content);
  assert.deepEqual(adjacentPages(pages, "/"), { prev: undefined, next: pages[0] });
  assert.equal(adjacentPages(pages, "/about/").prev?.href, "/");
  assert.equal(adjacentPages(pages, "/about/").next?.href, "/projects");
  assert.equal(adjacentPages(pages, "/contact/").next, undefined);
  assert.deepEqual(adjacentPages(pages, "/unknown/"), {});
});
