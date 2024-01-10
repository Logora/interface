import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { DefaultFollowButton } from './FollowButton.composition';

describe('FollowButton', () => {
    it('should render with the correct text when not following', () => {
        const { queryByTestId } = render(
            <DefaultFollowButton />
        );

        expect(queryByTestId('follow')).toHaveTextContent("Follow");
        expect(queryByTestId('followed')).toBeNull();
    });

    it('should show "Followed" text when clicked', () => {
        jest.mock('@logora/debate.auth.use_auth');
        jest.mock('@logora/debate.hooks.use_auth_required');

        const { queryByTestId } = render(<DefaultFollowButton />);
        fireEvent.click(queryByTestId('button'));

        waitFor(() => {
            expect(queryByTestId('followed')).toHaveTextContent("Followed");
            expect(queryByTestId('follow')).toBeNull();
        })
    });
});