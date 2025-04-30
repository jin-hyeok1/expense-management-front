import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import SignupPage from "./pages/SignupPage.tsx";
import ExpenseListPage from "./pages/expenselist/ExpenseListPage.tsx";
import ExpenseCreatePage from "./pages/expensecreate/ExpenseCreatePage.tsx";
import {UserProvider} from "./hooks/UserContext.tsx";
import RequireAuth from "./hooks/RequiredAuth.tsx";
import SubjectManagePage from "./pages/subjectmanage/SubjectManagePage.tsx";

const router = createBrowserRouter([
    {path: '/', element: <Navigate to={'/login'}/>},
    {
        element: <UserProvider><RequireAuth /></UserProvider>,
        children: [
            { path: "/expenses", element: <ExpenseListPage /> },
            { path: "/expense/new", element: <ExpenseCreatePage /> },
            { path: "/admin/subjects", element: <SubjectManagePage />}
        ]
    },
    {path: '/login', element: <LoginPage/>},
    {path: '/signup', element: <SignupPage/>},
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
            <RouterProvider router={router}/>
    </StrictMode>,
)
