import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ModalProvider } from './ModalProvider';
import { useModal } from './useModal';

const Modal = () => {
	const { hideModal } = useModal();

	return <div data-testid="modal" id="closeModal" onClick={hideModal}>close modal</div>
}

const UseModalComponent = () => {
	const { showModal } = useModal();

	return <div data-testid="modal-consumer" onClick={() => showModal(<Modal />)}>open modal</div>;
}

describe('ModalProvider', () => {
	it('should show and hide modal when consumed', async () => {
		const modalApp = render(
			<ModalProvider>
				<UseModalComponent />
			</ModalProvider>
		);

		expect(modalApp.getByText(/open modal/i)).toBeTruthy()
		expect(modalApp.queryByTestId("modal")).toBeNull()

		await userEvent.click(modalApp.getByText('open modal'))

		expect(modalApp.queryByTestId("modal")).toBeTruthy()
		expect(modalApp.getByText(/close modal/i)).toBeTruthy()

		await userEvent.click(modalApp.getByText('close modal'))

		expect(modalApp.queryByText(/my modal/i)).toBeNull()
	});
});