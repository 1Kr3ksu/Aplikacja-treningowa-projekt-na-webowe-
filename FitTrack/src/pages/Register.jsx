import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Login.css'

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false,
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

        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            setMessage('Wypełnij wszystkie pola.')
            setIsError(true)
            return
        }

        if (formData.password !== formData.confirmPassword) {
            setMessage('Hasła nie są takie same.')
            setIsError(true)
            return
        }

        setIsLoading(true)

        try {
            const response = await fetch('http://localhost:3000/api/register', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Nie udało się utworzyć konta.')
            }

            setMessage(data.message || 'Rejestracja udana.')
            setIsError(false)
            setFormData({
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                acceptTerms: false,
            })
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
                <h1>Utwórz konto</h1>
                <p>Zacznij budować regularność już od dziś.</p>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Imię</label>
                    <input type="text" id="name" name="name" placeholder="Wpisz swoje imię" value={formData.name} onChange={handleChange} />
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="Wpisz swój email" value={formData.email} onChange={handleChange} required />
                    <label htmlFor="password">Hasło</label>
                    <input type="password" id="password" name="password" placeholder="Wpisz swoje hasło" value={formData.password} onChange={handleChange} required />
                    <label htmlFor="confirm-password">Potwierdź hasło</label>
                    <input type="password" id="confirm-password" name="confirmPassword" placeholder="Potwierdź swoje hasło" value={formData.confirmPassword} onChange={handleChange} required />
                    <label className="remember-me">
                        <input type="checkbox" name="acceptTerms" checked={formData.acceptTerms} onChange={handleChange} />
                        <span className="custom-checkbox" aria-hidden="true"></span>
                        <span>Akceptuję Regulamin i Politykę prywatności.</span>
                    </label>
                    {message ? <p className={isError ? 'form-message error' : 'form-message success'}>{message}</p> : null}
                    <button id="register-button" type="submit" disabled={isLoading}>{isLoading ? 'Tworzenie konta...' : 'Utwórz konto'}</button>
                    <p className="login-footer">Masz już konto? <Link to="/login">Zaloguj się</Link></p>
                </form>
            </div>
        </>
    )
}
export default Register