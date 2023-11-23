import React from 'react';
import { AuthProvider } from '@logora/debate.auth.use_auth';
import { IntlProvider } from 'react-intl';
import { TranslationButton } from './TranslationButton';

export const DefaultTranslationButton = () => {
    return (
        <IntlProvider locale='en'>
			<AuthProvider>
				<TranslationButton language="fr" callback={() => null} />
			</AuthProvider>
		</IntlProvider>
    );
};