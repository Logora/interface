import React from 'react';
import { MemoryRouter } from 'react-router';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GoogleLoginButton } from './GoogleLoginButton';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';

Object.defineProperty(window, 'location', {
	value: {
	  origin: 'http://example.fr',
	}
});

const spyWindowOpen = jest.spyOn(window, 'open');
spyWindowOpen.mockImplementation(jest.fn());

describe('GoogleLoginButton', () => {
	it('should render button with the correct text', () => {
		const googleLoginButton = render(
			<MemoryRouter>
				<IconProvider library={regularIcons}>
					<GoogleLoginButton 
						text={"Sign in with Google"}
						googleClientId={"client-id"}
						redirectUri={"https://auth.redirect/uri"}
					/>
				</IconProvider>
			</MemoryRouter>
		);
		const renderedButton = googleLoginButton.getByText(/Sign in with Google/i);
		expect(renderedButton).toBeTruthy();
	});

	it('should open popup with correct link on click', async () => {
		spyWindowOpen.mockClear();

		const authDialogUrl = "https://accounts.google.com/o/oauth2/v2/auth";
		const clientId = "google-client-id";
		const scope = "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";
		const redirectUri = "https://auth.redirect/uri";

		const googleLoginButton = render(
			<MemoryRouter initialEntries={["/path-name"]}>
				<IconProvider library={regularIcons}>
					<GoogleLoginButton 
						text={"Sign in with Google"}
						googleClientId={clientId}
						redirectUri={redirectUri}
					/>
				</IconProvider>
			</MemoryRouter>
		);
		const renderedButton = screen.getByText(/Sign in with Google/i);
		expect(renderedButton).toBeTruthy();

		let expectedUrl = new URL(authDialogUrl);
		expectedUrl.searchParams.append("client_id", clientId);
		expectedUrl.searchParams.append("redirect_uri", redirectUri);
		expectedUrl.searchParams.append("scope", scope);
		expectedUrl.searchParams.append("response_type", "code");
		expectedUrl.searchParams.append("state", encodeURIComponent(window.btoa('http://example.fr/path-name')));

		await userEvent.click(renderedButton);
		expect(spyWindowOpen).toHaveBeenCalledTimes(1);
		expect(spyWindowOpen).toHaveBeenLastCalledWith(expectedUrl.href, "", "width=500,height=500,left=262,top=107.2");
	});
});