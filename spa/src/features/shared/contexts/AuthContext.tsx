import { createContext } from "react";
import { User } from "../types/user";

interface AuthContextInterface {
    user: User | null | undefined;
    login: (json: string) => void;
    logout: () => void;
    register: (json: string) => void;
    refreshUser: () => void;
    me: () => void;
}

export const AuthContext = createContext<AuthContextInterface | undefined>(undefined);