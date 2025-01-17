import React from "react";
import { BildIconsLibrary } from "./BildIcons.composition";
import { render, screen } from '@testing-library/react';

describe('Bild icons', () => {
    it ('renders BildIconsLibrary component', () => {  
        render(<BildIconsLibrary />);

        const versusIcon = screen.getByTestId("versus-icon");
        expect(versusIcon).toBeTruthy();
        
        const alarmIcon = screen.getByTestId("alarm-icon");
        expect(alarmIcon).toBeTruthy();
    })
});