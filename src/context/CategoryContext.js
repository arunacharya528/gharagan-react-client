import { createContext, useEffect, useState } from "react";
import { getCategories } from "../adapters/category";

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories()
            .then(response => {
                setCategories(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return <CategoryContext.Provider value={{ categories }}>{children}</CategoryContext.Provider>


}