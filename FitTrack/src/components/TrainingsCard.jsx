function TrainingCard({ name, goal, category, difficulty }) {
    return (
        <article className="training-card">
            <div className="training-card-icon" aria-hidden="true">+</div>

            <div className="training-card-info">
                <div className="training-card-title">
                    <h3>{name}</h3>
                    <span className="training-difficulty">{difficulty}</span>
                </div>
                <h3>{name}</h3>
                <p>{goal}</p>
            </div>

            <div className="training-card-actions">
                <button className="start-button">▷&nbsp; Rozpocznij</button>
                <button className="edit-button">✎&nbsp; Edytuj</button>
                <button className="delete-button">♧&nbsp; Usuń</button>
            </div>
        </article>
    )
}

export default TrainingCard