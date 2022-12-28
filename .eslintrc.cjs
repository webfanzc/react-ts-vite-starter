module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    './eslintrc-auto-import.json',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'alloy',
    'alloy/react',
    'alloy/typescript'
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',

    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
    'no-undef': ['off']
  }
}
