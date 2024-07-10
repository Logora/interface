import React from 'react';
import { PointBox } from './PointBox';
import { Chat } from '@logora/debate.icons.regular_icons';

export const DefaultPointBox = () => {
    return(
        <PointBox 
            icon={<Chat width={16} height={16} data-testid={"svg-icon"} />}
            text={"Your text"}
            timeAgo={"12 days ago"}
        />
    )
}

export const PointBoxWithoutTimeAgo = () => {
    return(
        <PointBox 
            icon={<Chat width={16} height={16} data-testid={"svg-icon"} />}
            text={"Your text"}
        />
    )
}