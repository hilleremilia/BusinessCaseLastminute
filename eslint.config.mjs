import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import hooks from 'eslint-plugin-react-hooks';
import reactNative from 'eslint-plugin-react-native';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
  },
  {
    languageOptions: { globals: globals.node },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    plugins: {
      'react-hooks': hooks,
      'react-native': reactNative,
    },
  },
  {
    ignores: ['node_modules/', 'babel.config.js', 'metro.config.js'],
  },
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
