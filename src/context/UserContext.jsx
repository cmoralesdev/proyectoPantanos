
import { createContext, useContext, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase.config";


const UserContext = createContext(null);

const usuarioSimulado = {
    id: "Ndw9ViAft6gPct2roo5A ",
    nombre: "Javier Ruiz",
    email: "javier@gmail.com",
    telefono: "610234567"
};

const email = "carlossoftwaremail@gmail.com"
const password = "123456"



export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(usuarioSimulado);
    const login = async () => {
        const signInData = await signInWithEmailAndPassword(auth, email, password);
        const currentUser= signInData.user
        console.log(currentUser, "pruebasss")
        setUser(currentUser)
    }
    return (
        <UserContext.Provider value={{user,login}}>
            {children}
        </UserContext.Provider>)
}

// Hook para acceder fácilmente al usuario
export const useUser = () => useContext(UserContext);