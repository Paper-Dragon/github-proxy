import { defineConfig } from 'eslint-define-config';
import xo from 'eslint-config-xo';
import xoTypescript from 'eslint-config-xo-typescript';

// 基础配置
const baseConfig = {
  languageOptions: {
    globals: {
      // Node.js 全局变量
      process: 'readonly',
      Buffer: 'readonly',
      // 浏览器全局变量
      window: 'readonly',
      document: 'readonly',
      navigator: 'readonly',
      // 其他全局变量
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    ...xo.rules,
    ...xo.overrides?.[0]?.rules,
    ...xo.plugins?.flatMap(plugin => plugin.rules || []).reduce((acc, rules) => ({ ...acc, ...rules }), {})
  },
  ignores: [
    'dist'
  ]
};

// TypeScript 配置
const typescriptConfig = {
  files: [
    '*.ts',
    '*.tsx'
  ],
  languageOptions: {
    globals: {
      // TypeScript 全局变量
    }
  },
  rules: {
    ...xoTypescript.rules,
    '@typescript-eslint/ban-types': 'off',
    'import/extensions': 'off',
    'import/no-named-as-default': 'off',
    'n/prefer-global/process': 'off'
  }
};

export default defineConfig([
  baseConfig,
  typescriptConfig
]);