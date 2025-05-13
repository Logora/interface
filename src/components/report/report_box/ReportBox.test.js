import React from "react";
import { render, screen } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import { MemoryRouter } from "react-router-dom";
import { ConfigProvider } from "@logora/debate.data.config_provider";
import { dataProvider, DataProviderContext } from "@logora/debate.data.data_provider";
import { AuthContext } from "@logora/debate.auth.use_auth";
import { ModalProvider } from "@logora/debate.dialog.modal";
import { ListProvider } from "@logora/debate.list.list_provider";
import { ToastProvider } from "@logora/debate.dialog.toast_provider";
import { VoteProvider } from "@logora/debate.vote.vote_provider";
import { IconProvider } from "@logora/debate.icons.icon_provider";
import { ResponsiveProvider } from "@logora/debate.hooks.use_responsive";
import * as regularIcons from "@logora/debate.icons.regular_icons";
import ReportBox from "./ReportBox";
import { faker } from "@faker-js/faker";


const generateReport = (overrides) => ({
  id: faker.datatype.number(),
  classification: "Spam",
  description: faker.lorem.sentence(),
  is_processed: true,
  reportable_type: "Message",
  created_at: faker.date.recent().toISOString(),
  reportable: {
    id: faker.datatype.number(),
    content: faker.lorem.sentence(),
    author: { full_name: faker.name.fullName() },
    created_at: faker.date.recent().toISOString(),
    upvotes: faker.datatype.number(),
    language: "en",
    status: "pending",
  },
  author: {
    full_name: faker.name.fullName(),
  },
  position: {
    id: faker.datatype.number(),
    name: "Yes",
    language: "en",
    translation_entries: []
  },
  ...overrides
});

const reportArgument = generateReport({ reportable_type: "Message" });
const reportProposal = generateReport({
  reportable_type: "Proposal",
  reportable: {
    ...generateReport().reportable,
    title: faker.lorem.words(),
    tag: {
      display_name: faker.lorem.word(),
      color: faker.internet.color()
    }
  }
});
const reportSuggestion = generateReport({
  reportable_type: "Group",
  reportable: {
    ...generateReport().reportable,
    name: faker.lorem.words(),
    slug: faker.lorem.slug(),
    debate_suggestion: {
      id: faker.datatype.number(),
      name: faker.lorem.words(),
      total_upvotes: faker.datatype.number(),
      total_downvotes: faker.datatype.number(),
      author: {
        id: faker.datatype.number(),
        full_name: faker.name.fullName(),
        image_url: faker.image.avatar()
      }
    }
  }
});

const httpClient = {
  get: jest.fn(() => Promise.resolve({ data: { success: true, data: [] } })),
  post: jest.fn(() => Promise.resolve({ data: { success: true, data: {} } })),
  patch: jest.fn(),
  delete: jest.fn(() => Promise.resolve({ data: { success: true, data: {} } }))
};

const data = dataProvider(httpClient, "https://mock.example.api");

const currentUser = {
  id: faker.datatype.number(),
  full_name: faker.name.fullName(),
  image_url: faker.image.avatar()
};

const config = {
  moderation: {
    showFeedback: true,
  },
  modules: {
    suggestions: {
      vote_goal: 30
    }
  }
};

const Providers = ({ children }) => (
  <MemoryRouter>
    <ConfigProvider config={config}>
      <DataProviderContext.Provider value={{ dataProvider: data }}>
        <AuthContext.Provider value={{ currentUser, isLoggedIn: true }}>
          <ResponsiveProvider>
            <ModalProvider>
              <ListProvider>
                <ToastProvider>
                  <VoteProvider>
                    <IconProvider library={regularIcons}>
                      <IntlProvider locale="en">
                        {children}
                      </IntlProvider>
                    </IconProvider>
                  </VoteProvider>
                </ToastProvider>
              </ListProvider>
            </ModalProvider>
          </ResponsiveProvider>
        </AuthContext.Provider>
      </DataProviderContext.Provider>
    </ConfigProvider>
  </MemoryRouter>
);

const renderReportBox = (props) => render(
  <Providers>
    <ReportBox {...props} />
  </Providers>
);

describe("ReportBox", () => {
  it("should render without crashing", () => {
    renderReportBox({ report: reportArgument });
    expect(screen.getByText(/Report reason:/i)).toBeInTheDocument();
  });


  it("should display the correct classification reason", () => {
    renderReportBox({ report: reportArgument });
    expect(screen.getByText(reportArgument.classification)).toBeInTheDocument();
  });

  it("should render Argument component for Message type with correct props", () => {
    renderReportBox({ report: reportArgument });
    expect(screen.getByText(reportArgument.reportable.content)).toBeInTheDocument();
    expect(screen.getByText(reportArgument.reportable.author.full_name)).toBeInTheDocument();
  });

  it("should render ProposalBox component for Proposal type with correct props", () => {
    renderReportBox({ report: reportProposal });
    expect(screen.getByText(reportProposal.reportable.content)).toBeInTheDocument();
    expect(screen.getByText(reportProposal.reportable.title)).toBeInTheDocument();
  });

  it("should render SuggestionBox component for Group type with correct props", () => {
    renderReportBox({ report: reportSuggestion });
    expect(screen.getByText(reportSuggestion.reportable.name)).toBeInTheDocument();
    expect(screen.getByText(reportSuggestion.reportable.debate_suggestion.author.full_name)).toBeInTheDocument();
  });

  it("should display status message for pending status", () => {
    renderReportBox({ report: reportArgument });
    expect(screen.getByText(/content is pending/i)).toBeInTheDocument();
  });

  it("should display status message for accepted status", () => {
    const acceptedReport = generateReport({
      reportable: { ...reportArgument.reportable, status: "accepted" }
    });
    renderReportBox({ report: acceptedReport });
    expect(screen.getByText(/content has been removed/i)).toBeInTheDocument();
  });

  it("should display status message for rejected status", () => {
    const rejectedReport = generateReport({
      reportable: { ...reportArgument.reportable, status: "rejected" }
    });
    renderReportBox({ report: rejectedReport });
    expect(screen.getByText(/not removed the content/i)).toBeInTheDocument();
  });

});