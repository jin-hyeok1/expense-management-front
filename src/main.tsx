import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import SignupPage from "./pages/SignupPage.tsx";
import ExpenseListPage from "./pages/expenselist/ExpenseListPage.tsx";
import ExpenseCreatePage from "./pages/expensecreate/ExpenseCreatePage.tsx";
import {UserProvider} from "./context/UserContext.tsx";
import RequireAuth from "./hooks/RequiredAuth.tsx";
import SubjectManagePage from "./pages/subjectmanage/SubjectManagePage.tsx";
import {UserManagePage} from "./pages/usermanage/UserManagePage.tsx";
import {ExpenseManagePage} from "./pages/expensemanage/ExpenseManagePage.tsx";
import App from "./App.tsx";
import {MyInfoPage} from "./pages/myinfo/MyInfoPage.tsx";

const router = createBrowserRouter([
    {path: '/', element: <Navigate to={'/login'}/>},
    {
        element: <UserProvider>
            <RequireAuth>
                <App/>
            </RequireAuth>
        </UserProvider>,
        children: [
            {path: "/expenses", element: <ExpenseListPage/>},
            {path: "/expense/new", element: <ExpenseCreatePage/>},
            {path: "/admin/subjects", element: <SubjectManagePage/>},
            {path: '/admin/members', element: <UserManagePage/>},
            {path: '/admin/expenses', element: <ExpenseManagePage/>},
            {path: '/my-info', element: <MyInfoPage/>}
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
