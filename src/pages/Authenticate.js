import { useState } from "react";
import { login, logout } from "../adapters/auth";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import toast from 'react-hot-toast';
export const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassowrd] = useState('');
    const { setUserData, handleLogout } = useContext(UserContext)

    const [errorMessage, setErrorMessage] = useState('')

    const handleLogin = () => {
        login({ email: email, password: password })
            .then((response) => {
                setUserData({
                    token: response.data.token,
                    name: response.data.name
                })

                if (response.data.role !== 3) {
                    toast(
                        "Login into admin dashboard to access admin dashboard",
                        {
                            duration: 6000,
                        }
                    );
                    handleLogout(response.data.token);
                }

            })
            .catch((error) => setErrorMessage(error.response.data.message))
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
                                <input type="text" placeholder="password" class="input input-bordered" onChange={e => setPassowrd(e.target.value)} />
                                {/* <label class="label">
                                <a href="#" class="label-text-alt link link-hover">Forgot password?</a>
                            </label> */}
                            </div>
                            <div class="form-control mt-6">
                                <button class="btn btn-primary" onClick={e => handleLogin()}>Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}