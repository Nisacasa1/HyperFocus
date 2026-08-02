/* Session / Timer — the focus stage */
const formatTime = (s) => {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
};

const Session = ({ session, setSession, task, setTask }) => {
  const R = 46;
  const CIRC = 2 * Math.PI * R;
  const pct = session.total > 0 ? (session.total - session.remaining) / session.total : 0;
  const offset = CIRC * (1 - pct);
  const breathing = session.running;

  const MODES = [
    { id: "pomodoro", label: "Pomodoro", dur: 25*60 },
    { id: "deep", label: "Deep work", dur: 90*60 },
    { id: "flow", label: "Flowmodoro", dur: 50*60 },
  ];

  return (
    <div className="focus-stage">
      <div className="focus-meta">
        <span>SESSION <b>{String(session.index).padStart(2, "0")}</b></span>
        <span>·</span>
        <span>MODE <b>{MODES.find(m => m.id === session.mode)?.label}</b></span>
        <span>·</span>
        <span>TARGET <b>{formatTime(session.total)}</b></span>
      </div>

      {!session.running && session.remaining === session.total ? (
        <input
          className="focus-task focus-task--placeholder"
          style={{border: 0, background: "transparent", textAlign: "center", outline: "none", width: "100%", maxWidth: 640}}
          placeholder="What are you working on?"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onFocus={(e) => e.target.classList.remove("focus-task--placeholder")}
          onBlur={(e) => !task && e.target.classList.add("focus-task--placeholder")}
        />
      ) : (
        <div className="focus-task">{task || "Untitled session."}</div>
      )}

      <div className={"ring " + (breathing ? "ring--breathing" : "")}>
        <svg viewBox="0 0 100 100">
          <circle className="ring__bg" cx="50" cy="50" r={R}/>
          <circle className="ring__fg" cx="50" cy="50" r={R}
            strokeDasharray={CIRC} strokeDashoffset={offset}/>
        </svg>
        <div className="ring__inner">
          <div className="ring__timer">{formatTime(session.remaining)}</div>
          <div className="ring__label">
            {session.running ? "Focusing" : (session.remaining < session.total ? "Paused" : "Ready")}
          </div>
        </div>
      </div>

      <div className="focus-actions">
        {!session.running && session.remaining === session.total && (
          <>
            <div style={{display: "flex", gap: 6, marginRight: 16}}>
              {MODES.map(m => (
                <button key={m.id}
                  onClick={() => setSession(s => ({...s, mode: m.id, total: m.dur, remaining: m.dur}))}
                  className={"btn " + (session.mode === m.id ? "btn--secondary" : "btn--ghost")}
                  style={session.mode === m.id ? {borderColor: "var(--hf-sand-400)"} : {}}>
                  {m.label}
                </button>
              ))}
            </div>
            <button className="btn btn--primary btn--xl"
              onClick={() => setSession(s => ({...s, running: true}))}>
              <Icon name="play" size={14}/> Begin
            </button>
          </>
        )}
        {session.running && (
          <>
            <button className="btn btn--secondary btn--lg"
              onClick={() => setSession(s => ({...s, running: false}))}>
              <Icon name="pause" size={14}/> Pause
            </button>
            <button className="btn btn--ghost btn--lg"
              onClick={() => setSession(s => ({...s, running: false, remaining: s.total}))}>
              <Icon name="stop" size={14}/> End session
            </button>
          </>
        )}
        {!session.running && session.remaining < session.total && (
          <>
            <button className="btn btn--primary btn--lg"
              onClick={() => setSession(s => ({...s, running: true}))}>
              <Icon name="play" size={14}/> Return
            </button>
            <button className="btn btn--ghost btn--lg"
              onClick={() => setSession(s => ({...s, running: false, remaining: s.total}))}>
              Discard
            </button>
          </>
        )}
      </div>
    </div>
  );
};
window.Session = Session;
window.formatTime = formatTime;
