import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useVote } from "./useVote";
import { VoteProvider } from "@logora/debate.vote.vote_provider";
import { dataProvider, DataProviderContext } from '@logora/debate.data.data_provider';
import { AuthContext } from '@logora/debate.auth.use_auth';
import { ConfigProvider } from '@logora/debate.data.config_provider';
import { ModalProvider } from '@logora/debate.dialog.modal';
import React from "react";
import { faker } from '@faker-js/faker';

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

const errorHttpClient = {
  get: () => null,
  post: (url, data, config) => {
      return new Promise(function(resolve, reject) {
        reject();
      });
  },
  patch: () => null,
  delete: (url, data, config) => {
    return new Promise(function(resolve, reject) {
      reject();
    });
  }
};

const vote = { 
  id: faker.datatype.number(),
  voteable_type: faker.lorem.word(),
  voteable_id: faker.datatype.number(), 
  user_id: faker.datatype.number()
};

const currentUser = {
  id: vote.user_id,
}

const data = dataProvider(httpClient, "https://mock.example.api");
const errorData = dataProvider(errorHttpClient, "https://mock.example.api");

const VoteWrapper = ({ children, data }) => (
    <ConfigProvider config={{}}>
      <DataProviderContext.Provider value={{ dataProvider: data }}>
        <AuthContext.Provider value={{ currentUser: currentUser, isLoggedIn: true }}>
          <ModalProvider>
            <VoteProvider>
              {children}
            </VoteProvider>
          </ModalProvider>
        </AuthContext.Provider>
      </DataProviderContext.Provider>
    </ConfigProvider>
);

describe("useVote", () => {
  it("should render correctly", () => {
    const VoteButton = ({ voteableType, voteableId, totalUpvote, totalDownvote }) => {
      const { totalUpvotes, totalDownvotes, activeVote, voteSide, handleVote } =
      useVote(
        voteableType,
        voteableId,
        totalUpvote,
        totalDownvote
      );
      return (
        <>
          <button onClick={() => handleVote(true)} data-testid="upvote"></button>
          <button onClick={() => handleVote(false)} data-testid="downvote"></button>
          <span>Upvotes : {totalUpvotes}</span>
          <span>Downvotes : {totalDownvotes}</span>
          <span>VoteSide : { voteSide.toString() }</span>
          <span>ActiveVote : { activeVote.toString() }</span>
        </>
      )
    }

    render(
      <VoteWrapper data={data}>
        <VoteButton
          voteableType={vote.voteable_type}
          voteableId={vote.voteable_id}
          totalUpvote={10} 
          totalDownvote={5} 
        />
      </VoteWrapper>
    )

    expect(screen.getByText("Upvotes : 10"));
    expect(screen.getByText("Downvotes : 5"));
    expect(screen.getByText("VoteSide : true"));
    expect(screen.getByText("ActiveVote : false"));
  });

  it("should handle upvote correctly", async () => {
    const VoteButton = ({ voteableType, voteableId, totalUpvote, totalDownvote }) => {
      const { totalUpvotes, totalDownvotes, activeVote, voteSide, handleVote } =
      useVote(
        voteableType,
        voteableId,
        totalUpvote,
        totalDownvote
      );
      return (
        <>
          <button onClick={() => handleVote(true)} data-testid="upvote"></button>
          <button onClick={() => handleVote(false)} data-testid="downvote"></button>
          <span>Upvotes : { totalUpvotes }</span>
          <span>Downvotes : { totalDownvotes }</span>
          <span>VoteSide : { voteSide.toString() }</span>
          <span>ActiveVote : { activeVote.toString() }</span>
        </>
      )
    }

    const { getByTestId } = render(
      <VoteWrapper data={data}>
        <VoteButton
          voteableType={"message"} 
          voteableId={faker.datatype.number()} 
          totalUpvote={10} 
          totalDownvote={5} 
        />
      </VoteWrapper>
    )

    expect(screen.getByText("ActiveVote : false"));

    const upvoteButton = getByTestId("upvote");
    await userEvent.click(upvoteButton);

    expect(screen.getByText("Upvotes : 11"));
    expect(screen.getByText("Downvotes : 5"));
    expect(screen.getByText("VoteSide : true"));
    expect(screen.getByText("ActiveVote : true"));
  });

  it("should handle downvote correctly", async () => {
    const VoteButton = ({ voteableType, voteableId, totalUpvote, totalDownvote }) => {
      const { totalUpvotes, totalDownvotes, activeVote, voteSide, handleVote } =
      useVote(
        voteableType,
        voteableId,
        totalUpvote,
        totalDownvote
      );
      return (
        <>
          <button onClick={() => handleVote(true)} data-testid="upvote"></button>
          <button onClick={() => handleVote(false)} data-testid="downvote"></button>
          <span>Upvotes : {totalUpvotes}</span>
          <span>Downvotes : {totalDownvotes}</span>
          <span>VoteSide : { voteSide.toString() }</span>
          <span>ActiveVote : { activeVote.toString() }</span>
        </>
      )
    }

    const { getByTestId } = render(
      <VoteWrapper data={data}>
        <VoteButton
          voteableType={"message"} 
          voteableId={faker.datatype.number()} 
          totalUpvote={10} 
          totalDownvote={5} 
        />
      </VoteWrapper>
    )

    expect(screen.getByText("ActiveVote : false"));

    const downvoteButton = getByTestId("downvote");
    await userEvent.click(downvoteButton);

    expect(screen.getByText("Upvotes : 10"));
    expect(screen.getByText("Downvotes : 6"));
    expect(screen.getByText("VoteSide : false"));
    expect(screen.getByText("ActiveVote : true"));
  });

  it("should update upvote and then upvote again correctly", async () => {
    const VoteButton = ({ voteableType, voteableId, totalUpvote, totalDownvote }) => {
      const { totalUpvotes, totalDownvotes, activeVote, voteSide, handleVote } =
      useVote(
        voteableType,
        voteableId,
        totalUpvote,
        totalDownvote
      );
      return (
        <>
          <button onClick={() => handleVote(true)} data-testid="upvote"></button>
          <button onClick={() => handleVote(false)} data-testid="downvote"></button>
          <span>Upvotes : {totalUpvotes}</span>
          <span>Downvotes : {totalDownvotes}</span>
          <span>VoteSide : { voteSide.toString() }</span>
          <span>ActiveVote : { activeVote.toString() }</span>
        </>
      )
    }

    const { getByTestId } = render(
      <VoteWrapper data={data}>
        <VoteButton
          voteableType={"message"} 
          voteableId={faker.datatype.number()} 
          totalUpvote={10} 
          totalDownvote={5} 
        />
      </VoteWrapper>
    )

    expect(screen.getByText("ActiveVote : false"));

    const upvoteButton = getByTestId("upvote");
    await userEvent.click(upvoteButton);

    expect(screen.getByText("Upvotes : 11"));
    expect(screen.getByText("Downvotes : 5"));
    expect(screen.getByText("VoteSide : true"));
    expect(screen.getByText("ActiveVote : true"));

    await userEvent.click(upvoteButton);

    expect(screen.getByText("Upvotes : 10"));
    expect(screen.getByText("Downvotes : 5"));
    expect(screen.getByText("VoteSide : false"));
    expect(screen.getByText("ActiveVote : false"));
  });

  it("should not show negative votes if error", async () => {
    const VoteButton = ({ voteableType, voteableId, totalUpvote, totalDownvote }) => {
      const { totalUpvotes, totalDownvotes, activeVote, voteSide, handleVote } =
      useVote(
        voteableType,
        voteableId,
        totalUpvote,
        totalDownvote
      );
      return (
        <>
          <button onClick={() => handleVote(true)} data-testid="upvote"></button>
          <button onClick={() => handleVote(false)} data-testid="downvote"></button>
          <span>Upvotes : {totalUpvotes}</span>
          <span>Downvotes : {totalDownvotes}</span>
          <span>VoteSide : { voteSide.toString() }</span>
          <span>ActiveVote : { activeVote.toString() }</span>
        </>
      )
    }

    const { getByTestId } = render(
      <VoteWrapper data={errorData}>
        <VoteButton
          voteableType={"message"} 
          voteableId={faker.datatype.number()} 
          totalUpvote={0} 
          totalDownvote={0} 
        />
      </VoteWrapper>
    )

    expect(screen.getByText("ActiveVote : false"));

    const upvoteButton = getByTestId("upvote");
    await userEvent.click(upvoteButton);

    expect(screen.getByText("Upvotes : 0"));
    expect(screen.getByText("Downvotes : 0"));
    expect(screen.getByText("VoteSide : false"));
    expect(screen.getByText("ActiveVote : false"));

    await userEvent.click(upvoteButton);

    expect(screen.getByText("Upvotes : 0"));
    expect(screen.getByText("Downvotes : 0"));
    expect(screen.getByText("VoteSide : false"));
    expect(screen.getByText("ActiveVote : false"));
  });
});
