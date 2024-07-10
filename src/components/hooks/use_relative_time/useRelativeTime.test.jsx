import React from 'react';
import { render, screen } from '@testing-library/react';
import { IntlProvider, defineMessages } from 'react-intl';
import { useRelativeTime } from './useRelativeTime';

const messages = {
    "relative_time.past.second": "{time, plural, one {# second} other {# seconds}} ago",
    "relative_time.past.minute": "{time, plural, one {# minute} other {# minutes}} ago",
    "relative_time.past.hour": "{time, plural, one {# hour} other {# hours}} ago",
    "relative_time.past.day": "{time, plural, one {# day} other {# days}} ago",
    "relative_time.past.month": "{time, plural, one {# month} other {# months}} ago",
    "relative_time.past.year": "{time, plural, one {# year} other {# years}} ago",
    "relative_time.future.second": "{time, plural, one {# second} other {# seconds}} left",
    "relative_time.future.minute": "{time, plural, one {# minute} other {# minutes}} left",
    "relative_time.future.hour": "{time, plural, one {# hour} other {# hours}} left",
    "relative_time.future.day": "{time, plural, one {# day} other {# days}} left",
    "relative_time.future.month": "{time, plural, one {# month} other {# months}} left",
    "relative_time.future.year": "{time, plural, one {# year} other {# years}} left",
}

describe('useRelativeTime', () => {
    it('should render an empty string if date is undefined', () => {
        const RelativeTime = () => {
            const time = undefined;
            const relativeTime = useRelativeTime(time);
        
            return relativeTime;
        }
    
        const component = render(<IntlProvider messages={messages} locale="en"><RelativeTime /></IntlProvider>);
    
        expect(component.container.innerHTML).toEqual("");
    });

    it('should render the right past date', () => {
        const RelativeTime = () => {
            const date = new Date();
            const daysAgo = new Date(date.getTime());
            daysAgo.setDate(date.getDate() - 2);
            const relativeTime = useRelativeTime(daysAgo);
        
            return relativeTime;
        }
    
        const component = render(<IntlProvider messages={messages} locale="en"><RelativeTime /></IntlProvider>);
    
        expect(screen.getByText("2 days ago")).toBeTruthy();
        expect(component.container.innerHTML).not.toEqual("");
    });
    
    it('should render the right content with singular text', () => {
        const RelativeTime = () => {
            const date = new Date();
            const daysAgo = new Date(date.getTime());
            daysAgo.setDate(date.getDate() - 1);
            const relativeTime = useRelativeTime(daysAgo);
        
            return relativeTime;
        }
    
        const component = render(<IntlProvider locale="en" messages={messages}><RelativeTime /></IntlProvider>);
    
        expect(screen.getByText("1 day ago")).toBeTruthy();
        expect(component.container.innerHTML).not.toEqual("");
    });
    
    it('should render the right future date', () => {
        const RelativeTime = () => {
            const date = new Date();
            const daysAgo = new Date(date.getTime());
            daysAgo.setDate(date.getDate() + 2);
            const relativeTime = useRelativeTime(daysAgo);
        
            return relativeTime;
        }
    
        const component = render(<IntlProvider locale="en" messages={messages}><RelativeTime /></IntlProvider>);
    
        expect(screen.getByText("2 days left")).toBeTruthy();
        expect(component.container.innerHTML).not.toEqual("");
    });
});
