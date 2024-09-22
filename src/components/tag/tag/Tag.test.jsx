import React from 'react';
import { render } from '@testing-library/react';
import { Tag } from './Tag';

describe('Tag', () => {
	it('should render with the correct text', () => {
		const tag = render(
			<Tag text="my-text" />
		);
		const renderedTag = tag.getByText(/my-text/i);
		expect(renderedTag).toBeTruthy();
	});

	it('should render inactive with the correct style', () => {
		const { getByTestId } = render(
			<Tag text="my-text" />
		);
		expect(getByTestId('tag')).toHaveStyle("color: var(--tag-text-color, var(--call-primary-color, #434343))");
	});

	it('should render active with the correct style', () => {
		const { getByTestId } = render(
			<Tag text="my-text" active />
		);
		expect(getByTestId('tag')).toHaveStyle("background-color: var(--tag-border-color, var(--call-primary-color, #434343))");
		expect(getByTestId('tag')).toHaveStyle("color: var(--text-light, white) !important");
	});
});