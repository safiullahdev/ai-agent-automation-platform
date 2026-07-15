import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['node_modules/', 'dist/', 'coverage/'],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ['**/*.js', '**/*.ts'],

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },

    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  }
);