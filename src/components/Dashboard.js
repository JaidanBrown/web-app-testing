import React from 'react'
import { useAuth } from '../contexts/AuthContext';

import { useNavigate } from 'react-router-dom';

export default function Dashboard() {

    const {currentUser, logout} = useAuth()
    const history = useNavigate()

    async function handleLogout(){
        try {
            await logout()
            history.push("/login")
        } catch {
            
        }
    }

    return (
        <>
            <button onClick={handleLogout}>Logout</button>
        </>
    )
}
