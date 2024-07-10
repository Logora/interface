import React from "react";
import { RegularIconsLibrary } from "./RegularIcons.composition";
import { render, screen } from '@testing-library/react';

describe('regular icons', () => {
    it ('renders RegularIconsLibrary component', () => {  
        render(<RegularIconsLibrary />);

        const versusIcon = screen.getByTestId("versus-icon");
        expect(versusIcon).toBeTruthy();
        
        const alarmIcon = screen.getByTestId("alarm-icon");
        expect(alarmIcon).toBeTruthy();
    })
});