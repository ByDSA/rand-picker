import jestPlugin from "eslint-plugin-jest";

const recommended = jestPlugin.configs["flat/recommended"];
const rules = {
  ...recommended.rules,
  "jest/consistent-test-it": ["error", {
    fn: "it", // Obliga a usar 'it' y no 'test'
  }],
  "jest/expect-expect": "error", // Obliga a usar expect en los tests
  "jest/no-export": "error", // Que no se puede exportar nada en los tests
  "jest/prefer-lowercase-title": "error", // Obliga a usar nombres de test en lowercase
  "jest/prefer-to-be": "error", // Obliga a usar toBe en vez de toEqual para tipos primitivos
  "jest/prefer-to-contain": "error", // Obliga a usar toContain en vez de .includes (es más corto)
};

export default {
  rules: rules,
  plugin: recommended.plugins.jest,
};
