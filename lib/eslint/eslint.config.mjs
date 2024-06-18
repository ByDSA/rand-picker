import customPlugin from "./custom-plugins/eslint-plugin-custom.mjs";
import airbnbMod from "./eslint.config.airbnb.mjs";
import importMod from "./eslint.config.import.mjs";
import jestMod from "./eslint.config.jest.mjs";
import stylisticMod from "./eslint.config.stylisticTs.mjs";
import typescriptMod from "./eslint.config.typescript.mjs";

const formatRules = {
  indent: [
    "error",
    2,
    {
      SwitchCase: 1,
      ignoredNodes: ["PropertyDefinition"], // Props after decorator
    },
  ],
  "lines-between-class-members": ["error", "always"],
  "keyword-spacing": [
    "error",
    {
      after: true,
      before: true,
    },
  ],
  "linebreak-style": ["error", "unix"],
};
const modRules = {
  ...airbnbMod.rules,
  ...importMod.rules,
  ...typescriptMod.rules,
  ...stylisticMod.rules,
  ...jestMod.rules,
};
const globalRules = {
  ...modRules,
  ...formatRules,
  "no-await-in-loop": "off",
  "no-invalid-this": [
    "error",
    {
      capIsConstructor: false,
    },
  ],
  "no-useless-constructor": "off",
  "no-empty-function": [
    "error",
    {
      allow: ["constructors"],
    },
  ],
  curly: ["error", "multi-or-nest"],
  eqeqeq: "error",
  "no-plusplus": ["off"], // Impide usar ++ y --
  "no-multiple-empty-lines": [
    "error",
    {
      max: 1,
      maxEOF: 0,
    },
  ],
  "newline-per-chained-call": [
    "error",
    {
      ignoreChainWithDepth: 2,
    },
  ],
  "object-curly-newline": [
    "error",
    {
      ImportDeclaration: "never",
      ExportDeclaration: {
        multiline: true,
        minProperties: 1,
      },
      ObjectExpression: {
        minProperties: 1,
      },
      ObjectPattern: "never",
    },
  ],
  "object-property-newline": [
    "error",
    {
      allowAllPropertiesOnSameLine: false,
    },
  ],
  "comma-dangle": ["error", "always-multiline"],
  quotes: ["error", "double"],
  "padding-line-between-statements": [
    "error",
    {
      blankLine: "always",
      prev: ["const", "let", "var"],
      next: "*",
    },
    {
      blankLine: "never",
      prev: ["const", "let", "var"],
      next: ["const", "let", "var"],
    },
    {
      blankLine: "always",
      prev: ["export"],
      next: ["export"],
    },
    {
      blankLine: "never",
      prev: ["case", "default"],
      next: "*",
    },
    {
      blankLine: "always",
      prev: ["if", "for", "while", "do"],
      next: "*",
    },
    {
      blankLine: "always",
      prev: "*",
      next: ["if", "for", "while", "do"],
    },
  ],
  "newline-before-return": "error",
  "nonblock-statement-body-position": ["error", "below"],
  "padded-blocks": ["error", "never"],
  "no-use-before-define": [
    "error",
    {
      functions: false,
      classes: false,
      variables: false,
    },
  ],
  "max-statements-per-line": [
    "error",
    {
      max: 1,
    },
  ],
  camelcase: "error",
  "space-in-parens": [
    "error",
    "never",
    {
      exceptions: ["{}"],
    },
  ],
  "no-var": "error",
  "dot-location": ["error", "property"],
  "prefer-destructuring": "error",
  "prefer-exponentiation-operator": "error",
  "operator-assignment": ["error", "always"],
  "require-await": "error",
  "no-new-wrappers": "error",
  "no-multi-spaces": "error",
  "rest-spread-spacing": ["error", "never"],
  "default-case-last": "error",
  "accessor-pairs": [
    "error",
    {
      getWithoutSet: true,
    },
  ],
  "no-underscore-dangle": [
    "error",
    {
      allowAfterThis: true,
    },
  ],
  "no-restricted-syntax": [
    "error",
    {
      selector: "ForInStatement",
      message:
        "for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.",
    },
    {
      selector: "LabeledStatement",
      message:
        "Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.",
    },
    {
      selector: "WithStatement",
      message:
        "`with` is disallowed in strict mode because it makes code impossible to predict and optimize.",
    },
  ],
  "no-cond-assign": ["error", "always"],
  "no-mixed-operators": "error",
  "multiline-ternary": ["error", "always-multiline"],
  "no-case-declarations": "error",
  "no-fallthrough": "error",
};
const testingConfig = [
  {
    files: ["**/*.e2e.spec.ts", "**/*.spec.ts", "**/test/**/*.ts", "**/tests/**/*.ts", "**/*.test.tsx"],
    rules: {
      "import/no-internal-modules": "off",
    },
  },
];
const libEslintConfig = [
  {
    files: ["eslint.config.*"],
    rules: {
      ...importMod.rulesExceptions.libEslint,
    },
  },
];
const overrideConfigs = [
  ...testingConfig,
  {
    files: ["index.ts", "utils.ts"],
    rules: {
      "import/prefer-default-export": "off",
    },
  },
  { // Scripting: zx
    files: ["*.mjs"],
    rules: {
      "no-console": "off",
      "require-await": "off",
    },
    languageOptions: {
      globals: {
        $: true,
        argv: true,
        path: true,
        fs: true,
        cd: true,
        chalk: true,
      },
    },
  },
  ...libEslintConfig,
];
/* UNUSED: usado en eslint <9 y aún no adaptado */
const env = {
  browser: true,
  es2021: true,
  node: true,
  "jest/globals": true,
};
/** **************** */
const settings = {
  "import/parsers": {
    "@typescript-eslint/parser": [".ts", ".tsx"],
  },
  "import/resolver": {
    node: {
      paths: ["src"],
    },
    typescript: {
      alwaysTryTypes: true,
    },
  },
};
const customPluginsRules = {
  "custom/indent-after-decorator": "error",
  "custom/no-blank-lines-after-decorator": "error",
  "custom/no-blank-lines-between-decorators": "error",
  "custom/no-leading-blank-lines": "error",
  "custom/no-multiple-exports-per-line": "error",
};

export default [
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx", "*.mjs"],
    settings,
    languageOptions: {
      parser: typescriptMod.parser,
      parserOptions: typescriptMod.parserOptions,
      globals: {
        NodeJS: "readonly",
        React: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": typescriptMod.plugin,
      import: importMod.plugin,
      jest: jestMod.plugin,
      "@stylistic/ts": stylisticMod.plugin,
      // Custom plugins
      custom: customPlugin,
    },
    rules: {
      ...globalRules,
      ...customPluginsRules,
    },
  },
  ...overrideConfigs,
];
