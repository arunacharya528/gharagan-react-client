import { useContext } from "react";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { updateUser } from "../../adapters/profile";
import { UserContext } from "../../context/UserContext";
import { Message, parseErrorMessage } from "../../helpers/Message";
import { timer } from "../../helpers/timer";

export const UpdateInfo = () => {
    const { user } = useContext(UserContext);

    const [name, setName] = useState('');
    const [contact, setContact] = useState('');

    const initialTimeout = { show: false, timer: 0 };
    const [timOut, setTimeOut] = useState(initialTimeout)

    const handleUpdate = () => {
        //     // console.log('handle update')
        //     timer(5,
        //         () => { alert('updated info') },
        //         () => { setTimeOut({ initialTimeout }) },
        //         (seconds) => { setTimeOut({ showTrue }) }
        //     )
    }

    // console.log(name, contact);
    return (
        <div className="flex flex-col space-y-3">
            <div class="form-control w-full">
                <label class="label">
                    <span class="label-text font-bold">Name</span>
                </label>
                <input type="text" placeholder="Enter your name" class="input input-bordered input-secondary w-full" defaultValue={user.data.name} onChange={e => setName(e.target.value)} />
            </div>
            <div class="form-control w-full">
                <label class="label">
                    <span class="label-text font-bold">Contact</span>
                </label>
                <input type="text" placeholder="Enter your contact" class="input input-bordered input-secondary w-full" defaultValue={user.data.contact} onChange={e => setContact(e.target.value)} />
            </div>

            <div className="space-x-5">
                <button className="btn btn-primary" onClick={e => handleUpdate()}>
                    Update
                </button>
                <div class="radial-progress w-10 h-10" style={{ "--value": 100, "--thickness": "2px" }}></div>
            </div>
        </div >
    );
}