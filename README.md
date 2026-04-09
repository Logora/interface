# Logora UI

---
Design system for [Logora](https://logora.fr) made with React.

## Public API contract

This package exposes a global public API:

### Root API

```js
import { Button, Modal, useAuth } from "@logora/debate";
```

Use this style by default for developer experience and discoverability.

### Tree-shaking guarantees

- JavaScript modules are tree-shakable with named ESM imports.
- Root imports are supported and expected to be tree-shaken by modern bundlers.
- Avoid namespace imports if tree-shaking matters:

```js
// Avoid for bundle size-sensitive code
import * as Debate from "@logora/debate";
```

### Styles contract

- Components include their own styles (CSS Modules).
- Consumers should not need to import an extra global CSS file for standard component usage.
- Package `sideEffects` is limited to `*.css` and `*.scss` to preserve JS tree-shaking.

### Deprecation policy

- Breaking API changes are introduced only in major versions.
- Deprecated exports should be announced before removal.

## Installation

### Install dependencies

```bash
pnpm install
```

## Run Storybook

```bash
pnpm storybook
```

## Test components

```bash
pnpm test
```

## Coverage

```bash
pnpm test:coverage
```

## Build Storybook

```bash
pnpm build-storybook
```

## Publishing a new version (npm)

```bash
pnpm run build
npm version patch -m "chore(release): %s"
npm login
git push --follow-tags origin master
npm publish --access public
```

Use `minor` or `major` instead of `patch` when needed.