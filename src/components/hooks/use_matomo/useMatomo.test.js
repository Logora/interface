import React from 'react';
import { render } from '@testing-library/react';
import { useMatomo } from './useMatomo.js';

const matomoHost = "analytics.mysite.com";
const matomoTag = "3R2zBYFH";

describe('useMatomo', () => {
  it('should load Matomo script correctly', () => {
    const ComponentWithMatomo = () => {
      useMatomo(matomoHost, matomoTag);

      return <div>With Matomo</div>;
    }

    const container = render(<ComponentWithMatomo />);
    expect(container.getByText('With Matomo')).toBeTruthy();

    const script = document.querySelector('script');
    expect(script).toBeTruthy();
    expect(script.src).toContain(matomoHost);
    expect(script.src).toContain(matomoTag);
  });
})