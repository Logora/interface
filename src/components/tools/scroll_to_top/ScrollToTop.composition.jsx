import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ScrollToTop } from './ScrollToTop';

export const DefaultScrollToTop = () => {
    return (
        <BrowserRouter>
            <>
                <div id="test" style={{ backgroundColor: 'red', height: '200px', marginTop: '700px' }}>Scroll here</div>
                <ScrollToTop elementId={"test"} />
            </>
        </BrowserRouter>
    );
};
