# `@hkamran/eslint-config`

[![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL3.0-green.svg)](../../LICENSE.md)
[![npm version](https://badge.fury.io/js/%40hkamran%2Feslint-config.svg)](https://badge.fury.io/js/%40hkamran%2Feslint-config.svg)

My personal ESLint configuration

## Installation

```bash
npm i -D @hkamran/eslint-config
```

> [!NOTE]
> For `.eslintrc.*` (not flat config), use version 1.0.1.

## Usage

Import the module, then use the spread operator to insert it into your ESLint configuration.

```js
import hkamranConfig from "@hkamran/eslint-config";

export default [
    // ... other configuration ...
    ...hkamranConfig,
]
```

## Settings

This configuration also includes the [recommended ESLint configuration](https://eslint.org/docs/latest/rules), [Prettier ESLint configuration](https://github.com/prettier/eslint-config-prettier), and the [import plugin](https://github.com/import-js/eslint-plugin-import).

It runs on all JavaScript files (`.js`, `.mjs`, and `.cjs`) and TypeScript files (`.ts`).

| Rule                          | Severity | Options                                                          |
|-------------------------------|----------|------------------------------------------------------------------|
| `no-alert`                    | Error    |                                                                  |
| `no-await-in-loop`            | Error    |                                                                  |
| `no-return-assign`            | Error    |                                                                  |
| `no-restricted-syntax`        | Error    | `FunctionExpression`, `LabeledStatement`, `WithStatement`        |
| `no-var`                      | Error    |                                                                  |
| `no-use-before-define`        | Error    |                                                                  |
| `no-unused-expressions`       | Error    | `enforceForJSX: true`                                            |
| `no-param-reassign`           | Error    | `props: false`                                                   |
| `no-console`                  | Warn     |                                                                  |
| `no-underscore-dangle`        | Error    |                                                                  |
| `prefer-const`                | Error    | `destructuring: all`                                             |
| `arrow-body-style`            | Error    | `as-needed`, `requireReturnForObjectLiteral: false`              |
| `space-before-function-paren` | Off      |                                                                  |
| `import/first`                | Error    |                                                                  |
| `import/newline-after-import` | Error    |                                                                  |
| `import/no-duplicates`        | Error    |                                                                  |
| `import/no-unassigned-import` | Error    | `allow: [x@/styles/*.css"]`                                      |
| `import/no-unresolved`        | Error    | `allow: ["@/styles/*.css"]`                                      |
| `import/extensions`           | Error    | `never`, `css: always`                                           |
| `import/no-dynamic-require`   | ERror    |                                                                  |
| `import/no-cycle`             | Error    |                                                                  |
| `import/order`                | Error    | `groups: [builtin, external, internal, [parent, sibling], type]` |
