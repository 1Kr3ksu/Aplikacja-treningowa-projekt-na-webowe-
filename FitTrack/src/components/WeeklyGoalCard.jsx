import '../styles/WeeklyGoalCard.css'

function WeeklyGoalCard() {
    return (
        <div className="weekly-goal-card">
            <h2>Cel tygodniowy</h2>

            <p>4 z 5 treningów</p>

            <div className="weekly-goal-progress">
                <div className="weekly-goal-progress-fill"></div>
            </div>

            <div className="weekly-goal-info">
                <span>80% celu</span>
                <span>1 trening</span>
            </div>

            <div className="weekly-goal-next-plan">
                <small>NASTĘPNY PLAN</small>
                <h3>Nogi + stabilizacja</h3>
                <p>Jutro · 45 min · Średni</p>
            </div>
        </div>
    )
}

export default WeeklyGoalCard