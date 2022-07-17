import { useEffect } from "react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../adapters/auth";
const queryString = require('query-string')

export const PasswordReset = () => {

    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const [errorMessage, setErrorMessage] = useState([])
    const password = useRef({});
    const location = useLocation();
    const navigate = useNavigate();
    password.current = watch("password", "");

    const [email, setEmail] = useState(undefined);
    const [token, setToken] = useState(undefined);

    useEffect(() => {
        const parsedData = queryString.parse(location.search);
        setToken(parsedData.token)
        setEmail(parsedData.email)
    }, [location.search])
    const onSubmit = data => {
        toast.promise(
            resetPassword({ ...data, ...{ token, email } }),
            {
                loading: "Updating your password",
                success: "Successfully updated your password",
                error: (error) => {
                    setErrorMessage(error.response.data)
                    return "An error occured"
                }
            }

        )
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen w-full top-0 fixed bg-base-100 z-40">
            <div className="w-11/12 md:w-1/3">
                {!token || !email ?
                    <div className="text-center">Follow correct procedure to reset password</div>
                    :
                    <>
                        <div className="text-center text-2xl">Reset Password for {email}</div>

                        {
                            errorMessage.length !== 0 ?
                                <div className=" flex justify-center">
                                    <div class="alert alert-error my-5">
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            <div className="flex flex-col">
                                                {errorMessage.map((error, index) =>
                                                    <div key={index}>{error}</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                : ''
                        }
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-3">
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
                                <input type="password" className={"input input-bordered input-secondary w-full " + (errors.password_confirmation ? 'input-error' : '')} placeholder="Re-Enter your password" {...register('password_confirmation', {
                                    validate: value =>
                                        value === password.current || "Passwords do not match"
                                })} />
                                {errors.password_confirmation ? <label className="text-error px-3 py-1">{errors.password_confirmation.message}</label> : ''}
                            </div>
                            <div className="space-x-5">
                                <button type="submit" className="btn btn-primary">
                                    Reset
                                </button>
                            </div>
                        </form>
                    </>
                }

                <button className="btn btn-ghost btn-outline block mx-auto mt-5" onClick={e => navigate("/")}>Go back</button>
            </div>
        </div>
    );
}