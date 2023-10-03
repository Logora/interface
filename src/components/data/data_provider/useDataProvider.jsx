import { useContext } from "react";
import { DataProviderContext } from "./DataProviderContext";

export const useDataProvider = () => {
    const { dataProvider } = useContext(DataProviderContext);
    
    return dataProvider;
}