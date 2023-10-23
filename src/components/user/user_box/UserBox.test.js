import React from "react";
import { DefaultUserBox, user } from './UserBox.composition';
import { render } from '@testing-library/react';

describe('UserBox', () => {
    it ('renders component with correct data', () => {  
        const { getByText } = render(<DefaultUserBox />);
        expect(getByText(user.full_name)).toBeInTheDocument();
        expect(getByText(user.points + " points")).toBeInTheDocument();
        expect(getByText(user.messages_count + " arguments")).toBeInTheDocument();
        expect(getByText(user.upvotes + " votes")).toBeInTheDocument();
    });
});