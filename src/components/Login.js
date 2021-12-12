import React,{ useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate} from 'react-router-dom';
import { getAuth, getRedirectResult, GoogleAuthProvider } from "firebase/auth";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();

    const {login} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useNavigate()

    async function signInWithGoogle(e) {
        e.preventDefault()
        
    }
    
    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history("/")
        } catch {
            setError('Failed to login.')
        }

        setLoading(false)

    }

    return (
        <>
            <div className='login-form-container'>
                <h2>Login</h2>
                {error && <h3>{error}</h3>}
                <form onSubmit={handleSubmit}>
                    <fieldset id="email">
                        <label>Email</label>
                        <input type="email" ref={emailRef} required></input>
                    </fieldset>
                    <fieldset is="password">
                        <label>Password</label>
                        <input type="password" ref={passwordRef} required></input>
                    </fieldset>
                    <fieldset id="submit">
                        <button disabled={loading} type="submit">Login</button>
                    </fieldset>
                </form>
                <button onClick={signInWithGoogle}>Sign In With Google</button>
                <div>
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </div>
            </div>
        </>
    )
}
