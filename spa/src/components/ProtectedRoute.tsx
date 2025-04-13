import { PropsWithChildren } from "react";
import { useAuth } from "../features/shared/hooks/useAuth";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = PropsWithChildren & {
    allowedRoles: string[];
}
function ProtectedRoute ({children, allowedRoles}: ProtectedRouteProps) {
    const { user } = useAuth();
    
    if (user === undefined) 
        return <p>Checking permissions...</p>;
    
    if (user === null) 
        return <Navigate to={'/login'} />
    
    if (allowedRoles && !allowedRoles?.some(allowedRole => user.roles.includes(allowedRole)))
        return <Navigate to={'/'} />

    return children;
}

export default ProtectedRoute;