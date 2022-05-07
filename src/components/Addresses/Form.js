export const AdvertisementForm = (props = {
    address_line1: { value: String, setValue: Function },
    address_line2: { value: String, setValue: Function },
    city: { value: String, setValue: Function },
    telephone: { value: String, setValue: Function },
    mobile: { value: String, setValue: Function },
    submit: { value: String, click: Function }
}) => {

    return (
        <>
            <div class="form-group mb-3">
                <label className="fw-bold">Address Line 1</label>
                <input type="text"
                    class="form-control" placeholder="Enter address line 1"
                    value={props.address_line1.value}
                    onChange={e => props.address_line1.setValue(e.target.value)} />
            </div>
            <div class="form-group mb-3">
                <label className="fw-bold">Address Line 2</label>
                <input type="text"
                    class="form-control" placeholder="Enter address line 2"
                    value={props.address_line2.value}
                    onChange={e => props.address_line2.setValue(e.target.value)} />
            </div>
            <div class="form-group mb-3">
                <label className="fw-bold">City</label>
                <input type="text"
                    class="form-control" placeholder="Enter city"
                    value={props.city.value}
                    onChange={e => props.city.setValue(e.target.value)} />
            </div>
            <div class="form-group mb-3">
                <label className="fw-bold">Telephone</label>
                <input type="text"
                    class="form-control" placeholder="Enter telephone"
                    value={props.telephone.value}
                    onChange={e => props.telephone.setValue(e.target.value)} />
            </div>
            <div class="form-group mb-3">
                <label className="fw-bold">Mobile</label>
                <input type="text"
                    class="form-control" placeholder="Enter mobile"
                    value={props.mobile.value}
                    onChange={e => props.mobile.setValue(e.target.value)} />
            </div>

            <button class="btn btn-primary" onClick={props.submit.click}>{props.submit.value}</button>
        </>
    );
}