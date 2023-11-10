import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const useAuth = () => {
    const authState = useContext(AuthContext);

    return authState;
}