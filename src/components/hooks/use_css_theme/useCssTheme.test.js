import React from 'react';
import { render } from '@testing-library/react';
import { DefaultTheme, ThemeKebabCase } from './useCssTheme.composition';

const theme = {
  colorPrimary: "blue",
  colorSecondary: "green",
};

const themeKebabCase = {
  "color-primary": "purple",
  "color-secondary": "green",
};

describe('MyComponent', () => {
  test('should apply theme styles to root element', () => {
    render(<DefaultTheme />);

    const root = document.getElementById('component');
    expect(root.style.getPropertyValue('--color-primary')).toBe(theme.colorPrimary);
    expect(root.style.getPropertyValue('--color-secondary')).toBe(theme.colorSecondary);
  });

  test('should apply if camelCase prop is false', () => {
    render(<ThemeKebabCase />);

    const root = document.getElementById('componentKebab');
    expect(root.style.getPropertyValue('--color-primary')).toBe(themeKebabCase['color-primary']);
    expect(root.style.getPropertyValue('--color-secondary')).toBe(themeKebabCase['color-secondary']);
  });
});
