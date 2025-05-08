import React, { useContext } from 'react'
import { useUser } from './context/UserContext';

export default function Login() {
    const {user,login} = useUser()


    return (
        <button onClick={login}> login </button>
    )
}
