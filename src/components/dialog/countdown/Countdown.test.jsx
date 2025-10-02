import React from "react";
import { render, screen } from "@testing-library/react";
import Countdown from "./Countdown";

describe("Countdown", () => {
    it("renders and counts down", () => {
        const now = new Date();
        const expiresAt = new Date(now.getTime() + 3600 * 1000).toISOString();
        render(<Countdown expiresAt={expiresAt} />);
        expect(screen.getByText(/1:00:00|0:59:59/)).toBeInTheDocument();
    });
});
