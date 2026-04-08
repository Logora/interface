import React from 'react';
import { CheckboxIndicator } from './checkbox-indicator';

const meta = {
	title: 'Input/Checkbox/Indicator',
	component: CheckboxIndicator,
	args: {
		checked: true,
		disabled: false
	},
	argTypes: {
		checked: {
			control: 'boolean'
		},
		disabled: {
			control: 'boolean'
		}
	},
	render: ({ checked, disabled }) => (
		<div>
			<input type="checkbox" defaultChecked={checked} disabled={disabled} /> → <CheckboxIndicator />
		</div>
	)
};

export default meta;

export const Checked = () => {
	return (
		<div>
			<input type="checkbox" defaultChecked /> → <CheckboxIndicator />
		</div>
	);
};

export const Unchecked = () => {
	return (
		<div>
			<input type="checkbox" /> → <CheckboxIndicator />
		</div>
	);
};

export const Disabled = () => {
	return (
		<div>
			<input type="checkbox" defaultChecked disabled /> → <CheckboxIndicator />
		</div>
	);
};

