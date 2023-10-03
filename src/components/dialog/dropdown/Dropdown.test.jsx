import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dropdown } from './Dropdown';

describe('Dropdown', () => {
	it('should render a dropdown with first child has button', () => {
		const dropdown = render(
			<Dropdown>
				<div>Title</div>
				<>
					<p>Child 1</p>
					<p>Child 2</p>
				</>
			</Dropdown>
		);
		const renderedDropdown = dropdown.getByText(/Title/i);
		expect(renderedDropdown).toBeTruthy();
	});

	it('should display children when clicking on title', async () => {
		const dropdown = render(
			<Dropdown>
				<div>Title</div>
				<>
					<p>Child 1</p>
					<p>Child 2</p>
				</>
			</Dropdown>
		);
		const dropdownTitle = dropdown.getByText(/Title/i);
		expect(dropdown.queryByText(/Child 1/i)).toBeNull();
		expect(dropdown.queryByText(/Child 2/i)).toBeNull();

		await userEvent.click(dropdownTitle);
		
		expect(dropdown.getByText(/Child 1/i)).toBeTruthy();
		expect(dropdown.getByText(/Child 2/i)).toBeTruthy();
	});

	it('should close on click outside', async () => {
		const dropdown = render(
			<Dropdown>
				<div>Title</div>
				<>
					<p>Child 1</p>
					<p>Child 2</p>
				</>
			</Dropdown>
		);

		await userEvent.click(dropdown.getByText(/Title/i));
		
		expect(dropdown.getByText(/Child 1/i)).toBeTruthy();
		expect(dropdown.getByText(/Child 2/i)).toBeTruthy();

		await userEvent.click(document.body);

		expect(dropdown.queryByText(/Child 1/i)).toBeNull();
		expect(dropdown.queryByText(/Child 2/i)).toBeNull();
	});

	it('should close when an item from the list is clicked', async () => {
		const ChildContainer = () => {
			return (
				<>
					Child 1
				</>
			)
		}
		const dropdown = render(
			<Dropdown closeOnContentClick>
				<div>Title</div>
				<ChildContainer />
			</Dropdown>
		);

		await userEvent.click(screen.getByText(/Title/i));

		expect(screen.getByText(/Child 1/i)).toBeTruthy();

		await userEvent.click(screen.getByText(/Child 1/i));

		expect(screen.queryByText(/Child 1/i)).toBeNull();
	});

	it('should call onClick when clicking on button', async () => {
		const callback = jest.fn();

		const dropdown = render(
			<Dropdown onClick={callback}>
				<div>Title</div>
				<>
					<p>Child 1</p>
					<p>Child 2</p>
				</>
			</Dropdown>
		);

		await userEvent.click(dropdown.getByText(/Title/i));
		expect(callback).toHaveBeenCalledTimes(1);

		await userEvent.click(dropdown.getByText(/Title/i));
		expect(callback).toHaveBeenCalledTimes(2);
	});
});