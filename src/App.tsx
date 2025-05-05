import {Outlet, useNavigate} from "react-router-dom";
import { NavigationContext } from './context/NavigationContext';
import {useEffect} from "react";
import {setNavigate} from "./navi.ts";

const App = () => {
    const navigate = useNavigate();

    useEffect(() => {
        setNavigate(navigate);
    }, [navigate]);

    return (
        <NavigationContext.Provider value={navigate}>
            <Outlet />
        </NavigationContext.Provider>
    );
};

export default App;