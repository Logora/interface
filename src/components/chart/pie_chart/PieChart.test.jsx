import React from "react";
import { DefaultPieChart } from "./PieChart.composition";
import { render, screen } from '@testing-library/react';

describe('PieChart', () => {
    it ('renders PieChart component', () => {  
        const container = render(
            <DefaultPieChart />
        );
        expect(screen.getByTestId("pieChartCanvas")).toBeTruthy();
    })
})