import React, { useEffect } from "react";

export const useCssTheme = (theme, rootId, camelCase = true) => {
  useEffect(() => {
    if(theme && rootId) {
      updateTheme(theme, rootId);
    }
  }, []);

  const updateTheme = (theme, rootId) => {
    const root = document.getElementById(rootId);
    if(root) {
      Object.keys(theme).map((key) => {
        if(theme[key]) {
          return root.style.setProperty(toVariable(key), theme[key]);
        }
      });
    }
  }

  const toVariable = (str) => {
    const kebabCase = camelCase ? str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`) : str;
    return '--' + kebabCase;
  }

  return null;
}