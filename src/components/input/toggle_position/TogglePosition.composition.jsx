import React from 'react';
import { TogglePosition } from './TogglePosition';
import { IntlProvider } from 'react-intl';

export const DefaultTogglePosition = () => {
    return (
        <IntlProvider locale="en">
            <TogglePosition 
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
                onChange={(label) => label}
            />
        </IntlProvider>
    );
};

export const FirstLabelTogglePosition = () => {
    return (
        <IntlProvider locale="en">
            <TogglePosition 
                activeLabel={0}
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
                onChange={(label) => label}
            />
        </IntlProvider>
    );
};

export const SecondLabelTogglePosition = () => {
    return (
        <IntlProvider locale="en">
            <TogglePosition 
                activeLabel={1}
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
                onChange={(label) => label}
            />
        </IntlProvider>
    );
};