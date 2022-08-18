import { useContext, useEffect, useState } from "react";
import { UpdateEmail } from "../components/Profile/UpdateEmail";
import { UpdateInfo } from "../components/Profile/UpdateInfo";
import { UpdatePassword } from "../components/Profile/UpdatePassword";
import { ModalContext } from "../context/ModalContext";
import { UserContext } from "../context/UserContext";
import { Loading } from "../helpers/Loading";

export const Profile = () => {

    const { user } = useContext(UserContext)

    const { setModalData, openModal, closeModal } = useContext(ModalContext)

    const handleInfoUpdate = () => {
        setModalData({
            title: "Update your info",
            body: <UpdateInfo onSuccess={() => { closeModal() }} />
        })
        openModal();
    }

    const handleEmailUpdate = () => {
        setModalData({
            title: "Update your email",
            body: <UpdateEmail onSuccess={() => { closeModal() }} />
        })
        openModal();
    }

    const handlePasswordUpdate = () => {
        setModalData({
            title: "Update your password",
            body: <UpdatePassword onSuccess={() => { closeModal() }} />
        })
        openModal();
    }


    return (
        <div className="p-2">
            {
                user ?
                    <>
    
                        <div className="flex flex-col space-y-5">
                            <div className="grid grid-cols-2 w-1/3">
                                <span className="font-semibold">Name</span>
                                <span>{user.data.name}</span>

                                <span className="font-semibold">Contact no</span>
                                <span>{user.data.contact}</span>

                                <span className="font-semibold">Email</span>
                                <span>{user.data.email}</span>
                            </div>
                            <div className="flex flex-col space-y-5 md:flex-row md:space-x-5 md:space-y-0">
                                <button className="btn btn-outline" onClick={handleInfoUpdate}>Update Info</button>
                                <button className="btn btn-outline" onClick={handleEmailUpdate}>Update Email</button>
                                <button className="btn btn-outline" onClick={handlePasswordUpdate}>Update Password</button>
                            </div>
                        </div>
                    </>
                    : <Loading />
            }
        </div>

    );
}