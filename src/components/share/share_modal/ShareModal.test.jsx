import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ShareModal } from './ShareModal';
import { ModalProvider } from '@logora/debate.dialog.modal';
import { IntlProvider } from 'react-intl';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';

describe('ShareModal', () => {
    it('should render modal with content and title', () => {
        const { getByText, queryAllByRole } = render(
            <ModalProvider>
                <IconProvider library={regularIcons}>
                    <IntlProvider locale="en">
                        <ShareModal 
                            shareUrl="https://app.logora.fr/share/p/48656"
                            shareText="Text"
                            shareTitle="Title"
                            title="Modal title"
                            showShareCode={false}
                        />
                    </IntlProvider>
                </IconProvider>
            </ModalProvider>
        );

        expect(getByText("Modal title")).toBeTruthy();
        expect(document.body.style.overflowY).toEqual("hidden");

        expect(queryAllByRole("button")).toHaveLength(4);
    });

    it('should close on click outside', async () => {
        const { getByRole, getByText, queryAllByRole } = render(
            <ModalProvider>
                <IconProvider library={regularIcons}>
                    <IntlProvider locale="en">
                        <ShareModal 
                            shareUrl="https://app.logora.fr/share/p/48656"
                            shareText="Text"
                            shareTitle="Title"
                            title="Modal title"
                            shareCode='<iframe src="https://api.logora.fr/embed.html?shortname="[...]'
                            showShareCode={true}
                        />
                    </IntlProvider>
                </IconProvider>
            </ModalProvider>
        );

        expect(getByRole("dialog")).toBeTruthy();
        expect(getByText("Modal title")).toBeTruthy();
        expect(queryAllByRole("button")).toHaveLength(5);
        expect(document.body.style.overflowY).toEqual("hidden");
        await userEvent.click(document.body);

        waitForElementToBeRemoved(screen.getByText("Modal title")).then(() =>
            expect(queryAllByRole("button")).toHaveLength(0)
        )
    });
});