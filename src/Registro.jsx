import React from 'react'
import { auth } from './config/firebase.config'
import { createUserWithEmailAndPassword } from 'firebase/auth'


export default function Registro() {


    const email = "carlossoftwaail@manolo.com"
    const password = "123456"

    const register = async () => {
        const test = await createUserWithEmailAndPassword(auth, email, password);

    }




    return (
        <button onClick={register}> Registro </button>
    )
}