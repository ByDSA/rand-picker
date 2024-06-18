import commonConfig from "./lib/eslint/eslint.config.mjs";

const projectConfig = [
];
const ret = [
  ...commonConfig,
  ...projectConfig,
];

export default ret;
