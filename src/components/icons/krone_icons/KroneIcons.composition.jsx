import React from 'react';
import { ArrowDropdown } from "./ArrowDropdown";
import { CheckBox } from "./CheckBox";
import { EditIcon } from "./EditIcon";
import { EditorChoice } from "./EditorChoice";
import { ErrorCircle } from "./ErrorCircle";
import { Forum } from "./Forum";
import { Group } from "./Group";
import { HelpCircle } from "./HelpCircle";
import { LightBulb } from "./LightBulb";
import { MoreIcon } from "./MoreIcon";
import { ShareIcon } from "./ShareIcon";
import { ThumbUp } from "./ThumbUp";
import { ThumbUpClicked } from "./ThumbUpClicked";
import { VoteIcon } from "./VoteIcon";
import { NotificationBellIcon } from './NotificationBellIcon';  
import { SendIcon } from './SendIcon';


export const KroneIconsLibrary = () => {
    return (
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
            <ArrowDropdown width={50} height={50} data-testid={"arrowdropdown-icon"} style={{ margin: "15px" }} />
            <CheckBox width={50} height={50} data-testid={"checkbox-icon"} style={{ margin: "15px" }} />
            <EditIcon width={50} height={50} data-testid={"editicon-icon"} style={{ margin: "15px" }} />
            <EditorChoice width={50} height={50} data-testid={"eidtorchoice-icon"} style={{ margin: "15px" }} />
            <ErrorCircle width={50} height={50} data-testid={"errorcircle-icon"} style={{ margin: "15px" }} />
            <Forum width={50} height={50} data-testid={"forum-icon"} style={{ margin: "15px" }} />
            <Group width={50} height={50} data-testid={"group-icon"} style={{ margin: "15px" }} />
            <HelpCircle width={50} height={50} data-testid={"helpcircle-icon"} style={{ margin: "15px" }} />
            <LightBulb width={50} height={50} data-testid={"lightbulb-icon"} style={{ margin: "15px" }} />
            <MoreIcon width={50} height={50} data-testid={"moreicon-icon"} style={{ margin: "15px" }} />
            <ShareIcon width={50} height={50} data-testid={"shareicon-icon"} style={{ margin: "15px" }} />
            <ThumbUp width={50} height={50} data-testid={"thumpup-icon"} style={{ margin: "15px" }} />
            <ThumbUpClicked width={50} height={50} data-testid={"thumpupclicked-icon"} style={{ margin: "15px" }} />
            <VoteIcon width={50} height={50} data-testid={"voteicon-icon"} style={{ margin: "15px" }} />
            <NotificationBellIcon width={50} height={50} data-testid={"notificationbell-icon"} style={{ margin: "15px" }} />
            <SendIcon width={50} height={50} data-testid={"sendicon-icon"} style={{ margin: "15px" }} />


            

        </div>
    )
};