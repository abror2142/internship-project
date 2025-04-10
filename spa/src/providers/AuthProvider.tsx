import { PropsWithChildren, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { User } from "../types/User";
import { registerApi, loginApi, logoutApi, meApi, userApi } from "../utils/api";
import { AuthResponse, AuthMeResponse, AuthUserResponse } from "../utils/zod";
import { z } from "zod";
import { jwtDecode, JwtPayload } from "jwt-decode";

const getToken = () => {
    return localStorage.getItem('token');
}

const isTokenExpired = (token: string | null) => {
    if(!token)
        return true;
    try {
        const decodedToken = jwtDecode<JwtPayload>(token);
        if(!decodedToken || !decodedToken?.exp)
            return true;
        const currentTime = Date.now() / 1000;
        return decodedToken?.exp < currentTime;
    } catch (e) {
        console.log('Error decoding token:', e);
        return true;
    }
}

function AuthProvider ({children} :PropsWithChildren) {
    const [user, setUser] = useState<User | null | undefined>(undefined);
    const [token, setToken] = useState<string | null>(getToken())

    const setAuth = (token: string, user: User) => {
        localStorage.setItem('token', token);
        setUser(user);
        setToken(token);
    }

    const removeAuth = () => {
        localStorage.removeItem('token');
        setUser(null);
        setToken(null);
    }

    const fetchUser = async () => {
        if(token) {
            try {
                const resp = await userApi();
                const validatedData = AuthUserResponse.parse(resp.data);
                setUser(validatedData.user);
            } catch(e) {
                console.log('Error while fetching user:', e);
                removeAuth();
            }
        } else {
            console.log('Token not valid!')
            removeAuth(); 
        }       
    }

    useEffect(() => {
        fetchUser();
    }, [])

    const login = async (json: string) => {
        try {
            const resp = await loginApi(json);
            const validatedData = AuthResponse.parse(resp.data);
            setAuth(validatedData.token, validatedData.user);
        } catch (e) {
            removeAuth()
            if(e instanceof z.ZodError) {
                console.log("Validation Error: ", e.errors);
            } else {
                console.log("Api Error: ", e);
            }
        }
    }

    const logout = async () => {
        if (token){
            try {
                await logoutApi();
                removeAuth();
            } catch (e) {
                console.log(e);
            }   
        }
    }

    const register = async (json: string) => {
        try {
            const resp = await registerApi(json);
            const validatedData = AuthResponse.parse(resp.data);
            setAuth(validatedData.token, validatedData.user);
        } catch (e) {
            // removeAuth()
            if(e instanceof z.ZodError) {
                console.log("Validation Error: ", e.errors);
            } else {
                console.log("Api Error: ", e);
            }
        }
    }

    const me = async () => {
        if(token){
            try {
                const resp = await meApi();
                const validatedData = AuthMeResponse.parse(resp.data);
                return validatedData;
            } catch (e) {
                if(e instanceof z.ZodError) {
                    console.log("Validation Error: ", e.errors);
                } else {
                    console.log("Api Error: ", e);
                }
            }
        }
    }
    

    return (
        <AuthContext.Provider value={{user, login, logout, register, me}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;