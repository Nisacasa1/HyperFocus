/* Lucide-style icons, 1.5px stroke, currentColor.
   Exposed on window. */
const Icon = ({ name, size = 16 }) => {
  const paths = {
    timer: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    play: <polygon points="5 3 19 12 5 21 5 3"/>,
    pause: <><rect x="6" y="5" width="4" height="14"/><rect x="14" y="5" width="4" height="14"/></>,
    stop: <rect x="5" y="5" width="14" height="14" rx="1"/>,
    calendar: <><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></>,
    stats: <><path d="M3 3v18h18"/><path d="M7 14l4-4 4 4 5-6"/></>,
    shield: <path d="M12 22s-8-4-8-12V5l8-3 8 3v5c0 8-8 12-8 12z"/>,
    mic: <><path d="M12 2a5 5 0 0 0-5 5v5a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5z"/><path d="M19 10a7 7 0 0 1-14 0M12 19v3"/></>,
    volume: <path d="M15 8a5 5 0 0 1 0 8M18 5a9 9 0 0 1 0 14M6 9H3v6h3l5 4V5l-5 4z"/>,
    clock: <><circle cx="12" cy="12" r="8"/><path d="M12 8v4l2 2"/></>,
    check: <path d="M20 6 9 17l-5-5"/>,
    x: <path d="M18 6 6 18M6 6l12 12"/>,
    arrowRight: <path d="M5 12h14M12 5l7 7-7 7"/>,
    plus: <path d="M12 5v14M5 12h14"/>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></>,
    moon: <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></>,
    chevronDown: <path d="m6 9 6 6 6-6"/>,
    chevronRight: <path d="m9 6 6 6-6 6"/>,
    edit: <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.4 2.6a2.1 2.1 0 1 1 3 3L12 15l-4 1 1-4 9.4-9.4z"/></>,
    book: <><path d="M4 4v16a1 1 0 0 0 1 1h15"/><path d="M16 8h-8M16 12h-8M10 16h-2"/></>,
    wind: <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2M9.6 4.6A2 2 0 1 1 11 8H2M12.6 19.4A2 2 0 1 0 14 16H2"/>,
    waves: <path d="M2 6c.6 0 2.5.4 4 1.5S9 10 10 10s1-2 2.5-2.5S16 7 18 8.5 22 10 22 10M2 12c.6 0 2.5.4 4 1.5S9 16 10 16s1-2 2.5-2.5S16 13 18 14.5 22 16 22 16M2 18c.6 0 2.5.4 4 1.5S9 22 10 22"/>,
    trees: <><path d="M10 10v.2A3 3 0 0 1 8.9 16v0H5v0a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0z"/><path d="M7 16v6M13 19h8M21 16l-3-3-3 3M18 13v9"/></>,
    flame: <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.4-.5-2-1-3-1.2-2.4-.5-4.6 2-6-.2 2 .4 3.8 2.5 5.5S18 12 18 14a6 6 0 0 1-12 0 5 5 0 0 1 1-3"/>,
    list: <><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></>
  };
  const d = paths[name];
  if (!d) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{d}</svg>
  );
};

window.Icon = Icon;
