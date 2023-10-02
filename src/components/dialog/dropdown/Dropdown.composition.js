import React from 'react';
import { Dropdown } from './Dropdown';

export const DefaultDropdown = () => {
    return (
        <Dropdown>
            <div style={{ padding: "5px 15px", border: "1px solid black", borderRadius: "6px" }}>Left</div> 
            <div>
                <p>Child 1</p>
                <p>Child 2</p>
            </div>
        </Dropdown>
    )
};

export const CenterDropdown = () => {
    return (
        <Dropdown horizontalPosition={'center'}>
            <div style={{ padding: "5px 15px", border: "1px solid black", borderRadius: "6px" }}>Center</div> 
            <div>
                <p>Child 1</p>
                <p>Child 2</p>
            </div>
        </Dropdown>
    )
}

export const RightDropdown = () => {
    return (
        <Dropdown horizontalPosition={'right'}>
            <div style={{ padding: "5px 15px", border: "1px solid black", borderRadius: "6px" }}>Right</div> 
            <div>
                <p>Child 1</p>
                <p>Child 2</p>
            </div>
        </Dropdown>
    )
}