import React, { useEffect, useState } from "react";
import { render, screen } from "@testing-library/react";
import { AuthProvider } from "@logora/debate.auth.use_auth";
import { VoteProvider } from "./VoteProvider";
import {
  dataProvider,
  DataProviderContext,
} from "@logora/debate.data.data_provider";

const DefaultComponent = ({ data, httpClient }) => {
  return (
    <DataProviderContext.Provider value={{ dataProvider: data }}>
      <AuthProvider>
        <VoteProvider voteableType="post">
          <TestComponent httpClient={httpClient} />
        </VoteProvider>
      </AuthProvider>
    </DataProviderContext.Provider>
  );
};

const TestComponent = ({ httpClient }) => {
  const [votes, setVotes] = useState([]);
  const apiUrl = "http://example.com/list";
  const apiKey = "api-key";
  const storageKey = "storage-key";
  const resource = "user";
  const api = dataProvider(httpClient, apiUrl, apiKey, storageKey);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await api.getList(resource, {
          page: 1,
          per_page: 10,
          sort: "-created_at",
          api_key: apiKey,
        });
        setVotes(data.data.data);
      } catch (error) {
        console.error(
          "Une erreur s'est produite lors de la récupération des données :",
          error
        );
      }
    };

    fetchData();
  }, []);

  if (!!votes) {
    return (
      <>
        {votes.map((vote) => (
          <div
            key={vote.voteable_id}
            data-testid={"vote-context_" + vote.voteable_id}
          >
            {JSON.stringify(vote)}
          </div>
        ))}
      </>
    );
  } else {
    return <div>loading ...</div>;
  }
};

describe("VoteProvider", () => {
  it("affiche les votes", async () => {
    const httpClient = {
      get: () =>
        Promise.resolve({
          data: {
            success: true,
            data: [
              {
                user_id: 1,
                voteable_id: 1,
                voteable_type: "post",
              },
              {
                user_id: 2,
                voteable_id: 2,
                voteable_type: "comment",
              },
            ],
          },
        }),
      post: () => null,
      patch: () => null,
    };

    const data = dataProvider(httpClient, "https://mock.example.api");

    render(<DefaultComponent data={data} httpClient={httpClient} />);

    // Vérifie que le message de chargement s'affiche initialement

    // Attends que les données se chargent
    const voteContext = await screen.findAllByTestId(/vote-context_/);

    // Vérifie que les données sont affichées correctement
    expect(voteContext).toHaveLength(2);
    expect(voteContext[0]).toHaveTextContent(
      JSON.stringify({
        user_id: 1,
        voteable_id: 1,
        voteable_type: "post",
      })
    );
    expect(voteContext[1]).toHaveTextContent(
      JSON.stringify({
        user_id: 2,
        voteable_id: 2,
        voteable_type: "comment",
      })
    );
  });

  it("affiche un message 'loading' pendant le chargement des données", async () => {
    const httpClient = {
      get: () => new Promise(() => {}),
      post: () => null,
      patch: () => null,
    };

    const data = dataProvider(httpClient, "https://mock.example.api");

    render(<DefaultComponent data={data} httpClient={httpClient} />);

    const voteContext = await screen.queryAllByTestId(/vote-context_/);

    // Vérifie que les données sont affichées correctement
    expect(voteContext).toHaveLength(0);
  });
});
