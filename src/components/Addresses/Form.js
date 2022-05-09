export const AddressForm = (props = {
    address_line1: { value: String, setValue: Function },
    address_line2: { value: String, setValue: Function },
    city: { value: String, setValue: Function },
    telephone: { value: String, setValue: Function },
    mobile: { value: String, setValue: Function },
    submit: { value: String, click: Function }
}) => {

    return (
        <>
            <div className="form-control">
                <label className="label pb-0">Address line 1</label>
                <input type="text" placeholder="Enter your address line 1" class="input input-bordered input-secondary w-full" value={props.address_line1.value}
                    onChange={e => props.address_line1.setValue(e.target.value)} />
            </div>

            <div className="form-control">
                <label className="label pb-0">Address line 2</label>
                <input type="text" placeholder="Enter your address line 2" class="input input-bordered input-secondary  w-full" value={props.address_line2.value}
                    onChange={e => props.address_line2.setValue(e.target.value)} />

            </div>

            <div className="form-control">
                <label className="label pb-0">City</label>
                <input type="text" placeholder="Enter your city" class="input input-bordered input-secondary w-full" value={props.city.value}
                    onChange={e => props.city.setValue(e.target.value)} />

            </div>

            <div className="form-control">
                <label className="label pb-0">Telephone</label>
                <input type="text" placeholder="Enter your telephone number" class="input input-bordered input-secondary w-full" value={props.telephone.value}
                    onChange={e => props.telephone.setValue(e.target.value)} />
            </div>
            <div className="form-control">
                <label className="label pb-0">Mobile</label>
                <input type="text" placeholder="Enter your mobile number" class="input input-bordered input-secondary w-full" value={props.mobile.value}
                    onChange={e => props.mobile.setValue(e.target.value)} />
            </div>

            <button class="btn btn-primary mt-4" onClick={props.submit.click}>{props.submit.value}</button>
        </>
    );
}