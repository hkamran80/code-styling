import eslint from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";

/** @type{import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigFile} */
export default [
    eslint.configs.recommended,
    prettierConfig,
    importPlugin.flatConfigs.recommended,
    {
        files: ["**/*.{js,mjs,cjs,ts}"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
        },
        rules: {
            "no-alert": "error",
            "no-await-in-loop": "error",
            "no-return-assign": "error",
            "no-restricted-syntax": [
                "error",
                "FunctionExpression",
                "LabeledStatement",
                "WithStatement",
            ],
            "no-var": "error",
            "no-use-before-define": "error",
            "no-unused-expressions": ["error", { enforceForJSX: true }],
            "no-param-reassign": [
                "error",
                {
                    props: false,
                },
            ],
            "no-console": "warn",
            "no-underscore-dangle": "error",

            "prefer-const": [
                "error",
                {
                    destructuring: "all",
                },
            ],
            "arrow-body-style": [
                "error",
                "as-needed",
                { requireReturnForObjectLiteral: false },
            ],
            "space-before-function-paren": "off",

            "import/first": "error",
            "import/newline-after-import": "error",
            "import/no-duplicates": "error",
            "import/no-unassigned-import": [
                "error",
                { allow: ["@/styles/*.css"] },
            ],
            "import/no-unresolved": [
                "error",
                { ignore: ["@/styles/(.*).css"] },
            ],
            "import/extensions": ["error", "never", { css: "always" }],
            "import/no-dynamic-require": "error",
            "import/no-cycle": "error",
            "import/order": [
                "error",
                {
                    groups: [
                        "builtin",
                        "external",
                        "internal",
                        ["parent", "sibling"],
                        "type",
                    ],
                },
            ],

            // Must be turned off because of the `context.getAncestors` error seen in
            // import-js/eslint-plugin-import#2995 and import-js/eslint-plugin-import#2556#issuecomment-2121423498
            "import/no-named-as-default": "off",
        },
    },
];
