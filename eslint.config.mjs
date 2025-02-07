import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import { includeIgnoreFile } from '@eslint/compat';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const currentDirPath = path.dirname(fileURLToPath(import.meta.url));
const gitIgnorePath = path.resolve(currentDirPath, '.gitignore');

export default [
  includeIgnoreFile(gitIgnorePath),
  { files: ['**/*.{js,ts}'] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
];
