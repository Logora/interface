import React from 'react';
import { useGoogleAdManager } from '@logora/debate.ad.use_google_ad_manager';
import { AdUnit } from './AdUnit';

export const DefaultAdUnit = () => {
    useGoogleAdManager();

    return (
        <AdUnit
            id={"banner-ad"}
            adPath={"/6355419/Travel"} 
            sizes={[[300, 250]]}
        />
    );
};