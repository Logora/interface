import { useContext } from "react";
import { ConfigContext } from "./ConfigProvider";

export const useRoutes = () => {
    const { routes } = useContext(ConfigContext);

    return routes;
}