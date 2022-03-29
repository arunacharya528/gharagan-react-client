export const Message = ({ type = "success", message = '😀' }) => {


    return (
        <>
            <div className={`alert alert-${type} alert-dismissible fade show my-4`} role="alert">
                {message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        </>

    );
}