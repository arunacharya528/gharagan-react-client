import { createContext, useEffect, useState } from 'react';
import { getPageLinks } from '../adapters/page';

export const PageLinkContext = createContext();

export const PageLinkProvider = ({ children }) => {

    const [pageLinks, setPageLinks] = useState({ loading: true, data: [] });

    useEffect(() => {
        getPageLinks()
            .then(response => setPageLinks({ loading: false, data: response.data }))
            .catch(error => console.log(error))
    }, [])

    /**
     * 
     * @param {String} location page location of the link
     * @returns 
     */
    const getLinks = (location) => {
        if (!pageLinks.loading) {
            return pageLinks.data.filter((link) => {
                return link.location === location
            })
        } else {
            return [];
        }
    }
    return <PageLinkContext.Provider value={{ getLinks }}>{children}</PageLinkContext.Provider>
}