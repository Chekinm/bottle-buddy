import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({})

export const AuthProvider = ({ children }) =>  {
    
    const [auth, setAuth] = useState()
    const [stayLoggedIn, setStayLoggedIn] = useState(JSON.parse(localStorage.getItem('stayLoggedIn') || false ))

    return (
        <AuthContext.Provider value={{auth, setAuth, stayLoggedIn, setStayLoggedIn}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext