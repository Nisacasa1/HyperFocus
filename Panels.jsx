/* Soundscapes, Blocker, Journal, Breath, CmdK */

const Soundscapes = ({ active, setActive }) => {
  const sounds = [
    { id: "rain", name: "Soft rain", desc: "Steady rainfall on leaves." },
    { id: "forest", name: "Old forest", desc: "Wind through pines, distant birds." },
    { id: "waves", name: "Shoreline", desc: "Slow ocean waves on sand." },
    { id: "cafe",  name: "Quiet café", desc: "Low murmur and ceramic." },
    { id: "brown", name: "Brown noise", desc: "Warm low-frequency hush." },
    { id: "fire",  name: "Fireplace", desc: "Wood crackle, close." },
  ];
  const bars = [0,1,2,3,4];
  return (
    <div className="page">
      <div style={{marginBottom: 24}}>
        <div className="eyebrow">Practice</div>
        <h1 className="h-serif" style={{fontSize: 44, margin: "8px 0 0"}}>Soundscapes</h1>
        <p style={{color: "var(--hf-fg-muted)", fontSize: 13, marginTop: 8}}>One at a time. Layering breaks focus.</p>
      </div>
      <div className="sound-grid">
        {sounds.map((s) => (
          <button key={s.id}
            className={"sound " + (active === s.id ? "sound--active" : "")}
            onClick={() => setActive(active === s.id ? null : s.id)}>
            <div className="sound__name">{s.name}</div>
            <div className="sound__desc">{s.desc}</div>
            <div className="sound__bars">
              {bars.map((i) => <i key={i} style={{height: active === s.id ? undefined : `${4 + i * 2}px`}}/>)}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

const Blocker = () => {
  const [sites, setSites] = React.useState([
    { host: "twitter.com", cat: "Social" },
    { host: "youtube.com", cat: "Media" },
    { host: "reddit.com", cat: "Social" },
    { host: "news.ycombinator.com", cat: "News" },
    { host: "instagram.com", cat: "Social" },
  ]);
  const [newSite, setNewSite] = React.useState("");

  const addSite = () => {
    const host = newSite.trim().replace(/^https?:\/\//, "").replace(/\/$/, "");
    if (host && !sites.find(s => s.host === host)) {
      setSites(s => [...s, { host, cat: "Custom" }]);
      setNewSite("");
    }
  };

  return (
    <div className="page">
      <div style={{marginBottom: 24}}>
        <div className="eyebrow">Practice</div>
        <h1 className="h-serif" style={{fontSize: 44, margin: "8px 0 0"}}>Blocker</h1>
        <p style={{color: "var(--hf-fg-muted)", fontSize: 13, marginTop: 8}}>These sites are quiet during focus sessions.</p>
      </div>

      <div className="card-s" style={{marginBottom: 24}}>
        <div style={{display: "flex", gap: 8}}>
          <input className="input" placeholder="Add a site"
            value={newSite}
            onChange={(e) => setNewSite(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addSite()}/>
          <button className="btn btn--primary" onClick={addSite}><Icon name="plus" size={14}/> Add</button>
        </div>
      </div>

      <div className="block-list">
        {sites.map((s, i) => (
          <div key={i} className="block-row">
            <div>
              <span className="block-row__host">{s.host}</span>
              <span className="block-row__cat">· {s.cat}</span>
            </div>
            <button className="iconbtn" onClick={() => setSites(ss => ss.filter((_, j) => j !== i))}>
              <Icon name="x" size={14}/>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const Journal = () => {
  const [answers, setAnswers] = React.useState({});
  const prompts = [
    "What did you move forward?",
    "Where did your attention go?",
    "One thing for tomorrow.",
  ];
  return (
    <div className="page">
      <div style={{marginBottom: 32}}>
        <div className="eyebrow">End of session</div>
        <h1 className="h-serif" style={{fontSize: 44, margin: "8px 0 0"}}>A short reflection.</h1>
      </div>
      <div className="journal">
        {prompts.map((q, i) => (
          <div key={i} className="field">
            <div className="journal__question">{q}</div>
            <textarea className="journal__input" rows="2"
              value={answers[i] || ""}
              onChange={(e) => setAnswers(a => ({...a, [i]: e.target.value}))}
              placeholder="…"/>
          </div>
        ))}
        <div style={{display: "flex", gap: 8, marginTop: 16}}>
          <button className="btn btn--primary">Save reflection</button>
          <button className="btn btn--ghost">Skip</button>
        </div>
      </div>
    </div>
  );
};

const Breath = ({ onDone }) => {
  const [phase, setPhase] = React.useState("Inhale");
  React.useEffect(() => {
    const seq = ["Inhale", "Hold", "Exhale", "Hold"];
    let i = 0;
    const t = setInterval(() => { i = (i + 1) % seq.length; setPhase(seq[i]); }, 3000);
    const end = setTimeout(onDone, 15000);
    return () => { clearInterval(t); clearTimeout(end); };
  }, [onDone]);
  return (
    <div className="breath-stage">
      <div className="breath-prompt">Take a breath.</div>
      <div className="breath-circle"><div className="breath-dot"/></div>
      <div className="breath-cue">{phase}</div>
      <button className="btn btn--ghost" onClick={onDone}>Skip</button>
    </div>
  );
};

const CmdK = ({ onClose, onAction }) => {
  const items = [
    { id: "begin", label: "Begin session", icon: "play", kbd: "⌘ B" },
    { id: "pause", label: "Pause session", icon: "pause", kbd: "⌘ ." },
    { id: "today", label: "Go to today", icon: "calendar" },
    { id: "stats", label: "Go to stats", icon: "stats" },
    { id: "sounds", label: "Toggle soundscape", icon: "volume" },
    { id: "blocker", label: "Open blocker", icon: "shield" },
    { id: "journal", label: "Open journal", icon: "book" },
  ];
  const [q, setQ] = React.useState("");
  const filtered = items.filter(i => i.label.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="cmdk-backdrop" onClick={onClose}>
      <div className="cmdk" onClick={(e) => e.stopPropagation()}>
        <div className="cmdk__search">
          <Icon name="search" size={16}/>
          <input autoFocus placeholder="Type a command…" value={q} onChange={(e) => setQ(e.target.value)}/>
          <span className="cmdk__hint">ESC</span>
        </div>
        <div className="cmdk__list">
          {filtered.map((it, idx) => (
            <button key={it.id} className={"cmdk__item " + (idx === 0 ? "cmdk__item--active" : "")}
              onClick={() => { onAction(it.id); onClose(); }}>
              <Icon name={it.icon} size={15}/>
              {it.label}
              {it.kbd && <span className="kbd">{it.kbd}</span>}
            </button>
          ))}
          {filtered.length === 0 && (
            <div style={{padding: 16, color: "var(--hf-fg-muted)", fontSize: 13, textAlign: "center"}}>Nothing matches.</div>
          )}
        </div>
      </div>
    </div>
  );
};

window.Soundscapes = Soundscapes;
window.Blocker = Blocker;
window.Journal = Journal;
window.Breath = Breath;
window.CmdK = CmdK;
