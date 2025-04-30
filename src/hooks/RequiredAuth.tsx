import { Navigate, Outlet } from "react-router-dom";
import {useUser} from "./UserContext.tsx";

const RequireAuth = () => {
    const user = useUser();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default RequireAuth;