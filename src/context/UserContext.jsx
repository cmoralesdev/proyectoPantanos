import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { auth } from "../config/firebase.config";

const UserContext = createContext(null);

// const usuarioSimulado = {
//   id: "Ndw9ViAft6gPct2roo5A ",
//   nombre: "Javier Ruiz",
//   email: "javier@gmail.com",
//   telefono: "610234567",
// };

//const emailTest = "carlossoftwaremail@gmail.com";
//const password = "123456";

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const session = localStorage.getItem("session");
        if (!session) {
            console.log("no existe una sesión!");
            setUser(null);
        } else {
            setUser(JSON.parse(session));
        }
    }, []);
    const register = async (email, password) => {
        try {
            //cambiar email y password por datos que vengan de un formulario de registro
            //const email = "carlossoftwaail@manolo.com";
            //const password = "123456";
            const response = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const createdUser = response.user;
            const { uid, accessToken } = createdUser;
            localStorage.setItem("session", JSON.stringify({ uid, accessToken }));
            setUser({ uid, accessToken });
            window.alert("Registro exitoso. ¡Bienvenido!");
        } catch (error) {
            console.log("Comprueba que el email no esté ya en uso");
            console.log(error);
            window.alert("Error al registrar: " + error.message);
        }
    };

    const login = async (email, password) => {
        try {
            const signInData = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            const { uid, accessToken } = signInData.user;
            localStorage.setItem("session", JSON.stringify({ uid, accessToken }));
            setUser({ uid, accessToken });
        }catch (error) {
            console.error("Error en login:", error);
            window.alert("Error al iniciar sesión. Verifica tus credenciales.");
            throw error; // Por si quieres capturarlo en el componente de Login
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            localStorage.removeItem("session");
            setUser(null);
            window.alert("Sesión cerrada correctamente");

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <UserContext.Provider value={{ user, register, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook para acceder fácilmente al usuario
export const useUser = () => useContext(UserContext);
