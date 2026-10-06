import { NavLink } from 'react-router-dom'

function Sidebar() {
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
        </aside>
    )
}

export default Sidebar