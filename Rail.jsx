/* Rail — fixed navigation */
const Rail = ({ current, onNav, sounds }) => {
  const nav = [
    { sec: "Focus", items: [
      { id: "session", label: "Session", icon: "timer" },
      { id: "today", label: "Today", icon: "calendar" },
      { id: "stats", label: "Stats", icon: "stats" },
    ]},
    { sec: "Practice", items: [
      { id: "sounds", label: "Soundscapes", icon: "mic" },
      { id: "blocker", label: "Blocker", icon: "shield" },
      { id: "journal", label: "Journal", icon: "book" },
    ]},
  ];
  return (
    <aside className="rail">
      <div className="rail__brand">
        <img src="assets/mark.svg" alt=""/>
        <span className="rail__brand-name">Hyper Focus</span>
      </div>
      {nav.map((group) => (
        <React.Fragment key={group.sec}>
          <div className="rail__sec">{group.sec}</div>
          {group.items.map((it) => (
            <button key={it.id}
              className={"rail__item " + (current === it.id ? "rail__item--active" : "")}
              onClick={() => onNav(it.id)}>
              <Icon name={it.icon} size={15}/>
              {it.label}
            </button>
          ))}
        </React.Fragment>
      ))}
      <div className="rail__spacer"/>
      {sounds && (
        <button className="rail__item" style={{fontSize: 12, color: 'var(--hf-fg-muted)'}}>
          <Icon name="volume" size={15}/>
          {sounds}
        </button>
      )}
      <button className="rail__item" onClick={() => onNav("settings")}>
        <Icon name="settings" size={15}/>
        Settings
      </button>
    </aside>
  );
};
window.Rail = Rail;
