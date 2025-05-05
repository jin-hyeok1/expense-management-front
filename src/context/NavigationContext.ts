import { createContext, useContext } from 'react';

export const NavigationContext = createContext<(path: string) => void>(() => {});
export const useAppNavigate = () => useContext(NavigationContext);