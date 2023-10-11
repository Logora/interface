import React from 'react';
import { render, screen } from '@testing-library/react';
import { AlertDialogWithPoints, DefaultAlertDialog } from './AlertDialog.composition';

describe('AlertDialog', () => {
	it('should render with the correct text', () => {
		const dialog = render(
			<DefaultAlertDialog />
		);
		expect(screen.getByText("A message !")).toBeTruthy();
	});

	it('should render with points', () => {
		const dialog = render(
			<AlertDialogWithPoints />
		);

		expect(screen.getByText("A message !")).toBeTruthy();
		expect(screen.getByText(34)).toBeTruthy();
	});
})