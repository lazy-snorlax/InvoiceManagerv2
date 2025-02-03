import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import LoginPage from '../views/Login'
import HomePage from '../views/Home'
import RegisterPage from '../views/Register'
import MenuPage from '../views/Invoices/InvoicePage'
import Invoices from '../views/Invoices/Invoices'
import Customers from '../views/Customers/Customers'
import Quotes from '../views/Quotes'
import SettingsPage from '../views/Settings'


export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "", element: <HomePage /> },
            { path: "login", element: <LoginPage /> },
            { path: "menu", element: <MenuPage /> },
            { path: "register", element: <RegisterPage /> },
            { 
                path: "invoices/",
                children: [
                    {
                        path: "",
                        element: <Invoices />
                    }
                ]
            },
            {
                path: "quotes",
                children:  [
                    {
                        path: "",
                        element: <Quotes />
                    }
                ]
            },
            { 
                path: "customers/",
                children: [
                    {
                        path: "",
                        element: <Customers />
                    }
                ]
            },
            { path: "settings", element: <SettingsPage /> },
        ]
    }
])