import React from 'react';
import { render } from '@testing-library/react';
import {
  BasicTextInput,
  ErrorTextInput,
  ErrorTextInputWithMessage,
  SuccessTextInput,
  DisabledTextInput,
  TextInputWithImage,
} from './TextInput.composition';

describe('TextInput component', () => {
  it('should render input correctly', () => {
    const { getByTestId } = render(<BasicTextInput />);
    const rendered = getByTestId('test-input');

    expect(rendered).toBeInTheDocument();
    expect(rendered.tagName).toBe('INPUT');
  });

  it('should not have error or success styles', () => {
    const { getByTestId } = render(<BasicTextInput />);
    const rendered = getByTestId('test-input');

    expect(rendered.classList.contains('success')).toBeFalsy();
    expect(rendered.classList.contains('error')).toBeFalsy();
  });

  it('should have error class', () => {
    const { getByTestId } = render(<ErrorTextInput />);
    const rendered = getByTestId('test-input');

    expect(rendered.classList.contains('error')).toBeTruthy();
  });

  it('should have success class', () => {
    const { getByTestId } = render(<SuccessTextInput />);
    const rendered = getByTestId('test-input');

    expect(rendered.classList.contains('success')).toBeTruthy();
  });

  it('should have disabled attribute', () => {
    const { getByTestId } = render(<DisabledTextInput />);
    const rendered = getByTestId('test-input');

    expect(rendered.getAttribute('disabled')).toBe('');
  });

  it('should display error message', () => {
    const { container } = render(<ErrorTextInputWithMessage />);

    const rendered = container.getElementsByTagName('div')[1];
    expect(rendered.textContent?.includes('error to be displayed under the input'));
  });
});

describe('TextInput component with icon', () => {
  it('should have img tag', () => {
    const { container } = render(<TextInputWithImage />);

    expect(container.querySelector('img')).toBeInTheDocument();
  });
});
