import React from "react";
import { ConfigProvider } from "./ConfigProvider";

export const withConfig = Component => props => (
    <ConfigContext.Consumer>
      {context => <Component {...props} {...context} />}
    </ConfigContext.Consumer>
  )