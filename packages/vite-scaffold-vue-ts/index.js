#!/usr/bin/env node

import { exec as cpExec } from "child_process";
import { promisify } from "util";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { mkdir, readFile, writeFile } from "fs/promises";

const exec = promisify(cpExec);

const tailwindConfig = `/* eslint-disable @typescript-eslint/no-var-requires */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    content: ["./index.html", "./src/**/*.{vue,js,ts}"],
    darkMode: "class",
    theme: {
        extend: {
            fontFamily: {
                sans: ["Nunito Sans", ...defaultTheme.fontFamily.sans],
                serif: [...defaultTheme.fontFamily.serif],
                mono: [...defaultTheme.fontFamily.mono],
            },
        },
    },
    plugins: [],
};
`;

const tailwindCSS = `@tailwind base;
@tailwind components;
@tailwind utilities;`;

const viteConfig = `import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import htmlConfig from "vite-plugin-html-config";

const name = "";
const keywords = "";
const description = "";
const faviconUrl = "";
const twitterUsername = "";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        htmlConfig({
            metas: [
                { charset: "UTF-8" },
                {
                    name: "viewport",
                    content: "width=device-width, initial-scale=1.0",
                },
                {
                    name: "keywords",
                    content: keywords,
                },
                {
                    name: "description",
                    content: description,
                },
                { name: "robots", content: "index, follow" },

                // Open Graph
                { property: "og:title", content: name },
                {
                    property: "og:image",
                    content: faviconUrl,
                },
                { property: "og:type", content: "website" },
                { property: "og:description", content: description },

                // Twitter Cards
                { name: "twitter:card", content: "summary" },
                { name: "twitter:site", content: twitterUsername },
                { name: "twitter:creator", content: twitterUsername },
                { name: "twitter:title", content: name },
                { name: "twitter:description", content: description },
                {
                    name: "twitter:image",
                    content: faviconUrl,
                },
                {
                    name: "twitter:image:alt",
                    content: \`The \${name} logo\`,
                },
            ],
            links: [
                // Comment one of the favicon objects out
                { rel: "icon", type: "image/png", href: "/favicon.png" },
                { rel: "icon", href: "/favicon.ico" },
                { rel: "preconnect", href: "https://fonts.googleapis.com/" },
                {
                    rel: "preconnect",
                    href: "https://fonts.gstatic.com",
                    crossorigin: "",
                },
                {
                    rel: "stylesheet",
                    href: "https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;700&display=swap",
                },
            ],
        }),
        vue(),
    ],
});
`;

const routerConfig = `import { createWebHistory, createRouter } from "vue-router";

import Home from "../views/Home.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
`;

const appVueFile = `<script setup lang="ts"></script>

<template>
    <router-view />
</template>`;

const indexHtml = `<!DOCTYPE html>
<html lang="en" class="bg-white dark:bg-black">
    <head>
        <title>Vite App</title>
    </head>
    <body class="min-h-screen bg-white dark:bg-black">
        <div id="app"></div>
        <script type="module" src="/src/main.ts"></script>
    </body>
</html>`;

const tailwindIndexHtml = `<!DOCTYPE html>
<html lang="en" class="bg-white dark:bg-black">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <!-- Comment out one of the favicons -->
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" href="/favicon.png" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
            href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;700&display=swap"
            rel="stylesheet"
        />

        <title>Vite App</title>
    </head>
    <body class="min-h-screen bg-white dark:bg-black">
        <div id="app"></div>
        <script type="module" src="/src/main.ts"></script>
    </body>
</html>`;

const ignoreFiles = `node_modules
dist
.gitignore
*.md`;

const eslintConfig = `module.exports = {
    root: true,
    env: { node: true, "vue/setup-compiler-macros": true },
    parser: "vue-eslint-parser",
    parserOptions: {
        parser: "@typescript-eslint/parser",
    },
    plugins: ["@typescript-eslint"],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:vue/vue3-recommended",
        "prettier",
    ],
    rules: { "vue/multi-word-component-names": "off", "vue/no-v-html": "off" },
};
`;

const netlifyRedirects = `/robots.txt     /robots.txt     200
/*              /index.html     200`;

const robots = {
    allow: `User-agent: *
Disallow:`,
    disallow: `User-agent: *
Disallow: /`,
};

const argv = await yargs(hideBin(process.argv))
    .option("npm-executable", {
        describe: "The npm executable to use",
        type: "string",
        default: "npm",
    })
    .option("styling", {
        describe: "Install ESLint and Prettier",
        type: "boolean",
    })
    .option("vite-html", {
        describe: "Configure HTML metadata",
        type: "boolean",
    })
    .option("router", {
        describe: "Install vue-router",
        type: "boolean",
    })
    .option("tailwindcss", {
        describe: "Install Tailwind CSS",
        type: "boolean",
    })
    .option("netlify", {
        describe: "Add Netlify-specific files (e.g. redirects)",
        type: "boolean",
    })
    .option("disallow-robots", {
        describe: "Disallow all automated crawlers (robots)",
        type: "boolean",
        default: false,
    })
    .option("verbose", {
        alias: "v",
        describe: "Show log messages",
        type: "boolean",
    })
    .describe("help", "Show this help message")
    .epilog(
        "This program assumes that you are using the 'vue-ts' version from Vite's installer. This program was created by H. Kamran, licensed under GPLv3.",
    ).argv;

const log = (message) => argv.verbose && console.log(message);

// Code Styling
if (argv.styling) {
    log("Installing ESLint and Prettier...");

    await exec(
        `${argv.npmExecutable} install -D eslint eslint-config-prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser prettier @hkamran/prettier-config eslint-plugin-vue`,
    );

    await writeFile(".eslintignore", ignoreFiles);
    await writeFile(".prettierignore", ignoreFiles);
    await writeFile(".eslintrc.js", eslintConfig);

    const packageJson = JSON.parse((await readFile("package.json")).toString());

    packageJson["prettier"] = "@hkamran/prettier-config";
    packageJson["scripts"]["lint"] = "eslint --ext .js,.ts,.vue --fix";
    packageJson["scripts"]["format"] = "prettier . --write";

    await writeFile("package.json", JSON.stringify(packageJson));

    log("Installed ESLint and Prettier!");
    log("Linting and formatting...");

    await exec(`${argv.npmExecutable} run lint`);
    await exec(`${argv.npmExecutable} run format`);

    log("Linted and formatted!");
}

// Vite Plugin - HTML Config
if (argv.viteHtml) {
    log("Installing HTML config...");

    await exec(`${argv.npmExecutable} install -D vite-plugin-html-config`);
    await writeFile("vite.config.ts", viteConfig);
    await writeFile("index.html", indexHtml);

    log("Installed HTML config!");
}

// Vue Router
if (argv.router) {
    log("Installing vue-router...");

    await exec(`${argv.npmExecutable} install vue-router`);
    await mkdir("src/router", { recursive: true });
    await mkdir("src/views", { recursive: true });

    await writeFile("src/router/index.ts", routerConfig);

    const existingAppVue = (await readFile("src/App.vue"))
        .toString()
        .replace(/<style((.|\n|\r)*?)<\/style>/, "");

    await writeFile(
        "src/views/Home.vue",
        existingAppVue.replace("./components", "../components"),
    );
    await writeFile("src/App.vue", appVueFile);

    const vueConfig = (await readFile("src/main.ts")).toString();
    let vueConfigLines = vueConfig.slice().split("\n");
    const lastImportLine = vueConfigLines
        .map((line) => line.indexOf("import ") !== -1)
        .lastIndexOf(true);

    vueConfigLines.splice(
        lastImportLine + 1,
        0,
        'import router from "./router";',
    );

    vueConfigLines[vueConfigLines.length - 2] = vueConfigLines[
        vueConfigLines.length - 2
    ].replace("(App)", "(App).use(router)");

    await writeFile("src/main.ts", vueConfigLines.join("\n"));

    log("Installed vue-router!");
}

// Tailwind CSS
if (argv.tailwindcss) {
    log("Installing Tailwind CSS...");

    await exec(
        `${argv.npmExecutable} install -D tailwindcss postcss autoprefixer`,
    );
    await exec(`${argv.npmExecutable.replace("m", "x")} tailwindcss init -p`);
    await writeFile("tailwind.config.js", tailwindConfig);
    await writeFile("src/index.css", tailwindCSS);

    const vueConfig = (await readFile("src/main.ts")).toString();
    const vueConfigLines = vueConfig.slice().split("\n");
    const lastImportLine = vueConfigLines
        .map((line) => line.startsWith("import "))
        .lastIndexOf(true);

    vueConfigLines.splice(lastImportLine + 1, 0, 'import "./index.css";');

    await writeFile("src/main.ts", vueConfigLines.join("\n"));

    if (!argv.viteHtml) {
        await writeFile("index.html", tailwindIndexHtml);
    }

    log("Installed Tailwind CSS!");
}

// Netlify
if (argv.netlify) {
    log("Adding Netlify redirects file...");
    await writeFile("public/_redirects", netlifyRedirects);
    log("Added Netlify redirects file!");
}

// Robots.txt
if (argv.disallowRobots) {
    log("Adding robots.txt (disallow)...");
    await writeFile("public/robots.txt", robots.disallow);
    log("Added robots.txt (disallow)!");
} else {
    log("Adding robots.txt (allow)...");
    await writeFile("public/robots.txt", robots.allow);
    log("Added robots.txt (allow)!");
}
