import React from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./config/firebase.config";

export default function Login() {


    const email = "carlossoftwaremail@gmail.com"
    const password = "123456"

    const login = async () => {
        const test = await signInWithEmailAndPassword(auth, email, password);
        console.log(test)
        console.log("HOLA", test.user)
    }




    return (
        <button onClick={login}> login </button>
    )
}
