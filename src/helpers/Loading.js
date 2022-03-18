export const Loading = ({ size = '100px', text = 'Loading ...' }) => {
    return (
        <div class="d-flex justify-content-center align-items-center flex-column" style={{ height: '50vh' }}>
            <div class="spinner-border" role="status" style={{ width: size, height: size }}>
                <span class="sr-only">Loading...</span>
            </div>
            <span className="my-3">{text}</span>
        </div>
    );
}