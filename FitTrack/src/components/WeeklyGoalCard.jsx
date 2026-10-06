import '../styles/WeeklyGoalCard.css'
function WeeklyGoalCard(){
    return(
        <div className="weekly-goal-card">
            <h1>Cel Tygodniowy</h1>
            <p>4 z 5 treningów </p>
            <section className="WeeklyGoalCard-progress-bar">
                <div className="progress-fill" style={{ width: '80%' }}>
                    <span>80% celu</span>
                </div>
                
            </section>
            <div className="WeeklyGoalNextCard">
                <small>NASTĘPNY PLAN</small>
                <h3>Nogi + stabilizacja</h3>
                <p>Jutro · 45 min · Średni</p>
            </div>
            </div>
    )
}
export default WeeklyGoalCard