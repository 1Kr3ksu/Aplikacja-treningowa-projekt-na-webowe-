function SummaryCard({ title, value, detail, variant = 'green' }) {
    return (
        <div className="summary-card">
            <p>{title}</p>
            <h2>{value}</h2>
            <span className={`summary-card-detail summary-card-detail--${variant}`}>
                {detail}
            </span>
        </div>
    )
}

export default SummaryCard