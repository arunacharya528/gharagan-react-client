import { useState } from "react";
import toast from "react-hot-toast";
import { subscribeNewsletter } from "../adapters/newsletter";

export const Newsletter = () => {
    const [email, setEmail] = useState('');

    const handleSubscription = () => {
        toast.promise(
            subscribeNewsletter({ email })
            ,
            {
                loading: "Subscribing to the newsletter",
                success: (response) => {
                    setEmail('');
                    return response.data;
                },
                error: "Error un/subscribing to the newsletter"
            }
        )
    }

    return (
        <div className="container mx-auto">
            <div class="form-control w-full my-40">

                <div class="relative mx-auto w-1/2">
                    <input type="text" placeholder="Your email address" class="input input-bordered w-full pr-16" value={email} onChange={e => setEmail(e.target.value)} />
                    <button class="btn btn-primary absolute top-0 right-0 rounded-l-none" onClick={handleSubscription}>Subscribe</button>
                </div>
            </div>
        </div>
    );
}