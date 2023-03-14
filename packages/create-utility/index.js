#!/usr/bin/env node

import inquirer from "inquirer";
import { writeFile } from "fs/promises";
import { promisify } from "util";
import { exec as cpExec } from "child_process";

const exec = promisify(cpExec);

const packageJson = {
    name: "@hkamran/utility-{{name}}",
    version: "0.1.0",
    description: "",
    main: "index.js",
    types: "index.d.ts",
    type: "module",
    scripts: {
        lint: "eslint --ext .js,.ts --fix",
        format: "prettier . --write",
        prepare:
            "tsc --declaration --emitDeclarationOnly --allowJs index.js && pnpm lint && pnpm format",
        test: 'echo "Error: no test specified" && exit 1',
    },
    author: {
        name: "H. Kamran",
        email: "hkamran@hkamran.com",
        url: "https://hkamran.com",
    },
    repository: {
        type: "git",
        url: "git+https://github.com/hkamran80/utilities-js.git",
        directory: "packages/{{name}}",
    },
    keywords: [],
    license: "AGPL-3.0-or-later",
    bugs: {
        url: "https://github.com/hkamran80/utilities-js/issues?q=is%3Aopen+label%3A%22utility%3A+{{name}}%22+sort%3Aupdated-desc",
    },
    homepage:
        "https://github.com/hkamran80/utilities-js/tree/main/packages/{{name}}#readme",
    publishConfig: {
        access: "public",
    },
    devDependencies: {
        "@hkamran/prettier-config": "^1.1.1",
        eslint: "^8.36.0",
        "eslint-config-prettier": "^8.7.0",
        prettier: "^2.8.4",
        typescript: "^4.6.2",
    },
    prettier: "@hkamran/prettier-config",
};

const indexJs = `console.log("Hello world!");`;

const readme = `# \`@hkamran/utility-{{name}}\`

[![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL3.0-green.svg)](../../LICENSE.md)
[![npm version](https://badge.fury.io/js/%40hkamran%2Futility-{{name}}.svg)](https://badge.fury.io/js/%40hkamran%2Futility-{{name}}.svg)

Create a utility

## Usage

\`\`\`bash
npm i @hkamran/utility-{{name}}
\`\`\`

\`\`\`bash
pnpm add @hkamran/utility-{{name}}
\`\`\`

\`\`\`bash
yarn add @hkamran/utility-{{name}}
\`\`\`
`;

const ignore = `node_modules/*
.gitignore
.dccache
*.md

**/dist/*
**/node_modules/*
**/.gitignore
**/.dccache
**/*.md`;

const eslintConfig = `module.exports = {
    root: true,
    env: { node: true },
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    extends: ["eslint:recommended", "prettier"],
};
`;

const questions = [
    {
        type: "list",
        name: "npm_executable",
        message: "Which package manager do you use?",
        choices: ["npm", "pnpm", "yarn"],
        default() {
            return "npm";
        },
    },
    {
        type: "input",
        name: "name",
        message: "Name",
    },
    {
        type: "input",
        name: "description",
        message: "Description",
    },
    {
        type: "input",
        name: "keywords",
        message: "Keywords (comma-separated)",
    },
];

const answers = await inquirer.prompt(questions);

/** @type {string} */
const packageName = answers.name.toLowerCase().replace(/ /gm, "-");

packageJson.name = packageJson.name.replace(/{{name}}/gm, packageName);
packageJson.repository.directory = packageJson.repository.directory.replace(
    /{{name}}/gm,
    packageName,
);
packageJson.bugs.url = packageJson.bugs.url.replace(/{{name}}/gm, packageName);
packageJson.homepage = packageJson.homepage.replace(/{{name}}/gm, packageName);

packageJson.description = answers.description;
packageJson.keywords =
    answers.keywords.length > 0
        ? answers.keywords.toLowerCase().split(",")
        : [];

await writeFile("package.json", JSON.stringify(packageJson));
await writeFile(".eslintignore", ignore);
await writeFile(".prettierignore", ignore);
await writeFile(".eslintrc.js", eslintConfig);

await writeFile(
    "README.md",
    readme
        .replace(/{{name}}/gm, answers.name.toLowerCase().replace(/ /gm, "-"))
        .replace(/{{description}}/gm, answers.description),
);

await writeFile("index.js", indexJs);

await exec(`${answers.npm_executable} install`);
await exec(`${answers.npm_executable} run prepare`);

console.log("Utility created!");
