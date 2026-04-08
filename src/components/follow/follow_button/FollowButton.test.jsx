import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IntlProvider } from 'react-intl';
import { FollowButton } from './FollowButton';
import * as useFollowModule from '@logora/debate/follow/use_follow';

describe('FollowButton', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should render with the correct text when not following', () => {
        vi.spyOn(useFollowModule, 'useFollow').mockReturnValue({
            followActive: false,
            handleFollow: vi.fn(),
        });

        render(
            <IntlProvider locale='en'>
                <FollowButton followableType="content" followableId={12} tooltipText="Tooltip content" dataTid="data-tid" />
            </IntlProvider>
        );

        expect(screen.getByTestId('follow')).toHaveTextContent("Follow");
        expect(screen.queryByTestId('followed')).toBeNull();
    });

    it('should call follow handler when clicked', async () => {
        const handleFollow = vi.fn();
        vi.spyOn(useFollowModule, 'useFollow').mockReturnValue({
            followActive: false,
            handleFollow,
        });

        render(
            <IntlProvider locale='en'>
                <FollowButton followableType="content" followableId={12} tooltipText="Tooltip content" dataTid="data-tid" />
            </IntlProvider>
        );

        await userEvent.click(screen.getByTestId('button'));
        expect(handleFollow).toHaveBeenCalledTimes(1);
    });
});