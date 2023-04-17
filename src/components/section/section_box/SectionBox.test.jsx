import React from 'react';
import { render } from '@testing-library/react';
import { SectionBox } from './SectionBox';

const callback = jest.fn();

it('should render with the correct text', () => {
	const section = render(
        <SectionBox titleText="Section Title">Section Box</SectionBox>
	);
	const renderedSection = section.getByText(/section box/i);
	expect(renderedSection).toBeTruthy();
});