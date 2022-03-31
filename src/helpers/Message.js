export const Message = ({ type = "success", message = '😀', className = "my-4" }) => {


    return (
        <>
            <div className={`alert alert-${type} alert-dismissible fade show ${className}`} role="alert">
                {message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        </>

    );
}


export const parseErrorMessage = (message) => {
    var responses = [];

    for (const key of Object.keys(message)) {
        for (const subKey of Object.keys(message[key])) {
            responses.push(<li>{message[key][subKey]}</li>);
        }
    }

    return responses;
}