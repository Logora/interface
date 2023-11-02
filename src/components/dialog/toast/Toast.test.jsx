import React from 'react';
import { render, screen } from '@testing-library/react';
import { ToastWithPoints, DefaultToast } from './Toast.composition';

describe('Toast', () => {
	it('should render with the correct text', () => {
		const dialog = render(
			<DefaultToast />
		);
		expect(screen.getByText("A message !")).toBeTruthy();
	});

	it('should render with points', () => {
		const dialog = render(
			<ToastWithPoints />
		);

		expect(screen.getByText("A message !")).toBeTruthy();
		expect(screen.getByText(34)).toBeTruthy();
	});
})