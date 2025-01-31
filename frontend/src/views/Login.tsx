import React from "react";
import * as Yup from 'yup'

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
    // const { loginUser } = null //useAuth
    // const {
    //     register,
    //     handleSubmit,
    //     formState: { errors },
    // } = useForm<LoginFormsInputs>({ resolver: yupResolver(validation) })

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">
                        Login to Account
                    </h1>
                    <p className="py-6"></p>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage