import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FacebookLoginButton } from './FacebookLoginButton';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';

Object.defineProperty(window, 'location', {
	value: {
	  origin: 'http://example.fr',
	}
});

const spyWindowOpen = jest.spyOn(window, 'open');
spyWindowOpen.mockImplementation(jest.fn());

describe('FacebookLoginButton', () => {
	it('should render button with the correct text', () => {
		const facebookLoginButton = render(
			<MemoryRouter>
				<IconProvider library={regularIcons}>
					<FacebookLoginButton 
						text={"Sign in with Facebook"}
						facebookClientId={"client-id"}
						redirectUri={"https://auth.redirect/uri"}
					/>
				</IconProvider>
			</MemoryRouter>
		);
		const renderedButton = facebookLoginButton.getByText(/Sign in with Facebook/i);
		expect(renderedButton).toBeTruthy();
	});

	it('should open popup with correct link on click', async () => {
		spyWindowOpen.mockClear();

		const authDialogUrl = "https://www.facebook.com/v9.0/dialog/oauth";
		const clientId = "facebook-client-id";
		const scope = "email,public_profile";
		const redirectUri = "https://auth.redirect/uri";

		const facebookLoginButton = render(
			<MemoryRouter initialEntries={["/path-name"]}>
				<IconProvider library={regularIcons}>
					<FacebookLoginButton 
						text={"Sign in with Facebook"}
						facebookClientId={clientId}
						redirectUri={redirectUri}
					/>
				</IconProvider>
			</MemoryRouter>
		);
		const renderedButton = screen.getByText(/Sign in with Facebook/i);
		expect(renderedButton).toBeTruthy();

		let expectedUrl = new URL(authDialogUrl);
		expectedUrl.searchParams.append("client_id", clientId);
		expectedUrl.searchParams.append("redirect_uri", redirectUri);
		expectedUrl.searchParams.append("scope", scope);
		expectedUrl.searchParams.append("state", encodeURIComponent(window.btoa('http://example.fr/path-name')));

		await userEvent.click(renderedButton);
		expect(spyWindowOpen).toHaveBeenCalledTimes(1);
		expect(spyWindowOpen).toHaveBeenLastCalledWith(expectedUrl.href, "", "width=500,height=500,left=262,top=107.2");
	});
});