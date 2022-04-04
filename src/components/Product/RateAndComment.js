import { useState } from "react";
import Cookies from "universal-cookie";
import { RateInput } from "../Rating";

export const RateAndComment = () => {

    const [rate, setRate] = useState(0);
    const [comment, setComment] = useState('');

    const cookie = new Cookies();

    const handleRateChange = (rate) => {
        setRate(rate);
    }

    const handleSubmission = () => {
        console.log({rate, comment})
    }
    return (
        <div className="my-4">
            <div class="form-group">
                <label for="">Rate and comment as {cookie.get('userData').first_name} {cookie.get('userData').last_name}</label>
                <div className="d-block">{<RateInput handleChange={handleRateChange} />}</div>
                <textarea class="form-control" name="" id="" rows="3" onChange={e => setComment(e.target.value)}></textarea>
            </div>
            <button type="submit" class="btn btn-primary my-2" onClick={e => handleSubmission()}>Comment</button>
        </div>
    );
}