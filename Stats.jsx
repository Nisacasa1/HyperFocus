/* Stats — weekly chart + breakdowns */
const Stats = () => {
  const week = [
    { day: "Mon", mins: 95 },
    { day: "Tue", mins: 140 },
    { day: "Wed", mins: 134 },
    { day: "Thu", mins: 180 },
    { day: "Fri", mins: 210 },
    { day: "Sat", mins: 60, dim: true },
    { day: "Sun", mins: 0, dim: true },
  ];
  const max = Math.max(...week.map(w => w.mins), 1);
  return (
    <div className="page">
      <div style={{marginBottom: 32}}>
        <div className="eyebrow">Apr 11 – Apr 17</div>
        <h1 className="h-serif" style={{fontSize: 44, margin: "8px 0 0"}}>This week</h1>
      </div>

      <div className="card-s" style={{marginBottom: 24}}>
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24}}>
          <div>
            <div className="eyebrow">Total focus</div>
            <div style={{fontFamily: "var(--hf-font-mono)", fontSize: 56, fontWeight: 300, letterSpacing: "-0.02em", lineHeight: 1, marginTop: 8}}>
              13h 39m
            </div>
          </div>
          <div style={{textAlign: "right"}}>
            <div className="eyebrow">Avg / day</div>
            <div style={{fontFamily: "var(--hf-font-mono)", fontSize: 22, fontWeight: 400, marginTop: 8, color: "var(--hf-fg-body)"}}>
              1h 57m
            </div>
          </div>
        </div>
        <div className="chart">
          {week.map((w, i) => (
            <div key={i} className={"chart__bar " + (w.dim ? "chart__bar--dim" : "")}
              style={{height: `${(w.mins / max) * 100}%`}}/>
          ))}
        </div>
        <div className="chart__labels">
          {week.map((w) => <span key={w.day}>{w.day}</span>)}
        </div>
      </div>

      <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16}}>
        <div className="card-s">
          <div className="eyebrow">By mode</div>
          <div style={{marginTop: 16, display: "flex", flexDirection: "column", gap: 10, fontFamily: "var(--hf-font-mono)", fontSize: 13}}>
            <div style={{display: "flex", justifyContent: "space-between"}}><span style={{color: "var(--hf-fg-muted)"}}>Deep work</span><span>7h 20m</span></div>
            <div style={{display: "flex", justifyContent: "space-between"}}><span style={{color: "var(--hf-fg-muted)"}}>Pomodoro</span><span>4h 15m</span></div>
            <div style={{display: "flex", justifyContent: "space-between"}}><span style={{color: "var(--hf-fg-muted)"}}>Flowmodoro</span><span>2h 04m</span></div>
          </div>
        </div>
        <div className="card-s">
          <div className="eyebrow">By label</div>
          <div style={{marginTop: 16, display: "flex", flexDirection: "column", gap: 10, fontFamily: "var(--hf-font-mono)", fontSize: 13}}>
            <div style={{display: "flex", justifyContent: "space-between"}}><span style={{color: "var(--hf-fg-muted)"}}>Writing</span><span>5h 48m</span></div>
            <div style={{display: "flex", justifyContent: "space-between"}}><span style={{color: "var(--hf-fg-muted)"}}>Research</span><span>4h 11m</span></div>
            <div style={{display: "flex", justifyContent: "space-between"}}><span style={{color: "var(--hf-fg-muted)"}}>Code</span><span>3h 40m</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};
window.Stats = Stats;
