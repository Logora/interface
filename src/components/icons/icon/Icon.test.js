import React from 'react';
import { render } from '@testing-library/react';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import { Icon } from './Icon';

describe('Icon', () => {
	it('should render nothing if icon is not found', () => {
		const { container } = render(
			<IconProvider libraryName={"myLibrary"}>
				<Icon name={"random"} />
			</IconProvider>
		);

        expect(container).toBeEmptyDOMElement();
	});
});