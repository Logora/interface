import React from "react";
import { useCssTheme } from './useCssTheme.js';

const meta = {
  title: 'Hooks/Use Css Theme',
  component: () => null,
  args: {
    variant: 'default'
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'kebab']
    }
  },
  render: ({ variant }) => (variant === 'kebab' ? <ThemeKebabCase /> : <DefaultTheme />)
};

export default meta;

const theme = {
    colorPrimary: "blue",
    colorSecondary: "green",
};

const themeKebabCase = {
    "color-primary": "purple",
    "color-secondary": "green",
};

export const DefaultTheme = () => {
  useCssTheme(theme, "component");

  return <div id="component" style={{ color: "var(--color-primary, pink)" }}>Blue styled component with CSS variables.</div>;
}

export const ThemeKebabCase = () => {
    useCssTheme(themeKebabCase, "componentKebab");
  
    return <div id="componentKebab" style={{ color: "var(--color-secondary, blue)" }}>Green styled component with CSS variables</div>;
}
