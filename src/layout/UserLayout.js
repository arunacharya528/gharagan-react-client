import { Link, useLocation } from "react-router-dom";
import { BagIcon, CartIcon, CreditCardIcon, MapPinIcon, PersonIcon } from "../icons";
import bag from "../icons/bag.svg"

export const UserLayout = ({ component }) => {
    const location = useLocation();
    const section = location.pathname.split("/");
    return (
        <div className="container my-4">
            <div className="row">
                <div className="col-lg-3">
                    <div id="profile-card">

                        <div id="profile">
                            <div className="name">Some name</div>
                            <div className="email">someemail@email.com</div>
                        </div>

                        <div className="header">Dashboard</div>

                        <div className="grid">
                            <div className="item">
                                <div className="detail">
                                    <div className="icon">
                                        <BagIcon />
                                    </div>
                                    <Link to={"/user"} >Orders</Link>
                                </div>
                                <div className="value">
                                    1
                                </div>
                            </div>

                            <div className="item">
                                <div className="detail">
                                    <div className="icon">
                                       <CartIcon/>
                                    </div>
                                    <Link to={"/user"} >Cart</Link>
                                </div>
                                <div className="value">
                                    
                                </div>
                            </div>
                        </div>
                        <div className="header">Account Settings</div>

                        <div className="grid">
                            <div className="item">
                                <div className="detail">
                                    <div className="icon">
                                        <PersonIcon/>
                                    </div>
                                    <Link to={"/user"} >Profile</Link>
                                </div>
                                <div className="value">
                                    
                                </div>
                            </div>

                            <div className="item">
                                <div className="detail">
                                    <div className="icon">
                                        <MapPinIcon />
                                    </div>
                                    <Link to={"/user"} >Addresses</Link>
                                </div>
                                <div className="value">
                                    
                                </div>
                            </div>
                            <div className="item">
                                <div className="detail">
                                    <div className="icon">
                                        <CreditCardIcon />
                                    </div>
                                    <Link to={"/user"} >Payment Methods</Link>
                                </div>
                                <div className="value">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-9">{component}</div>
            </div>
        </div>

    );
}