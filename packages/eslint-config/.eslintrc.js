module.exports = {
    extends: [
        "prettier",
        "plugin:import/recommended",
        "plugin:import/typescript",
    ],
    plugins: ["import"],
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
        "no-console": "error",
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
        "comma-dangle": [
            "error",
            {
                arrays: "only-multiline",
                objects: "only-multiline",
                imports: "only-multiline",
                exports: "only-multiline",
                functions: "never",
            },
        ],

        "import/first": "error",
        "import/newline-after-import": "error",
        "import/no-duplicates": "error",
        "import/no-unassigned-import": ["error", { allow: ["@/styles/*.css"] }],
        "import/no-unresolved": ["error", { ignore: ["@/styles/(.*).css"] }],
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
    },
};
