#!/usr/bin/env node

import inquirer from "inquirer";
import { writeFile } from "fs/promises";
import { promisify } from "util";
import { exec as cpExec } from "child_process";

const exec = promisify(cpExec);

const packageJson = `{
    "name": "@hkamran/utility-{{name}}",
    "version": "1.0.0-beta.0",
    "description": "{{description}}",
    "main": "index.js",
    "types": "index.d.ts",
    "type": "module",
    "scripts": {
        "prepare": "tsc --declaration --emitDeclarationOnly --allowJs index.js",
        "test": "echo \\"Error: no test specified\\" && exit 1"
    },
    "author": {
        "name": "H. Kamran",
        "email": "hkamran@hkamran.com",
        "url": "https://hkamran.com"
    },
    "repository": {
        "type": "git",
        "url": "git+https://github.com/hkamran80/utilities-js.git",
        "directory": "packages/{{name}}"
    },
    "keywords": [{{keywords}}],
    "license": "AGPL-3.0-or-later",
    "bugs": {
        "url": "https://github.com/hkamran80/utilities-js/issues?q=is%3Aopen+label%3A%22utility%3A+{{name}}%22+sort%3Aupdated-desc"
    },
    "homepage": "https://github.com/hkamran80/utilities-js/tree/main/packages/{{name}}#readme",
    "dependencies": {},
    "devDependencies": {
        "typescript": "^4.6.2"
    }
}`;

const indexJs = `console.log("Hello world!");`;

const readme = `# \`@hkamran/utility-{{name}}\`
[![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL3.0-green.svg)](../../LICENSE.md) [![npm version](https://badge.fury.io/js/%40hkamran%2Futility-{{name}}.svg)](https://badge.fury.io/js/%40hkamran%2Futility-{{name}}.svg)

{{description}}

## Usage
\`\`\`bash
$ npm i @hkamran/utility-{{name}}
\`\`\`
`;

const questions = [
    {
        type: "list",
        name: "npm_executable",
        message: "Which package manager do you use?",
        choices: ["NPM", "PNPM", "Yarn"],
        filter(val) {
            return val.toLowerCase();
        },
        default() {
            return "NPM";
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

await writeFile(
    "package.json",
    packageJson
        .replace(/{{name}}/gm, answers.name.toLowerCase().replace(/ /gm, "-"))
        .replace(/{{description}}/gm, answers.description)
        .replace(
            /{{keywords}}/gm,
            answers.keywords.length > 0
                ? answers.keywords
                      .toLowerCase()
                      .split(",")
                      .map((keyword) => `"${keyword}"`)
                      .join(",")
                : "",
        ),
);

await writeFile(
    "README.md",
    readme
        .replace(/{{name}}/gm, answers.name.toLowerCase().replace(/ /gm, "-"))
        .replace(/{{description}}/gm, answers.description),
);

await writeFile("index.js", indexJs);

await exec(`${answers.npm_executable.toLowerCase()} install`);

console.log("Utility created!");
