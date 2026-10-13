import '../styles/Statistics.css'

function Statistics() {
    return (
        <div className="statistics-page">
            <header className="statistics-header">
                <div>
                    <h1>Statystyki</h1>
                    <p>Analizuj swoje treningi i obserwuj postępy.</p>
                </div>
                <button className="statistics-period-button" type="button">Ostatnie 30 dni ▾</button>
            </header>

            <section className="statistics-summary">
                <article>
                    <span>Wykonane treningi</span>
                    <strong>18</strong>
                    <small>+12% względem poprzedniego okresu</small>
                </article>
                <article>
                    <span>Łączny czas</span>
                    <strong>14 h 35 min</strong>
                    <small>+2 h 10 min w tym miesiącu</small>
                </article>
                <article>
                    <span>Spalone kalorie</span>
                    <strong>6 420 kcal</strong>
                    <small>Średnio 356 kcal na trening</small>
                </article>
            </section>

            <section className="statistics-content">
                <article className="statistics-chart-card">
                    <div className="statistics-card-header">
                        <div>
                            <h2>Aktywność treningowa</h2>
                            <p>Liczba treningów w ostatnich tygodniach</p>
                        </div>
                        <span>Treningi</span>
                    </div>

                    <div className="statistics-chart">
                        <div className="chart-line chart-line-one" />
                        <div className="chart-line chart-line-two" />
                        <div className="chart-line chart-line-three" />
                        <div className="chart-bar chart-bar-one"><span>3</span><small>Tydz. 1</small></div>
                        <div className="chart-bar chart-bar-two"><span>5</span><small>Tydz. 2</small></div>
                        <div className="chart-bar chart-bar-three"><span>4</span><small>Tydz. 3</small></div>
                        <div className="chart-bar chart-bar-four"><span>6</span><small>Tydz. 4</small></div>
                    </div>
                </article>

                <article className="statistics-progress-card">
                    <h2>Podział treningów</h2>
                    <p>Najczęściej wybierane kategorie</p>

                    <div className="progress-item">
                        <div><span>Siła</span><strong>50%</strong></div>
                        <div className="progress-track"><span className="progress-fill progress-fill-green" /></div>
                    </div>
                    <div className="progress-item">
                        <div><span>Cardio</span><strong>30%</strong></div>
                        <div className="progress-track"><span className="progress-fill progress-fill-blue" /></div>
                    </div>
                    <div className="progress-item">
                        <div><span>Mobilność</span><strong>20%</strong></div>
                        <div className="progress-track"><span className="progress-fill progress-fill-orange" /></div>
                    </div>
                </article>
            </section>

            <section className="statistics-record">
                <div>
                    <span>Najdłuższa seria</span>
                    <strong>12 dni</strong>
                </div>
                <div>
                    <span>Najdłuższy trening</span>
                    <strong>1 h 15 min</strong>
                </div>
                <div>
                    <span>Ulubiony trening</span>
                    <strong>Siła - góra ciała</strong>
                </div>
            </section>
        </div>
    )
}

export default Statistics