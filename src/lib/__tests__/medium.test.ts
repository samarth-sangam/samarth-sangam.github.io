import test from "node:test";
import assert from "node:assert/strict";
import { parseFeed } from "../medium.ts";

const feed = `<rss><channel>
<item><title><![CDATA[Tips & Tricks]]></title><link>https://medium.com/@x/a</link><pubDate>Mon, 01 Jan 2024 00:00:00 GMT</pubDate><category><![CDATA[react]]></category><category><![CDATA[java]]></category></item>
<item><title>Cats &amp; Dogs</title><link>https://medium.com/@x/b</link></item>
<item><title>Evil</title><link>javascript:alert(1)</link></item>
<item><title>Third</title><link>https://medium.com/@x/c</link></item>
</channel></rss>`;

test("parses CDATA, entities and categories; drops non-https links; honours limit", () => {
  assert.deepEqual(parseFeed(feed, 2), [
    { title: "Tips & Tricks", url: "https://medium.com/@x/a", date: "Mon, 01 Jan 2024 00:00:00 GMT", tags: ["react", "java"] },
    { title: "Cats & Dogs", url: "https://medium.com/@x/b", date: undefined, tags: [] },
  ]);
  assert.equal(parseFeed(feed).length, 3);
});
