import { createBrowserRouter, Navigate, useNavigate } from 'react-router-dom'
import App from '../App'
import LoginPage from '../views/Login'
import HomePage from '../views/Home'
import RegisterPage from '../views/Register'
import Invoices from '../views/Invoices/Invoices'
import Customers from '../views/Customers/Customers'
import Quotes from '../views/Quotes/Quotes'
import SettingsPage from '../views/Settings'
import Reports from '../views/Reports'
import AuthGuard from './AuthGuard'

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "", element: <HomePage /> },
            { path: "login", element: <LoginPage /> },
            { path: "register", element: <RegisterPage /> },
            { 
                path: "invoices/", 
                element: (
                    <AuthGuard>
                        <Invoices />
                    </AuthGuard>
                )
            },
            { 
                path: "quotes", 
                element: (
                    <AuthGuard>
                        <Quotes />
                    </AuthGuard>
                ) 
            },
            { 
                path: "customers/", 
                element: (
                    <AuthGuard>
                        <Customers /> 
                    </AuthGuard>
                )
            },
            { 
                path: "settings", 
                element: (
                    <AuthGuard>
                        <SettingsPage /> 
                    </AuthGuard>
                )
            },
            { 
                path: "reports", 
                element: (
                    <AuthGuard>
                        <Reports /> 
                    </AuthGuard>
                )
            },
        ]
    }
])