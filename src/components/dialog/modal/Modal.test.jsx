import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from './Modal';
import { ModalProvider } from './ModalProvider';
import { useModal } from './useModal';

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
	it('should render modal with content and title',  async () => {
		const modal = render(
			<ModalProvider>
				<TestModal />
			</ModalProvider>
		);

		expect(screen.queryByText("modal content")).toBeNull();

		userEvent.click(screen.getByTestId("show-modal-button"));

		await waitFor(() => {
			expect(screen.getByRole("dialog")).toBeTruthy();
			expect(screen.getByText("modal content")).toBeTruthy();
			expect(screen.getByText("my title")).toBeTruthy()
		});
	});

	it('should render close button if showCloseButotn is true', () => {
		const modal = render(
			<ModalProvider>
				<Modal title="my title" showCloseButton>
					<div data-testid="modal-content">modal content</div>
				</Modal>
			</ModalProvider>
		);

		expect(screen.getByText("modal content")).toBeTruthy()
		expect(screen.getByText("my title")).toBeTruthy()
		expect(screen.getByText("×")).toBeTruthy();
		expect(document.body.style.overflowY).toEqual("hidden")
	});

	it('should close when clicking on close button', async () => {
		const modal = render(
			<ModalProvider>
				<TestModal />
			</ModalProvider>
		);

		expect(screen.queryByRole("dialog")).toBeNull();

		userEvent.click(screen.getByTestId("show-modal-button"));

		await waitFor(() => {
			expect(screen.queryByRole("dialog")).toBeTruthy();
			expect(screen.queryByText("modal content")).toBeTruthy();
			expect(screen.getByText("×")).toBeTruthy();
		});

		userEvent.click(screen.getByText("×"));

		await waitFor(() => {
			expect(screen.queryByText("modal content")).toBeNull();
			expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
		});
	});
});