import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import LoginPage from '../views/Login'
import HomePage from '../views/Home'
import RegisterPage from '../views/Register'
import MenuPage from '../views/Invoices/InvoicePage'
import InvoicePage from '../views/Invoices/InvoicePage'
import Invoices from '../views/Invoices/Invoices'
import CustomerList from '../views/Customers/CustomerList'
import CustomerPage from '../views/Customers/Customer'
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
                    },
                    {
                        path: ":id",
                        element: <InvoicePage />
                    }
                ]
            },
            { 
                path: "customers/",
                children: [
                    {
                        path: "",
                        element: <CustomerList />
                    },
                    {
                        path: ":id",
                        element: <CustomerPage />
                    }
                ]
            },
            { path: "settings", element: <SettingsPage /> },
        ]
    }
])