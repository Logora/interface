import React from 'react';
import { PointBox } from './PointBox';
import { ChatIcon } from '@logora/debate.icons';

export const DefaultPointBox = () => {
    return(
        <PointBox 
            icon={<ChatIcon width={16} height={16} data-testid={"svg-icon"} />}
            text={"Your text"}
            timeAgo={"12 days ago"}
        />
    )
}

export const PointBoxWithoutTimeAgo = () => {
    return(
        <PointBox 
            icon={<ChatIcon width={16} height={16} data-testid={"svg-icon"} />}
            text={"Your text"}
        />
    )
}