import React from 'react';
import { SourceBox } from './SourceBox';
import { faker } from '@faker-js/faker';

const source = {
  title: faker.music.songName(),
  description: faker.lorem.sentence(),
  url: faker.internet.url(),
  imageUrl: faker.image.url(),
  publisher: faker.vehicle.manufacturer()
};

export default {
  title: 'Source/Source Box',
  component: SourceBox,
  args: source,
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    url: { control: 'text' },
    imageUrl: { control: 'text' },
    publisher: { control: 'text' }
  }
};

export const DefaultSourceBox = {};
