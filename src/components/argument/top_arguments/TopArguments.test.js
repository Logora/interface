import React from 'react';
import { render, screen } from '@testing-library/react';
import { DefaultTopArguments } from './TopArguments.composition';
import { TopArgumentsNewDesign } from './TopArguments.composition';
import { TopArgumentsNewDesignWithEmptyArgument } from './TopArguments.composition';
import { TopArgumentsWithEmptyArgument } from './TopArguments.composition';

describe('TopArguments', () => {
    it ('renders TopArguments component', () => {  
        const { getByText } = render(<DefaultTopArguments />);
        expect(getByText('Read 5 arguments "For"')).toBeInTheDocument();
        expect(getByText('Read 3 arguments "Against"')).toBeInTheDocument();
    });

    it ('renders correct arguments', () => {  
        const { container } = render(<DefaultTopArguments />);

        const topArguments = container.getElementsByClassName('topArgument');
        expect(topArguments.length).toBe(2);

        expect(screen.getByText("An argument to support the 'For' position...")).toBeInTheDocument();
        expect(screen.getByText("An argument to support the 'Against' position...")).toBeInTheDocument();
    });

    it ('renders the argument with the highest score when new design is true', () => {  
        const { container } = render(<TopArgumentsNewDesign />);

        const topArgument = container.getElementsByClassName('topArgument');
        expect(topArgument.length).toBe(1);

        expect(screen.queryByText("An argument to support the 'For' position...")).toBeNull();
        expect(screen.queryByText("An argument to support the 'Against' position...")).toBeInTheDocument();
        expect(screen.queryByText('Read 5 arguments "For"')).toBeNull();
        expect(screen.queryByText('Read 3 arguments "Against"')).toBeNull();
    });

    it ('renders the component with empty "For" argument', () => {
        const { container } = render(<TopArgumentsWithEmptyArgument />);

        const topArgument = container.getElementsByClassName('topArgument');
        expect(topArgument.length).toBe(2);

        const emptyArgument = container.getElementsByClassName('skeletonContainer');
        expect(emptyArgument.length).toBe(1);

        expect(screen.queryByText("Add an argument")).toBeInTheDocument();
        expect(screen.queryByText("An argument to support the 'For' position...")).toBeNull();
        expect(screen.queryByText("An argument to support the 'Against' position...")).toBeInTheDocument();
        expect(screen.queryByText('Read 5 arguments "For"')).toBeNull();
        expect(screen.queryByText('Read 3 arguments "Against"')).toBeInTheDocument();
    });

    it ('renders the component with empty argument when new design', () => {
        const { container } = render(<TopArgumentsNewDesignWithEmptyArgument />);

        const topArgument = container.getElementsByClassName('topArgument');
        expect(topArgument.length).toBe(1);

        const emptyArgument = container.getElementsByClassName('skeletonContainer');
        expect(emptyArgument.length).toBe(1);

        expect(screen.queryByText("Add an argument")).toBeInTheDocument();
        expect(screen.queryByText("An argument to support the 'For' position...")).toBeNull();
        expect(screen.queryByText("An argument to support the 'Against' position...")).toBeNull();
        expect(screen.queryByText("Read more")).toBeNull();
    });
})