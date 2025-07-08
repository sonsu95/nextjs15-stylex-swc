import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import stylexPlugin from '@stylexjs/eslint-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    plugins: {
      '@stylexjs': stylexPlugin
    },
    rules: {
      "@stylexjs/valid-styles": "error",
      '@stylexjs/no-unused': "error",
      '@stylexjs/valid-shorthands': "warn",
      '@stylexjs/sort-keys': "warn"
    }
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
