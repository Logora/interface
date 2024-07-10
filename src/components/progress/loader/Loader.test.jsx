import React from "react";
import { render } from "@testing-library/react";
import { Loader } from "./Loader";

describe('Loader', () => {
    it('should render with spinnerBox class', () => {
        const loader = render(<Loader />);
        const renderedLoader = loader.getByRole('status');
        expect(renderedLoader).toBeTruthy();
    });
});