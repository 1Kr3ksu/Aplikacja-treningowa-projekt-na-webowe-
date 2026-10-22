function WorkoutCard({ name, date, duration, calories }) {
    return (
        <article className="workout-card">
            <div className="workout-card-icon">
                ♧
            </div>

            <div className="workout-card-info">
                <h3>{name}</h3>
                <p>{date}</p>
            </div>

            <span className="workout-card-duration">
                {duration}
            </span>

            <strong className="workout-card-calories">
                {calories} kcal
            </strong>
        </article>
    )
}

export default WorkoutCard