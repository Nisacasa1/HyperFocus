/* Topbar — breadcrumb + actions */
const Topbar = ({ crumbs = [], onCmdk, onTheme, theme, session }) => (
  <header className="topbar">
    <div className="topbar__crumb">
      {crumbs.map((c, i) => (
        <React.Fragment key={i}>
          {i > 0 && <Icon name="chevronRight" size={12}/>}
          {i === crumbs.length - 1 ? <b>{c}</b> : <span>{c}</span>}
        </React.Fragment>
      ))}
    </div>
    <div className="topbar__actions">
      {session?.running && (
        <span className="badge badge--accent" style={{marginRight: 8}}>
          <span className="dot"/>Focusing · {session.time}
        </span>
      )}
      <button className="iconbtn" onClick={onCmdk} title="Command (⌘K)"><Icon name="search" size={15}/></button>
      <button className="iconbtn" onClick={onTheme} title="Theme">
        <Icon name={theme === "dark" ? "sun" : "moon"} size={15}/>
      </button>
    </div>
  </header>
);
window.Topbar = Topbar;
