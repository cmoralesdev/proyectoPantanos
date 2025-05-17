import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { auth } from "../config/firebase.config";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";




const UserContext = createContext(null);
const db = getFirestore();

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
    const register = async (email, password, name, phone) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            const createdUser = response.user;
            const { uid, accessToken } = createdUser;
    
            await setDoc(doc(db, "usuarios", uid), {
                email,
                name,
                phone,
                createdAt: new Date().toISOString(),
            });
    
            localStorage.setItem("session", JSON.stringify({ uid, accessToken, email, name, phone }));
            setUser({ uid, accessToken, email, name, phone });
    
            window.alert("Registro exitoso. ¡Bienvenido!");
        } catch (error) {
            console.error("Error en registro:", error);
            window.alert("Error al registrar: " + error.message);
        }
    };

    const login = async (email, password) => {
        try {
            const signInData = await signInWithEmailAndPassword(auth, email, password);
            const { uid, accessToken } = signInData.user;
    
            const docSnap = await getDoc(doc(db, "usuarios", uid));
            const userData = docSnap.exists() ? docSnap.data() : {};
    
            localStorage.setItem("session", JSON.stringify({ uid, accessToken, email, name: userData.name, phone: userData.phone }));
            setUser({ uid, accessToken, email, name: userData.name, phone: userData.phone });
        } catch (error) {
            console.error("Error en login:", error);
            window.alert("Error al iniciar sesión. Verifica tus credenciales.");
            throw error;
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


export const useUser = () => useContext(UserContext);
