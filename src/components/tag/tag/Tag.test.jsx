import React from 'react';
import { render } from '@testing-library/react';
import { Tag } from './Tag';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';

describe('Tag', () => {
	it('should render with the correct text', () => {
		const tag = render(
			<IconProvider library={regularIcons}>
				<Tag text="my-text" />
			</IconProvider>
		);
		const renderedTag = tag.getByText(/my-text/i);
		expect(renderedTag).toBeTruthy();
	});

	it('should render inactive with the correct style', () => {
		const { getByTestId } = render(
			<IconProvider library={regularIcons}>
				<Tag text="my-text" />
			</IconProvider>
		);
		expect(getByTestId('tag')).toHaveStyle("color: var(--tag-text-color, var(--call-primary-color, #434343))");
	});

	it('should render active with the correct style', () => {
		const { getByTestId } = render(
			<IconProvider library={regularIcons}>
				<Tag text="my-text" active />
			</IconProvider>
		);
		expect(getByTestId('tag')).toHaveStyle("background-color: var(--tag-border-color, var(--call-primary-color, #434343))");
		expect(getByTestId('tag')).toHaveStyle("color: var(--text-light, white) !important");
	});
});