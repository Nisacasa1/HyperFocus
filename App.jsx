/* Main app wiring — ties all components together */
const { useState, useEffect, useCallback } = React;

const App = () => {
  const [view, setView] = useState("session");
  const [theme, setTheme] = useState("light");
  const [task, setTask] = useState("");
  const [sound, setSound] = useState(null);
  const [cmdkOpen, setCmdkOpen] = useState(false);
  const [session, setSession] = useState({
    running: false,
    index: 3,
    mode: "pomodoro",
    total: 25 * 60,
    remaining: 25 * 60,
  });
  const [history, setHistory] = useState([
    { time: "09:12", task: "Read the 1Q report.", mode: "Deep work", dur: 90*60 },
    { time: "11:05", task: "Outline the proposal.", mode: "Pomodoro", dur: 25*60 },
  ]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.body.classList.toggle("hf-dark", theme === "dark");
  }, [theme]);

  // Timer tick
  useEffect(() => {
    if (!session.running) return;
    const t = setInterval(() => {
      setSession(s => {
        if (s.remaining <= 1) {
          setHistory(h => [...h, { time: "now", task: task || "Untitled session.", mode: s.mode, dur: s.total }]);
          return { ...s, running: false, remaining: s.total, index: s.index + 1 };
        }
        return { ...s, remaining: s.remaining - 1 };
      });
    }, 1000);
    return () => clearInterval(t);
  }, [session.running, task]);

  // ⌘K
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setCmdkOpen(v => !v); }
      if (e.key === "Escape") setCmdkOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const crumbs = {
    session:  ["Focus", "Session"],
    today:    ["Focus", "Today"],
    stats:    ["Focus", "Stats"],
    sounds:   ["Practice", "Soundscapes"],
    blocker:  ["Practice", "Blocker"],
    journal:  ["Practice", "Journal"],
    settings: ["Settings"],
    breath:   ["Focus", "Begin"],
  }[view] || ["Hyper Focus"];

  const cmdAction = (id) => {
    if (id === "begin") { setView("breath"); }
    else if (id === "pause") { setSession(s => ({...s, running: false})); }
    else if (["today","stats","sounds","blocker","journal"].includes(id)) setView(id);
  };

  return (
    <div className="app" data-screen-label={view}>
      <Rail current={view} onNav={setView} sounds={sound ? ({
        rain: "Soft rain", forest: "Old forest", waves: "Shoreline",
        cafe: "Quiet café", brown: "Brown noise", fire: "Fireplace",
      })[sound] : null}/>
      <main className="canvas">
        <Topbar
          crumbs={crumbs}
          onCmdk={() => setCmdkOpen(true)}
          onTheme={() => setTheme(t => t === "light" ? "dark" : "light")}
          theme={theme}
          session={session.running ? { running: true, time: formatTime(session.remaining) } : null}
        />
        {view === "session"  && <Session session={session} setSession={setSession} task={task} setTask={setTask}/>}
        {view === "today"    && <Today sessions={history} onStart={() => setView("session")}/>}
        {view === "stats"    && <Stats/>}
        {view === "sounds"   && <Soundscapes active={sound} setActive={setSound}/>}
        {view === "blocker"  && <Blocker/>}
        {view === "journal"  && <Journal/>}
        {view === "breath"   && <Breath onDone={() => { setView("session"); setSession(s => ({...s, running: true})); }}/>}
        {view === "settings" && (
          <div className="page">
            <div className="eyebrow">Preferences</div>
            <h1 className="h-serif" style={{fontSize: 44, margin: "8px 0 32px"}}>Settings</h1>
            <div className="card-s">
              <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid var(--hf-border)"}}>
                <div>
                  <div style={{fontSize: 14, fontWeight: 500}}>Theme</div>
                  <div style={{fontSize: 12, color: "var(--hf-fg-muted)", marginTop: 2}}>Light paper or deep charcoal.</div>
                </div>
                <button className="btn btn--secondary" onClick={() => setTheme(t => t === "light" ? "dark" : "light")}>
                  <Icon name={theme === "dark" ? "sun" : "moon"} size={14}/>
                  {theme === "dark" ? "Light" : "Dark"}
                </button>
              </div>
              <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid var(--hf-border)"}}>
                <div>
                  <div style={{fontSize: 14, fontWeight: 500}}>Pre-focus breath</div>
                  <div style={{fontSize: 12, color: "var(--hf-fg-muted)", marginTop: 2}}>A short ritual before every session.</div>
                </div>
                <span className="badge badge--success"><span className="dot"/>On</span>
              </div>
              <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0"}}>
                <div>
                  <div style={{fontSize: 14, fontWeight: 500}}>Quiet hours</div>
                  <div style={{fontSize: 12, color: "var(--hf-fg-muted)", marginTop: 2}}>Notifications paused 22:00 — 07:00.</div>
                </div>
                <span className="badge badge--neutral">22:00 — 07:00</span>
              </div>
            </div>
          </div>
        )}
      </main>
      {cmdkOpen && <CmdK onClose={() => setCmdkOpen(false)} onAction={cmdAction}/>}
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
