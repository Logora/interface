import React from 'react';
import { IconProvider } from '@logora/debate/icons/icon_provider';
import * as regularIcons from '@logora/debate/icons/regular_icons';

export default {
  tags: ['autodocs'],
  decorators: [
    (Story) => React.createElement(
      IconProvider,
      { library: regularIcons },
      React.createElement(Story)
    )
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    layout: 'centered'
  }
};
