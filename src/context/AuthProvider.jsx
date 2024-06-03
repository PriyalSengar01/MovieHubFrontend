import React, { createContext, useContext, useState } from 'react'

export const AuthContext = createContext()

export default function AuthProvider({ children }) {
    const initialuthUser = localStorage.getItem("Users");
    const [authuser, setauth] = useState(
        initialuthUser ? JSON.parse(initialuthUser) : null
    );
    return (
        <AuthContext.Provider value={[authuser, setauth]}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => {
    return useContext(AuthContext);
}