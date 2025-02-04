import React from "react";
import { MemoryRouter } from "react-router-dom";
import { OAuth2Button } from "./OAuth2Button";

export const DefaultOAuth2Button = () => {
  return (
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
};
export const OAuth2ButtonAsLink = () => {
  return (
    <MemoryRouter>
      <OAuth2Button
        authDialogUrl={"https://www.example.com/dialog/oauth"}
        clientId={"client-id"}
        scope={"email,profile"}
        provider={"my-oauth2-provider"}
        redirectUri={"https://auth.redirect/uri"}
        popup={false}
      >
        Click here to login !
      </OAuth2Button>
    </MemoryRouter>
  );
};
