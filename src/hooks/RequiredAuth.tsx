import {Navigate} from 'react-router-dom';
import {useUser} from "./UserContext.tsx";

export const RequireAuth = ({children}: { children: React.ReactNode }) => {
    const user = useUser();

    if (!user) {
        return <Navigate to="/login" replace/>;
    }

    return children;
};