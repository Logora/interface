import React from 'react';
import { DefaultDrawer } from './Drawer.composition';
import { render, screen } from '@testing-library/react';

describe('Drawer', () => {
    it('should open drawer when clicking on button', async () => {
        render(
            <DefaultDrawer />
        );

        const openButton = screen.getByTestId("open-button");

        expect(openButton).toBeTruthy();
    });
});