import React from 'react';
import { DefaultDialogBox, HiddenDialogBox } from './DialogBox.composition';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

it('should render with the correct text', () => {
	const dialog = render(
        <DefaultDialogBox />
	);

    expect(screen.getByText(/Debate/i)).toBeTruthy();
    expect(screen.getByText(/Participate by writing your argument and earn eloquence points/i)).toBeTruthy();
    expect(screen.getByText(/Got it/i)).toBeTruthy();
});

it('should be hidden', () => {
	const dialog = render(
        <HiddenDialogBox />
	);

    expect(screen.queryByText(/Debate/i)).toBeFalsy();
    expect(screen.queryByText(/Participate by writing your argument and earn eloquence points/i)).toBeFalsy();
    expect(screen.queryByText(/Got it/i)).toBeFalsy();
});

it('should close on close button click', async () => {
	const dialog = render(
        <DefaultDialogBox />
	);

    expect(screen.getByText(/Debate/i)).toBeTruthy();
    expect(screen.getByText(/Participate by writing your argument and earn eloquence points/i)).toBeTruthy();
    expect(screen.getByText(/Got it/i)).toBeTruthy();

    await userEvent.click(screen.getByText(/Got it/i))

	expect(screen.queryByText(/Debate/i)).toBeFalsy();
    expect(screen.queryByText(/Participate by writing your argument and earn eloquence points/i)).toBeFalsy();
    expect(screen.queryByText(/Got it/i)).toBeFalsy();
});