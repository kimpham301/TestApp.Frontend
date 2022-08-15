import React, { createContext, useContext, useState, useEffect } from 'react'

export const stateContext = createContext({});

const getNewContext = () => {
    return {
        user_id: 0
    }
}
export function ContextProvider({children}){
    const [context, setContext] = useState(getNewContext())
    return(
        <stateContext.Provider value={{context, setContext}}>
            {children}
        </stateContext.Provider>
    )
}