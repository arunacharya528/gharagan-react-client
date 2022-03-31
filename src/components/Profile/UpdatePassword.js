import { useState } from "react";
import Cookies from "universal-cookie";
import { updateUser } from "../../adapters/profile";
import { Message, parseErrorMessage } from "../../helpers/Message";

export const UpdatePassword = () => {

    const [password, setPassword] = useState(undefined);
    const [password_confirmation, setPassword_confirmation] = useState(undefined);

    const cookie = new Cookies();
    const [response, setResponse] = useState(undefined);

    const handleSubmission = (e) => {
        e.preventDefault();
        // console.log({ password, password_confirmation })
        updateUser(cookie.get('access_token'), cookie.get('userData').id, { password, password_confirmation })
            .then((response) => {
                setResponse({ message: { success: ['Successfully updated your Password'] }, type: 'success' })

            })
            .catch((error) => {
                setResponse({ message: error.response.data, type: 'danger' })
            });
    }
    return (
        <div class="card mb-4">
            <div class="card-header">
                Update Password
            </div>
            <div class="card-body d-flex flex-column">
                {response ? <Message message={parseErrorMessage(response.message).map((item, index) => <div key={index}>{item}</div>)} type={response.type} className="" /> : ''}
                <form>
                    <input type="password"
                        class="form-control mb-1" placeholder="Enter password" autoComplete="" onChange={e => setPassword(e.target.value)} />
                    <input type="password"
                        class="form-control mb-1" placeholder="Re-enter password" autoComplete="" onChange={e => setPassword_confirmation(e.target.value)} />
                    <div>
                        <button className="btn btn-primary" onClick={handleSubmission}>Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}