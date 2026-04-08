import React from 'react';
import { IntlProvider } from 'react-intl';
import { PieChart } from './PieChart';

const data = [{ "dimension": 115, "value": 1 }, { "dimension": 114, "value": 2 }, { "dimension": 116, "value": 2 }, { "dimension": 117, "value": 5 }]
const labels = [{ "id": 114, "name": "moto", "taggings_count": 0, "display_name": "moto"},{ "id": 115, "name": "honda", "taggings_count": 0, "display_name": "honda"},{ "id": 116, "name": "cbr", "taggings_count": 0, "display_name": "cbr"},{ "id": 117, "name": "chanyol", "taggings_count": 0, "display_name": "chanyol"}]
const totalItemsCount = 10;
const pieTitle = "# of proposals"

const meta = {
    title: 'Chart/Pie Chart',
    component: PieChart,
    args: {
        data,
        totalItemsCount,
        labels,
        pieTitle
    },
    argTypes: {
        data: { control: 'object' },
        totalItemsCount: { control: 'number' },
        labels: { control: 'object' },
        pieTitle: { control: 'text' }
    },
    render: (args) => (
        <IntlProvider locale="en">
            <PieChart {...args} />
        </IntlProvider>
    )
};

export default meta;

const renderStory = (overrides = {}) => meta.render({ ...meta.args, ...overrides });

export const DefaultPieChart = (props) => renderStory(props);
