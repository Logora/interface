import React, { useEffect } from 'react';
import { render } from '@testing-library/react';
import { useGoogleAdManager } from './useGoogleAdManager.js';

const gptSrc = "https://securepubads.g.doubleclick.net/tag/js/gpt.js";

describe('useGoogleAdManager', () => {
    it('should load GPT script correctly', async () => {
        jest.spyOn(document.body, 'appendChild');

        const ComponentWithGoogleAdManager = () => {
            useGoogleAdManager(true, false);

            return <div>With GoogleAdManager</div>;
        }

        const container = render(<ComponentWithGoogleAdManager />);
        expect(container.getByText('With GoogleAdManager')).toBeTruthy();

        expect(document.body.appendChild).toBeCalledWith(
            expect.objectContaining({
                src: gptSrc,
            })
        );
    });

    it('should load GPT script correctly with didomi consent', () => {
        jest.spyOn(document.body, 'appendChild');

        const ComponentWithGoogleAdManager = () => {
            useGoogleAdManager(true, true);

            return <div>With GoogleAdManager and consent</div>;
        }

        const container = render(<ComponentWithGoogleAdManager />);

        expect(container.getByText('With GoogleAdManager and consent')).toBeTruthy();

        expect(document.body.appendChild).toBeCalledWith(
            expect.objectContaining({
                type: 'didomi/javascript',
                src: gptSrc,
            })
        );
    });
})