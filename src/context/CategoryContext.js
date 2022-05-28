import { createContext, useEffect, useState } from "react";
import { getCategories } from "../adapters/category";

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
    const [categories, setCategories] = useState({ data: [], loading: true });

    useEffect(() => {
        getCategories()
            .then(response => {
                setCategories({ data: response.data, loading: false })
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return <CategoryContext.Provider value={{ categories }}>{children}</CategoryContext.Provider>


}