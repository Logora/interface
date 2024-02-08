import React from 'react';
import { IntlProvider } from 'react-intl';
import { LineChart } from './LineChart';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';


const FILTER_OPTIONS = [{ name: "day", value: "day", text: "day" }, { name: "week", value: "week", text: "week" }]
const data = [{ label: "My dataset", contentColor: "#b6f542" , data: [ { "dimension": "2024-01-20", "value": 4 }, { "dimension": "2024-01-21", "value": 15 }, { "dimension": "2024-01-22", "value": 8 }]}]

export const DefaultLineChart = () => {
    return (
        <IntlProvider locale="en">
            <IconProvider library={regularIcons}>
                <LineChart 
                    filterOptions={FILTER_OPTIONS}
                    className={"myClassName"}
                    title={"My chart title"}
                    onFilterChange={() => console.log("Filter change")}
                    labels={null}
                    data={data}
                />
            </IconProvider>
        </IntlProvider>
    )
}

const data2 = [{ label: "My dataset", contentColor: "#b6f542" , data: [ { "dimension": "2024-01-20", "value": 4 }, { "dimension": "2024-01-21", "value": 15 }, { "dimension": "2024-01-22", "value": 8 }]}, { label: "My dataset 2", contentColor: "#4287f5" , data: [ { "dimension": "2024-01-20", "value": 27 }, { "dimension": "2024-01-21", "value": 35 }, { "dimension": "2024-01-22", "value": 4 }]}]

export const MultiLineChart = () => {
    return (
        <IntlProvider locale="en">
            <IconProvider library={regularIcons}>
                <LineChart 
                    filterOptions={FILTER_OPTIONS}
                    className={"myClassName"}
                    title={"My chart title"}
                    onFilterChange={() => console.log("Filter change")}
                    labels={null}
                    data={data2}
                />
            </IconProvider>
        </IntlProvider>
    )
}