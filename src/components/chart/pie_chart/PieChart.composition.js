import React from 'react';
import { IntlProvider } from 'react-intl';
import { PieChart } from './PieChart';

const data = [{ "dimension": 115, "value": 1 }, { "dimension": 114, "value": 1 }]
const labels = [{ "id": 114, "name": "moto", "taggings_count": 0, "display_name": "moto"},{ "id": 115, "name": "honda", "taggings_count": 0, "display_name": "honda"},{ "id": 116, "name": "cbr", "taggings_count": 0, "display_name": "cbr"},{ "id": 117, "name": "chanyol", "taggings_count": 0, "display_name": "chanyol"}]
const totalItemsCount = 2;
const pieTitle = "# of proposals"

export const DefaultPieChart = () => {
    return (
        <IntlProvider locale="en">
            <PieChart data={data} totalItemsCount={totalItemsCount} labels={labels} pieTitle={pieTitle} />
        </IntlProvider>
    )
}