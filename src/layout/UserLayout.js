import { Link, useLocation } from "react-router-dom";

export const UserLayout = ({ component }) => {
    const location = useLocation();
    const section = location.pathname.split("/");
    return (
        <div className="container-fluid row my-4">
            <div className="col-3">
                <div className="d-flex flex-column">
                    <Link to={"/user/"} className={"my-1 btn btn-" + (section[2] == "" ? 'secondary' : 'default')}>User</Link>
                    <Link to={"/user/cart"} className={"my-1 btn btn-" + (section[2] == "cart" ? 'secondary' : 'default')}>Cart</Link>
                    <Link to={"/user/order"} className={"my-1 btn btn-" + (section[2] == "order" ? 'secondary' : 'default')}>Order</Link>
                </div>
            </div>
            <div className="col-9">{component}</div>
        </div>

    );
}