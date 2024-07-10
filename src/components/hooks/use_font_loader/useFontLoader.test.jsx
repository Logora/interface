import React from 'react';
import { render } from '@testing-library/react';
import { useFontLoader } from './useFontLoader.js';

const WebFontLoader = require('webfontloader');
const spy = jest.spyOn(WebFontLoader, 'load');

describe('useFontLoader', () => {
  it('should load font correctly', () => {
    const ComponentWithFont = () => {
      useFontLoader(["Droid Sans:300,400,700:latin"]);

      return <div>With font</div>;
    }

    const container = render(<ComponentWithFont />);
    expect(container.getByText('With font')).toBeTruthy();
    expect(spy).toHaveBeenCalledTimes(1);

    spy.mockClear();
  });

  it('should not load font if not enabled', () => {
    const ComponentWithFont = () => {
      useFontLoader(["Droid Sans:300,400,700:latin"], false);

      return <div>Font loader disabled</div>;
    }

    const container = render(<ComponentWithFont />);
    expect(container.getByText('Font loader disabled')).toBeTruthy();
    expect(spy).toHaveBeenCalledTimes(0);

    spy.mockClear();
  });

  it('should not load font if fontFamilies is null', () => {
    const ComponentWithFont = () => {
      useFontLoader(null);

      return <div>Without font</div>;
    }

    const container = render(<ComponentWithFont />);
    expect(container.getByText('Without font')).toBeTruthy();
    expect(spy).toHaveBeenCalledTimes(0);
    
    spy.mockClear();
  });

  it('should not load font if no font families are passed', () => {
    const ComponentWithFont = () => {
      useFontLoader([]);

      return <div>Without font</div>;
    }

    const container = render(<ComponentWithFont />);
    expect(container.getByText('Without font')).toBeTruthy();
    expect(spy).toHaveBeenCalledTimes(0);
    
    spy.mockClear();
  });
})