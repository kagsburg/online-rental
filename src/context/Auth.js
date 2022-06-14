import { createContext,useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // const [auth, setAuth] = useState({});
    const [user, setUser] = useState(null);

    const login = (user)=>{
        setUser(user);
        console.log('setting global variable user',user);
    }
    const logout = ()=>{
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ login,logout,user,setUser }}>
            {children}
        </AuthContext.Provider>
    )
}
//function to return the value of the context
export const useAuth = () => {
    return useContext(AuthContext);
}
