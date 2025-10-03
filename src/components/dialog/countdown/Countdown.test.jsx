import React from "react";
import { render, screen } from "@testing-library/react";
import { Countdown } from "./Countdown";

describe("Countdown", () => {
    it("renders and shows time left in minutes (default locale)", () => {
        const now = new Date();
        const expiresAt = new Date(now.getTime() + 61 * 60 * 1000).toISOString();
        render(<Countdown expiresAt={expiresAt} />);
        const regex = /in (6[01]) minutes?|now/i;
        expect(screen.getByText(regex)).toBeInTheDocument();
    });

    it("shows 'now' or localized equivalent when expired", () => {
        const now = new Date();
        const expiresAt = new Date(now.getTime() - 1000).toISOString();
        render(<Countdown expiresAt={expiresAt} />);
        expect(screen.getByText(/now|this minute?/i)).toBeInTheDocument();
    });

    it("renders in a different locale (French)", () => {
        const now = new Date();
        const expiresAt = new Date(now.getTime() + 2 * 60 * 1000).toISOString();
        render(<Countdown expiresAt={expiresAt} locale="fr" />);
        expect(screen.getByText(/dans 2 minutes?/i)).toBeInTheDocument();
    });
});
