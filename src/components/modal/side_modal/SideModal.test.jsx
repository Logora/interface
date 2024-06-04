import React from "react";
import { render, screen } from "@testing-library/react";
import { SideModalExample, SideModalWithNeutralPosition, SideModalWithDisabledPositions } from "./SideModal.composition";

describe("SideModal", () => {
    it("should appear with all the right default values", async () => {
        render(<SideModalExample />);
        expect(screen.getByText("Example Debate")).toBeInTheDocument();
        expect(screen.getByText("Choose your side")).toBeInTheDocument();
    });

    it("should appear with 2 Buttons", async () => {
        render(<SideModalExample />);
        const buttons = screen.getAllByRole("button");
        expect(buttons.length).toBe(2);
    });

    it("should render with warning when neutral is true", async () => {
        render(<SideModalWithNeutralPosition />);
        expect(screen.getByText("It is not possible to write an argument with this one. If you wish to participate in the debate, choose one of the positions displayed above.")).toBeInTheDocument();
    });

    it("should render with warning when disabled positions", async () => {
        render(<SideModalWithDisabledPositions />);
        expect(screen.getByText("You have already reached the argument limit (10) for position Position B. You can support the other position.")).toBeInTheDocument();
    });
});
