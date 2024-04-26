import { useContext } from "react";
import { ListContext } from "./ListProvider";

export const useList = () => useContext(ListContext);
