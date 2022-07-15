import { useContext, useEffect, useState } from "react";
import { UpdateInfo } from "../components/Profile/UpdateInfo";
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
    return (
        <div className="p-2">
            {
                user ?
                    <>
                        {/* <div className="grid md:grid-cols-2 gap-5">
                            <div class="form-control w-full">
                                <label class="label">
                                    <span class="label-text font-bold">First Name</span>
                                </label>
                                <input type="text" placeholder="Enter your first name" class="input input-bordered input-secondary w-full" value={firstName} onChange={e => setFirstName(e.target.value)} />
                            </div>

                            <div class="form-control w-full">
                                <label class="label">
                                    <span class="label-text font-bold">Last Name</span>
                                </label>
                                <input type="text" placeholder="Enter your last name" class="input input-bordered input-secondary w-full" value={lastName} onChange={e => setLastName(e.target.value)} />
                            </div>

                            <div class="form-control w-full">
                                <label class="label">
                                    <span class="label-text font-bold">Email</span>
                                </label>
                                <input type="text" placeholder="Enter your email" class="input input-bordered input-secondary w-full" value={email} onChange={e => setEmail(e.target.value)} />
                            </div>

                            <div class="form-control w-full">
                                <label class="label">
                                    <span class="label-text font-bold">Contact</span>
                                </label>
                                <input type="text" placeholder="Enter your contact" class="input input-bordered input-secondary w-full" value={contact} onChange={e => setContact(e.target.value)} />
                            </div>

                            <div class="form-control w-full">
                                <label class="label">
                                    <span class="label-text font-bold">Password</span>
                                </label>
                                <input type="text" placeholder="Enter new password" class="input input-bordered input-secondary w-full" />
                            </div>

                            <div class="form-control w-full">
                                <label class="label">
                                    <span class="label-text font-bold">Confirm password</span>
                                </label>
                                <input type="text" placeholder="Confirm new password" class="input input-bordered input-secondary w-full" />
                            </div>


                        </div>
                        <button className="btn btn-primary mt-4">Save</button> */}

                        <div className="flex flex-col space-y-5">
                            <div className="grid grid-cols-2 w-1/3">
                                <span className="font-semibold">Name</span>
                                <span>{user.data.name}</span>

                                <span className="font-semibold">Contact no</span>
                                <span>{user.data.contact}</span>

                                <span className="font-semibold">Email</span>
                                <span>{user.data.email}</span>
                            </div>
                            <div className="space-x-5">
                                <button className="btn btn-outline" onClick={handleInfoUpdate}>Update Info</button>
                                <button className="btn btn-outline">Update Email</button>
                                <button className="btn btn-outline">Update Password</button>
                            </div>
                        </div>
                    </>
                    : <Loading />
            }
        </div>

    );
}