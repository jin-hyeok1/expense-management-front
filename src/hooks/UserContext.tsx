import {createContext, useContext, useEffect, useState} from "react";
import {getMe} from "../api.ts";
import {User} from "../type.ts";
import {useNavigate} from "react-router-dom";


const UserContext = createContext<User | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getMe()
            .then(res => setUser(res.data))
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div>로딩 중...</div>; // 또는 스피너

    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => {
    return useContext(UserContext);
};