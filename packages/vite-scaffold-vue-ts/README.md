# `@hkamran/vite-scaffold-vue-ts`

[![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL3.0-green.svg)](../../LICENSE.md)
[![npm version](https://badge.fury.io/js/%40hkamran%2Fvite-scaffold-vue-ts.svg)](https://badge.fury.io/js/%40hkamran%2Fvite-scaffold-vue-ts.svg)

A scaffolding system for Vite-powered Vue 3 (TypeScript) apps

## Usage

```bash
npx @hkamran/vite-scaffold-vue-ts
```

### Flags

- `--npm-executable [npm executable]` (optional, defaults to `npm`): The `npm` executable
  to use (e.g. `npm`, [`pnpm`](https://pnpm.io), or [`yarn`](https://yarnpkg.com))
- `--styling`: Install and configure [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/)
- `--vite-html`: Install and configure [`vite-plugin-html-config`](https://github.com/ahwgs/vite-plugin-html-config)
  to manage HTML head tags
- `--router`: Install and configure [`vue-router`](https://router.vuejs.org/)
- `--tailwindcss`: Install and configure [Tailwind CSS](https://tailwindcss.com/)
- `--netlify`: Add the Netlify [`_redirects` file](https://docs.netlify.com/routing/redirects/)
- `--disallow-robots`: Add a `robots.txt` that disallows all bots (omitting this
  flag will add the version that allows all)
- `--verbose`: Show output
