import { createContext, useEffect, useState } from "react";
import { getActiveAdvertisements } from "../adapters/advertisement";

export const AdvertisementContext = createContext();

export const AdvertisementProvider = ({ children }) => {

    const [advertisements, setAdvertisements] = useState({ data: [], loading: true });

    useEffect(() => {
        getActiveAdvertisements()
            .then(response => setAdvertisements({ data: response.data, loading: false }))
            .catch(error => console.log(error))
    }, [])

    /**
     * 
     * @param {String} page Name of the page to get advertisement
     * @param {String} type Type of advertisement
     * @returns Array
     */
    const getAdvertisement = (type) => {
        if (!advertisements.loading) {
            return advertisements.data.filter((ad) => {
                return ad.type === type
            })
        } else {
            return [];
        }
    }

    return <AdvertisementContext.Provider value={{ getAdvertisement }}>{children}</AdvertisementContext.Provider>
}