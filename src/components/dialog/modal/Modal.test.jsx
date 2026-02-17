import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from './Modal';
import { ModalProvider } from './ModalProvider';
import { useModal } from './useModal';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import { IntlProvider } from "react-intl";
import * as regularIcons from '@logora/debate.icons.regular_icons';

const TestModal = () => {
	const { showModal } = useModal();

	return (
		<div>
			<button data-testid={"show-modal-button"} onClick={() => showModal(
				<Modal title="my title" showCloseButton>
					<div data-testid="modal-content">modal content</div>
				</Modal>
			)}>show modal
			</button>
		</div>
	)
}

describe('Modal', () => {
	it('should render modal with content and title', async () => {
		const modal = render(
			<IconProvider library={regularIcons}>
				<IntlProvider locale="en">
					<ModalProvider>
						<TestModal />
					</ModalProvider>
				</IntlProvider>
			</IconProvider>
		);

		expect(screen.queryByText("modal content")).toBeNull();

		await userEvent.click(screen.getByTestId("show-modal-button"));

		expect(screen.getByRole("dialog")).toBeTruthy();
		expect(screen.getByText("modal content")).toBeTruthy();
		expect(screen.getByText("my title")).toBeTruthy()
	});

	it('should render close button if showCloseButotn is true', () => {
		const modal = render(
			<IconProvider library={regularIcons}>
				<IntlProvider locale="en">
					<ModalProvider>
						<Modal title="my title" showCloseButton>
							<div data-testid="modal-content">modal content</div>
						</Modal>
					</ModalProvider>
				</IntlProvider>
			</IconProvider>
		);

		expect(screen.getByText("modal content")).toBeTruthy()
		expect(screen.getByText("my title")).toBeTruthy()
		expect(screen.getByTestId("close-button")).toBeTruthy();
	});

	it('should close when clicking on close button', async () => {
		const modal = render(
			<IconProvider library={regularIcons}>
				<IntlProvider locale="en">
					<ModalProvider>
						<TestModal />
					</ModalProvider>
				</IntlProvider>
			</IconProvider>
		);

		expect(screen.queryByRole("dialog")).toBeNull();

		await userEvent.click(screen.getByTestId("show-modal-button"));

		expect(screen.queryByRole("dialog")).toBeTruthy();
		expect(screen.queryByText("modal content")).toBeTruthy();
		expect(screen.getByTestId("close-button")).toBeTruthy();

		await userEvent.click(screen.getByTestId("close-button"));

		expect(screen.queryByText("modal content")).toBeNull();
		expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
	});
});