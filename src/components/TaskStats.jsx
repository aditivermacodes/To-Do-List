import React from "react";
import PropTypes from "prop-types";
import { CheckCheck, Trash2, Download, Upload } from "lucide-react";

export default function TaskStats({ tasks, onClearCompleted, onExportTasks, onImportTasks }) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  const getMotivation = () => {
    if (total === 0) return "Ready to start your day? Add your first task!";
    if (percentage === 100) return "Outstanding! You crushed all your tasks!";
    if (percentage >= 75) return "Almost there! Keep up the great momentum!";
    if (percentage >= 50) return "Halfway through! Stay focused!";
    if (percentage > 0) return "Great start! One step at a time.";
    return "Let's make today productive!";
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          if (Array.isArray(parsed)) {
            onImportTasks(parsed);
          }
        } catch {
          alert("Invalid tasks JSON file.");
        }
      };
      reader.readAsText(file);
    }
    e.target.value = "";
  };

  return (
    <div className="task-stats-card">
      <div className="stats-header">
        <div className="stats-numbers">
          <span className="stats-title">Task Progress</span>
          <span className="stats-count">
            {completed} of {total} completed ({percentage}%)
          </span>
        </div>
        <div className="stats-actions">
          {completed > 0 && (
            <button
              type="button"
              className="clear-completed-btn"
              onClick={onClearCompleted}
              title="Clear all completed tasks"
            >
              <Trash2 size={14} />
              <span>Clear Done</span>
            </button>
          )}
          <button
            type="button"
            className="icon-action-btn"
            onClick={onExportTasks}
            title="Export tasks as JSON"
            aria-label="Export tasks"
          >
            <Download size={15} />
          </button>
          <label className="icon-action-btn file-input-label" title="Import tasks from JSON">
            <Upload size={15} />
            <input
              type="file"
              accept=".json"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </label>
        </div>
      </div>

      <div className="progress-track" role="progressbar" aria-valuenow={percentage} aria-valuemin={0} aria-valuemax={100}>
        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="stats-footer">
        <p className="motivation-text">{getMotivation()}</p>
        {percentage === 100 && total > 0 && (
          <span className="all-done-badge">
            <CheckCheck size={14} /> All Caught Up!
          </span>
        )}
      </div>
    </div>
  );
}

TaskStats.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      completed: PropTypes.bool.isRequired
    })
  ).isRequired,
  onClearCompleted: PropTypes.func.isRequired,
  onExportTasks: PropTypes.func.isRequired,
  onImportTasks: PropTypes.func.isRequired
};
