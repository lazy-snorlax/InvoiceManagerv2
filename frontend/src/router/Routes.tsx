import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import LoginPage from '../views/Login'
import HomePage from '../views/Home'
import RegisterPage from '../views/Register'
import MenuPage from '../views/Invoices/Invoice'
import InvoicePage from '../views/Invoices/Invoice'
import InvoiceList from '../views/Invoices/InvoiceList'


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
                        element: <InvoiceList />
                    },
                    {
                        path: ":id",
                        element: <InvoicePage />
                    }
                ]
            },
        ]
    }
])