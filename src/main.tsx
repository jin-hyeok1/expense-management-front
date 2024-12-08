import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import SignupPage from "./pages/SignupPage.tsx";
import HomePage from "./pages/HomePage.tsx";

const router = createBrowserRouter([
  {path: '/main', element: <HomePage/>},
  {path: '/', element: <LoginPage/>},
  {path: '/signup', element: <SignupPage/>},
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <RouterProvider router={router}/>
    </StrictMode>,
)
