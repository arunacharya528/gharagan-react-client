import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { updateUser } from "../../adapters/profile";
import { Message, parseErrorMessage } from "../../helpers/Message";

export const UpdateInfo = ({ oldInfo }) => {
    const [info, setInfo] = useState({});
    const cookie = new Cookies();
    const [response, setResponse] = useState(undefined);

    useEffect(() => {
        setInfo(oldInfo);
    }, []);

    const handleSubmission = () => {
        updateUser(cookie.get('access_token'), cookie.get('userData').id, info)
            .then((response) => {
                setResponse({ message: { success: ['Successfully updated your Information'] }, type: 'success' })
            })
            .catch((error) => {
                setResponse({ message: error.response.data, type: 'danger' })
            });
    }

    return (
        <div class="card mb-4">
            <div class="card-header">
                Update Info
            </div>
            <div class="card-body d-flex flex-column">
                {response ? <Message message={parseErrorMessage(response.message).map((item, index) => <div key={index}>{item}</div>)} type={response.type} className="" /> : ''}
                <input type="text"
                    class="form-control mb-1" placeholder="Enter first name" value={info.first_name} onChange={e => setInfo({ ...info, ...{ first_name: e.target.value } })} />
                <input type="text"
                    class="form-control mb-1" placeholder="Enter last name" value={info.last_name} onChange={e => setInfo({ ...info, ...{ last_name: e.target.value } })} />
                <input type="text"
                    class="form-control mb-1" placeholder="Enter contact no" value={info.contact} onChange={e => setInfo({ ...info, ...{ contact: e.target.value } })} />

                <div>
                    <button className="btn btn-primary" onClick={handleSubmission}>Update</button>
                </div>
            </div>
            <div class="card-footer text-muted">
                Related to your account.
            </div>
        </div>
    );
}