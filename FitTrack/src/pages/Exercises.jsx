import { useEffect, useState } from 'react'
import { API_URL } from '../config/api'
import '../styles/Exercises.css'

function Exercises() {
    const [exercises, setExercises] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('Wszystkie')
    useEffect(() => {
        const loadExercises = async () => {
            try {
                const response = await fetch(`${API_URL}/api/exercises`)
                const data = await response.json()

                if (!response.ok) {
                    throw new Error(data.message || 'Nie udało się pobrać ćwiczeń.')
                }

                setExercises(data.exercises)
            } catch (error) {
                setErrorMessage(error.message)
            } finally {
                setIsLoading(false)
            }
        }

        loadExercises()
    }, [])
const filteredExercises = exercises.filter((exercise) => {
   const matchesSearch = 
   exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
   exercise.category.toLowerCase().includes(searchTerm.toLowerCase())

   const matchesCategory = 
    selectedCategory === 'Wszystkie' || 
    exercise.category === selectedCategory

    return matchesSearch && matchesCategory
})
    return (
        <div className="exercises-page">
            <header className="exercises-toolbar">
                <label className="exercise-search">
                    <span aria-hidden="true">⌕</span>
                    <input type="search" placeholder="Szukaj ćwiczenia, partii mięśniowej..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </label>

                <div className="exercise-filters">
                    <button className={selectedCategory === 'Wszystkie' ? 'active' : ''} type="button"
                     onClick={() => setSelectedCategory('Wszystkie')}
                    >
                        Wszystkie</button>
                    <button className={selectedCategory === 'Klatka' ? 'active' :''} type="button"
                     onClick={() => setSelectedCategory('Klatka')}
                    >Klatka</button>
                    <button className={selectedCategory === 'Plecy' ? 'active' :''} type="button"
                     onClick={() => setSelectedCategory('Plecy')}
                    >Plecy</button>
                    <button className={selectedCategory === 'Nogi' ? 'active' :''} type="button"
                     onClick={() => setSelectedCategory('Nogi')}
                    >Nogi</button>
                    <button className={selectedCategory === 'Core' ? 'active' :''} type="button"
                     onClick={() => setSelectedCategory('Core')}
                    >Core</button>
                </div>
            </header>

            <div className="exercises-list-header">
                <span>{filteredExercises.length} ćwiczeń</span>
                <button type="button">Sortuj: Najpopularniejsze ↓</button>
            </div>

            <section className="exercise-grid">
                {isLoading ? <p>Ładowanie ćwiczeń...</p> : null}
                {errorMessage ? <p>{errorMessage}</p> : null}
                {!isLoading && !errorMessage && filteredExercises.map((exercise) => (
                    <article className="exercise-card" key={exercise.id}>
                        <div className="exercise-image-wrap">
                            <img src={exercise.image_url} alt={exercise.name} />
                            <span>{exercise.category}</span>
                        </div>
                        <div className="exercise-card-content">
                            <div className="exercise-card-title"><h2>{exercise.name}</h2><small>{exercise.difficulty}</small></div>
                            <p>{exercise.description}</p>
                            <button className="add-exercise-button" type="button">＋ &nbsp;Dodaj do treningu</button>
                        </div>
                    </article>
                ))}
            </section>
        </div>
    )
}

export default Exercises