# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Nuxt 4 landing page that fetches content from a Strapi CMS. Pages are composed of modular "blocks" (Hero, Intro, etc.) rendered dynamically based on Strapi data.

## Commands

```bash
bun install        # Install dependencies (project uses bun.lock)
bun run dev        # Start dev server at http://localhost:3000
bun run build      # Build for production
bun run preview    # Preview production build locally
bun run generate  # Generate static site
bun run postinstall # Run nuxt prepare (auto-runs after install)
```

## Architecture

### Strapi CMS Integration

Content is fetched from Strapi via server API routes (`server/api/`):

- **[/server/utils/strapi.ts](server/utils/strapi.ts)** — `strapiFetch<T>()` utility wraps `$fetch` with auth headers and query string building
- **[/server/api/pages/[slug].get.ts](server/api/pages/[slug].get.ts)** — Fetches page content by slug with blocks (hero, intro), locale, and alternate slug generation for i18n
- **[/server/api/navigation.get.ts](server/api/navigation.get.ts)** — Fetches header data (logo, main links, CTA, utility link)

### Page Rendering

The catch-all route `app/pages/[...slug].vue` fetches page data and renders blocks:

```
Strapi Page → blocks[] → Dynamic components in app/components/blocks/
```

Block components currently exist:
- [BlocksHero.vue](app/components/blocks/Hero.vue) — Full-viewport hero with background image and CTAs
- [BlocksIntro.vue](app/components/blocks/Intro.vue) — Two-column intro section with tags and optional CTA

To add a new block type:
1. Create component in `app/components/blocks/YourBlock.vue`
2. Add import and conditional render in `[...slug].vue`
3. Define types in `app/types/page.ts`

### Types

[/app/types/page.ts](app/types/page.ts) exports shared types: `PageResponse`, `PageBlock`, `HeroBlock`, `IntroBlock`, `StrapiMedia`, `StrapiLink`.

### Internationalization

- Locales: `en` (default), `vi`
- URL strategy: `prefix_except_default` — `/the-club` for English, `/vi/the-club` for Vietnamese
- Default redirects: `/` → `/the-club`, `/vi` → `/vi/ve-serene`
- Use `useLocalePath()` for internal links to apply locale prefix

### Tailwind Design Tokens

[/tailwind.config.ts](tailwind.config.ts) defines the design system:

- **Colors**: clay, sand, cream, paper (background), espresso, foliage, river-mist, muted, subtle, border
- **CSS Variables**: `--color-paper`, `--color-text`, `--color-text-muted`, `--color-border` (set in global.css)
- **Fonts**: display, body, mono (loaded as CSS variables)
- **Utilities**: `eyebrow` text style, `mono-sm`, `btn`/`btn-secondary`/`btn-outline` classes

## Environment Variables

```
NUXT_PUBLIC_STRAPI_URL=http://localhost:1337
NUXT_STRAPI_TOKEN=<strapi-api-token>
```

## Key Patterns

- **URL normalization**: `strapiUrl` + `/api` prefix added in `strapiFetch()`. Absolute URLs returned as-is.
- **Link handling**: Internal links (Strapi `page` relation) use `useLocalePath()`; external links use direct URL
- **Locale-aware navigation**: `localeSlugMap` state syncs alternate slugs between header and page components
- **Block props**: Block components receive raw Strapi data shape via `v-bind="block"` from the page template
