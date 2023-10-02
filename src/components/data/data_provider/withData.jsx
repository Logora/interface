import React from "react";
import { DataProviderContext } from './DataProviderContext';

export const withData = Component => props => {
    return (
      <DataProviderContext.Consumer>
        {context => (
            <Component {...props} {...context} />
        )}
      </DataProviderContext.Consumer>
    )
}