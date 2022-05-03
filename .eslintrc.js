module.exports = {
  root: true,
  // parser: '@typescript-eslint/parser',
  // plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended'],
  env: {
    browser: true,
    amd: true,
    node: true,
  },
  rules: {
    'no-unused-vars': [
      2,
      {
        argsIgnorePattern: '^_',
        args: 'after-used',
        ignoreRestSiblings: true,
      },
    ],
  },
};
