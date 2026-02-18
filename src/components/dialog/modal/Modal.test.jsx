import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from './Modal';
import { ModalProvider } from './ModalProvider';
import { useModal } from './useModal';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import { IntlProvider } from "react-intl";
import * as regularIcons from '@logora/debate.icons.regular_icons';

beforeAll(() => {
  if (typeof HTMLDialogElement !== 'undefined') {
    if (!HTMLDialogElement.prototype.showModal) {
      HTMLDialogElement.prototype.showModal = function () {
        this.setAttribute('open', '');
      };
    }
    if (!HTMLDialogElement.prototype.close) {
      HTMLDialogElement.prototype.close = function () {
        this.removeAttribute('open');
        this.dispatchEvent(new Event('close'));
      };
    }
  }
});

const TestModal = () => {
  const { showModal } = useModal();

  return (
    <div>
      <button
        data-testid="show-modal-button"
        onClick={() =>
          showModal(
            <Modal title="my title" showCloseButton>
              <div data-testid="modal-content">modal content</div>
            </Modal>
          )
        }
      >
        show modal
      </button>
    </div>
  );
};

describe('Modal', () => {
  it('should render modal with content and title', async () => {
    const user = userEvent.setup();

    render(
      <IconProvider library={regularIcons}>
        <IntlProvider locale="en">
          <ModalProvider>
            <TestModal />
          </ModalProvider>
        </IntlProvider>
      </IconProvider>
    );

    expect(screen.queryByText("modal content")).toBeNull();

    await user.click(screen.getByTestId("show-modal-button"));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("modal content")).toBeInTheDocument();
    expect(screen.getByText("my title")).toBeInTheDocument();
  });

  it('should render close button if showCloseButton is true', () => {
    render(
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

    expect(screen.getByText("modal content")).toBeInTheDocument();
    expect(screen.getByText("my title")).toBeInTheDocument();
    expect(screen.getByTestId("close-button")).toBeInTheDocument();
  });

  it('should close when clicking on close button', async () => {
    const user = userEvent.setup();

    render(
      <IconProvider library={regularIcons}>
        <IntlProvider locale="en">
          <ModalProvider>
            <TestModal />
          </ModalProvider>
        </IntlProvider>
      </IconProvider>
    );

    expect(screen.queryByRole("dialog")).toBeNull();

    await user.click(screen.getByTestId("show-modal-button"));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("modal content")).toBeInTheDocument();
    expect(screen.getByTestId("close-button")).toBeInTheDocument();

    await user.click(screen.getByTestId("close-button"));

    expect(screen.queryByText("modal content")).toBeNull();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
