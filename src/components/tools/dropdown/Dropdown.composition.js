import React from 'react';
import { Dropdown } from './Dropdown';

export const DefaultDropdown = () => {
    return (
        <Dropdown>
            <div style={{ padding: "5px 15px", border: "1px solid black", borderRadius: "6px" }}>Title</div> 
            <div>
                <p>Child 1</p>
                <p>Child 2</p>
            </div>
        </Dropdown>
    )
};

export const RightDropdown = () => {
    return (
        <Dropdown dropdownListRight={ true }>
            <div style={{ padding: "5px 15px", border: "1px solid black", borderRadius: "6px" }}>Title</div> 
            <div>
                <p>Child 1</p>
                <p>Child 2</p>
            </div>
        </Dropdown>
    )
}

export const MobileDropdown = () => {
    return (
        <Dropdown dropdownListMobile={ true }>
            <div style={{ padding: "5px 15px", border: "1px solid black", borderRadius: "6px" }}>Title</div> 
            <div>
                <p>Child 1</p>
                <p>Child 2</p>
            </div>
        </Dropdown>
    )
}