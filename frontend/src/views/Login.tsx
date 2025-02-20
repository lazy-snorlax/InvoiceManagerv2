import React, { useRef, useState } from "react"
import * as Yup from 'yup'
import { useAuthStore } from "../stores/auth"
import { redirect, useNavigate } from 'react-router'

type Props = {}

type LoginFormsInputs = {
    userName: string
    password: string
}

const validation = Yup.object().shape({
    userName: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
})

const LoginPage = (props: Props) => {
    const { user, login } = useAuthStore()
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const userRef = useRef(username)
    const passRef = useRef(password)

    let navigate = useNavigate()
    // const {
    //     register,
    //     handleSubmit,
    //     formState: { errors },
    // } = useForm<LoginFormsInputs>({ resolver: yupResolver(validation) })

    const submit = async () => {
        try {
            await login({ email: userRef.current, password: passRef.current })

            // If login successful, reroute to dashboard
            navigate("/")
        } catch (error) {
            console.error(">>> Login error: ", error)
        }
    }

    const handleOnChange = (event) => {
        const { name, value } = event.target
        if (name == "username") {
            userRef.current = value
        }
        if (name == 'password') {
            passRef.current = value
        }
    }

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">
                        Login to Account
                    </h1>
                    <p className="py-6"></p>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <div className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Username</span>
                                </label>
                                <input type="text" placeholder="Username" className="input input-bordered" name="username" defaultValue={username} required onChange={handleOnChange} />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="Password" className="input input-bordered" name="password" defaultValue={password} required onChange={handleOnChange} />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary" onClick={submit}>Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage