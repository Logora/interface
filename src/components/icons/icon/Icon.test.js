import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import { Icon } from './Icon';
import * as regularIcons from '@logora/debate.icons.regular_icons';

describe('Icon', () => {
	it('should render icon', async () => {
		render(
			<IconProvider library={regularIcons}>
				<Icon data-testid={"test-icon"} name={"italic"} />
			</IconProvider>
		);

		await waitFor(() => {
        	expect(screen.queryByTestId("test-icon")).toBeTruthy();
		});
	});

	it('should render nothing if icon is not found', async () => {
		render(
			<IconProvider library={regularIcons}>
				<Icon data-testid={"test-icon"} name={"random"} />
			</IconProvider>
		);

		await waitFor(() => {
        	expect(screen.queryByTestId("test-icon")).toBeNull();
		});
	});
});