import React from "react";
import { Link, NavLink } from "react-router-dom";

interface Props {}

const Navbar = (props: Props) => {
    return (
        <div className="navbar bg-base-300 w-full">
            <div className="flex-none lg:hidden">
                <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-6 w-6 stroke-current">
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
                </label>
            </div>
            <div className="mx-2 flex-1 px-2">
                <Link to="/">Invoice Manager</Link>
            </div>
            <div className="hidden flex-none lg:block">
                <ul className="menu menu-horizontal">
                    <li><NavLink to="/invoices" className="">Invoices</NavLink></li>
                    <li><NavLink to="/quotes" className="">Quotes</NavLink></li>
                    <li><NavLink to="/customers" className="">Customers</NavLink></li>
                    {/* <li><a className="">Suppliers</a></li> */}
                    {/* <li><a className="">Business</a></li> */}
                    <li><NavLink to="/reports" className="">Reports</NavLink></li>
                    <li><NavLink to="/settings">Settings</NavLink></li>
                </ul>
            </div>
            <div className="hidden flex-none lg:block">
                <ul className="menu menu-horizontal">
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar