# TaskFlow - Modern To-Do & Task Manager

A sleek, responsive, glassmorphic productivity application built with **React 19** and **Vite**. Organize your daily tasks, set priorities and deadlines, track your completion progress with dynamic analytics, and switch between clean visual themes.

---

## Features

- **Persistent Local Storage**: Tasks and theme preferences are automatically saved in your browser's `localStorage` so your data is never lost.
- **5 Visual Themes**:
  - **Cosmic Glow**: Deep purple & violet glassmorphism (default)
  - **Midnight Slate**: Clean obsidian & ice-blue dark theme
  - **Neon Cyber**: High-contrast cyberpunk synthwave aesthetic
  - **Emerald Mist**: Soothing emerald & teal forest palette
  - **Frost Minimal**: Elegant, accessible light theme
- **Task Prioritization**: Mark tasks as **High**, **Medium**, or **Low** with color-coded badges and priority-based sorting.
- **Categories & Tags**: Organize tasks under **Work**, **Personal**, **Study**, **Fitness & Health**, or **General**.
- **Due Date Indicators**: Set task deadlines with intelligent badges that automatically flag **Overdue**, **Due Today**, or **Upcoming** tasks.
- **Real-Time Search & Filters**:
  - Instant live search by keyword
  - Filter tabs: **All**, **Active**, and **Completed**
  - Category dropdown filter
  - Sort by: **Custom Order**, **Due Date**, **Priority**, **Title (A-Z)**, or **Newest First**
- **Inline Editing**: Double-click any task title or click the edit icon to update tasks in-place with `Enter` (save) and `Escape` (cancel).
- **Instant Delete with Undo**: Accidentally deleted a task? Restore it immediately with the interactive toast notification's "Undo" button.
- **Progress & Motivation**:
  - Live animated completion progress bar and percentage counter
  - Dynamic motivational feedback that adapts to your progress
  - **Clear Done** quick action to purge finished items
- **Celebratory Confetti**: Triggers a celebratory confetti shower when you complete all active tasks.
- **Backup & Restore**: One-click **JSON Export** to backup your tasks and **JSON Import** to restore or migrate data across devices.
- **100% Mobile & Tablet Responsive**: Optimized touch targets and responsive layouts tailored for mobile devices and wide screens alike.

---

## Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vite.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations & Effects**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) & CSS Keyframes
- **Code Quality**: ESLint 9

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- `npm` or `yarn`

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/aditivermacodes/To-Do-List.git
   cd To-Do-List
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser to view the app.

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview production build**:
   ```bash
   npm run preview
   ```

---

## Keyboard Shortcuts & UX

| Action | Shortcut |
| :--- | :--- |
| **Add new task** | Press `Enter` in the input field |
| **Save edited task** | Press `Enter` while editing |
| **Cancel editing** | Press `Escape` while editing |
| **Edit task** | Double-click task text or click the edit icon |

---

## Project Structure

```
To-Do-List/
├── public/
├── src/
│   ├── components/
│   │   ├── TaskFilter.jsx      # Search, status tabs, category filter, sorting
│   │   ├── TaskInput.jsx       # Input form with priority, category, due date
│   │   ├── TaskItem.jsx        # Individual task item with edit, badges, actions
│   │   ├── TaskStats.jsx       # Progress bar, counters, export/import, clear done
│   │   ├── ThemeSelector.jsx   # 5-theme switcher
│   │   └── Toast.jsx           # Notification banner with Undo action
│   ├── hooks/
│   │   └── useLocalStorage.js  # Safe localStorage state synchronizer
│   ├── utils/
│   │   └── taskDefaults.js     # Priorities, categories, themes, and date helpers
│   ├── App.jsx                 # Theme provider, layout, navigation
│   ├── ToDoList.jsx            # Core task manager orchestrator
│   ├── index.css               # Design system, CSS variables, glassmorphism
│   └── main.jsx                # Application entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## License

This project is open-source and available under the [MIT License](LICENSE).
