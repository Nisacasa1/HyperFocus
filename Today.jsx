/* Today — agenda view */
const Today = ({ sessions, onStart }) => {
  const total = sessions.reduce((a, s) => a + s.dur, 0);
  const fmtDur = (s) => {
    const h = Math.floor(s/3600);
    const m = Math.floor((s%3600)/60);
    return h ? `${h}h ${m}m` : `${m}m`;
  };

  const now = new Date();
  const dayName = now.toLocaleDateString("en-US", { weekday: "long" });
  const dateStr = now.toLocaleDateString("en-US", { month: "long", day: "numeric" });

  return (
    <div className="page">
      <div style={{marginBottom: 32}}>
        <div className="eyebrow">{dayName} · {dateStr}</div>
        <h1 className="h-serif" style={{fontSize: 44, margin: "8px 0 0"}}>Today</h1>
      </div>

      <div className="card-s" style={{marginBottom: 32}}>
        <div className="kpi-grid">
          <div className="kpi">
            <div className="kpi__label">Focused</div>
            <div className="kpi__value">{fmtDur(total)}</div>
          </div>
          <div className="kpi">
            <div className="kpi__label">Sessions</div>
            <div className="kpi__value">{sessions.length}<small>/ 4</small></div>
          </div>
          <div className="kpi">
            <div className="kpi__label">Streak</div>
            <div className="kpi__value">7<small>d</small></div>
          </div>
          <div className="kpi">
            <div className="kpi__label">Longest</div>
            <div className="kpi__value">{fmtDur(Math.max(...sessions.map(s => s.dur), 0))}</div>
          </div>
        </div>
      </div>

      <div style={{display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12}}>
        <h2 className="h-serif" style={{fontSize: 24, margin: 0}}>Sessions</h2>
        <button className="btn btn--primary" onClick={onStart}>
          <Icon name="plus" size={14}/> Begin new
        </button>
      </div>

      <div className="session-list">
        {sessions.length === 0 && (
          <div style={{padding: "32px 0", color: "var(--hf-fg-muted)", fontSize: 14, fontStyle: "italic"}}>
            Nothing here yet.
          </div>
        )}
        {sessions.map((s, i) => (
          <div key={i} className="session-row">
            <span className="session-row__time">{s.time}</span>
            <span className="session-row__task">{s.task}</span>
            <span className="badge badge--neutral">{s.mode}</span>
            <span className="session-row__dur">{fmtDur(s.dur)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
window.Today = Today;
