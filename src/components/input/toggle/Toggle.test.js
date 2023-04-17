import React from 'react';
import { render, screen } from '@testing-library/react';
import { DisabledToggle, DisabledAndCheckedToggle, ToggleWithLabel } from './Toggle.composition';

describe('Toggle', () => {
  it('should render the toggle with disabled and unchecked options', () => {
    const { container } = render(<DisabledToggle />);
    const inputElement = container.querySelector('input');

    expect(inputElement).not.toBeNull();
    expect(inputElement?.disabled).toEqual(true);
    expect(inputElement?.checked).toEqual(false);
  });

  it('should render the toggle with disabled and checked options', () => {
    const { container } = render(<DisabledAndCheckedToggle />);
    const inputElement = container.querySelector('input');

    expect(inputElement).not.toBeNull();
    expect(inputElement?.disabled).toEqual(true);
    expect(inputElement?.checked).toEqual(true);
  });

  it('should render the toggle with text', () => {
    const { container } = render(<ToggleWithLabel />);
    const inputElement = container.querySelector('input');

    expect(screen.getByText("Yes or no ?")).toBeTruthy();
    expect(inputElement).not.toBeNull();
  });
});
