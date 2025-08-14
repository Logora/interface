import React from 'react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from '@logora/debate.data.config_provider';
import { Location } from '@logora/debate.util.location';
import { ContentHeader } from './ContentHeader';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';
import { faker } from '@faker-js/faker';

const author = {
    image_url: faker.image.avatar(),
    full_name: faker.name.fullName(),
    slug: faker.lorem.slug(),
    points: 52,
    role: "contributor",
    last_activity: new Date(),
    description: faker.name.jobTitle(),
    hash_id: faker.lorem.slug(),
    occupation: faker.name.jobTitle(),
}

const moderationPolicyUrl = "https://example.com/debate-rules";

const moderationEntry = {
    id: faker.datatype.number({ min: 1000000, max: 9999999 }),
    status: "rejected",
    moderation_score: faker.datatype.float({ min: 0, max: 1, precision: 0.001 }),
    moderation_reason: "INCOHERENT",
    moderator_notes: faker.datatype.boolean() ? faker.lorem.sentence() : null,
    is_moderated: true,
    moderation_mode: "mistral",
    moderated_at: faker.date.recent().toISOString(),
    is_reported: false,
};

const expertAuthor = { ...author, role: "editor" }

const date = faker.date.recent();

const routes = {
    userShowLocation: new Location('espace-debat/user/:userSlug', { userSlug: '' })
};

const tag = faker.word.noun(5);
const config = {
    moderation: {
        showFeedback: true,
    },
};

export const DefaultContentHeader = (props) => {
    return (
        <BrowserRouter>
            <ConfigProvider routes={{ ...routes }}>
                <IconProvider library={regularIcons}>
                    <IntlProvider locale="en">
                        <ContentHeader
                            author={props.author || author}
                            tag={props.tag || tag}
                            date={props.date || date}
                            positionIndex={1}
                            oneLine={false}
                            disableLinks={false}
                        />
                    </IntlProvider>
                </IconProvider>
            </ConfigProvider>
        </BrowserRouter>
    );
};

export const ContentHeaderWithoutTag = (props) => {
    return (
        <BrowserRouter>
            <ConfigProvider routes={{ ...routes }}>
                <IconProvider library={regularIcons}>
                    <IntlProvider locale="en">
                        <ContentHeader
                            author={props.author || author}
                            date={props.date || date}
                            positionIndex={1}
                            oneLine={false}
                        />
                    </IntlProvider>
                </IconProvider>
            </ConfigProvider>
        </BrowserRouter>
    );
};

export const ContentHeaderWithoutDate = (props) => {
    return (
        <BrowserRouter>
            <ConfigProvider routes={{ ...routes }}>
                <IconProvider library={regularIcons}>
                    <IntlProvider locale="en">
                        <ContentHeader
                            author={props.author || author}
                            tag={props.tag || tag}
                            positionIndex={1}
                            oneLine={false}
                        />
                    </IntlProvider>
                </IconProvider>
            </ConfigProvider>
        </BrowserRouter>
    );
};

export const ContentHeaderWithOneLine = (props) => {
    return (
        <BrowserRouter>
            <ConfigProvider routes={{ ...routes }}>
                <IconProvider library={regularIcons}>
                    <IntlProvider locale="en">
                        <ContentHeader
                            author={props.author || author}
                            tag={props.tag || tag}
                            positionIndex={1}
                            date={props.date || date}
                            oneLine={true}
                            disableLinks={false}
                        />
                    </IntlProvider>
                </IconProvider>
            </ConfigProvider>
        </BrowserRouter>
    );
};

export const ContentHeaderWithoutLinks = (props) => {
    return (
        <BrowserRouter>
            <ConfigProvider routes={{ ...routes }}>
                <IconProvider library={regularIcons}>
                    <IntlProvider locale="en">
                        <ContentHeader
                            author={props.author || author}
                            tag={props.tag || tag}
                            date={props.date || date}
                            oneLine={false}
                            disableLinks={true}
                        />
                    </IntlProvider>
                </IconProvider>
            </ConfigProvider>
        </BrowserRouter>
    );
};

export const ContentHeaderSelected = (props) => {
    return (
        <BrowserRouter>
            <ConfigProvider routes={{ ...routes }}>
                <IconProvider library={regularIcons}>
                    <IntlProvider locale="en">
                        <ContentHeader
                            author={props.author || author}
                            tag={props.tag || tag}
                            date={props.date || date}
                            selectedContent
                        />
                    </IntlProvider>
                </IconProvider>
            </ConfigProvider>
        </BrowserRouter>
    );
};

export const ContentHeaderWithBadge = (props) => {
    return (
        <BrowserRouter>
            <ConfigProvider routes={{ ...routes }}>
                <IconProvider library={regularIcons}>
                    <IntlProvider locale="en">
                        <ContentHeader
                            author={props.author || expertAuthor}
                            tag={props.tag || tag}
                            date={props.date || date}
                            positionIndex={1}
                            oneLine={false}
                            disableLinks={false}
                        />
                    </IntlProvider>
                </IconProvider>
            </ConfigProvider>
        </BrowserRouter>
    );
};

export const ContentHeaderWithModeration = (props) => {
    return (
        <BrowserRouter>
            <ConfigProvider routes={{ ...routes }} config={config}>
                <IconProvider library={regularIcons}>
                    <IntlProvider locale="en">
                        <ContentHeader
                            author={props.author || author}
                            tag={props.tag || tag}
                            date={props.date || date}
                            showModerationFeedback={config.moderation?.showFeedback}
                            moderationReason={moderationEntry.moderation_reason}
                            moderationNotes={moderationEntry.moderator_notes}
                            moderationPolicyUrl={moderationPolicyUrl}
                            isModerationRejected={moderationEntry.status}
                        />
                    </IntlProvider>
                </IconProvider>
            </ConfigProvider>
        </BrowserRouter>
    );
};

export const ContentHeaderSelectedBlue = (props) => {
    return (
        <BrowserRouter>
            <ConfigProvider routes={{ ...routes }} config={{ theme: { enableBlueSelectedContent: true } }}>
                <IconProvider library={regularIcons}>
                    <IntlProvider locale="en">
                        <ContentHeader
                            author={props.author || author}
                            tag={props.tag || tag}
                            date={props.date || date}
                            selectedContent
                        />
                    </IntlProvider>
                </IconProvider>
            </ConfigProvider>
        </BrowserRouter>
    );
};
