import React from "react";
import { ConfigContext } from "./ConfigProvider";

export const withConfig = Component => props => (
    <ConfigContext.Consumer>
      {context => <Component {...props} {...context} />}
    </ConfigContext.Consumer>
  )