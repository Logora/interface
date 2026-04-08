export default {
	title: 'Input/Checkbox',
	component: CheckboxLabel,
	args: {
		defaultChecked: false,
		children: 'hello world'
	},
	argTypes: {
		defaultChecked: {
			control: 'boolean'
		},
		children: {
			control: 'text'
		}
	},
	render: (args) => (
		<div>
			<CheckboxLabel {...args}>{args.children}</CheckboxLabel>
		</div>
	)
};

import { HiddenCheckbox } from '@logora/debate/input/checkbox/hidden';
import React, { useState } from 'react';
import { CheckboxLabel } from './checkbox-label';

export const UncontrolledVanilla = {};

export const UncontrolledChecked = {
	args: {
		defaultChecked: true
	}
};

export function CustomInput() {
	const [state, setState] = useState(false);
	return (
		<div>
			<CheckboxLabel
				input={
					<HiddenCheckbox
						onChange={(e) => setState(e.target.checked)}
						checked={state}
						alt="custom checkbox"
					/>
				}
			>
				{' '}
				Checkmarbox with a label
			</CheckboxLabel>
			<div>
				-{'>'} {state ? 'checked' : 'unchecked'}
			</div>
		</div>
	);
}

