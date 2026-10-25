import type { Metadata } from "next";

import Blog from "components/sections/Blog";
import { getContent } from "lib/content.ts";
import { fetchMediumPosts } from "lib/medium.ts";

export const metadata: Metadata = { title: "Blog" };

// Runs at build time (static export): the Medium feed is baked into the HTML.
const BlogPage = async () => {
  const { blog } = await getContent();
  if (!blog?.medium) return null;
  return <Blog posts={await fetchMediumPosts(blog.medium, blog.limit)} medium={blog.medium} />;
};

export default BlogPage;
