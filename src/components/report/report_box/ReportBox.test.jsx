import React from "react";
import { render, screen } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import { MemoryRouter } from "react-router-dom";
import { ConfigProvider } from "@logora/debate/data/config_provider";
import { dataProvider, DataProviderContext } from "@logora/debate/data/data_provider";
import { AuthContext } from "@logora/debate/auth/use_auth";
import { ModalProvider } from "@logora/debate/dialog/modal";
import { ListProvider } from "@logora/debate/list/list_provider";
import { ToastProvider } from "@logora/debate/dialog/toast_provider";
import { VoteProvider } from "@logora/debate/vote/vote_provider";
import { IconProvider } from "@logora/debate/icons/icon_provider";
import { ResponsiveProvider } from "@logora/debate/hooks/use_responsive";
import * as regularIcons from "@logora/debate/icons/regular_icons";
import ReportBox from "./ReportBox";
import { faker } from "@faker-js/faker";

vi.mock('@lexical/react/LexicalErrorBoundary', () => ({
  LexicalErrorBoundary: ({ children }) => children,
}));

const generateReport = (overrides) => ({
  id: faker.number.int(),
  classification: "Spam",
  description: faker.lorem.sentence(),
  is_processed: true,
  reportable_type: "Message",
  created_at: faker.date.recent().toISOString(),
  reportable: {
    id: faker.number.int(),
    content: faker.lorem.sentence(),
    author: { full_name: faker.person.fullName() },
    created_at: faker.date.recent().toISOString(),
    upvotes: faker.number.int(),
    language: "en",
    status: "pending",
  },
  author: {
    full_name: faker.person.fullName(),
  },
  moderation_entry: {
    status: "pending"
  },
  position: {
    id: faker.number.int(),
    name: "Yes",
    language: "en",
    translation_entries: []
  },
  ...overrides
});

const generateReportPending = (overrides) => ({
  id: faker.number.int(),
  classification: "Spam",
  description: faker.lorem.sentence(),
  is_processed: false,
  reportable_type: "Message",
  created_at: faker.date.recent().toISOString(),
  reportable: {
    id: faker.number.int(),
    content: faker.lorem.sentence(),
    author: { full_name: faker.person.fullName() },
    created_at: faker.date.recent().toISOString(),
    upvotes: faker.number.int(),
    language: "en",
    status: "pending",
  },
  moderation_entry: {
    status: "pending"
  },
  author: {
    full_name: faker.person.fullName(),
  },
  position: {
    id: faker.number.int(),
    name: "Yes",
    language: "en",
    translation_entries: []
  },
  ...overrides
});

const reportArgument = generateReport({ reportable_type: "Message" });
const reportArgumentPending = generateReportPending({ reportable_type: "Message" });
const reportProposal = generateReport({
  reportable_type: "Proposal",
  reportable: {
    ...generateReport().reportable,
    title: faker.lorem.words(),
    tag: {
      display_name: faker.lorem.word(),
      color: faker.color.rgb()
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
      id: faker.number.int(),
      name: faker.lorem.words(),
      total_upvotes: faker.number.int(),
      total_downvotes: faker.number.int(),
      author: {
        id: faker.number.int(),
        full_name: faker.person.fullName(),
        image_url: faker.image.avatarGitHub()
      }
    }
  }
});

const httpClient = {
  get: vi.fn(() => Promise.resolve({ data: { success: true, data: [] } })),
  post: vi.fn(() => Promise.resolve({ data: { success: true, data: {} } })),
  patch: vi.fn(),
  delete: vi.fn(() => Promise.resolve({ data: { success: true, data: {} } }))
};

const data = dataProvider(httpClient, "https://mock.example.api");

const currentUser = {
  id: faker.number.int(),
  full_name: faker.person.fullName(),
  image_url: faker.image.avatarGitHub()
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
    renderReportBox({ report: reportArgumentPending });
    expect(screen.getByText(/The report is currently in process/i)).toBeInTheDocument();
  });

  it("should display status message for accepted status", () => {
    const acceptedReport = generateReport({
      reportable: { ...reportArgument.reportable, status: "accepted", moderation_entry: {
        status: "accepted"
      }, }
    });
    renderReportBox({ report: acceptedReport });
    expect(screen.getByText(/not removed the content/i)).toBeInTheDocument();
  });

  it("should display status message for rejected status", () => {
    const rejectedReport = generateReport({
      is_processed: true,
      reportable: {
        ...reportArgument.reportable,
        status: "rejected",
      },
    });
  
    renderReportBox({ report: rejectedReport });
  
    expect(
      screen.getByTestId("report-status-message")
    ).toHaveTextContent(/content has been removed/i);
  });
  
  

});