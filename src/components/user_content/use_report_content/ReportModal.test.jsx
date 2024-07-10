import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DefaultReportModal } from './ReportModal.composition';

describe('ReportModal', () => {
	it('should render modal with content and title', () => {
		const modal = render(
			<DefaultReportModal />
		);

		expect(screen.getByText("Report this argument")).toBeTruthy();
		expect(screen.getByRole('textbox')).toBeTruthy();
	});

	it('should render dropdown', async () => {
		const modal = render(
			<DefaultReportModal />
		);

		const dropdownButton = screen.getByText("Incivility");
        await act(async () => { await userEvent.click(dropdownButton) });

        expect(screen.getByText("Incomprehensibility")).toBeTruthy();
	});
})