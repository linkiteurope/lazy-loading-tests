const DYNAMIC_LEVEL = process.env.NODE_ENV === "production" ? "error" : "warn";

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ["eslint:recommended"],
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module"
  },
  rules: {
    "arrow-parens": ["error", "always"],
    "brace-style": ["error", "allman", { allowSingleLine: true }],
    "comma-dangle": DYNAMIC_LEVEL,
    "indent": ["error", 4, { SwitchCase: 1 }],
    "lines-between-class-members": "off",
    "newline-per-chained-call": ["error", { ignoreChainWithDepth: 2 }],
    "no-console": DYNAMIC_LEVEL,
    "no-debugger": DYNAMIC_LEVEL,
    "no-multi-spaces": ["error", { exceptions: { "Property": false } }],
    "no-multiple-empty-lines": ["error", { max: 1 }],
    "no-unreachable": DYNAMIC_LEVEL,
    "no-trailing-spaces": "error",
    "no-unused-vars": [DYNAMIC_LEVEL, { args: "none" }],
    "object-shorthand": ["error", "consistent"],
    "quote-props": ["error", "consistent"],
    "quotes": ["error", "double", { allowTemplateLiterals: true, avoidEscape: true }],
    "semi": ["error", "always"],
    "space-before-function-paren": ["error", { anonymous: "never", named: "never", asyncArrow: "always" }]
  },
  overrides: [
    {
      files: [".babelrc", ".eslintrc.js", "*.config.js"],
      rules: { "indent": ["error", 2, { SwitchCase: 1 }] }
    }
  ]
};
