import { Link, useLocation } from "react-router-dom";

export const UserLayout = ({ component }) => {
    const location = useLocation();
    const section = location.pathname.split("/");
    return (
        <div className="container-fluid row my-4">
            <div className="col-lg-2">
                <div className="d-flex flex-column sticky-top">
                    <Link to={"/user"} className={"my-1 btn btn-" + (section[1] == "user" ? 'secondary' : 'default')}>User</Link>
                    <Link to={"/cart"} className={"my-1 btn btn-" + (section[1] == "cart" ? 'secondary' : 'default')}>Cart</Link>
                    <Link to={"/order"} className={"my-1 btn btn-" + (section[1] == "order" ? 'secondary' : 'default')}>Order</Link>
                </div>
            </div>
            <div className="col-lg-10">{component}</div>
        </div>

    );
}