import React from 'react';
import { DefaultDrawer } from './Drawer.composition';

describe('Drawer', () => {
    it('should open drawer when clicking on button', async () => {
        render(
            <DefaultDrawer />
        );

        const openButton = screen.getByTestId("open-button");

        expect(openButton).toBeTruthy();
    });
});