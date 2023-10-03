import React from 'react';
import { render } from '@testing-library/react';
import { useGoogleAdManager } from './useGoogleAdManager.js';

const gptSrc = "https://securepubads.g.doubleclick.net/tag/js/gpt.js";

describe('useGoogleAdManager', () => {
    it('should load GPT script correctly', () => {
        const ComponentWithGoogleAdManager = () => {
            useGoogleAdManager(true, false);

            return <div>With GoogleAdManager</div>;
        }

        const container = render(<ComponentWithGoogleAdManager />);
        expect(container.getByText('With GoogleAdManager')).toBeTruthy();

        const script = document.querySelector('script');
        expect(script).toBeTruthy();
        expect(script.src).toContain(gptSrc);
    });

    it('should load Matomo script correctly with didomi consent', () => {
        const ComponentWithGoogleAdManager = () => {
            useGoogleAdManager(true, false);

            return <div>With GoogleAdManager and consent</div>;
        }

        const container = render(<ComponentWithGoogleAdManager />);
        expect(container.getByText('With GoogleAdManager and consent')).toBeTruthy();

        const script = document.querySelector('script');
        expect(script).toBeTruthy();
        expect(script.src).toContain(gptSrc);
        expect(script).toHaveAttribute('type', 'didomi/javascript');
    });
})