module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
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
  rules: {}
}
