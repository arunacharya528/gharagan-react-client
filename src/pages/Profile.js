import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { getUser } from "../adapters/profile";
import { UpdateAddress } from "../components/Profile/UpdateAddress";
import { UpdateEmail } from "../components/Profile/UpdateEmail";
import { UpdateInfo } from "../components/Profile/UpdateInfo";
import { UpdatePassword } from "../components/Profile/UpdatePassword";
import { Loading } from "../helpers/Loading";

export const Profile = () => {

    const [profile, setProfile] = useState(undefined);
    const [email, setEmail] = useState(undefined);
    const [firstName, setFirstName] = useState(undefined);
    const [lastName, setLastName] = useState(undefined);
    const [contact, setContact] = useState(undefined);

    const cookie = new Cookies();
    useEffect(() => {
        getUser(cookie.get('access_token'), cookie.get('userData').id)
            .then((response) => {
                setProfile(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);




    return (
        <> {
            profile ?
                <div className="row">
                    <div className="col-sm-6">
                        <UpdateEmail oldEmail={profile.email} />
                        <UpdateAddress oldAddress={profile.address} />
                    </div>
                    <div className="col-sm-6">

                        <UpdateInfo oldInfo={{ first_name: profile.first_name, last_name: profile.last_name, contact: profile.contact }} />
                        <UpdatePassword />
                    </div>
                </div>
                : <Loading />
        }
        </>
    );
}