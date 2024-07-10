import { render, screen, act } from '@testing-library/react';
import { useFollow } from './useFollow';
import { dataProvider, DataProviderContext } from '@logora/debate.data.data_provider';
import { AuthContext } from '@logora/debate.auth.use_auth';
import { ConfigProvider } from '@logora/debate.data.config_provider';
import { ModalProvider } from '@logora/debate.dialog.modal';
import userEvent from '@testing-library/user-event';
import { faker } from '@faker-js/faker';
import React from 'react';

const httpClient = {
    get: () => null,
    post: (url, data, config) => {
        return new Promise(function(resolve, reject) {
            resolve({ data: { success: true, data: { resource: vote } }});
        });
    },
    patch: () => null,
    delete: (url, data, config) => {
        return new Promise(function(resolve, reject) {
            resolve({ data: { success: true, data: {} }});
        });
    }
};

const follow = { 
    id: faker.datatype.number(),
    type: faker.lorem.word(),
};

const currentUser = {
    id: faker.datatype.number(),
}

const data = dataProvider(httpClient, "https://mock.example.api");

const FollowWrapper = ({ children }) => (
    <ConfigProvider config={{}}>
      <DataProviderContext.Provider value={{ dataProvider: data }}>
        <AuthContext.Provider value={{ currentUser: currentUser, isLoggedIn: true }}>
            <ModalProvider>
                {children}
            </ModalProvider>
        </AuthContext.Provider>
      </DataProviderContext.Provider>
    </ConfigProvider>
);

describe('useFollow', () => {
    it("should render correctly without action", () => {
        const FollowButton = ({ followableId, followableType }) => {
            const { followActive, handleFollow } = useFollow(followableType, followableId);
            return (
                <>
                    <button onClick={() => handleFollow()} data-testid="follow"></button>
                    {followActive ? <span>Followed</span> : <span>Not followed</span>}
                </>
            )
        }

        render(
            <FollowWrapper>
                <FollowButton followableType={follow.type} followableId={follow.id} />
            </FollowWrapper>
        )

        expect(screen.getByText("Not followed"));
    });

    it("should render correctly with follow action", async () => {
        const FollowButton = ({ followableId, followableType }) => {
            const { followActive, handleFollow } = useFollow(followableType, followableId);
            return (
                <>
                    <button onClick={() => handleFollow()} data-testid="follow"></button>
                    {followActive ? <span>Followed</span> : <span>Not followed</span>}
                </>
            )
        }

        const {getByTestId } = render(
            <FollowWrapper>
                <FollowButton followableType={follow.type} followableId={follow.id} />
            </FollowWrapper>
        )

        expect(screen.getByText("Not followed"));

        const followButton = getByTestId("follow");
        await userEvent.click(followButton);

        expect(screen.getByText("Followed"));
    });
});