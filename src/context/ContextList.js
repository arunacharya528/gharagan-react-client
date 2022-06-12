import { AdvertisementProvider } from "./AdvertisementContext";
import { CartProvider } from "./CartContext";
import { CategoryProvider } from "./CategoryContext";
import { MaintainanceProvider } from "./MaintainanceContext";
import { ModalProvider } from "./ModalContext";
import { PageLinkProvider } from "./PageLinkContext";
import { UserProvider } from "./UserContext";
import { WishListProvider } from "./WishListContext";

export const ContextList = ({ children }) => {

    return (
        <>
            <MaintainanceProvider>
                <AdvertisementProvider>
                    <PageLinkProvider>
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
                    </PageLinkProvider>
                </AdvertisementProvider>
            </MaintainanceProvider>
        </>

    );
}