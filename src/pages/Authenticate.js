import { useRef, useState } from "react";
import { forgotPassword, login, logout, registerClient } from "../adapters/auth";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from "react-router-dom";
export const Login = () => {

    const location = useLocation();
    const tabs = [
        {
            name: "Login",
            value: "/user/profile#login"
        },
        {
            name: "Register",
            value: "/user/profile#register"
        },
        {
            name: "Forgot Password",
            value: "/user/profile#forgot-password"
        }
    ]


    const LoginForm = () => {
        const { user, setUserData, handleLogout } = useContext(UserContext)
        const [email, setEmail] = useState('');
        const [password, setPassowrd] = useState('');

        const [errorMessage, setErrorMessage] = useState('')

        const handleLogin = () => {
            toast.promise(
                login({ email: email, password: password }),
                {
                    loading: "Logging in",
                    success: (response) => {
                        setUserData(response.data)
                        return "Successfully logged-in to your account"
                    },
                    error: (error) => {
                        setErrorMessage(error.response.data.message)
                        return "An error occured"
                    }
                }
            )
        }
        return (
            <>

                {
                    errorMessage !== '' ?
                        <div className=" flex justify-center">
                            <div class="alert alert-error">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span>{errorMessage}</span>
                                </div>
                            </div>
                        </div>
                        : ''
                }


                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Email</span>
                    </label>
                    <input type="text" placeholder="email" class="input input-bordered" onChange={e => setEmail(e.target.value)} />
                </div>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Password</span>
                    </label>
                    <input type="password" placeholder="password" class="input input-bordered" onChange={e => setPassowrd(e.target.value)} />
                    {/* <label class="label">
                                <a href="#" class="label-text-alt link link-hover">Forgot password?</a>
                            </label> */}
                </div>
                <div class="form-control mt-6">
                    <button class="btn btn-primary" onClick={e => handleLogin()}>Login</button>
                </div>
            </>
        );
    }

    const RegisteringForm = () => {
        const { user, updateUser, setUserData } = useContext(UserContext);
        const { register, handleSubmit, formState: { errors }, watch } = useForm();
        const [errorMessage, setErrorMessage] = useState('')
        const password = useRef({});
        password.current = watch("password", "");

        const onSubmit = data => {
            toast.promise(
                registerClient(data),
                {
                    loading: "Registering your account",
                    success: (response) => {
                        setUserData(response.data)
                        toast.success("Successfully registered your account");
                        return "Successfully logged in to your account"
                    },
                    error: (error) => {
                        setErrorMessage(error.response.data)
                        console.log(error.response.data)
                        return "An error occured"
                    }
                }
            )
        }


        return (
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-3">

                {
                    errorMessage !== '' ?
                        <div className=" flex justify-center">
                            <div class="alert alert-error">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span>{errorMessage}</span>
                                </div>
                            </div>
                        </div>
                        : ''
                }
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text font-bold">Name</span>
                    </label>
                    <input type="text" className={"input input-bordered input-secondary w-full " + (errors.name ? 'input-error' : '')} placeholder="Enter your name" {...register("name", { required: "Name is required" })} />
                    {errors.name ? <label className="text-error px-3 py-1">{errors.name.message}</label> : ''}
                </div>
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text font-bold">Contact</span>
                    </label>
                    <input type="text" className={"input input-bordered input-secondary w-full " + (errors.contact ? 'input-error' : '')} placeholder="Enter your contact" {...register("contact", { required: "Contact is required" })} />
                    {errors.contact ? <label className="text-error px-3 py-1">{errors.contact.message}</label> : ''}
                </div>

                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text font-bold">Email</span>
                    </label>
                    <input type="text" className={"input input-bordered input-secondary w-full " + (errors.email ? 'input-error' : '')} placeholder="Enter your email" {...register("email", { required: "email is required" })} />
                    {errors.email ? <label className="text-error px-3 py-1">{errors.email.message}</label> : ''}
                </div>

                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text font-bold">Password</span>
                    </label>
                    <input type="password" className={"input input-bordered input-secondary w-full " + (errors.password ? 'input-error' : '')} placeholder="Enter your password" {...register("password", { required: "password is required" })} />
                    {errors.password ? <label className="text-error px-3 py-1">{errors.password.message}</label> : ''}
                </div>
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text font-bold">Repeat Password</span>
                    </label>
                    <input type="password" className={"input input-bordered input-secondary w-full " + (errors.passwordVerify ? 'input-error' : '')} placeholder="Re-Enter your password" {...register('passwordVerify', {
                        validate: value =>
                            value === password.current || "Passwords do not match"
                    })} />
                    {errors.passwordVerify ? <label className="text-error px-3 py-1">{errors.passwordVerify.message}</label> : ''}
                </div>

                <div className="space-x-5">
                    <button type="submit" className="btn btn-primary">
                        Register
                    </button>
                </div>
            </form >
        );
    }

    const PasswordForgot = () => {
        const { register, handleSubmit, formState: { errors }, watch } = useForm();
        const [errorMessage, setErrorMessage] = useState('')
        const onSubmit = data => {
            toast.promise(
                forgotPassword(data),
                {
                    loading: "Analyzing",
                    success: (response) => {
                        setErrorMessage('')
                        return `A password resetting notification was sent to ${data.email}`
                    },
                    error: (error) => {
                        setErrorMessage(error.response.data.message)
                        return "An error occured"
                    }
                }
            )
        }
        return (
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-3">

                {
                    errorMessage !== '' ?
                        <div className=" flex justify-center">
                            <div class="alert alert-error">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span>{errorMessage}</span>
                                </div>
                            </div>
                        </div>
                        : ''
                }

                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text font-bold">Email</span>
                    </label>
                    <input type="text" className={"input input-bordered input-secondary w-full " + (errors.email ? 'input-error' : '')} placeholder="Enter your email" {...register("email", { required: "email is required" })} />
                    {errors.email ? <label className="text-error px-3 py-1">{errors.email.message}</label> : ''}
                </div>
                <div className="space-x-5">
                    <button type="submit" className="btn btn-primary">
                        Forgot
                    </button>
                </div>
            </form>
        );
    }
    const getSelectedTab = (path) => {
        switch (path) {
            case "/user/profile#login": return <LoginForm />
            case "/user/profile#register": return <RegisteringForm />
            case "/user/profile#forgot-password": return <PasswordForgot />
            default: return <LoginForm />
        }
    }
    return (

        <>

            <div class="hero min-h-screen bg-base-200">

                <div class="hero-content flex-col lg:flex-row-reverse">

                    <div class="text-center lg:text-left">
                        <h1 class="text-5xl font-bold">Login now!</h1>
                        <p class="py-6">Login ito your gharagan account to have easy acess like <b>add items in cart</b>, <b>Order item</b> and other stuff</p>
                    </div>
                    <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div class="card-body">

                            <div class="tabs tabs-boxed w-full mb-4">
                                {tabs.map((tab, index) =>
                                    <Link className={"tab " + (location.pathname + location.hash === tab.value ? 'tab-active' : '')} to={tab.value} key={index}>{tab.name}</Link>
                                )}
                            </div>

                            {getSelectedTab(location.pathname + location.hash)}

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}