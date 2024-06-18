module.exports = {
  moduleDirectories: ["node_modules", "src"],
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transformIgnorePatterns: ["<rootDir>/node_modules/?!(@datune)"],
  collectCoverageFrom: ["**/*.(t|j)s"],
  coverageDirectory: "./coverage",
};
