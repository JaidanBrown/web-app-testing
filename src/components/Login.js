import React,{ useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate} from 'react-router-dom';

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();

    const {login, googleLogin} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useNavigate()

    async function signInWithGoogle (e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await googleLogin()
            history("/")
        } catch {
            setError('Failed to login with Google.')
        }

        setLoading(false)
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
            <div className='form-container'>
                <h2>Login</h2>
                {error && <h3>{error}</h3>}
                <form onSubmit={handleSubmit}>
                    <fieldset id="email">
                        <input placeholder="Email" type="email" ref={emailRef} required></input>
                    </fieldset>
                    <fieldset is="password">
                        <input placeholder="Password" type="password" ref={passwordRef} required></input>
                    </fieldset>
                    <fieldset id="submit">
                        <button disabled={loading} type="submit">Login</button>
                    </fieldset>
                    <fieldset id="submit">
                    <button onClick={signInWithGoogle}>Sign In With Google</button>
                    </fieldset>
                </form>
                <div>
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </div>
            </div>
        </>
    )
}
