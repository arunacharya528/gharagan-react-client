import { useEffect, useState } from "react";
import { login, logout } from "../adapters/auth";
import Cookies from 'universal-cookie';
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassowrd] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const cookies = new Cookies();

    const goBack = () => {
        if (cookies.get('userData')) {
            navigate(-1)
        }
    }


    useEffect(() => {
        goBack();
    }, [])


    const handleLogin = (e) => {
        e.preventDefault();
        login({ email: email, password: password })
            .then((response) => {
                console.log(response)
                cookies.set('userData', response.data.user, { path: '/' });
                cookies.set('session_id', response.data.session_id, { path: '/' });
                cookies.set('access_token', response.data.access_token, { path: '/' });

                goBack();
            })
            .catch((error) => {
                switch (error.response.status) {
                    case 401:
                        setError('Your credentials are unauthorized. Register first.');
                        break;

                    default:
                        setError('Error: ' + error.response.statusText);
                        break;
                }
            });
    }

    return (
        // <div className="container">
        //     <div className="row w-100 d-flex flex-row justify-content-center align-items-center m-0" style={{ height: '70vh' }} >
        //         <div className="col-sm-6">
        //             {error ?
        //                 <div class="alert alert-danger" role="alert">
        //                     {error}
        //                 </div> : ''
        //             }
        //             <div className="card p-4 shadow-sm">
        //                 <form>
        //                     <h2>Login</h2>
        //                     <div class="form-group mt-4">
        //                         <input type="text" id="email" class="form-control" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        //                     </div>
        //                     <div class="form-group mt-4">
        //                         <input type="password" id="password" class="form-control" placeholder="Password" onChange={e => setPassowrd(e.target.value)} />
        //                     </div>
        //                     <div className="mt-4">
        //                         <button type="submit" class="btn btn-primary" onClick={handleLogin}>Login</button>
        //                     </div>
        //                 </form>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <>
            <div className="sticky top-0 z-10 w-full flex justify-center">
                <div class="alert alert-error shadow-lg md:w-1/2 m-5">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>Error! Task failed successfully.</span>
                    </div>
                </div>
            </div>
            
            <div class="hero min-h-screen bg-base-200">

                <div class="hero-content flex-col lg:flex-row-reverse">

                    <div class="text-center lg:text-left">
                        <h1 class="text-5xl font-bold">Login now!</h1>
                        <p class="py-6">Login ito your gharagan account to have easy acess like <b>add items in cart</b>, <b>Order item</b> and other stuff</p>
                    </div>
                    <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div class="card-body">
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
                                <button class="btn btn-primary">Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export const AuthUser = () => {
    const cookies = new Cookies();
    const [user, setUser] = useState();

    useEffect(() => {
        if (!user) {
            setUser(cookies.get('userData'));
        }
    })

    const handleLogout = () => {
        const accessToken = cookies.get('access_token');
        logout(accessToken)
            .catch(error => console.log(error))
        cookies.remove('userData', { path: "/" })
        cookies.remove('session_id', { path: "/" })
        cookies.remove('access_token', { path: "/" })

        setUser(undefined);
        window.location.reload();
    }

    return (
        <>
            <div class="profile d-flex align-items-center">
                <i class="fa fa-user-o" aria-hidden="true"></i>
                <div>
                    <div class="user">Welcome {user ? user.first_name : 'user'}</div>
                    {user ?
                        <div onClick={e => handleLogout()} style={{ cursor: 'pointer' }}>Logout</div>
                        :
                        <Link to={'/login'}>Login</Link>}
                </div>
            </div>

        </>
    );
}

export const AuthRedirect = () => {
    return (
        <Link to={"/login"} className="btn btn-primary" >Log in to continue</Link>
    );
}