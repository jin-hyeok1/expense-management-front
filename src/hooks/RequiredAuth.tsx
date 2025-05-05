import {Navigate} from "react-router-dom";
import {useUser} from "../context/UserContext.tsx";
import {ReactNode} from "react";

interface RequireAuthProps {
    children: ReactNode;
}

const RequireAuth = ({ children }: RequireAuthProps) => {
    const user = useUser();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default RequireAuth;