import React from "react";
import { HeroIconsLibrary } from "./HeroIcons.composition";
import { render, screen } from '@testing-library/react';

describe('Hero icons', () => {
    it ('renders HeroIconsLibrary component', () => {  
        render(<HeroIconsLibrary />);

        const versusIcon = screen.getByTestId("versus-icon");
        expect(versusIcon).toBeTruthy();
        
        const alarmIcon = screen.getByTestId("alarm-icon");
        expect(alarmIcon).toBeTruthy();
    })
});