import TrainingCard from '../components/TrainingsCard'
import '../styles/Trainings.css'
import { useEffect, useState } from 'react'
import { API_URL } from '../config/api'
function Trainings() {
    const [plans, setPlans] = useState([])
    const [errorMessage, setErrorMessage] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('Wszystkie')

    useEffect(() => {
        const loadPlans = async () => {
            try {
                const response = await fetch(`${API_URL}/api/plans`, {
                    credentials: 'include',
                })
                const data = await response.json()

                if (!response.ok) {
                    throw new Error(data.message || 'Nie udało się pobrać planów.')
                }

                setPlans(data.plans)
            } catch (error) {
                setErrorMessage(error.message)
            }
        }
        loadPlans()
    }, [])

    const filteredPlans = plans.filter((plan) => {
        return selectedCategory === 'Wszystkie' || plan.goal === selectedCategory
    })

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
                <button className={selectedCategory === 'Wszystkie' ? 'active' : ''} onClick={() => setSelectedCategory('Wszystkie')}>Wszystkie</button>
                <button className={selectedCategory === 'Siła' ? 'active' : ''} onClick={() => setSelectedCategory('Siła')}>Siła</button>
                <button className={selectedCategory === 'Nogi' ? 'active' : ''} onClick={() => setSelectedCategory('Nogi')}>Nogi</button>
                <button className={selectedCategory === 'Cardio' ? 'active' : ''} onClick={() => setSelectedCategory('Cardio')}>Cardio</button>
                <button className={selectedCategory === 'Mobilność' ? 'active' : ''} onClick={() => setSelectedCategory('Mobilność')}>Mobilność</button>
                <span>{filteredPlans.length} zapisane plany</span>
            </div>

            <div className="trainings-list">
                {errorMessage ? <p>{errorMessage}</p> : null}
                {!errorMessage && filteredPlans.map((plan) => (
                    <TrainingCard
                        key={plan.id}
                        name={plan.name}
                        category={plan.goal}
                        goal={`${plan.exercise_count} ćwiczeń`}
                        difficulty={plan.difficulty || 'Średni'}
                    />
                ))}
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