import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  { ignores: ["dist"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    settings: { react: { version: "18.3" } },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      "react/jsx-no-target-blank": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "no-unused-vars": [
        "warn",
        { vars: "all", args: "after-used", ignoreRestSiblings: false },
      ],
      "react/no-unused-prop-types": "warn",
      "react/prop-types": "off",
      "no-multiple-empty-lines": [
        "warn", // or 'off' if you want to disable the rule completely
        {
          max: 2, // Allows up to 2 consecutive empty lines
          maxEOF: 1, // Allows 1 empty line at the end of the file
          maxBOF: 0, // No empty lines at the beginning of the file
        },
      ],
    },
  },
];
