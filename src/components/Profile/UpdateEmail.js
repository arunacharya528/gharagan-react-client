import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { updateUser } from "../../adapters/profile";
import { Message, parseErrorMessage } from "../../helpers/Message";

export const UpdateEmail = ({ oldEmail, onSubmit }) => {
    const [email, setEmail] = useState('');
    const cookie = new Cookies();
    const [response, setResponse] = useState(undefined);


    useEffect(() => {
        setEmail(oldEmail);
    }, [])

    const handleSubmission = () => {
        updateUser(cookie.get('access_token'), cookie.get('userData').id, { email })
            .then((response) => {
                setResponse({ message: { success: ['Successfully updated your email'] }, type: 'success' })

            })
            .catch((error) => {
                setResponse({ message: error.response.data, type: 'danger' })
            });
    }
    return (
        <div class="card mb-4">
            <div class="card-header">
                Update email
            </div>
            <div class="card-body d-flex flex-column">

                {response ? <Message message={parseErrorMessage(response.message).map((item, index) => <div key={index}>{item}</div>)} type={response.type} className="" /> : ''}

                <input type="text"
                    class="form-control" value={email} placeholder="Enter new email" onChange={e => setEmail(e.target.value)} />
                <div>
                    <button className="btn btn-primary my-1" onClick={handleSubmission}>Update</button>
                </div>
            </div>
            <div class="card-footer text-muted">
                Required for logging in
            </div>
        </div>
    );
}