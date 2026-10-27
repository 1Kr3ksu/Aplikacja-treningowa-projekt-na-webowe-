function ActivityChart() {
    return (
        <section className="activity-chart">
            <div className="activity-chart-header">
                <div>
                    <h2>Aktywność</h2>
                    <p>Minuty ruchu w ostatnich 7 dniach</p>
                </div>

                <span>OSTATNIE 7 DNI</span>
            </div>

            <div className="activity-chart-bars">
                <div className="activity-day">
                    <div className="activity-bar activity-bar-pn"></div>
                    <small>Pn</small>
                </div>

                <div className="activity-day">
                    <div className="activity-bar activity-bar-wt"></div>
                    <small>Wt</small>
                </div>

                <div className="activity-day">
                    <div className="activity-bar activity-bar-sr"></div>
                    <small>Śr</small>
                </div>

                <div className="activity-day">
                    <div className="activity-bar activity-bar-cz"></div>
                    <small>Cz</small>
                </div>

                <div className="activity-day">
                    <div className="activity-bar activity-bar-pt"></div>
                    <small>Pt</small>
                </div>

                <div className="activity-day">
                    <div className="activity-bar activity-bar-so"></div>
                    <small>So</small>
                </div>

                <div className="activity-day">
                    <div className="activity-bar activity-bar-nd"></div>
                    <small>Nd</small>
                </div>
            </div>
        </section>
    )
}

export default ActivityChart