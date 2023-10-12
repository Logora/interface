import React from 'react';
import { render } from '@testing-library/react';
import { IconProvider } from './IconProvider';

const ComponentWithIcons = () => {
	return <div>Hello world !</div>
}

describe('IconProvider', () => {
	it('should render component with icon library', () => {
		const container = render(
			<IconProvider libraryName={"myLibrary"}>
				<ComponentWithIcons />
			</IconProvider>
		);

		expect(container.getByText(/hello world/i)).toBeTruthy()
	});
});