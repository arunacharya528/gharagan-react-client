import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { sendVerificationNotification, verifyEmail } from "../adapters/auth";
import { CartProvider } from "../context/CartContext";
import { UserContext, UserProvider } from "../context/UserContext";
import { ArrowLeftIcon, BagIcon, CartIcon, ChevronLeftIcon, CreditCardIcon, FullScreenEnterIcon, FullScreenExitIcon, ListIcon, MapPinIcon, PersonIcon } from "../icons";
import bag from "../icons/bag.svg"
import { Login } from "../pages/Authenticate";
import { UserDashboard } from "./UserDashboard";

export const UserLayout = ({ component }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, updateUser } = useContext(UserContext)
    const [isDrawerFit, fitDrawer] = useState(false);
    const [pin, setPin] = useState('');

    const resendVerificationEMail = () => {
        toast.promise(
            sendVerificationNotification(user.data.token),
            {
                loading: "Sending verification notification to " + user.data.email,
                success: "Verification notification sent to " + user.data.email,
                error: "Error sending verification notification to " + user.data.email
            }
        );
    }
    const submitForVerification = () => {
        toast.promise(
            verifyEmail(user.data.token, { verificationPin:pin }),
            {
                loading:"Verifying email",
                success:()=>{
                    updateUser()
                    return "Email verified"
                },
                error:"Error occured while verifying email"
            }
        )
    }

    return (
        <>
            {
                !user.loading ?

                    user.data.email_verified_at !== null ?
                        <div class={"drawer drawer-mobile " + (isDrawerFit ? "fixed top-0 bg-base-100 z-40" : '')} >
                            <input id="dashboardDrawer" type="checkbox" class="drawer-toggle" />
                            <div class="drawer-content">
                                <div class="navbar bg-base-200 shadow-md sticky top-0 z-50">
                                    <div class="flex-1 flex space-x-3">
                                        <label for="dashboardDrawer" class="btn btn-ghost btn-square drawer-button lg:hidden">
                                            <ListIcon className="w-6 h-6" />
                                        </label>
                                        {
                                            location.pathname.split('/').length >= 4 ?
                                                <button className="btn btn-circle btn-ghost" onClick={e => navigate(-1)}>
                                                    <ArrowLeftIcon />
                                                </button>
                                                : ''
                                        }
                                        <span className="uppercase text-xl font-bold">{location.pathname.split("/")[2]}</span>
                                    </div>
                                    <div class="flex-none">

                                        <div className="tooltip tooltip-left" data-tip={isDrawerFit ? "Exit Fullscreen" : "Fullscreen"}>
                                            <button className="btn btn-ghost btn-circle" onClick={e => fitDrawer(!isDrawerFit)}>
                                                {isDrawerFit ? <FullScreenExitIcon /> : <FullScreenEnterIcon />}
                                            </button>
                                        </div>

                                    </div>
                                </div>

                                <div className="p-5">
                                    {component}
                                </div>

                            </div>
                            <div class="drawer-side">
                                <label for="dashboardDrawer" class="drawer-overlay"></label>
                                <UserDashboard />
                            </div>
                        </div>
                        :
                        <div className="h-full w-full flex flex-col space-y-5 items-center justify-center">
                            <div className="w-72">
                                You must verify your email to continue
                                <div className="py-5 flex flex-col">
                                    <div class="form-control w-full max-w-xs">
                                        <input type="text" placeholder="Enter PIN here" class="input input-bordered input-primary w-full max-w-xs" value={pin} onChange={e=>setPin(e.target.value) } />
                                        <label class="label">
                                            <span class="label-text-alt">A pin code was sent to {user.data.email}</span>
                                        </label>
                                    </div>
                                    <button className="btn btn-primary mt-4 w-full" onClick={submitForVerification}>
                                        Submit
                                    </button>
                                </div>

                                <div className="btn btn-accent mt-4 w-full" onClick={resendVerificationEMail}>
                                    Resend PIN
                                </div>
                            </div>

                        </div>
                    : <Login />
            }
        </>
    );
}