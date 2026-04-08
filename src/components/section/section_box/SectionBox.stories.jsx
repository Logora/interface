import React from 'react';
import { SectionBox } from './SectionBox';
import { IconProvider } from '@logora/debate/icons/icon_provider';
import * as regularIcons from '@logora/debate/icons/regular_icons';

export default {
  title: 'Section/Section Box',
  component: SectionBox,
  args: {
    title: 'Section Title',
    subtitle: 'Ceci est une section',
    isCollapsible: true,
    isCollapsedByDefault: false,
    content: 'Voici le contenu de la section.'
  },
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    isCollapsible: { control: 'boolean' },
    isCollapsedByDefault: { control: 'boolean' },
    content: { control: 'text' }
  },
  render: ({ content, ...args }) => (
    <IconProvider library={regularIcons}>
      <SectionBox {...args}>
        <div>{content}</div>
      </SectionBox>
    </IconProvider>
  )
};

export const DefaultSectionBox = {};

export const NoCollapsibleSectionBox = {
  args: {
    isCollapsible: false,
    title: 'Section Non Repliable'
  }
};
