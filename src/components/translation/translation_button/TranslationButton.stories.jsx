import React from 'react';
import { AuthProvider } from '@logora/debate/auth/use_auth';
import { IntlProvider } from 'react-intl';
import { TranslationButton } from './TranslationButton';

const noop = () => null;

const meta = {
	title: 'Translation/Translation Button',
	component: TranslationButton,
	args: {
		language: 'fr',
		callback: noop
	},
	argTypes: {
		language: { control: 'text' },
		callback: { control: false }
	},
	render: (args) => (
		<IntlProvider locale='en'>
			<AuthProvider>
				<TranslationButton {...args} />
			</AuthProvider>
		</IntlProvider>
	)
};

export default meta;

export const DefaultTranslationButton = {};
