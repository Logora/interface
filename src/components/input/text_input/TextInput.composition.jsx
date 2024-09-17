import React from 'react';
import { Announcement } from '@logora/debate.icons.regular_icons';
import { TextInput } from './TextInput';

export const BasicTextInput = () => <TextInput placeholder="enter text..." data-testid="test-input" />;

export const TextInputWithoutLabel = () => (
  <TextInput placeholder="enter text..." activeLabel={false} data-testid="test-input" />
);

export const FilledTextInput = () => <TextInput value="some text" filled data-testid="test-input" />;

export const ErrorTextInput = () => <TextInput placeholder="placeholder" error data-testid="test-input" />;

export const ErrorTextInputWithMessage = () => (
  <TextInput placeholder="placeholder" error data-testid="test-input" message="error to be displayed under the input" />
);

export const SuccessTextInput = () => <TextInput placeholder="placeholder" success data-testid="test-input" />;

export const DisabledTextInput = () => {
  return <TextInput placeholder="placeholder..." disabled data-testid="test-input" />;
};

export const SmallTextInput = () => (
  <TextInput style={{ fontSize: 12 }} placeholder="enter text..." data-testid="test-input" />
);

export const BigTextInput = () => (
  <TextInput style={{ fontSize: 24 }} placeholder="enter text..." data-testid="test-input" />
);

export const SmallTextInputWithIcon = () => (
  <TextInput
    style={{ fontSize: 12 }}
    placeholder="enter text..."
    data-testid="test-input"
    iconRight={<Announcement style={{ cursor: 'pointer' }} onClick={() => alert('on icon click')} />}
  />
);

export const BigTextInputWithIcon = () => (
  <TextInput
    style={{ fontSize: 24 }}
    placeholder="enter text..."
    data-testid="test-input"
    iconRight={<Announcement style={{ cursor: 'pointer' }} onClick={() => alert('on icon click')} />}
  />
);

export const TextInputWithIcon = () => (
  <TextInput
    placeholder="search..."
    iconRight={<Announcement style={{ cursor: 'pointer' }} onClick={() => alert('on icon click')} />}
  />
);

export const TextInputWithImage = () => (
  <TextInput
    placeholder="search..."
    iconRight={
      <img
        src="https://static.bit.dev/bit-icons/filter.svg"
        style={{ cursor: 'pointer' }}
        onClick={() => alert('on icon click')}
      />
    }
  />
);
export const TextInputWithLeftIcon = () => (
  <TextInput
    placeholder="search..."
    iconLeft={<Announcement style={{ cursor: 'pointer' }} onClick={() => alert('on icon click')} />}
  />
);