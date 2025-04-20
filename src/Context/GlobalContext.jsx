import { createContext, useState, useEffect } from "react";
import useTasks from "../CustomHooks/useTasks";


export const GlobalContext = createContext();//creo contesto accessibile da altri componenti

export function GlobalProvider({children}){//qualsiasi children che inserisco all interno di questo componente
   
    const taskOperations = useTasks();


    // const globalProviderValue = { tasks }

    return (
        //value={globalProviderValue}
        <GlobalContext.Provider value={{...taskOperations}}>
            {children}
        </GlobalContext.Provider>
    )
}

//const {posts} = useContext(GlobalContext)