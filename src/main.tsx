import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import SignupPage from "./pages/SignupPage.tsx";
import ExpenseListPage from "./pages/ExpenseListPage.tsx";

const router = createBrowserRouter([
  {path: '/', element: <Navigate to={'/expenses'} />},
  {path: '/expenses', element: <ExpenseListPage/>},
  {path: '/login', element: <LoginPage/>},
  {path: '/signup', element: <SignupPage/>},
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <RouterProvider router={router}/>
    </StrictMode>,
)
