import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
    {
        ignores: ["eslint.config.mjs"]
    },
    js.configs.recommended,
    eslintConfigPrettier,
    {
        languageOptions: {
            ecmaVersion: 12,
            sourceType: "commonjs",
            globals: {
                require: "readonly",
                module: "readonly",
                process: "readonly",
                __dirname: "readonly",
                console: "readonly",
                exports: "readonly",
                TextEncoder: "readonly"
            }
        },
        rules: {
            "no-unused-vars": [
                "error",
                {
                    "argsIgnorePattern": "^(_|error)",
                    "varsIgnorePattern": "^(error|mongoose|rateLimit|path|crypto|authorize)$",
                    "caughtErrorsIgnorePattern": "^error$"
                }
            ],
            "no-console": "warn",
            "eqeqeq": "error",
            "curly": "error"
        }
    }
];
