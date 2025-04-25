import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import SignupPage from "./pages/SignupPage.tsx";
import ExpenseListPage from "./pages/ExpenseListPage.tsx";
import ExpenseCreatePage from "./pages/ExpenseCreatePage.tsx";
import {UserProvider} from "./hooks/UserContext.tsx";
import {RequireAuth} from "./hooks/RequiredAuth.tsx";

const router = createBrowserRouter([
    {path: '/', element: <Navigate to={'/login'}/>},
    {path: '/expenses', element: <RequireAuth><ExpenseListPage/></RequireAuth>},
    {path: '/expense/new', element: <RequireAuth><ExpenseCreatePage/></RequireAuth>},
    {path: '/login', element: <LoginPage/>},
    {path: '/signup', element: <SignupPage/>},
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <UserProvider>
            <RouterProvider router={router}/>
        </UserProvider>
    </StrictMode>,
)
