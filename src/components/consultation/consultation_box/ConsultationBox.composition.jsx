import React from 'react';
import { IntlProvider } from 'react-intl';
import { ConfigProvider } from '@logora/debate.data.config_provider';
import { Location } from '@logora/debate.util.location';
import { BrowserRouter } from 'react-router-dom';
import { ConsultationBox } from "./ConsultationBox";
import { IconProvider } from '@logora/debate.icons.icon_provider';
import { ResponsiveProvider } from '@logora/debate.hooks.use_responsive';
import * as regularIcons from '@logora/debate.icons.regular_icons';
import { faker } from '@faker-js/faker';

const routes = {
    consultationShowLocation: new Location('espace-debat/consultation/:consultationSlug', { consultationSlug: "" }),
}

const consultation = {
    id: 19,
    slug: faker.lorem.slug(),
    title: faker.music.songName(),
    description: faker.commerce.productDescription(),
    description_url: "",
    created_at: faker.date.recent(),
    ends_at: faker.date.future(),
    vote_goal: 1000,
    total_votes: 200,
    total_participants: 44,
    proposals_count: 53,
    image_url: faker.image.nature(),
    direct_url: faker.internet.url(),
    tags: [
        {
            id: 37,
            name: faker.science.chemicalElement().name,
            taggings_count: 0,
            display_name: faker.science.chemicalElement().name
        },
    ],
    language: "en",
    translation_entries: []
}

export const DefaultConsultationBox = (props) => {
    return(
        <BrowserRouter>
            <IntlProvider locale="en">
                <IconProvider library={regularIcons}>
                    <ResponsiveProvider>
                        <ConfigProvider routes={{...routes}} config={{theme:{}}}>
                            <ConsultationBox consultation={props.consultation || consultation} />
                        </ConfigProvider>
                    </ResponsiveProvider>
                </IconProvider>
            </IntlProvider>
        </BrowserRouter>
    )
}

export const ConsultationEndedBox = () => {
    return(
        <BrowserRouter>
            <IntlProvider locale="en">
                <IconProvider library={regularIcons}>
                    <ResponsiveProvider>
                        <ConfigProvider routes={{...routes}} config={{theme:{}}}>
                            <ConsultationBox consultation={Object.assign(consultation, { ends_at: "2022-11-30T00:00:00.000Z" })} />
                        </ConfigProvider>
                    </ResponsiveProvider>
                </IconProvider>
            </IntlProvider>
        </BrowserRouter>
    )
}

export const ConsultationWithoutEndBox = () => {
    return(
        <BrowserRouter>
            <IntlProvider locale="en">
                <IconProvider library={regularIcons}>
                    <ResponsiveProvider>
                        <ConfigProvider routes={{...routes}} config={{theme:{}}}>
                            <ConsultationBox consultation={Object.assign(consultation, { ends_at: null })} />
                        </ConfigProvider>
                    </ResponsiveProvider>
                </IconProvider>
            </IntlProvider>
        </BrowserRouter>
    )
}

export const ConsultationWithoutVoteGoalBox = () => {
    return(
        <BrowserRouter>
            <IntlProvider locale="en">
                <IconProvider library={regularIcons}>
                    <ResponsiveProvider>
                        <ConfigProvider routes={{...routes}} config={{theme:{}}}>
                            <ConsultationBox consultation={Object.assign(consultation, { vote_goal: 0 })} />
                        </ConfigProvider>
                    </ResponsiveProvider>
                </IconProvider>
            </IntlProvider>
        </BrowserRouter>
    )
}