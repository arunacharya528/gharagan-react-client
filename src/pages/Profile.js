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
        setContact(user.conatact)
    }, []);




    return (
        <> {
            user ?
                <>
                    <div className="row mt-5">
                        <div className="col-sm-6">
                            <div class="form-group">
                                <label className="fw-bold">First Name</label>
                                <input type="text"
                                    class="form-control" value={firstName} onChange={e => setFirstName(e.target.value)} />
                                    
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div class="form-group">
                                <label className="fw-bold">Last Name</label>
                                <input type="text"
                                    class="form-control" value={lastName} onChange={e => setLastName(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-sm-6">
                            <div class="form-group">
                                <label className="fw-bold">Email</label>
                                <input type="text"
                                    class="form-control" value={email} onChange={e => setEmail(e.target.value)} />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div class="form-group">
                                <label className="fw-bold">Contact</label>
                                <input type="text"
                                    class="form-control" value={contact} onChange={e => setContact(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-sm-6">
                            <div class="form-group">
                                <label className="fw-bold">Password</label>
                                <input type="text"
                                    class="form-control" />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div class="form-group">
                                <label className="fw-bold">Confirm Password</label>
                                <input type="text"
                                    class="form-control" />
                            </div>
                        </div>
                    </div>

                    <div className="d-flex justify-content-end mt-3">
                        <button className="brand-btn px-3 py-2 rounded">Update Profile</button>
                    </div>
                </>
                : <Loading />
        }
        </>

    );
}