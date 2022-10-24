module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: 'eslint:recommended',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'windows'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    // Equals checks always use ===
    eqeqeq: 'error',
    // No extra spaces anywhere
    'no-trailing-spaces': 'error',
    // Add spacing before and after curly brackets
    'object-curly-spacing': ['error', 'always'],
    // Add spacing before and after arrow functions
    'arrow-spacing': ['error', { before: true, after: true }],
    // Allow console logs
    'no-console': 0,
    // Disable error check on function return parameters
    'no-unused-vars': ['error', { args: 'none' }],
  },
}
