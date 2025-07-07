# Next.js 15 + StyleX Template

A modern Next.js 15 template configured with StyleX for atomic CSS-in-JS styling.

## Quick Start

```bash
npm install
npm run dev
```

## Setup Guide

### 1. Install StyleX Dependencies

```bash
npm install --save @stylexjs/stylex
npm install --save-dev @stylexjs/eslint-plugin
```

### 2. Configure ESLint

```javascript
const eslintConfig = [
  {
    plugins: {
      '@stylexjs': styleXPlugin
    },
    rules: {
      "@stylexjs/valid-styles": "error",
      '@stylexjs/no-unused': "error",
      '@stylexjs/valid-shorthands': "warning",
      '@stylexjs/sort-keys': "warning"
    }
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];
```

### 3. Install SWC Plugin

```bash
npm install --save-dev @stylexswc/nextjs-plugin
```

### 4. Disable Turbopack

Update `package.json` to use Webpack instead of Turbopack for development.

## Technical Background

### Compilation Strategy

- **Next.js 15**: Uses SWC transpiler by default
- **StyleX**: Originally designed for Babel transpiler + PostCSS
- **Solution**: Use [@stylexswc/nextjs-plugin](https://github.com/Dwlad90/stylex-swc-plugin) to bridge this gap

### Plugin Architecture

The `@stylexswc/nextjs-plugin` consists of two core dependencies:

#### `@stylexswc/rs-compiler` (v0.9.0)

- **What it is**: Rust-based StyleX compiler using NAPI-RS (Native API for Rust)
- **SWC Integration**: Leverages SWC's parsing infrastructure for faster compilation
- **Benefits**: Native performance, memory efficiency, SWC compatibility
- **Role**: Transforms StyleX syntax to optimized CSS at compile time

#### `@stylexswc/webpack-plugin` (v0.9.0)

- **Webpack Dependency**: Requires Webpack for build integration
- **Turbopack Limitation**: Cannot use Turbopack due to Webpack-specific implementation
- **Features**: Asset management, CSS extraction, HMR support
- **Integration**: Bridges rs-compiler with Next.js build process

### Webpack vs Turbopack

Currently uses Webpack because:

- **Plugin Limitation**: `@stylexswc/webpack-plugin` is Webpack-specific
- **No Turbopack Support**: rs-compiler cannot integrate with Turbopack yet
- **Next.js Default**: Webpack remains the primary bundler in Next.js 15
- **Development**: Turbopack is recommended for dev-only, not production builds

## Configuration Options

For detailed configuration options, see the [plugin documentation](https://github.com/Dwlad90/stylex-swc-plugin/tree/develop/packages/nextjs-plugin).

**Note**: `transformCss` option is optional and only needed for specific use cases.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── page.styles.ts
├── components/
│   └── Button/
│       ├── Button.tsx
│       ├── Button.styles.ts
│       └── index.ts
└── tokens/
    └── index.stylex.ts
```

## Learn More

- [StyleX Documentation](https://stylexjs.com)
- [Next.js 15 Documentation](https://nextjs.org/docs)
- [StyleX SWC Plugin](https://github.com/Dwlad90/stylex-swc-plugin)
