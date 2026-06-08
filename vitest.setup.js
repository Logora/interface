import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

globalThis.jest = vi;

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.ResizeObserver = globalThis.ResizeObserver || ResizeObserverMock;
