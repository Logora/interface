import React from "react";
import { KroneIconsLibrary } from "./KroneIcons.composition";
import { render, screen } from '@testing-library/react';

describe('Krone icons', () => {
    it ('renders KroneIconsLibrary component', () => {  
        render(<KroneIconsLibrary />);

        const arrowdropdown = screen.getByTestId("arrowdropdown-icon");
        expect(arrowdropdown).toBeTruthy();
        
        const checkbox = screen.getByTestId("checkbox-icon");
        expect(checkbox).toBeTruthy();
    })
});