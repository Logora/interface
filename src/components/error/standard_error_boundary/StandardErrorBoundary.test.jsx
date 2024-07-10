import React from 'react';
import { render, screen } from '@testing-library/react';
import { StandardErrorBoundary } from './StandardErrorBoundary';

beforeAll(() => jest.spyOn(console, 'error').mockImplementation(() => {}));

function Bomb({ shouldThrow }) {
    if(shouldThrow) {
        throw new Error("some error I made up");
    } else {
        return <div>my content</div>
    }
}

it('should render children when no error', () => {
    const ProblemChild = () => {
        throw new Error();
    }

    const component = render(<Bomb />, { wrapper: StandardErrorBoundary });

    expect(screen.getByText("my content")).toBeTruthy();
    expect(screen.queryByText("Error")).toBeNull();
});

it('should render error when caught', () => {
    const component = render(<Bomb shouldThrow={true} />, { wrapper: StandardErrorBoundary });

    expect(screen.getByText("some error I made up")).toBeTruthy();
    expect(screen.queryByText("my content")).toBeNull();
});

it('should render error when caught', () => {
    const component = render(
        <StandardErrorBoundary errorMessage={"my error"}>
            <Bomb shouldThrow={true} />
        </StandardErrorBoundary>
    );

    expect(screen.getByText("my error")).toBeTruthy();
    expect(screen.queryByText("some error I made up")).toBeNull();
    expect(screen.queryByText("my content")).toBeNull();
});

it('should render nothing if hide message is true', () => {
    const component = render(
        <StandardErrorBoundary hideMessage={true}>
            <Bomb shouldThrow={true} />
        </StandardErrorBoundary>
    );

    expect(screen.queryByText("my error")).toBeNull();
    expect(screen.queryByText("some error I made up")).toBeNull();
    expect(screen.queryByText("my content")).toBeNull();
    expect(component.container.innerHTML).toHaveLength(0);
});