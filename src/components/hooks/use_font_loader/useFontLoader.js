import { useEffect } from 'react';

export const useFontLoader = (fontFamilies, enable = true) => {
  useEffect(() => {
    if(enable && fontFamilies?.length) {
      const WebFontLoader = require('webfontloader');
      WebFontLoader.load({
        google: {
          families: fontFamilies
        }
      });
    }
  }, [enable])

  return null;
}