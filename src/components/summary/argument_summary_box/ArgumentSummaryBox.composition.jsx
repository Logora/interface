import React from 'react';
import { ArgumentSummaryBox } from './ArgumentSummaryBox';

export const DefaultArgumentSummaryBox = () => {
    return(
        <ArgumentSummaryBox 
            label={'Recurrence of the argument'}
            text={'1. The term "Chocolatine" is more familiar and easier to pronounce for French speakers.'}
            gauge={3}
            color={"navy"}
            tag={"Yes"}
        />
    )
}

export const ArgumentSummaryBoxRed = () => {
    return(
        <ArgumentSummaryBox 
            label={'Recurrence of the argument'}
            text={'1. The term "Chocolatine" is more familiar and easier to pronounce for French speakers.'}
            gauge={4}
            color={"darksalmon"}
            tag={"No"}
        />
    )
}

export const FullGaugeArgumentSummaryBox = () => {
    return(
        <ArgumentSummaryBox 
            label={'Recurrence of the argument'}
            text={'1. The term "Chocolatine" is more familiar and easier to pronounce for French speakers.'}
            gauge={5}
            color={"blue"}
            tag={"Maybe"}
        />
    )
}

export const EmptyGaugeArgumentSummaryBox = () => {
    return(
        <ArgumentSummaryBox 
            label={'Recurrence of the argument'}
            text={'1. The term "Chocolatine" is more familiar and easier to pronounce for French speakers.'}
            gauge={0}
            color={"blue"}
            tag={"Of course"}
        />
    )
}