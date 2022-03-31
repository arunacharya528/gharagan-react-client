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
        <div className="container">
            <div className="row w-100 d-flex flex-row justify-content-center align-items-center m-0" style={{ height: '70vh' }} >
                <div className="col-sm-6">
                    {error ?
                        <div class="alert alert-danger" role="alert">
                            {error}
                        </div> : ''
                    }
                    <div className="card p-4 shadow-sm">
                        <form>
                            <h2>Login</h2>
                            <div class="form-group mt-4">
                                <input type="text" id="email" class="form-control" placeholder="Email" onChange={e => setEmail(e.target.value)} />
                            </div>
                            <div class="form-group mt-4">
                                <input type="password" id="password" class="form-control" placeholder="Password" onChange={e => setPassowrd(e.target.value)} />
                            </div>
                            <div className="mt-4">
                                <button type="submit" class="btn btn-primary" onClick={handleLogin}>Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
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