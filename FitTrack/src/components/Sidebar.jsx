import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

function Sidebar() {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)

    useEffect(() => {
        const loadUser = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/me', {
                    credentials: 'include',
                })

                if (!response.ok) {
                    setUser(null)
                    return
                }

                const data = await response.json()
                setUser(data.user)
            } catch {
                setUser(null)
            }
        }

        loadUser()
    }, [])

    const handleLogout = async () => {
        try {
            await fetch('http://localhost:3000/api/logout', {
                method: 'POST',
                credentials: 'include',
            })
        } finally {
            setUser(null)
            navigate('/login')
        }
    }

    const initials = user?.name
        ? user.name
            .split(' ')
            .filter(Boolean)
            .slice(0, 2)
            .map((part) => part[0]?.toUpperCase())
            .join('')
        : 'MK'

    return (
        <aside className="sidebar">
            <h2>FitTrack</h2>

            <nav>
                <NavLink to="/dashboard">
                    Dashboard
                </NavLink>

                <NavLink to="/trainings">
                    Moje treningi
                </NavLink>

                <NavLink to="/exercises">
                    Ćwiczenia
                </NavLink>

                <NavLink to="/callendar">
                    Kalendarz
                </NavLink>

                <NavLink to="/statistics">
                    Statystyki
                </NavLink>

                <NavLink to="/profile">
                    Profil
                </NavLink>
            </nav>

            <div className="sidebar-user">
                <div className="sidebar-user-details">
                    <div className="sidebar-avatar">{initials || 'MK'}</div>
                    <div>
                        <strong>{user?.name || 'Gość'}</strong>
                        <span>{user?.email || 'Brak aktywnej sesji'}</span>
                    </div>
                </div>
                <button className="sidebar-logout" type="button" onClick={handleLogout}>
                    <span aria-hidden="true">↪</span> Wyloguj się
                </button>
            </div>
        </aside>
    )
}

export default Sidebar