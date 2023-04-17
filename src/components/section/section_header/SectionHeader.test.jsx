import React from 'react';
import { render } from '@testing-library/react';
import { SectionHeader } from './SectionHeader';

const callback = jest.fn();

it('should render with the correct text', () => {
	const section = render(
        <SectionHeader titleText="Section Title" />
	);
	const renderedSection = section.getByText(/section title/i);
	expect(renderedSection).toBeTruthy();
});