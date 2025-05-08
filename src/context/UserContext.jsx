
import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

const usuarioSimulado = {
    id: "Ndw9ViAft6gPct2roo5A ",
    nombre: "Javier Ruiz",
    email: "javier@gmail.com",
    telefono: "610234567"
};

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(usuarioSimulado); 
    return(
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>)
}

// Hook para acceder fácilmente al usuario
export const useUser = () => useContext(UserContext);