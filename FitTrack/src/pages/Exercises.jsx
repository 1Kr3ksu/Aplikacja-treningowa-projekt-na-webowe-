import '../styles/Exercises.css'

function Exercises() {
    return (
        <div className="exercises-page">
            <header className="exercises-toolbar">
                <label className="exercise-search">
                    <span aria-hidden="true">⌕</span>
                    <input type="search" placeholder="Szukaj ćwiczenia, partii mięśniowej..." />
                    <small>⌘ K</small>
                </label>

                <div className="exercise-filters">
                    <button className="active" type="button">Wszystkie</button>
                    <button type="button">Klatka</button>
                    <button type="button">Plecy</button>
                    <button type="button">Nogi</button>
                    <button type="button">Core</button>
                </div>
            </header>

            <div className="exercises-list-header">
                <span>48 ćwiczeń</span>
                <button type="button">Sortuj: Najpopularniejsze ↓</button>
            </div>

            <section className="exercise-grid">
                <article className="exercise-card">
                    <div className="exercise-image-wrap">
                        <img src="https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?auto=format&fit=crop&w=900&q=80" alt="Przysiad ze sztangą" />
                        <span>Nogi</span>
                    </div>
                    <div className="exercise-card-content">
                        <div className="exercise-card-title"><h2>Przysiad ze sztangą</h2><small>Średni</small></div>
                        <p>Fundament siły nóg i stabilnego tułowia.</p>
                        <button className="add-exercise-button" type="button">＋ &nbsp;Dodaj do treningu</button>
                    </div>
                </article>

                <article className="exercise-card">
                    <div className="exercise-image-wrap">
                        <img src="https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=900&q=80" alt="Wyciskanie sztangi" />
                        <span>Klatka</span>
                    </div>
                    <div className="exercise-card-content">
                        <div className="exercise-card-title"><h2>Wyciskanie sztangi</h2><small>Średni</small></div>
                        <p>Klasyczne ćwiczenie na siłę górnej części ciała.</p>
                        <button className="add-exercise-button" type="button">＋ &nbsp;Dodaj do treningu</button>
                    </div>
                </article>

                <article className="exercise-card">
                    <div className="exercise-image-wrap">
                        <img src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=900&q=80" alt="Martwy ciąg" />
                        <span>Plecy</span>
                    </div>
                    <div className="exercise-card-content">
                        <div className="exercise-card-title"><h2>Martwy ciąg</h2><small>Zaawansowany</small></div>
                        <p>Wzmacnia cały tylny łańcuch mięśniowy.</p>
                        <button className="add-exercise-button" type="button">＋ &nbsp;Dodaj do treningu</button>
                    </div>
                </article>

                <article className="exercise-card">
                    <div className="exercise-image-wrap">
                        <img src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80" alt="Deska" />
                        <span>Core</span>
                    </div>
                    <div className="exercise-card-content">
                        <div className="exercise-card-title"><h2>Deska</h2><small>Łatwy</small></div>
                        <p>Buduje stabilizację i wytrzymałość mięśni głębokich.</p>
                        <button className="add-exercise-button" type="button">＋ &nbsp;Dodaj do treningu</button>
                    </div>
                </article>

                <article className="exercise-card">
                    <div className="exercise-image-wrap">
                        <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80" alt="Wiosłowanie hantlem" />
                        <span>Plecy</span>
                    </div>
                    <div className="exercise-card-content">
                        <div className="exercise-card-title"><h2>Wiosłowanie hantlem</h2><small>Średni</small></div>
                        <p>Rozwija najszerszy grzbietu i kontrolę łopatki.</p>
                        <button className="add-exercise-button" type="button">＋ &nbsp;Dodaj do treningu</button>
                    </div>
                </article>

                <article className="exercise-card">
                    <div className="exercise-image-wrap">
                        <img src="https://images.unsplash.com/photo-1517964603305-11c0f6f66012?auto=format&fit=crop&w=900&q=80" alt="Wykroki chodzone" />
                        <span>Nogi</span>
                    </div>
                    <div className="exercise-card-content">
                        <div className="exercise-card-title"><h2>Wykroki chodzone</h2><small>Średni</small></div>
                        <p>Poprawiają równowagę i siłę każdej nogi.</p>
                        <button className="add-exercise-button" type="button">＋ &nbsp;Dodaj do treningu</button>
                    </div>
                </article>
            </section>
        </div>
    )
}

export default Exercises