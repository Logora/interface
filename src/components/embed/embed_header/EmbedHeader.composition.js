import React from "react";
import { IntlProvider } from "react-intl";
import { EmbedHeader } from "./EmbedHeader";
import { faker } from '@faker-js/faker';

export const DefaultEmbedHeader = () => {
    return (
        <IntlProvider locale="en">
            <EmbedHeader
                title={"How to prevent COVID-19 spread ?"} 
                titleRedirectUrl={"https://test.fr/"} 
                onlineUsersCount={273} 
                headerLabel={"Medicine"}
            />
        </IntlProvider>
    )
}

export const TextLeftEmbedHeader = () => {
    return (
        <IntlProvider locale="en">
            <EmbedHeader
                title={"How to prevent COVID-19 spread ?"} 
                titleRedirectUrl={"https://test.fr/"} 
                onlineUsersCount={273} 
                headerLabel={"Medicine"}
                textLeft
            />
        </IntlProvider>
    )
}

export const EmbedHeaderWithLogo = () => {
    return (
        <IntlProvider locale="en">
            <EmbedHeader
                title={"How to prevent COVID-19 spread ?"} 
                titleRedirectUrl={"https://test.fr/"} 
                onlineUsersCount={273} 
                headerLabel={"Medicine"}
                withLogo={faker.image.cats(width=100, height=40)}
                altLogo={"Super logo"}
            />
        </IntlProvider>
    )
}