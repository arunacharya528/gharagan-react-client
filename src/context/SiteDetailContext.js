import { useEffect, useState } from "react";
import { createContext } from "react";
import { getSiteDetails } from "../adapters/site";

export const SiteDetailContext = createContext();

export const SiteDetailProvider = ({ children }) => {

    const [siteDetails, setSiteDetails] = useState({ loading: true, data: [] });

    useEffect(() => {
        getSiteDetails()
            .then(response => setSiteDetails({ loading: false, data: response.data }))
    }, [])

    const getSiteData = (name) => {
        if (!siteDetails.loading) {
            return siteDetails.data.filter((detail, index) => {
                return detail.name === name
            })[0].value
        } else {
            return "";
        }
    }
    return <SiteDetailContext.Provider value={{ getSiteData }} >{children}</SiteDetailContext.Provider>
}