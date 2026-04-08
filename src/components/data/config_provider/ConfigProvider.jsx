import React, { createContext } from "react";

export const ConfigContext = createContext();

export const ConfigProvider = ({ config, routes, children }) => {
  return (
    <ConfigContext.Provider value={{ config, routes }}>
      { children }
    </ConfigContext.Provider>
  );
}

