import React, {useContext, useEffect, useState} from 'react'
import { firebase, auth } from "../firebase"
import { GoogleAuthProvider } from "firebase/auth"

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export  function AuthProvider( { children } ) {

    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    const googleAuthProvider = new GoogleAuthProvider()

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout () {
        return auth.signOut()
    }

    function googleLogin() {
        return auth.signInWithPopup(googleAuthProvider)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser, 
        signup, 
        login,
        logout,
        googleLogin
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
