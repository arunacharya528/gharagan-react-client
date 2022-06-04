import { AdvertisementProvider } from "./AdvertisementContext";
import { CartProvider } from "./CartContext";
import { CategoryProvider } from "./CategoryContext";
import { ModalProvider } from "./ModalContext";
import { UserProvider } from "./UserContext";
import { WishListProvider } from "./WishListContext";

export const ContextList = ({ children }) => {

    return (
        <AdvertisementProvider>
            <UserProvider>
                <CartProvider>
                    <CategoryProvider>
                        <WishListProvider>
                            <ModalProvider>
                                {children}
                            </ModalProvider>
                        </WishListProvider>
                    </CategoryProvider>
                </CartProvider>
            </UserProvider>
        </AdvertisementProvider>
    );
}