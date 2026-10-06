import { useState } from 'react'
import { Link } from 'react-router-dom'  
import SummaryCard from '../components/SummaryCard'
import ActivityChart from '../components/ActivityChart'
import WeeklyGoalCard from '../components/WeeklyGoalCard'
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
    />

    <SummaryCard
        title="Łączny czas"
        value="3 h 42 min"
        detail="+38 min"
    />

    <SummaryCard
        title="Aktualna seria"
        value="12 dni"
        detail="Rekord: 18"
    />
</section>
<ActivityChart />
<WeeklyGoalCard />
        </div>
    )
}

export default Dashboard