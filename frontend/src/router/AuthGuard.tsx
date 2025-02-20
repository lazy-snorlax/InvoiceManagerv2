import React, { Children, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/auth";


interface AuthGuardProps {
    children: React.ReactNode
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
    const navigate = useNavigate()
    const { user, get_user } = useAuthStore()

    useEffect(() => {
        get_user()
    }, [get_user])

    if (user === null) {
        navigate("/login")
        return null
    }

    return <>{children}</>
}

export default AuthGuard