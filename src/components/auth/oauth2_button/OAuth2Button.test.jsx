import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { OAuth2Button } from "./OAuth2Button";
import userEvent from "@testing-library/user-event";

Object.defineProperty(window, "location", {
  value: {
    origin: "http://example.fr",
  },
});

const spyWindowOpen = jest.spyOn(window, "open");
spyWindowOpen.mockImplementation(jest.fn());

describe("OAuth2Button", () => {
  it("should render button with the correct text", () => {
    const oauth2Button = render(
      <MemoryRouter>
        <OAuth2Button
          authDialogUrl={"https://www.example.com/dialog/oauth"}
          clientId={"client-id"}
          scope={"email,profile"}
          provider={"my-oauth2-provider"}
          redirectUri={"https://auth.redirect/uri"}
        >
          Click here to login !
        </OAuth2Button>
      </MemoryRouter>
    );
    const renderedButton = oauth2Button.getByText(/Click here to login !/i);
    expect(renderedButton).toBeTruthy();
  });

  it("should open popup with correct link on click", async () => {
    spyWindowOpen.mockClear();

    const authDialogUrl = "https://www.example.com/dialog/oauth";
    const clientId = "client-id";
    const scope = "email,profile";
    const redirectUri = "https://auth.redirect/uri";

    const oauth2Button = render(
      <MemoryRouter initialEntries={["/path-name/"]}>
        <OAuth2Button
          authDialogUrl={authDialogUrl}
          clientId={clientId}
          scope={scope}
          provider={"my-oauth2-provider"}
          redirectUri={redirectUri}
        >
          Click here to login !
        </OAuth2Button>
      </MemoryRouter>
    );
    const renderedButton = screen.getByText(/Click here to login !/i);
    expect(renderedButton).toBeTruthy();

    let expectedUrl = new URL(authDialogUrl);
    expectedUrl.searchParams.append("client_id", clientId);
    expectedUrl.searchParams.append("redirect_uri", redirectUri);
    expectedUrl.searchParams.append("scope", scope);
    expectedUrl.searchParams.append(
      "state",
      window.btoa("http://example.fr/path-name/")
    );

    await userEvent.click(renderedButton);
    expect(spyWindowOpen).toHaveBeenCalledTimes(1);
    expect(spyWindowOpen).toHaveBeenLastCalledWith(
      expectedUrl.href,
      "",
      "width=500,height=500,left=262,top=107.2"
    );
  });

  it("should open popup with correct link with response type on click", async () => {
    spyWindowOpen.mockClear();

    const authDialogUrl = "https://www.example.com/dialog/oauth";
    const clientId = "client-id";
    const scope = "email,profile";
    const redirectUri = "https://auth.redirect/uri";
    const responseType = "code";

    const oauth2Button = render(
      <MemoryRouter initialEntries={["/path-name"]}>
        <OAuth2Button
          authDialogUrl={authDialogUrl}
          clientId={clientId}
          scope={scope}
          provider={"my-oauth2-provider"}
          redirectUri={redirectUri}
          responseType={responseType}
        >
          Click here to login !
        </OAuth2Button>
      </MemoryRouter>
    );
    const renderedButton = screen.getByText(/Click here to login !/i);
    expect(renderedButton).toBeTruthy();

    let expectedUrl = new URL(authDialogUrl);
    expectedUrl.searchParams.append("client_id", clientId);
    expectedUrl.searchParams.append("redirect_uri", redirectUri);
    expectedUrl.searchParams.append("scope", scope);
    expectedUrl.searchParams.append("response_type", responseType);
    expectedUrl.searchParams.append(
      "state",
      window.btoa("http://example.fr/path-name")
    );

    await userEvent.click(renderedButton);
    expect(spyWindowOpen).toHaveBeenCalledTimes(1);
    expect(spyWindowOpen).toHaveBeenLastCalledWith(
      expectedUrl.href,
      "",
      "width=500,height=500,left=262,top=107.2"
    );
  });

  it("should render button with the correct extra className", () => {
    const oauth2Button = render(
      <MemoryRouter>
        <OAuth2Button
          authDialogUrl={"https://www.example.com/dialog/oauth"}
          clientId={"client-id"}
          scope={"email,profile"}
          provider={"my-oauth2-provider"}
          redirectUri={"https://auth.redirect/uri"}
          className={"extraClassName"}
        >
          Click here to login !
        </OAuth2Button>
      </MemoryRouter>
    );
    const renderedButton = oauth2Button.getByText(/Click here to login !/i);
    expect(renderedButton).toBeTruthy();
    expect(screen.getByTestId("container")).toHaveClass("extraClassName");
  });

  describe("when state is provided", () => {
    it("should open popup with correct link with state on click", async () => {
      spyWindowOpen.mockClear();

      const authDialogUrl = "https://www.example.com/dialog/oauth";
      const clientId = "client-id";
      const scope = "email,profile";
      const redirectUri = "https://auth.redirect/uri";
      const state = "my-state";

      const oauth2Button = render(
        <MemoryRouter initialEntries={["/path-name/"]}>
          <OAuth2Button
            authDialogUrl={authDialogUrl}
            clientId={clientId}
            scope={scope}
            provider={"my-oauth2-provider"}
            redirectUri={redirectUri}
            state={state}
          >
            Click here to login !
          </OAuth2Button>
        </MemoryRouter>
      );
      const renderedButton = screen.getByText(/Click here to login !/i);
      expect(renderedButton).toBeTruthy();

      let expectedUrl = new URL(authDialogUrl);
      expectedUrl.searchParams.append("client_id", clientId);
      expectedUrl.searchParams.append("redirect_uri", redirectUri);
      expectedUrl.searchParams.append("scope", scope);
      expectedUrl.searchParams.append("state", window.btoa(state));

      await userEvent.click(renderedButton);
      expect(spyWindowOpen).toHaveBeenCalledTimes(1);
      expect(spyWindowOpen).toHaveBeenLastCalledWith(
        expectedUrl.href,
        "",
        "width=500,height=500,left=262,top=107.2"
      );
    });
  });

  describe("when popup is false", () => {
    it("should render the button as a link with the correct href", () => {
      const authDialogUrl = "https://www.example.com/dialog/oauth";
      const clientId = "client-id";
      const scope = "email,profile";
      const redirectUri = "https://auth.redirect/uri";
      const responseType = "code";

      const oauth2Button = render(
        <MemoryRouter initialEntries={["/path-name"]}>
          <OAuth2Button
            authDialogUrl={authDialogUrl}
            clientId={clientId}
            scope={scope}
            provider={"my-oauth2-provider"}
            redirectUri={redirectUri}
            responseType={responseType}
            popup={false}
          >
            Click here to login !
          </OAuth2Button>
        </MemoryRouter>
      );

      let expectedUrl = new URL(authDialogUrl);
      expectedUrl.searchParams.append("client_id", clientId);
      expectedUrl.searchParams.append("redirect_uri", redirectUri);
      expectedUrl.searchParams.append("scope", scope);
      expectedUrl.searchParams.append("response_type", responseType);
      expectedUrl.searchParams.append(
        "state",
        window.btoa("http://example.fr/path-name")
      );

      const renderedButton = oauth2Button.getByRole("link");
      expect(renderedButton).toBeTruthy();
      expect(renderedButton).toHaveAttribute("href", expectedUrl.href);
    });

    it("should not open popup", async () => {
      spyWindowOpen.mockClear();

      const authDialogUrl = "https://www.example.com/dialog/oauth";
      const clientId = "client-id";
      const scope = "email,profile";
      const redirectUri = "https://auth.redirect/uri";

      const oauth2Button = render(
        <MemoryRouter>
          <OAuth2Button
            authDialogUrl={authDialogUrl}
            clientId={clientId}
            scope={scope}
            provider={"my-oauth2-provider"}
            redirectUri={redirectUri}
            popup={false}
          >
            Click here to login !
          </OAuth2Button>
        </MemoryRouter>
      );
      const renderedButton = oauth2Button.getByText(/Click here to login !/i);

      await userEvent.click(renderedButton);
      expect(spyWindowOpen).toHaveBeenCalledTimes(0);
    });

    describe("when state is provided", () => {
      it("should render the button as a link with the correct href", async () => {
        const authDialogUrl = "https://www.example.com/dialog/oauth";
        const clientId = "client-id";
        const scope = "email,profile";
        const redirectUri = "https://auth.redirect/uri";
        const responseType = "code";
        const state = "my-state";

        const oauth2Button = render(
          <MemoryRouter initialEntries={["/path-name"]}>
            <OAuth2Button
              authDialogUrl={authDialogUrl}
              clientId={clientId}
              scope={scope}
              provider={"my-oauth2-provider"}
              redirectUri={redirectUri}
              responseType={responseType}
              popup={false}
              state={state}
            >
              Click here to login !
            </OAuth2Button>
          </MemoryRouter>
        );

        let expectedUrl = new URL(authDialogUrl);
        expectedUrl.searchParams.append("client_id", clientId);
        expectedUrl.searchParams.append("redirect_uri", redirectUri);
        expectedUrl.searchParams.append("scope", scope);
        expectedUrl.searchParams.append("response_type", responseType);
        expectedUrl.searchParams.append("state", window.btoa(state));

        const renderedButton = oauth2Button.getByRole("link");
        expect(renderedButton).toBeTruthy();
        expect(renderedButton).toHaveAttribute("href", expectedUrl.href);
      });
    });
  });
});
