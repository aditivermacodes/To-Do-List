import React from "react";
import PropTypes from "prop-types";
import { Sparkles, Moon, Zap, Leaf, Sun } from "lucide-react";
import { THEMES } from "../utils/taskDefaults";

const THEME_ICONS = {
  cosmic: <Sparkles size={14} />,
  midnight: <Moon size={14} />,
  cyberpunk: <Zap size={14} />,
  emerald: <Leaf size={14} />,
  light: <Sun size={14} />
};

export default function ThemeSelector({ currentTheme, onSelectTheme }) {
  return (
    <div className="theme-selector" role="group" aria-label="Theme selector">
      {THEMES.map((theme) => {
        const isActive = currentTheme === theme.id;
        return (
          <button
            key={theme.id}
            type="button"
            className={`theme-btn ${isActive ? "active" : ""}`}
            onClick={() => onSelectTheme(theme.id)}
            title={`Switch to ${theme.name}`}
            aria-pressed={isActive}
          >
            <span className="theme-icon">{THEME_ICONS[theme.id]}</span>
            <span className="theme-name">{theme.name}</span>
          </button>
        );
      })}
    </div>
  );
}

ThemeSelector.propTypes = {
  currentTheme: PropTypes.string.isRequired,
  onSelectTheme: PropTypes.func.isRequired
};
