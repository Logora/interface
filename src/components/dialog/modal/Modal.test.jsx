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
		expect(document.body.style.overflowY).toEqual("hidden")
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

	it('should focus close button when modal opens', async () => {
		render(
			<IconProvider library={regularIcons}>
				<IntlProvider locale="en">
					<ModalProvider>
						<TestModal />
					</ModalProvider>
				</IntlProvider>
			</IconProvider>
		);

		await userEvent.click(screen.getByTestId("show-modal-button"));

		// Wait for focus to be set
		await new Promise(resolve => setTimeout(resolve, 10));

		const closeButton = screen.getByTestId("close-button");
		expect(document.activeElement).toBe(closeButton);
	});

	it('should close modal when pressing Escape key', async () => {
		render(
			<IconProvider library={regularIcons}>
				<IntlProvider locale="en">
					<ModalProvider>
						<TestModal />
					</ModalProvider>
				</IntlProvider>
			</IconProvider>
		);

		await userEvent.click(screen.getByTestId("show-modal-button"));
		expect(screen.getByRole("dialog")).toBeTruthy();

		// Press Escape key
		await userEvent.keyboard('{Escape}');

		expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
	});

	it('should restore focus to triggering button when modal closes', async () => {
		render(
			<IconProvider library={regularIcons}>
				<IntlProvider locale="en">
					<ModalProvider>
						<TestModal />
					</ModalProvider>
				</IntlProvider>
			</IconProvider>
		);

		const showModalButton = screen.getByTestId("show-modal-button");
		await userEvent.click(showModalButton);

		expect(screen.getByRole("dialog")).toBeTruthy();

		await userEvent.click(screen.getByTestId("close-button"));

		expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
		expect(document.activeElement).toBe(showModalButton);
	});

	it('should trap focus within modal when tabbing', async () => {
		const TestModalWithMultipleElements = () => {
			const { showModal } = useModal();
		
			return (
				<div>
					<button data-testid={"show-modal-button"} onClick={() => showModal(
						<Modal title="my title" showCloseButton>
							<div data-testid="modal-content">
								<button data-testid="button1">Button 1</button>
								<button data-testid="button2">Button 2</button>
							</div>
						</Modal>
					)}>show modal
					</button>
				</div>
			)
		};

		render(
			<IconProvider library={regularIcons}>
				<IntlProvider locale="en">
					<ModalProvider>
						<TestModalWithMultipleElements />
					</ModalProvider>
				</IntlProvider>
			</IconProvider>
		);

		await userEvent.click(screen.getByTestId("show-modal-button"));

		// Wait for focus to be set
		await new Promise(resolve => setTimeout(resolve, 10));

		const closeButton = screen.getByTestId("close-button");
		const button1 = screen.getByTestId("button1");
		const button2 = screen.getByTestId("button2");

		// Initial focus should be on close button
		expect(document.activeElement).toBe(closeButton);

		// Tab to next element
		await userEvent.tab();
		expect(document.activeElement).toBe(button1);

		// Tab to next element
		await userEvent.tab();
		expect(document.activeElement).toBe(button2);

		// Tab should wrap back to first element (close button)
		await userEvent.tab();
		expect(document.activeElement).toBe(closeButton);

		// Shift+Tab should wrap to last element
		await userEvent.tab({ shift: true });
		expect(document.activeElement).toBe(button2);
	});
});