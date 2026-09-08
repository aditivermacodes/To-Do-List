import React, { useEffect } from "react";
import ToDoList from "./ToDoList.jsx";
import ThemeSelector from "./components/ThemeSelector.jsx";
import { useLocalStorage } from "./hooks/useLocalStorage.js";

function App() {
  const [theme, setTheme] = useLocalStorage("antigravity_todo_theme", "cosmic");

  useEffect(() => {
    document.body.className = `theme-${theme}`;
  }, [theme]);

  return (
    <div className={`app-root theme-${theme}`}>
      <div className="top-nav-bar">
        <ThemeSelector currentTheme={theme} onSelectTheme={setTheme} />
      </div>

      <main className="main-content">
        <ToDoList />
      </main>

      <footer className="app-footer">
        <p>Built with React & Vite | Organize with style</p>
      </footer>
    </div>
  );
}

export default App;
