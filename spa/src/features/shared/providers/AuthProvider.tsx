import { PropsWithChildren, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { registerApi, loginApi, logoutApi, meApi, userApi } from "../utils/api";
import { loginSchema, userMeSchema, userSchema } from "../utils/zod";
import { z } from "zod";
import { User } from "../types/user";

const getToken = () => {
    return localStorage.getItem('token');
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

    const refreshUser = async () => {
        if(token) {
            try {
                const resp = await userApi();
                console.log(resp, resp.data)
                const parsed = userSchema.safeParse(resp.data);
                if(!parsed.success) {
                    console.log('Error while parsing data!', parsed.error);
                    throw new Error('Api data mismatch!');
                }
                setUser(parsed.data);
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
        refreshUser();
    }, [])

    const login = async (json: string) => {
        try {
            const resp = await loginApi(json);
            const validatedData = loginSchema.parse(resp.data);
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
            const validatedData = loginSchema.parse(resp.data);
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
                const validatedData = userMeSchema.parse(resp.data);
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
        <AuthContext.Provider value={{user, login, logout, register, me, refreshUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;