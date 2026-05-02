# Hyper Focus

A single-file, offline-first productivity app built with React (Babel standalone). No server, no account, no tracking — everything runs locally in your browser and persists in `localStorage`.

![Light mode](https://img.shields.io/badge/theme-light%20%2F%20dark-C8A97E?style=flat-square)
![No dependencies](https://img.shields.io/badge/dependencies-none-6B8E5A?style=flat-square)
![Single file](https://img.shields.io/badge/build-single%20HTML%20file-3A3832?style=flat-square)

---

## Features

### 🎯 Focus Timer
- Three modes: **Pomodoro** (25 min), **Deep Work** (90 min), **Flowmodoro** (50 min)
- Wall-clock based timer — never drifts even if the tab is backgrounded or the computer sleeps
- **+5 min** button to extend a session on the fly without restarting
- Pre-focus **breathing exercise** (1, 2, or 3 min) before starting
- **5-star quality rating** at session completion
- OS notifications when sessions and breaks complete (Web Notifications API)
- Session title editable before and after — rename any past session in Today

### 📋 Daily Planning
- Set your **3 Most Important Tasks** (MITs) for today
- Click any MIT on the Session screen to pre-fill the focus task
- Past days' plans preserved for review

### ⏱ Time Tracker
- Automatic **30-min check-in prompts** at :00 and :30 of every hour
- **Manual entry** — fill in any past period you missed while the app was closed
- Chronological timeline of logged blocks with duration
- Wall-clock based countdown, fires OS notifications even when on another page/app

### 📊 Stats
- Bar chart (this week) and monthly breakdown
- **90-day heatmap** (GitHub-style contribution graph)
- Insight chips: streak, best day, average session length, high-quality sessions
- Filter by today / this week / this month / all time

### 🔊 Soundscapes
Six procedurally generated ambient environments via the **Web Audio API** — no audio files to download:
- Soft rain · Old forest · Shoreline · Quiet café · Brown noise · Fireplace

### 📖 Stoicism
- Daily rotating quote
- Expandable profiles of **5 philosophers**: Marcus Aurelius, Seneca, Epictetus, Zeno, Cato the Younger
- **6 core principles** with source citations
- **4 daily practices** (linked to the Daily Practices section)

### 🌿 Daily Practices
Stoic exercises made actionable with dedicated focus timers:
| Practice | Duration |
|---|---|
| Morning preparation | 5 min |
| Evening review | 10 min |
| The control audit | 3 min |
| Voluntary simplicity | Pledge (no timer) |

Completed practices are logged per day and a history is shown below the cards.

### ⚙️ Settings
- Light / dark theme toggle
- Export all data as **JSON**
- Clear all data

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/nisacasa2/HyperFocus.git

# Open the app — no build step needed
open HyperFocus.html   # macOS
start HyperFocus.html  # Windows
```

Or just **double-click `HyperFocus.html`** in your file manager.

> **Note:** Use a modern browser (Chrome, Edge, Firefox, Safari). The Web Audio API and Web Notifications API require a browser context — `file://` works fine.

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI framework | React 18 (via Babel standalone — no build step) |
| Styling | Plain CSS custom properties (design tokens) |
| Audio | Web Audio API (procedural synthesis, zero audio files) |
| Notifications | Web Notifications API |
| Storage | `localStorage` (all data stays on your device) |
| Fonts | Instrument Serif · Geist · JetBrains Mono (Google Fonts) |

---

## Data & Privacy

- **No server.** The app is a static HTML file.
- **No account.** Nothing is ever transmitted anywhere.
- All data (sessions, plans, tracker entries, practices) lives in your browser's `localStorage` under the keys `hf_history`, `hf_mits`, `hf_tracker`, `hf_practices`.
- Use **Settings → Export JSON** to back up your data at any time.

---

## Project Structure

```
HyperFocus.html     ← The entire app (HTML + CSS + JS in one file)
README.md
LICENSE
.gitignore
```

The legacy `/assets` and `*.jsx` files are early-stage design drafts and are not used by the app.

---

## Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Space` | Begin / pause the current session |
| `Ctrl K` | Open command palette |
| `Escape` | Close command palette / cancel prompts |

---

## License

MIT — see [LICENSE](LICENSE).
