import React,{ useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const {signup} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useNavigate()
    
    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            return setError('Passwords do not match.')
        }

        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            history("/")
        } catch {
            setError('Failed to create account.')
        }

        setLoading(false)

    }

    return (
        <>
            <div className='signup-form-container'>
                <h2>Sign Up</h2>
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
                    <fieldset id="confirmPassword">
                        <label>Confirm Password</label>
                        <input type="password" ref={confirmPasswordRef} required></input>
                    </fieldset>
                    <fieldset id="submit">
                        <button disabled={loading} type="submit">Sign Up</button>
                    </fieldset>
                </form>
                <div>
                    Already have an account? <Link to="/login">Login</Link>
                </div>
            </div>
        </>
    )
}
