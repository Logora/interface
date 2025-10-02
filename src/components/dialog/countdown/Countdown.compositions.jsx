import React from "react";
import Countdown from "./Countdown";

export const Default = () => (
  <Countdown expiresAt={new Date(Date.now() + 3600 * 1000).toISOString()} />
);

export const Expired = () => (
  <Countdown expiresAt={new Date(Date.now() - 1000).toISOString()} />
);

export const ShortCountdown = () => (
  <Countdown expiresAt={new Date(Date.now() + 10000).toISOString()} />
);
