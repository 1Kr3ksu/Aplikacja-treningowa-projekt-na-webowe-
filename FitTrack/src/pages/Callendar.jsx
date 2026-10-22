import '../styles/Callendar.css'

function Callendar() {
    return (
        <div className="calendar-page">
            <header className="calendar-header">
                <div>
                    <h1>Kalendarz</h1>
                    <p>Planuj treningi i śledź swoją aktywność.</p>
                </div>
                <button className="calendar-add-button" type="button">+ &nbsp;Dodaj trening</button>
            </header>

            <section className="calendar-layout">
                <div className="calendar-panel">
                    <div className="calendar-panel-header">
                        <button className="month-arrow" type="button" aria-label="Poprzedni miesiąc">‹</button>
                        <h2>Październik 2026</h2>
                        <button className="month-arrow" type="button" aria-label="Następny miesiąc">›</button>
                    </div>

                    <div className="calendar-grid calendar-weekdays">
                        <span>Pon</span>
                        <span>Wt</span>
                        <span>Śr</span>
                        <span>Czw</span>
                        <span>Pt</span>
                        <span>Sob</span>
                        <span>Nd</span>
                    </div>

                    <div className="calendar-grid calendar-days">
                        <span className="calendar-empty" />
                        <span className="calendar-empty" />
                        <span className="calendar-empty" />
                        <div className="calendar-day"><span>1</span></div>
                        <div className="calendar-day"><span>2</span></div>
                        <div className="calendar-day has-workout"><span>3</span><small>Siła</small></div>
                        <div className="calendar-day"><span>4</span></div>
                        <div className="calendar-day"><span>5</span></div>
                        <div className="calendar-day"><span>6</span></div>
                        <div className="calendar-day"><span>7</span></div>
                        <div className="calendar-day has-workout"><span>8</span><small>Cardio</small></div>
                        <div className="calendar-day"><span>9</span></div>
                        <div className="calendar-day"><span>10</span></div>
                        <div className="calendar-day"><span>11</span></div>
                        <div className="calendar-day"><span>12</span></div>
                        <div className="calendar-day selected has-workout"><span>13</span><small>Nogi</small></div>
                        <div className="calendar-day"><span>14</span></div>
                        <div className="calendar-day"><span>15</span></div>
                        <div className="calendar-day"><span>16</span></div>
                        <div className="calendar-day"><span>17</span></div>
                        <div className="calendar-day has-workout"><span>18</span><small>Mobilność</small></div>
                        <div className="calendar-day"><span>19</span></div>
                        <div className="calendar-day"><span>20</span></div>
                        <div className="calendar-day"><span>21</span></div>
                        <div className="calendar-day"><span>22</span></div>
                        <div className="calendar-day"><span>23</span></div>
                        <div className="calendar-day"><span>24</span></div>
                        <div className="calendar-day"><span>25</span></div>
                        <div className="calendar-day"><span>26</span></div>
                        <div className="calendar-day"><span>27</span></div>
                        <div className="calendar-day"><span>28</span></div>
                        <div className="calendar-day"><span>29</span></div>
                        <div className="calendar-day"><span>30</span></div>
                        <div className="calendar-day"><span>31</span></div>
                    </div>
                </div>

                <aside className="calendar-summary">
                    <h2>13 Października</h2>
                    <div className="selected-workout">
                        <span className="workout-status">Zaplanowany</span>
                        <h3>Nogi + stabilizacja</h3>
                        <p>Planowany start: 17:00</p>
                        <button className="summary-action" type="button">Zobacz szczegóły</button>
                    </div>
                </aside>
            </section>

            <section className="calendar-stats">
                <div><span>Treningi w tym miesiącu</span><strong>4</strong></div>
                <div><span>Ukończone treningi</span><strong>2</strong></div>
                <div><span>Zaplanowany czas</span><strong>3 h 25 min</strong></div>
            </section>
        </div>
    )
}

export default Callendar