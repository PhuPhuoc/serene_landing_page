# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Nuxt 4 minimal starter project for a landing page. The app directory follows Nuxt 4's `app/` convention for application code (routes, components, composables).

## Commands

```bash
bun install        # Install dependencies (project uses bun.lock)
bun run dev        # Start dev server at http://localhost:3000
bun run build      # Build for production
bun run preview    # Preview production build locally
bun run generate    # Generate static site
bun run postinstall # Run nuxt prepare (auto-runs after install)
```

## Architecture

- **Nuxt 4** with Vue 3 Composition API
- Entry point: [app.vue](app/app.vue) — uses `<NuxtWelcome />` for the landing page
- Static assets: [public/](public/) — favicon.ico, robots.txt
- Configuration: [nuxt.config.ts](nuxt.config.ts) with devtools enabled
- TypeScript configured via generated `.nuxt/tsconfig.*.json` files (auto-generated, do not edit)
