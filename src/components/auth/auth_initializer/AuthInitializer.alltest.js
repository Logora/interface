import React from 'react';
import { render, screen } from '@testing-library/react';
import { ConfigProvider } from '@logora/debate.data.config_provider';
import { AuthInitializer } from '@logora/debate.auth.auth_initializer';

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
                <AuthInitializer authType={config.auth?.type} provider={config.shortname} />
            </ConfigProvider>
        );
    });
});