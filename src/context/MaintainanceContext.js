import { createContext, useEffect, useState } from "react";
import { isOnMaintainance } from "../adapters/maintainance";

export const MaintainanceContext = createContext();

export const MaintainanceProvider = ({ children }) => {
    const [onMaintainance, setMaintainanceMode] = useState(false);

    useEffect(() => {
        isOnMaintainance()
            .then(response => setMaintainanceMode(false))
            .catch(error => setMaintainanceMode(true))
    }, [])
    
    return <MaintainanceContext.Provider value={{}}>
        {
            onMaintainance ?
                <div className="fixed top-0 bg-base-100 z-40 h-screen w-screen flex justify-center items-center flex-col space-y-5">
                    <div className="text-5xl">X﹏X</div>
                    <div>We are curently on maintainance mode</div>
                    <div>Please try again later</div>
                </div>
                : children
        }


    </MaintainanceContext.Provider>
}