import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Button } from './Button';
import { MemoryRouter } from 'react-router-dom';

describe('Button', () => {
  it('renders the component', () => {
    const { getByText } = render(<Button>Hello</Button>);
    expect(getByText('Hello')).toBeInTheDocument();
  });

  it('calls onClick handler', () => {
    const handleClick = jest.fn();
    const { getByText } = render(<Button onClick={handleClick}>Hello</Button>);
    fireEvent.click(getByText('Hello'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('has left icon', () => {
    const leftIcon = <i>Left Icon</i>;
    const { getByText } = render(<Button leftIcon={leftIcon}>Hello</Button>);
    expect(getByText('Left Icon')).toBeInTheDocument();
  });

  it('has right icon', () => {
    const rightIcon = <i>Right Icon</i>;
    const { getByText } = render(<Button rightIcon={rightIcon}>Hello</Button>);
    expect(getByText('Right Icon')).toBeInTheDocument();
  });

  it('renders with external link', () => {
    const linkButton = render(
        <MemoryRouter>
            <Button to='https://example.com' external>
                External Link
            </Button>
        </MemoryRouter>
    );
    const renderedButton = linkButton.getByText('External Link');
    expect(renderedButton).toBeInTheDocument();
    expect(renderedButton).toHaveAttribute('href', 'https://example.com');
  });

  it('renders without external link', () => {
    const linkButton = render(
        <MemoryRouter>
            <Button to='/page'>Internal Link</Button>
        </MemoryRouter>
    );
    const renderedButton = linkButton.getByText('Internal Link');
    expect(renderedButton).toBeInTheDocument();
    expect(renderedButton).toHaveAttribute('href', '/page');
  });
});