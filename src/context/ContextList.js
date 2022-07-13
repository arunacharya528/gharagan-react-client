import { AddressProvider } from "./AddressContext";
import { AdvertisementProvider } from "./AdvertisementContext";
import { CartProvider } from "./CartContext";
import { CategoryProvider } from "./CategoryContext";
import { MaintainanceProvider } from "./MaintainanceContext";
import { ModalProvider } from "./ModalContext";
import { PageLinkProvider } from "./PageLinkContext";
import { SiteDetailProvider } from "./SiteDetailContext";
import { UserProvider } from "./UserContext";
import { WishListProvider } from "./WishListContext";

export const ContextList = ({ children }) => {

    return (
        <>
            <SiteDetailProvider>
                <MaintainanceProvider>
                    <AdvertisementProvider>
                        <PageLinkProvider>
                            <UserProvider>
                                <AddressProvider>
                                    <CartProvider>
                                        <CategoryProvider>
                                            <WishListProvider>
                                                <ModalProvider>
                                                    {children}
                                                </ModalProvider>
                                            </WishListProvider>
                                        </CategoryProvider>
                                    </CartProvider>
                                </AddressProvider>
                            </UserProvider>
                        </PageLinkProvider>
                    </AdvertisementProvider>
                </MaintainanceProvider>
            </SiteDetailProvider>

        </>

    );
}