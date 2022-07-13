import { createContext, useContext, useEffect, useState } from "react";
import { getUser } from "../adapters/profile";
import { UserContext } from "./UserContext";

export const AddressContext = createContext();

export const AddressProvider = ({ children }) => {

    const { user } = useContext(UserContext)
    const [addresses, setAddresses] = useState([]);
    const [isRefreshed, setRefresh] = useState(false)

    useEffect(() => {
        getUser(user.data.token, 'addresses')
            .then(response => setAddresses(response.data))
            .catch(error => console.log(error))
    }, [isRefreshed,user])

    const updateAddress = () => { 
        setRefresh(!isRefreshed);
    }

    return <AddressContext.Provider value={{ addresses, updateAddress }}>{children}</AddressContext.Provider>
}