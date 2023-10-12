import React from 'react';
import { render, act, screen, waitFor } from '@testing-library/react';
import { IconProvider } from './IconProvider';

const ComponentWithIcons = () => {
	return <div>Hello world !</div>
}

describe('IconProvider', () => {
	it('should render component with icon library', async () => {
		act(()=>{
			render(
				<IconProvider libraryName={"regular"}>
					<ComponentWithIcons />
				</IconProvider>
			);
		});

		await waitFor(() => {
			expect(screen.getByText(/hello world/i)).toBeTruthy();
		});
	});
});