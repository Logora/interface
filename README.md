# Logora UI

---
Design system for [Logora](https://logora.fr) made with React.

This repository is now running with open source tooling (pnpm, Vitest, Storybook).

## Public API contract

This package exposes a hybrid public API with two supported import styles:

### 1) Root API (default)

```js
import { Button, Modal, useAuth } from "@logora/debate";
```

Use this style by default for developer experience and discoverability.

### 2) Subpath API (supported)

```js
import { Button } from "@logora/debate/action/button";
import { Modal } from "@logora/debate/dialog/modal";
import { useAuth } from "@logora/debate/auth/use_auth";
```

Use this style when you want explicit module-level imports in performance-sensitive areas.

### Tree-shaking guarantees

- JavaScript modules are tree-shakable with named ESM imports.
- Root imports are supported and expected to be tree-shaken by modern bundlers.
- Subpath imports remain available for strict control over dependency boundaries.
- Avoid namespace imports if tree-shaking matters:

```js
// Avoid for bundle size-sensitive code
import * as Debate from "@logora/debate";
```

### Styles contract

- Components include their own styles (CSS Modules).
- Consumers should not need to import an extra global CSS file for standard component usage.
- Package `sideEffects` is limited to `*.css` and `*.scss` to preserve JS tree-shaking.

### Compatibility policy

- Paths exposed through package exports are public API.
- Root exports and documented subpaths follow semantic versioning.
- Internal files not exposed by package exports are private and may change without notice.

### Deprecation policy

- Breaking API changes are introduced only in major versions.
- Deprecated exports should be announced before removal.
- During deprecation windows, keep both old and new imports when possible.

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
git push --follow-tags origin master
npm publish --access public
```

Use `minor` or `major` instead of `patch` when needed.