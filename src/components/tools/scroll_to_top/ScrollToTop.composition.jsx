import React from 'react';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { ScrollToTop } from './ScrollToTop';

const InnerComponent = () => {
    const navigate = useNavigate();

    return (
        <>
            <div onClick={() => navigate("?test=kjkj")}>Navigate</div>
            <div id="test" style={{ backgroundColor: 'red', height: '200px', marginTop: '100vh', marginBottom: '100vh', scrollMarginTop: '10px' }}>
                Scroll here
            </div>
            <ScrollToTop elementId={"test"} />
        </>
    )
}

export const DefaultScrollToTop = () => {
    return (
        <BrowserRouter>
            <InnerComponent />
        </BrowserRouter>
    );
};
