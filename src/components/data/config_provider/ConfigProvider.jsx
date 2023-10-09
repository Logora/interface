import React, { createContext } from "react";
import PropTypes from "prop-types";

export const ConfigContext = createContext();

export const ConfigProvider = ({ config, routes, children }) => {
  return (
    <ConfigContext.Provider value={{ config, routes }}>
      { children }
    </ConfigContext.Provider>
  );
}

ConfigProvider.propTypes = {
  /** Config object to store */
  config: PropTypes.object,
  /** Route object to store */
  routes: PropTypes.object,
  /** Provider children */
  children: PropTypes.node
};