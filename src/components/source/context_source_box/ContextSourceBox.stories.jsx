import React from 'react';
import { IntlProvider } from 'react-intl';
import { ContextSourceBox } from './ContextSourceBox';
import { faker } from '@faker-js/faker';

const source = {
  imageUrl: faker.image.url(),
  author: faker.vehicle.manufacturer(),
  date: faker.date.recent(),
  title: faker.music.songName()
};

export default {
  title: 'Source/Context Source Box',
  component: ContextSourceBox,
  args: source,
  argTypes: {
    imageUrl: { control: 'text' },
    author: { control: 'text' },
    date: { control: 'date' },
    title: { control: 'text' }
  },
  render: (args) => (
    <IntlProvider locale='en'>
      <ContextSourceBox {...args} />
    </IntlProvider>
  )
};

export const DefaultContextSourceBox = {};

export const ContextSourceBoxWithoutAuthor = {
  args: {
    author: ''
  }
};
