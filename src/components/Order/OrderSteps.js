export const OrderSteps = ({ status }) => {

    const getResponse = (place) => {
        if (place <= status) {
            return 'step-primary';
        }
    }
    return (
        <ul class="steps steps-vertical lg:steps-horizontal lg:w-full my-5">
            <li class={"step " + getResponse(1)}>Order placed<br />(Available for cancellation)</li>
            <li class={"step " + getResponse(2)}>Product Collected for delivery</li>
            <li class={"step " + getResponse(3)}>Product being shipped</li>
            <li class={"step " + getResponse(4)}>Product received</li>
        </ul>
    );

}