import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Emits about/index.html etc., so /about works on GitHub Pages and plain static servers.
  trailingSlash: true,
  turbopack: {
    rules: {
      "*.svg": { loaders: ["@svgr/webpack"], as: "*.js" },
    },
  },
};

export default nextConfig;
