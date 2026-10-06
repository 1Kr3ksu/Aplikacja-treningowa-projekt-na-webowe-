function SummaryCard({ title, value, detail }) {
    return (
        <div className="summary-card">
            <p>{title}</p>
            <h2>{value}</h2>
            <span>{detail}</span>
        </div>
    )
}

export default SummaryCard