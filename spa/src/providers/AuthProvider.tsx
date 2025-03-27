import { PropsWithChildren, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { User } from "../types/User";

function AuthProvider ({children} :PropsWithChildren) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        setUser(null);
    }, [])

    const login = () => {

    }

    const logout = () => {

    }

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;