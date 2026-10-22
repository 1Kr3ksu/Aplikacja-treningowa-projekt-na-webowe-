import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/Login.css'

function Login() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false,
    })
    const [message, setMessage] = useState('')
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target

        setFormData((currentFormData) => ({
            ...currentFormData,
            [name]: type === 'checkbox' ? checked : value,
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setMessage('')
        setIsError(false)

        if (!formData.email || !formData.password) {
            setMessage('Wypełnij wszystkie pola.')
            setIsError(true)
            return
        }

        setIsLoading(true)

        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Nie udało się zalogować.')
            }

            setMessage(data.message || 'Logowanie udane.')
            setIsError(false)
            setFormData({
                email: '',
                password: '',
                remember: false,
            })

            navigate('/dashboard')
        } catch (error) {
            setMessage(error.message)
            setIsError(true)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <div className="Login-intro">
                <img src="/fittrack-logo.svg" alt="FitTrack" />

                <span className="login-eyebrow">TRENUJ MĄDRZE</span>
                <h1 className="login-title">Forma zaczyna się od dobrego planu.</h1>
                <p className="login-description">FitTrack porządkuje każdy trening -od pierwszej serii po najlepszy wynik.</p>
            </div>
            <div className="Login-page">
                <h1>Zaloguj się</h1>
                <p>Wróć do swojego planu treningowego.</p>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="Wpisz swój email" value={formData.email} onChange={handleChange} required />
                    <label htmlFor="password">Hasło</label>
                    <input type="password" id="password" name="password" placeholder="Wpisz swoje hasło" value={formData.password} onChange={handleChange} required />
                    <label className="remember-me">
                        <input type="checkbox" name="remember" checked={formData.remember} onChange={handleChange} />
                        <span className="custom-checkbox" aria-hidden="true">✓</span>
                        <span>Zapamiętaj mnie</span>
                    </label>
                    {message ? <p className={isError ? 'form-message error' : 'form-message success'}>{message}</p> : null}
                    <button id="login-button" type="submit" disabled={isLoading}>{isLoading ? 'Logowanie...' : 'Zaloguj się'}</button>
                    <p className="login-footer">Nie masz konta? <Link to="/register">Zarejestruj się</Link></p>
                </form>
            </div>
        </>
    )
}
export default Login