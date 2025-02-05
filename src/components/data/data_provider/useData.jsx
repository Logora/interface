import { useContext, useState } from "react";
import { DataProviderContext } from "./DataProviderContext";

export const useData = (dataKey, dataDefault) => {
    const { dataMap = {} } = useContext(DataProviderContext) || {}
    const [data, setData] = useState(dataKey in dataMap ? dataMap[dataKey] : dataDefault)

    return [data, setData]
}