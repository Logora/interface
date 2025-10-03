import React from "react";
import { render, screen } from "@testing-library/react";
import { Countdown } from "./Countdown";

describe("Countdown", () => {
    it("shows time left in days if more than 1 day", () => {
        const now = new Date();
        const expiresAt = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(); // 2 days from now
        render(<Countdown expiresAt={expiresAt} />);
        expect(screen.getByText(/in 2 days?/i)).toBeInTheDocument();
    });

    it("shows time left in days for a large minute value (regression test)", () => {
        const now = new Date();
        const expiresAt = new Date(now.getTime() + 1805 * 60 * 1000).toISOString();
        render(<Countdown expiresAt={expiresAt} />);
        expect(screen.getByText(/in 1 day/i)).toBeInTheDocument();
    });

    it("shows time left in hours if more than 1 hour but less than a day", () => {
        const now = new Date();
        const expiresAt = new Date(now.getTime() + 3 * 60 * 60 * 1000).toISOString(); // 3 hours from now
        render(<Countdown expiresAt={expiresAt} />);
        expect(screen.getByText(/in 3 hours?/i)).toBeInTheDocument();
    });

    it("shows time left in minutes if less than 1 hour", () => {
        const now = new Date();
        const expiresAt = new Date(now.getTime() + 15 * 60 * 1000).toISOString(); // 15 minutes from now
        render(<Countdown expiresAt={expiresAt} />);
        expect(screen.getByText(/in 14 minutes?/i)).toBeInTheDocument();
    });

    it("shows 'now' or localized equivalent when expired", () => {
        const now = new Date();
        const expiresAt = new Date(now.getTime() - 1000).toISOString();
        render(<Countdown expiresAt={expiresAt} />);
        expect(screen.getByText(/now|this minute?/i)).toBeInTheDocument();
    });

    it("renders in a different locale (French)", () => {
        const now = new Date();
        const expiresAt = new Date(now.getTime() + 2 * 60 * 60 * 1000).toISOString(); // 2 hours from now
           render(<Countdown expiresAt={expiresAt} locale="fr" />);
           const text = screen.getByText((content) => /dans [12] heure/i.test(content));
           expect(text).toBeInTheDocument();
    });
});
