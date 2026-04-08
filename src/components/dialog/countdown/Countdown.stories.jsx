import React from "react";
import { Countdown } from "./Countdown";

export default {
  title: 'Dialog/Countdown',
  component: Countdown,
  args: {
    offsetMs: 3600 * 1000,
  },
  argTypes: {
    offsetMs: {
      control: 'number',
    },
  },
  render: ({ offsetMs }) => (
    <Countdown expiresAt={new Date(Date.now() + offsetMs).toISOString()} />
  ),
};

export const Default = {};

export const Expired = {
  args: {
    offsetMs: -1000,
  },
};

export const ShortCountdown = {
  args: {
    offsetMs: 10000,
  },
};

