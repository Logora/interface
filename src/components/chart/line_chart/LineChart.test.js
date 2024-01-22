import React from "react";
import { DefaultLineChart } from "./LineChart.composition";
import { render, screen } from '@testing-library/react';

describe('LineChart', () => {
    it ('renders LineChart component', () => {  
        const container = render(
            <DefaultLineChart />
        );
        expect(screen.getByTestId("lineChartCanvas")).toBeTruthy();
    })
})