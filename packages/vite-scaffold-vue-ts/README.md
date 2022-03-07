# `@hkamran/vite-scaffold-vue-ts`
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](../../LICENSE.md) [![npm version](https://badge.fury.io/js/%40hkamran%2Fvite-scaffold-vue-ts.svg)](https://badge.fury.io/js/%40hkamran%2Fvite-scaffold-vue-ts.svg)

A scaffolding system for Vite-powered Vue 3 (TypeScript) apps

## Installation
```bash
$ npm i -D @hkamran/vite-scaffold-vue-ts
```

```bash
$ npx @hkamran/vite-scaffold-vue-ts
```

## Usage
I recommend using this program with `npx`, via `npx @hkamran/vite-scaffold-vue-ts`. However if you would like, you can also use it by installing it, then using the `vite-scaffold-vue-ts` binary.

### Flags
- `--npm-executable [npm executable]` (optional, defaults to `npm`): The NPM executable to use
- `--styling`: Install [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) and configure them
- `--vite-html`: Install [`vite-plugin-html-config`](https://github.com/ahwgs/vite-plugin-html-config) to manage HTML head tags and configure it
- `--router`: Install [`vue-router`](https://router.vuejs.org/) and configure it
- `--tailwindcss`: Install [Tailwind CSS](https://tailwindcss.com/) and configure it
- `--netlify`: Add the Netlify [`_redirects` file](https://docs.netlify.com/routing/redirects/)
- `--disallow-robots`: Add a `robots.txt` that disallows all bots (omitting this flag will add the version that allows all)
- `--verbose`: Show output
