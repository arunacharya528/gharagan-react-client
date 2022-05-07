import { Link, useLocation } from "react-router-dom";
import { CartProvider } from "../context/CartContext";
import { UserProvider } from "../context/UserContext";
import { BagIcon, CartIcon, CreditCardIcon, MapPinIcon, PersonIcon } from "../icons";
import bag from "../icons/bag.svg"

export const UserLayout = ({ component }) => {
    const location = useLocation();
    const section = location.pathname.split("/");
    return (
        <UserProvider>
            <CartProvider>
                {component}
            </CartProvider>
        </UserProvider>
    );
}