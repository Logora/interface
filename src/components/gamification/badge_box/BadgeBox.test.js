import React from 'react';
import { BadgeBox } from './BadgeBox';
import { faker } from '@faker-js/faker';
import { IntlProvider } from 'react-intl';
import { render } from '@testing-library/react';

const badge = {
    icon_url: faker.image.avatar(),
    level: 2,
    name: faker.name.jobTitle(),
    next_title_level: 3,
    steps: 20,
    title: faker.name.jobTitle(),
    progress: 6,
}

const badgeCompleted = {
    icon_url: faker.image.avatar(),
    level: 3,
    name: faker.name.jobTitle(),
    next_title_level: 3,
    steps: 13,
    title: faker.name.jobTitle(),
    progress: 13,
}

describe("BadgeBox", () => { 
    it("renders correctly", () => {
        const { getByText, getByAltText } = render(
            <IntlProvider locale="en">
                <BadgeBox 
                    eloquenceTitle="" 
                    icon_url={badge.icon_url}
                    level={badge.level}
                    name={badge.name}
                    next_title_level={badge.next_title_level}
                    steps={badge.steps}
                    title={badge.title}
                    progress={badge.progress}
                />
            </IntlProvider>
        );
        
        const badgeImg = getByAltText("Badge " + badge.title);
        expect(badgeImg).toBeInTheDocument();
        expect(badgeImg).toHaveAttribute('src', badge.icon_url);

        expect(getByText("Level 2")).toBeInTheDocument();
        expect(getByText("Write 20 arguments with a relevance score of at least 75")).toBeInTheDocument();
        expect(getByText("At level 3 you will get the title :")).toBeInTheDocument();
    });

    it("renders title obtained", () => {
        const { getByText, getByAltText, getByTestId, queryByText } = render(
            <IntlProvider locale="en">
                <BadgeBox 
                    eloquenceTitle=""
                    icon_url={badgeCompleted.icon_url}
                    level={badgeCompleted.level}
                    name={badgeCompleted.name}
                    next_title_level={badgeCompleted.next_title_level}
                    steps={badgeCompleted.steps}
                    title={badgeCompleted.title}
                    progress={badgeCompleted.progress}
                />
            </IntlProvider>
        );
        
        const badgeImg = getByAltText("Badge " + badgeCompleted.title);
        expect(badgeImg).toBeInTheDocument();
        expect(badgeImg).toHaveAttribute('src', badgeCompleted.icon_url);

        const badgeReward = getByTestId("badge-reward");
        expect(badgeReward).toHaveClass("rewardObtained");
        expect(badgeReward).not.toHaveClass("rewardShown");

        expect(getByText("Level 3")).toBeInTheDocument();
        expect(getByText("Write 13 arguments with a relevance score of at least 75")).toBeInTheDocument();
        expect(getByText("Title obtained :")).toBeInTheDocument();
        expect(getByText(`"Dialogue pro"`)).toBeInTheDocument();
        expect(queryByText("At level 3 you will get the title :")).toBeNull();
    });

    it("renders title shown", () => {
        const { getByText, getByAltText, getByTestId, queryByText } = render(
            <IntlProvider locale="en">
                <BadgeBox 
                    eloquenceTitle={badgeCompleted.name}
                    icon_url={badgeCompleted.icon_url}
                    level={badgeCompleted.level}
                    name={badgeCompleted.name}
                    next_title_level={badgeCompleted.next_title_level}
                    steps={badgeCompleted.steps}
                    title={badgeCompleted.title}
                    progress={badgeCompleted.progress}
                />
            </IntlProvider>
        );
        
        const badgeImg = getByAltText("Badge " + badgeCompleted.title);
        expect(badgeImg).toBeInTheDocument();
        expect(badgeImg).toHaveAttribute('src', badgeCompleted.icon_url);

        const badgeReward = getByTestId("badge-reward");
        expect(badgeReward).toHaveClass("rewardShown");

        expect(getByText("Level 3")).toBeInTheDocument();
        expect(getByText("Write 13 arguments with a relevance score of at least 75")).toBeInTheDocument();
        expect(getByText("Title shown :")).toBeInTheDocument();
        expect(getByText(`"Dialogue pro"`)).toBeInTheDocument();
        expect(queryByText("At level 3 you will get the title :")).toBeNull();
    });
})
