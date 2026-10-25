import type { Post } from "./types.ts";

const ENTITIES: Record<string, string> = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'" };
const decode = (text: string) => text.replace(/&(amp|lt|gt|quot|#39);/g, (e) => ENTITIES[e] ?? e);

const tags = (xml: string, name: string): string[] =>
  [...xml.matchAll(new RegExp(`<${name}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${name}>`, "g"))].map(
    ([, value = ""]) => decode(value.trim())
  );

// ponytail: regex RSS parsing, fine for Medium's flat feed; swap for an XML parser if the source changes.
export const parseFeed = (xml: string, limit = 5) =>
  [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)]
    .map(([, item = ""]) => ({
      title: tags(item, "title")[0],
      url: tags(item, "link")[0],
      date: tags(item, "pubDate")[0],
      tags: tags(item, "category"),
    }))
    .filter((post): post is Post => !!post.title && /^https:\/\//.test(post.url ?? ""))
    .slice(0, limit);

export async function fetchMediumPosts(user: string, limit?: number): Promise<Post[]> {
  try {
    const res = await fetch(`https://medium.com/feed/@${encodeURIComponent(user)}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return parseFeed(await res.text(), limit);
  } catch (err) {
    console.warn(`Medium feed unavailable, blog shows a profile link only: ${(err as Error).message}`);
    return [];
  }
}
