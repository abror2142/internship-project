import { createContext } from "react";
import { User } from "../types/User";

interface AuthContextInterface {
    user: User | null;
    login: () => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextInterface | undefined>(undefined);