import plugin from "eslint-plugin-import";

const formatRules = {
  // Da error en eslint v9.0.0:
  // "import/newline-after-import": ["error", {
  //   count: 1,
  //   considerComments: true,
  // }],
};
const lintingRules = {
  "import/order": "error", // Orden de los imports, require...
  "import/no-absolute-path": "error",
  "import/no-cycle": ["error", {
    maxDepth: 1,
  }],
  "import/no-default-export": "error",
  "import/no-internal-modules": [
    "error",
    {
      allow: [
        "*modules/*",
      ],
    },
  ],
  "import/no-extraneous-dependencies": [
    "error",
    {
      devDependencies: ["**/*.{test,spec}.{ts,tsx}", "**/test/**", "**/lib/**/*"],
    },
  ],
  "import/no-unresolved": "off",
  "import/extensions": "off",
};
const rulesExceptions = {
  libEslint: {
    "import/no-internal-modules": "off",
    "import/no-extraneous-dependencies": "off",
    "import/no-default-export": "off",
    "import/prefer-default-export": "error",
  },
};

export default {
  rules: {
    ...lintingRules,
    ...formatRules,
  },
  rulesExceptions,
  plugin,
};
