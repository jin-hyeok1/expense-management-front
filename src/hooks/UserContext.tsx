import {createContext, useContext, useEffect, useState} from "react";
import {getMe} from "../util/api.ts";
import {useNavigate} from "react-router-dom";

interface User {
    name: string,
    email: string,
    role: string,
}

const UserContext = createContext<User | null>(null);

// ✅ Provider
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        getMe().then(res => {
            setUser(res.data);
        });
    }, []);

    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => {
    const ctx = useContext(UserContext);
    const navigate = useNavigate();
    console.log(ctx)
    if (ctx === null) {
        navigate('/login')
    }
    return ctx;
};