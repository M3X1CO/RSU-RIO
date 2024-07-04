import globals from 'globals';
import stylisticJs from '@stylistic/eslint-plugin-js';
import js from '@eslint/js';

module.exports = {
  parserOptions: {
    ecmaVersion: 2023, // or whichever version you are using
    sourceType: 'module', // specify source type as module
  },
  plugins: ['@stylistic/js'], // specify ESLint plugins
  extends: [
    'plugin:@eslint/js/recommended', // use recommended rules from @eslint/js
  ],
  rules: {
    '@stylistic/js/indent': ['error', 2],
    '@stylistic/js/linebreak-style': ['error', 'unix'],
    '@stylistic/js/quotes': ['error', 'single'],
    '@stylistic/js/semi': ['error', 'never'],
    eqeqeq: 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': ['error', 'always'],
    'arrow-spacing': ['error', { before: true, after: true }],
    'no-console': 'off',
  },
  overrides: [
    {
      files: ['**/*.js'],
      languageOptions: {
        globals: {
          ...globals.node, // define global variables specific to Node.js
        },
        ecmaVersion: 2023, // specify ECMAScript version
      },
    },
    {
      files: ['dist/**', 'build/**'], // ignore specific directories
      rules: {
        // specific rules for ignored files/directories
      },
    },
  ],
};
