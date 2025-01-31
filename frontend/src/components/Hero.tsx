import React from "react";
import { Link } from "react-router-dom";

interface Props {};

const Hero = (props: Props) => {
    return (
        <div id="hero" className="hero bg-base-200 min-h-screen">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">
                        Invoice Manager
                    </h1>
                    <p className="py-6">
                        Manage the invoices for your local business
                    </p>
                    <Link to="/login">
                        <button className="btn btn-primary">Login</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Hero;