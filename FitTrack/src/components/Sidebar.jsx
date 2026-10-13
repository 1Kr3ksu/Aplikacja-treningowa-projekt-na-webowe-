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

            <div className="sidebar-user">
                <div className="sidebar-user-details">
                    <div className="sidebar-avatar">MK</div>
                    <div>
                        <strong>Marek Kowalski</strong>
                        <span>Plan Pro</span>
                    </div>
                </div>
                <button className="sidebar-logout" type="button">
                    <span aria-hidden="true">↪</span> Wyloguj się
                </button>
            </div>
        </aside>
    )
}

export default Sidebar