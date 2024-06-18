import plugin from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";

const rules = {
  "@typescript-eslint/ban-types": "error", // Impite usar tipos desaconsejados. Ej: String, Number, {}...
  "@typescript-eslint/sort-type-constituents": "error", // Ordena los union/intersection
  // no-unused-vars: impide declarar variables que no se usan
  "no-unused-vars": "off",
  "@typescript-eslint/no-unused-vars": [
    "error",
    {
      args: "all",
      argsIgnorePattern: "^_",
      caughtErrors: "all",
      caughtErrorsIgnorePattern: "^_",
      destructuredArrayIgnorePattern: "^_",
      varsIgnorePattern: "^_",
      ignoreRestSiblings: true,
    },
  ],
  // no-shadow: impide redeclarar variables en scopes internos
  "no-shadow": "off",
  "@typescript-eslint/no-shadow": ["error"],
};

export default {
  rules,
  plugin,
  parser,
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
};
