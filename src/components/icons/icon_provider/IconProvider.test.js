import React from 'react';
import { render, act, screen, waitFor } from '@testing-library/react';
import { IconProvider } from './IconProvider';
import * as regularIcons from '@logora/debate.icons.regular_icons';

const ComponentWithIcons = () => {
	return <div>Hello world !</div>
}

describe('IconProvider', () => {
	it('should render component with icon library', async () => {
		act(()=> {
			render(
				<IconProvider library={regularIcons}>
					<ComponentWithIcons />
				</IconProvider>
			);
		});

		await waitFor(() => {
			expect(screen.getByText(/hello world/i)).toBeTruthy();
		});
	});
});