import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Login.css'

function Register() {
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
            <form>  
                <label htmlFor="name">Imię</label>
                <input type="text" id="name" name="name" placeholder="Wpisz swoje imię" required />
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Wpisz swój email" required />
                <label htmlFor="password">Hasło</label> 
                <input type="password" id="password" name="password" placeholder="Wpisz swoje hasło" required />
                <label htmlFor="confirm-password">Potwierdź hasło</label>
                <input type="password" id="confirm-password" name="confirm-password" placeholder="Potwierdź swoje hasło" required />
  <label className="remember-me">
                    <input type="checkbox" name="remember" />
                    <span className="custom-checkbox" aria-hidden="true">✓</span>
                    <span>Akceptuję Regulamin i Politykę prywatności.</span>
                </label>
                <button id="register-button" type="submit">Utwórz konto</button>
                <p className="login-footer">Masz już konto? <Link to="/login">Zaloguj się</Link></p>
            </form>
            </div>
        </>
    )
}
export default Register