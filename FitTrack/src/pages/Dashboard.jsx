import { useState } from 'react'
import { Link } from 'react-router-dom'  
import SummaryCard from '../components/SummaryCard'
import ActivityChart from '../components/ActivityChart'
import WeeklyGoalCard from '../components/WeeklyGoalCard'
import WorkoutCard from '../components/WorkoutCard'
import '../styles/Dashboard.css'

function Dashboard() { 
    return (
        <div className="Dashboard">
            <h1>Witaj ponownie!</h1>
            <p>Świetna passa! Został jeden trening do celu.</p>

            <section className="summary-cards">
   <SummaryCard
    title="Treningi w tym tygodniu"
    value="4"
    detail="Cel: 5"
    variant="green"
/>

<SummaryCard
    title="Łączny czas"
    value="3 h 42 min"
    detail="+38 min"
    variant="blue"
/>

<SummaryCard
    title="Aktualna seria"
    value="12 dni"
    detail="Rekord: 18"
    variant="orange"
/>
</section>
<section className="dashboard-main-grid">
    <ActivityChart />
    <WeeklyGoalCard />
</section>
<section className="latest-workouts">
    <div className="latest-workouts-header">
        <h2>Ostatnie treningi</h2>
       <Link to="/trainings">
        Zobacz wszystkie
    </Link>
    </div>

    <WorkoutCard
        name="Siła - góra ciała"
        date="Dzisiaj, 07:10"
        duration="52 min"
        calories="420"
    />

    <WorkoutCard
        name="Cardio interwałowe"
        date="Wtorek, 18:30"
        duration="38 min"
        calories="365"
    />

    <WorkoutCard
        name="Mobilność i core"
        date="Niedziela, 09:15"
        duration="31 min"
        calories="180"
    />
</section>
        </div>
    )
}

export default Dashboard