import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Button } from './Button';

export default {
  title: 'Action/Button',
  component: Button,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    )
  ]
};

export const Primary = {
  args: {
    children: 'Button',
    handleClick: () => null
  }
};

export const Active = {
  args: {
    children: 'Active button',
    active: true,
    handleClick: () => null
  }
};
