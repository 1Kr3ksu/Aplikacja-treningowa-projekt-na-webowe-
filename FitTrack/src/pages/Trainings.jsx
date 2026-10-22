import TrainingCard from '../components/TrainingsCard'
import '../styles/Trainings.css'

function Trainings() {
    return (
        <div className="trainings-page">
            <header className="trainings-header">
                <div>
                    <h1>Moje treningi</h1>
                    <p>Zarządzaj zapisanymi planami i realizuj tygodniowy cel.</p>
                </div>
                <button className="create-training-button">+ &nbsp;Utwórz nowy trening</button>
            </header>

            <div className="activity-buttons">
                <button className="active">Wszystkie</button>
                <button>Siła</button>
                <button>Cardio</button>
                <button>Mobilność</button>
                <span>4 zapisane plany</span>
            </div>

            <div className="trainings-list">
                <TrainingCard
                    name="Siła - góra ciała"
                    category="Siła"
                    goal="7 ćwiczeń   50 min   Pn - Cz"
                    difficulty="Średni"
                />

                <TrainingCard
                    name="Nogi + stabilizacja"
                    category="Nogi"
                    goal="8 ćwiczeń   60 min   Wt - So"
                    difficulty="Zaawansowany"
                />

                <TrainingCard
                    name="Cardio interwałowe"
                    category="Cardio"
                    goal="6 ćwiczeń   35 min   Śr"
                    difficulty="Średni"
                />

                <TrainingCard
                    name="Mobilność całego ciała"
                    category="Mobilność"
                    goal="9 ćwiczeń   25 min   Nd"
                    difficulty="Łatwy"
                />
            </div>

            <aside className="trainer-tip">
                <strong>Wskazówka trenera</strong>
                <p>Zaplanuj jeden lżejszy trening mobilności między sesjami siłowymi.</p>
                <a href="">Zobacz propozycje →</a>
            </aside>
        </div>
    )
}

export default Trainings