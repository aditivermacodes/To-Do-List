import React from "react";
import PropTypes from "prop-types";
import { THEMES } from "../utils/taskDefaults";

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
            <span className="theme-icon">{theme.icon}</span>
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
