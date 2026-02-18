import React from 'react';
import { fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConfirmModal } from './ConfirmModal';
import { ModalProvider } from '@logora/debate.dialog.modal';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import { IntlProvider } from "react-intl";
import * as regularIcons from '@logora/debate.icons.regular_icons';

beforeAll(() => {
    HTMLDialogElement.prototype.showModal = function () {
      this.setAttribute("open", "");
    };
    HTMLDialogElement.prototype.close = function () {
      this.removeAttribute("open");
    };
  });

describe('ConfirmModal', () => {
	it('should render modal with content and title', () => {
		const modal = render(
			<IconProvider library={regularIcons}>
				<IntlProvider locale="en">
				<ModalProvider>
					<ConfirmModal 
						title="confirm modal title" 
						question="are you sure ?"
						confirmLabel="yes"
						cancelLabel="no"
					/>
				</ModalProvider>
				</IntlProvider>
			</IconProvider>
		);

		expect(screen.getByText("confirm modal title")).toBeTruthy()
		expect(screen.getByText("are you sure ?")).toBeTruthy()
		expect(screen.getByText("yes")).toBeTruthy()
		expect(screen.getByText("no")).toBeTruthy()
		expect(screen.getByRole("dialog")).toHaveAttribute("open");
	});

	it('should close on click outside', async () => {
		const modal = render(
			<IconProvider library={regularIcons}>
				<IntlProvider locale="en">
				<ModalProvider>
					<ConfirmModal 
						title="confirm modal title" 
						question="are you sure ?"
						confirmLabel="yes"
						cancelLabel="no"
					/>
				</ModalProvider>
				</IntlProvider>
			</IconProvider>
		);

		expect(screen.getByRole("dialog")).toBeTruthy()
		expect(screen.getByText("are you sure ?")).toBeTruthy()
		expect(screen.getByRole("dialog")).toHaveAttribute("open");
		await userEvent.click(document.body)

		waitForElementToBeRemoved(screen.getByText("are you sure ?")).then(() =>
			expect(screen.queryByRole("dialog")).toBeNull()
		)
	});

	/*
	it('should close when clicking on confirm button', async () => {
		const modal = render(
			<IconProvider library={regularIcons}>
				<ModalProvider>
					<ConfirmModal 
						title="confirm modal title" 
						question="are you sure ?"
						confirmLabel="yes"
						cancelLabel="no"
					/>
				</ModalProvider>
			</IconProvider>
		);

		expect(screen.getByRole("dialog")).toBeTruthy()
		expect(screen.getByText("are you sure ?")).toBeTruthy()
		expect(document.body.style.overflowY).toEqual("hidden")
		await userEvent.click(screen.getByText("yes"))

		waitForElementToBeRemoved(screen.getByText("are you sure ?")).then(() =>
			expect(screen.queryByRole("dialog")).toBeNull()
		)
	});
	*/

	/*
	it('should close when clicking on cancel button', async () => {
		const modal = render(
			<IconProvider library={regularIcons}>
				<ModalProvider>
					<ConfirmModal 
						title="confirm modal title" 
						question="are you sure ?"
						confirmLabel="yes"
						cancelLabel="no"
					/>
				</ModalProvider>
			</IconProvider>
		);

		expect(screen.getByRole("dialog")).toBeTruthy()
		expect(screen.getByText("are you sure ?")).toBeTruthy()
		expect(document.body.style.overflowY).toEqual("hidden")
		await userEvent.click(screen.getByText("no"))

		waitForElementToBeRemoved(screen.getByText("are you sure ?")).then(() =>
			expect(screen.queryByRole("dialog")).toBeNull()
		)
	});
	*/

	it('should trigger confirm callback when clicking confirm', async () => {
		const confirmCallback = jest.fn();

		const modal = render(
			<IconProvider library={regularIcons}>
				<IntlProvider locale="en">
				<ModalProvider>
					<ConfirmModal 
						title="confirm modal title" 
						question="are you sure ?"
						confirmLabel="yes"
						cancelLabel="no"
						onConfirmCallback={confirmCallback}
					/>
				</ModalProvider>
				</IntlProvider>
			</IconProvider>
		);

		expect(screen.getByRole("dialog")).toBeTruthy()
		expect(screen.getByText("are you sure ?")).toBeTruthy()
		expect(screen.getByRole("dialog")).toHaveAttribute("open");
		const confirmButton = modal.getByText(/yes/i);
		fireEvent.click(confirmButton)

		await expect(confirmCallback).toHaveBeenCalled();
	});

	it('should trigger cancel callback when clicking cancel', async () => {
		const cancelCallback = jest.fn();

		const modal = render(
			<IconProvider library={regularIcons}>
				<IntlProvider locale="en">
				<ModalProvider>
					<ConfirmModal 
						title="confirm modal title" 
						question="are you sure ?"
						confirmLabel="yes"
						cancelLabel="no"
						onCancelCallback={cancelCallback}
					/>
				</ModalProvider>
				</IntlProvider>
			</IconProvider>
		);

		expect(screen.getByRole("dialog")).toBeTruthy()
		expect(screen.getByText("are you sure ?")).toBeTruthy()
		expect(screen.getByRole("dialog")).toHaveAttribute("open");
		const confirmButton = modal.getByText(/no/i);
		fireEvent.click(confirmButton)

		await expect(cancelCallback).toHaveBeenCalled();
	});
});