module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ["airbnb-base", "plugin:prettier/recommended"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  rules: {
    "linebreak-style": 0,
    "no-param-reassign": 0,
    "no-shadow": 0,
    "no-unused-vars": ["error", { args: "none" }],
    "no-use-before-define": ["error", { functions: false }],
  },
};
