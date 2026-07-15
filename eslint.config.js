import js from "@eslint/js";

export default [
  js.configs.recommended,

  {
    files: ["**/*.js", "**/*.ts"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },

    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
    },
  },

  {
    ignores: [
      "node_modules/",
      "dist/",
      "coverage/",
    ],
  },
];