import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { remarkLinkCard } from "./src/components/linkcard/remarkLinkCard";
import remarkBreaks from "remark-breaks";
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  site: "https://www.stellarcode.dev",
  integrations: [
    mdx(),
    sitemap(),
    partytown({
      // Adds dataLayer.push as a forwarding-event.
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
  vite: {
    css: {
      transformer: "lightningcss",
      lightningcss: {
        inline: true,
        drafts: {
          customMedia: true,
        },
      },
    },
  },
  markdown: {
    remarkPlugins: [remarkLinkCard, remarkBreaks],
    extendDefaultPlugins: true,
  },
});
