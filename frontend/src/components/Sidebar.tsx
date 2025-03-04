import React from "react";
import { Link } from "react-router-dom";

interface Props {}

const Sidebar = (props: Props) => {
    return (
        <>
            <div className="drawer-side">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 min-h-full w-80 p-4">
                    <li><a className="">Invoices</a></li>
                    <li><a className="">Quotes</a></li>
                    <li><a className="">Customers</a></li>
                    <li><a className="">Suppliers</a></li>
                    <li><a className="">Business</a></li>
                    <li><a className="">Settings</a></li>
                    <li><a className="">Reports</a></li>
                    <hr />
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                </ul>
            </div>
        </>
    )
}

export default Sidebar