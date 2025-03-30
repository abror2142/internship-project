import { createContext } from "react";
import { User } from "../types/User";

interface AuthContextInterface {
    user: User | null;
    login: (json: string) => void;
    logout: () => void;
    register: (json: string) => void;
    me: () => void;
}

export const AuthContext = createContext<AuthContextInterface | undefined>(undefined);