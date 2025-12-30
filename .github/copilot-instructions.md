# ConstellationCanvas - Copilot Coding Agent Instructions

## Overview

ConstellationCanvas is a personal growth/blog site for a system engineer. Built with **Astro 5.x** (SSG + SSR hybrid), deployed to **Cloudflare Pages**. The site features MDX blog posts, tag-based navigation, RSS feed, and custom link card components.

**Stack:** Astro 5, TypeScript, MDX, Cloudflare adapter, LightningCSS
**Node.js:** 23.11.0 (specified in `.node-version`)

## Build & Validation Commands

**Always run these commands from the repository root.**

### Install Dependencies
```bash
npm install
```

### Build (includes type checking)
```bash
npm run build
```
- Runs `astro check` (TypeScript validation) then `astro build`
- Build time: ~5-10 seconds
- Output: `dist/` directory
- **Note:** "Entry blog → X was not found" warnings during build are expected for missing related post references

### Development Server
```bash
npm run dev
```
- Starts at `http://localhost:4321`
- Hot reload enabled

### Linting

**Biome** (JS/TS formatting and linting):
```bash
npx @biomejs/biome check .
npx @biomejs/biome check --write .  # with auto-fix
```
- Config: `biome.json`
- Ignores CSS files
- Uses tabs for indentation, double quotes

**Stylelint** (CSS in `.css` and `.astro` files):
```bash
npx stylelint "src/**/*.{css,astro}"
```
- Config: `.stylelintrc.cjs`
- Custom properties defined in `src/styles/tokens/tokens.css`

### Preview Production Build
```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # Astro components
│   ├── linkcard/        # Custom link card (remarkLinkCard.tsx + LinkCard.astro)
│   └── *.astro          # UI components
├── content/
│   ├── blog/            # MDX blog posts (organized by year/date folders)
│   └── config.ts        # Content collection schema (Zod validation)
├── layouts/
│   ├── BaseLayout.astro # Main site layout
│   └── BlogPost.astro   # Blog post layout
├── pages/
│   ├── blog/[...slug].astro  # Dynamic blog routes
│   ├── tags/[tag].astro      # Tag pages
│   ├── api/                  # API routes
│   └── *.astro               # Static pages
├── styles/
│   ├── tokens/tokens.css     # Design tokens (colors, fonts, spacing)
│   ├── globals.css           # Global styles
│   └── reset.css             # CSS reset
└── consts.ts            # Site-wide constants (title, description)

public/                  # Static assets (fonts, favicon)
astro.config.mjs         # Astro configuration
```

## Key Configuration Files

| File | Purpose |
|------|---------|
| `astro.config.mjs` | Astro config (MDX, sitemap, Cloudflare adapter, LightningCSS) |
| `biome.json` | JS/TS linting and formatting |
| `.stylelintrc.cjs` | CSS linting |
| `tsconfig.json` | TypeScript config with `@/*` path alias to `./src/*` |
| `components.json` | shadcn/ui configuration (if used) |

## Content Schema

Blog posts in `src/content/blog/` require this frontmatter (defined in `src/content/config.ts`):

```yaml
---
title: string (required)
description: string (required)
pubDate: date (required)
updatedDate: date (optional)
tags: string[] (required)
relatedPosts: reference[] (optional)
prevPost: reference (optional)
nextPost: reference (optional)
---
```

## Import Aliases

Use `@/` prefix for imports from `src/`:
```typescript
import BaseLayout from "@/layouts/BaseLayout.astro";
import { SITE_TITLE } from "@/consts";
```

## Git Conventions

Follow the conventions in `.github/skills/git-conventions/SKILL.md`:
- **Commits:** `<type>[scope]: <description>` (e.g., `feat(blog): add new post`)
- **Branches:** `<type>/<description>` (e.g., `feature/add-search`)
- **Types:** feat, fix, docs, style, refactor, perf, test, build, ci, chore

## Validation Checklist

Before submitting changes:

1. **Type check:** `npm run build` (includes `astro check`)
2. **Biome lint:** `npx @biomejs/biome check .`
3. **Stylelint:** `npx stylelint "src/**/*.{css,astro}"`
4. **Dev server test:** `npm run dev` and verify at localhost:4321

## Known Issues & Notes

- **Biome schema warning:** The `biome.json` uses schema version 1.9.4 but Biome 2.3.10 is installed. Run `npx @biomejs/biome migrate` if needed.
- **Stylelint warnings:** Some existing CSS has minor violations (descending specificity, deprecated `clip` property) - these are pre-existing.
- **Cloudflare adapter messages:** "Enabling sessions with Cloudflare KV" and sharp warnings are expected and can be ignored.
- **Missing related posts:** Build warnings about "Entry blog → X was not found" indicate broken references in post frontmatter.

## Trust These Instructions

These instructions are validated against the actual repository. Only perform additional exploration if:
- A command fails unexpectedly
- You need to find specific implementation details not covered here
- The information appears outdated or incorrect
