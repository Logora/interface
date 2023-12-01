import React from 'react';
import { render, screen } from '@testing-library/react';
import { DefaultTogglePosition, FirstLabelTogglePosition } from './TogglePosition.composition';
import { TogglePosition } from './TogglePosition';
import { IntlProvider } from 'react-intl';
import userEvent from '@testing-library/user-event';

const callback = jest.fn();

describe('Toggle', () => {
    it('should render the toggle with correct texts by default', () => {
        const { container } = render(<DefaultTogglePosition />);

        expect(screen.getByText("Yes")).toBeTruthy();
        expect(screen.getByText("No")).toBeTruthy();

        const firstLabel = screen.getByTestId('firstLabel');
        expect(firstLabel).not.toHaveClass('labelActive');

        const secondLabel = screen.getByTestId('secondLabel');
        expect(secondLabel).not.toHaveClass('labelActive');
    });

    it('should render the toggle with first label activation and change label choice after click', async () => {
        const { container } = render(<FirstLabelTogglePosition />);

        const firstLabel = screen.getByTestId('firstLabel');
        expect(firstLabel).toHaveClass('labelActive');

        const secondLabel = screen.getByTestId('secondLabel');
        expect(secondLabel).not.toHaveClass('labelActive');

        await userEvent.click(secondLabel);
        expect(firstLabel).not.toHaveClass('labelActive');
        expect(secondLabel).toHaveClass('labelActive');
    });

    it('should call callback function on label choice', async () => {
        const { container } = render(
            <IntlProvider locale="en">
                <TogglePosition 
                    onChange={callback}
                    firstLabel={{
                        "id": 902,
                        "name": "Yes",
                        "language": null,
                        "translation_entries": []
                    }}
                    secondLabel={{
                        "id": 903,
                        "name": "No",
                        "language": null,
                        "translation_entries": []
                    }}
                />
            </IntlProvider>
        );

        const firstLabel = screen.getByTestId('firstLabel');

        await userEvent.click(firstLabel);
        expect(firstLabel).toHaveClass('labelActive');
        expect(callback).toHaveBeenCalled();

    });
});
