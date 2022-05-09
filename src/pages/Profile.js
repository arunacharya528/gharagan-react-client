import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Loading } from "../helpers/Loading";

export const Profile = () => {

    const [email, setEmail] = useState(undefined);
    const [firstName, setFirstName] = useState(undefined);
    const [lastName, setLastName] = useState(undefined);
    const [contact, setContact] = useState(undefined);


    const { user } = useContext(UserContext)
    useEffect(() => {
        setEmail(user.email);
        setFirstName(user.first_name)
        setLastName(user.last_name)
        setContact(user.contact)
    }, []);




    return (
        <div className="p-2">
            <div className="font-extrabold text-2xl">Profile</div>

            {
                user ?
                    <>
                        <div className="grid md:grid-cols-2 gap-5">
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
                        <button className="btn btn-primary mt-4">Save</button>
                    </>
                    : <Loading />
            }
        </div>

    );
}