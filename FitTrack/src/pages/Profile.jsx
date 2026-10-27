import '../styles/Profile.css'

function Profile() {
    return (
        <div className="profile-page">
            <header className="profile-header">
                <div>
                    <h1>Profil</h1>
                    <p>Zarządzaj swoimi danymi i preferencjami treningowymi.</p>
                </div>
                <button className="profile-edit-button" type="button">Edytuj profil</button>
            </header>

            <section className="profile-layout">
                <article className="profile-user-card">
                    <div className="profile-avatar">MK</div>
                    <h2>Marek Kowalski</h2>
                    <p>Plan Pro</p>
                    <span className="profile-member-since">Członek od października 2026</span>

                    <div className="profile-mini-stats">
                        <div><strong>18</strong><span>treningów</span></div>
                        <div><strong>12</strong><span>dni serii</span></div>
                        <div><strong>6</strong><span>celów</span></div>
                    </div>
                </article>

                <article className="profile-details-card">
                    <h2>Informacje podstawowe</h2>
                    <div className="profile-fields">
                        <label>Imię i nazwisko<input type="text" value="Marek Kowalski" readOnly /></label>
                        <label>Adres e-mail<input type="email" value="marek.kowalski@email.com" readOnly /></label>
                        <label>Wiek<input type="text" value="28 lat" readOnly /></label>
                        <label>Poziom zaawansowania<input type="text" value="Średniozaawansowany" readOnly /></label>
                    </div>
                </article>
            </section>

            <section className="profile-bottom-grid">
                <article className="profile-section-card">
                    <h2>Moje cele</h2>
                    <div className="profile-goal"><span>Treningi w tygodniu</span><strong>5 treningów</strong></div>
                    <div className="profile-goal"><span>Główny cel</span><strong>Budowa siły</strong></div>
                    <div className="profile-goal"><span>Preferowany czas</span><strong>45 - 60 min</strong></div>
                </article>

                <article className="profile-section-card">
                    <h2>Preferencje treningowe</h2>
                    <div className="profile-tags">
                        <span>Siła</span>
                        <span>Cardio</span>
                        <span>Mobilność</span>
                    </div>
                    <p className="profile-note">Twoje preferencje pomogą dopasować propozycje treningów.</p>
                </article>
            </section>
        </div>
    )
}

export default Profile