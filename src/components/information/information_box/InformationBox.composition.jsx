import React from 'react';
import { InformationBox } from './InformationBox';
import { IntlProvider } from 'react-intl';
import { Suggestion } from '@logora/debate.icons.regular_icons';
import { MemoryRouter } from "react-router";
import { IconProvider } from '@logora/debate.icons.icon_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';

export const DefaultInformationBox = () => {
    return (
        <MemoryRouter>
            <IntlProvider locale="en">
                <IconProvider library={regularIcons}>
                    <InformationBox 
                        icon={<Suggestion />}
                        title={"Suggestion"}
                        points={100} 
                        description={"Propose debate questions and support user suggestions that you find relevant."}
                        textLink={"View suggestions"}
                        link={"https://example.fr/test/"}
                        isActive={true}
                    />
                </IconProvider>
            </IntlProvider>
        </MemoryRouter>
    );
};

export const DefaultInformationBoxWithDisabledModule = () => {
    return (
        <MemoryRouter>
            <IntlProvider locale="en">
                <IconProvider library={regularIcons}>
                    <InformationBox 
                        icon={<Suggestion />}
                        title={"Suggestion"}
                        points={100} 
                        description={"Propose debate questions and support user suggestions that you find relevant."}
                        textLink={"View suggestions"}
                        link={"https://example.fr/test/"}
                    />
                </IconProvider>
            </IntlProvider>
        </MemoryRouter>
    );
};