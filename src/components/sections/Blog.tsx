"use client";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

import { NewTab, Section, Tag } from "components/ui/Terminal";
import type { Post } from "lib/types.ts";

const isoDate = (date?: string) => {
  const parsed = new Date(date ?? "");
  return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString().slice(0, 10);
};

const Blog = ({ posts, medium }: { posts: Post[]; medium: string }) => (
  <Section title="Blog" command="tail ~/blog.log">
    <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
      {posts.map((post) => (
        <Box
          component="li"
          key={post.url}
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: { xs: "column", sm: "row" },
            py: 1.5,
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Typography component="time" dateTime={isoDate(post.date)} sx={{ color: "text.secondary", flexShrink: 0 }}>
            [{isoDate(post.date) ?? "----------"}]
          </Typography>
          <Box>
            <Link href={post.url} target="_blank" rel="noopener noreferrer" underline="hover" color="text.primary">
              {post.title}
              <NewTab />
            </Link>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
              {post.tags.slice(0, 4).map((tag) => <Tag key={tag}>#{tag}</Tag>)}
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
    <Link
      href={`https://medium.com/@${medium}`}
      target="_blank"
      rel="noopener noreferrer"
      sx={{ display: "inline-block", mt: 3 }}
    >
      {posts.length ? "$ open medium --all-posts" : "$ open medium  # read my posts on Medium"}
      <NewTab />
    </Link>
  </Section>
);

export default Blog;
