import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { updateAddress } from "../../adapters/profile";
import { Message, parseErrorMessage } from "../../helpers/Message";

export const UpdateAddress = ({ oldAddress }) => {

    const [address, setAddress] = useState({});
    const cookie = new Cookies();
    const [response, setResponse] = useState(undefined);

    useEffect(() => {
        setAddress(oldAddress)
    }, []);


    const handleSubmission = () => {
        updateAddress(cookie.get('access_token'), address.id, address)
            .then((response) => {
                setResponse({ message: { success: ['Successfully updated Address'] }, type: 'success' })

            })
            .catch((error) => {
                setResponse({ message: error.response.data, type: 'danger' })
            });
    }
    return (
        <div class="card mb-4">
            <div class="card-header">
                Update Address
            </div>
            <div class="card-body d-flex flex-column">
                {response ? <Message message={parseErrorMessage(response.message).map((item, index) => <div key={index}>{item}</div>)} type={response.type} className="" /> : ''}
                <div class="form-group mb-1">
                    <label for="line1">Address line 1</label>
                    <input type="text"
                        class="form-control" placeholder="Enter address line 1" value={address.address_line1} onChange={e => setAddress({ ...address, ...{ address_line1: e.target.value } })} />
                </div>
                <div class="form-group mb-1">
                    <label for="line2">Address line 2</label>
                    <input type="text"
                        class="form-control" placeholder="Enter address line 2" value={address.address_line2} onChange={e => setAddress({ ...address, ...{ address_line2: e.target.value } })} />
                </div>
                <div class="form-group mb-1">
                    <label for="city">City</label>
                    <input type="text"
                        class="form-control" placeholder="Enter City" value={address.city} onChange={e => setAddress({ ...address, ...{ city: e.target.value } })} />
                </div>
                <div class="form-group mb-1">
                    <label for="line1">Telephone</label>
                    <input type="text"
                        class="form-control" placeholder="Enter Telephone number" value={address.telephone} onChange={e => setAddress({ ...address, ...{ telephone: e.target.value } })} />
                </div>
                <div class="form-group mb-1">
                    <label for="line1">Mobile</label>
                    <input type="text"
                        class="form-control" placeholder="Enter mobile number" value={address.mobile} onChange={e => setAddress({ ...address, ...{ mobile: e.target.value } })} />
                </div>

                <div>
                    <button className="btn btn-primary" onClick={handleSubmission}>Update</button>
                </div>
            </div>
            <div class="card-footer text-muted">
                This information is for delivery of prodct. A contact would be made to verify shipping to the given address.
            </div>
        </div>
    );
}