module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: "eslint:recommended",
  globals: {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  parserOptions: {
    "parser": "babel-eslint",
    "ecmaVersion": 2018,
    "sourceType": "module",
  },
  rules: {
    "strict": 0,
    "block-spacing": 2,
    "comma-spacing": ["error", { "before": false, "after": true }],
    "key-spacing": ["error", { "beforeColon": false, "afterColon": true }],
    "no-mixed-spaces-and-tabs": "error",
    "semi-spacing": ["error", { "before": false, "after": true }],
    "space-before-blocks": ["error", "always"],
    "space-before-function-paren": ["error", "always"],
    "space-unary-ops": ["error", { "words": true, "nonwords": false }],
    "space-infix-ops": "error",
    "arrow-spacing": 1,
    "indent": [2, 2, {SwitchCase: 1}],
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
  }
  
};