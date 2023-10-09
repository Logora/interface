import { useContext } from "react";
import { ConfigContext } from "./ConfigProvider";

export const useConfig = () => {
    const { config } = useContext(ConfigContext);

    return config;
}