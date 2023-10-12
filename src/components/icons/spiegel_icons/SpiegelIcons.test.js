import React from "react";
import { SpiegelIconsLibrary } from "./SpiegelIcons.composition";
import { render, screen } from '@testing-library/react';

describe('Spiegel icons', () => {
    it ('renders SpiegelIconsLibrary component', () => {  
        render(<SpiegelIconsLibrary />);

        const versusIcon = screen.getByTestId("versus-icon");
        expect(versusIcon).toBeTruthy();
        
        const alarmIcon = screen.getByTestId("alarm-icon");
        expect(alarmIcon).toBeTruthy();
    })
});