import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Login.css'

function Login() {
    return (
        <>
        <div className="Login-intro">
<img src="/fittrack-logo.svg" alt="FitTrack" />

<span className="login-eyebrow">TRENUJ MĄDRZE</span>
<h1 className="login-title">Forma zaczyna się od dobrego planu.</h1>
<p className="login-description">FitTrack porządkuje każdy trening -od pierwszej serii po najlepszy wynik.</p>
        </div>
        <div className="Login-page">
            </div>
        </>
    )
}
export default Login