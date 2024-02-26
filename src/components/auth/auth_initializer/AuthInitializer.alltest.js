import React from 'react';
import { render } from '@testing-library/react';
import { ConfigProvider } from '@logora/debate.data.config_provider';
import { AuthInitializer } from './AuthInitializer';

const config = {
    shortname: "myapp",
    auth: {
        type: "social"
    }
};

describe('AuthInitialiser', () => {
    it('should render', () => {
        render(
            <ConfigProvider config={config}>
                <AuthInitializer authUrl={"https://auth.com/"} authType={config.auth?.type} provider={config.shortname} />
            </ConfigProvider>
        );
    });
});