import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { cache } from "react";
import { parse } from "yaml";
import type { Content } from "./types.ts";

// ponytail: trusted build-time config, cast without runtime validation; add a schema (zod) if non-devs edit it.
export const getContent = cache(
  async () => parse(await readFile(join(process.cwd(), "content.yml"), "utf8")) as Content
);
