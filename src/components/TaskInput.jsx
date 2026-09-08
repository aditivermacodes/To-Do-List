import React, { useState } from "react";
import PropTypes from "prop-types";
import { Plus, Calendar, Flag, Tag, ChevronDown, ChevronUp } from "lucide-react";
import { CATEGORIES, PRIORITIES } from "../utils/taskDefaults";

export default function TaskInput({ onAddTask }) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("medium");
  const [category, setCategory] = useState("general");
  const [dueDate, setDueDate] = useState("");
  const [showDetails, setShowDetails] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    onAddTask({
      text: text.trim(),
      priority,
      category,
      dueDate
    });

    setText("");
    setPriority("medium");
    setDueDate("");
    setShowDetails(false);
  };

  return (
    <form className="task-input-form" onSubmit={handleSubmit}>
      <div className="main-input-row">
        <input
          type="text"
          className="task-text-input"
          placeholder="What do you want to accomplish?..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          aria-label="New task input"
        />
        <button
          type="button"
          className={`toggle-details-btn ${showDetails ? "active" : ""}`}
          onClick={() => setShowDetails(!showDetails)}
          title={showDetails ? "Hide options" : "More options (priority, due date, category)"}
          aria-expanded={showDetails}
        >
          {showDetails ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        <button
          type="submit"
          className="add-task-btn"
          disabled={!text.trim()}
          title="Add task (or press Enter)"
          aria-label="Add task"
        >
          <Plus size={18} />
          <span>Add</span>
        </button>
      </div>

      {showDetails && (
        <div className="task-details-row">
          {/* Priority selector */}
          <div className="detail-field">
            <label className="detail-label">
              <Flag size={13} />
              <span>Priority:</span>
            </label>
            <div className="priority-pills">
              {Object.entries(PRIORITIES).map(([key, val]) => (
                <button
                  key={key}
                  type="button"
                  className={`priority-pill ${priority === key ? "selected" : ""}`}
                  style={{
                    borderColor: priority === key ? val.color : "transparent",
                    color: priority === key ? val.color : "inherit",
                    backgroundColor: priority === key ? val.bg : "rgba(255, 255, 255, 0.08)"
                  }}
                  onClick={() => setPriority(key)}
                >
                  {val.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category Selector */}
          <div className="detail-field">
            <label className="detail-label">
              <Tag size={13} />
              <span>Category:</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="detail-select"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.emoji} {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Due Date Picker */}
          <div className="detail-field">
            <label className="detail-label">
              <Calendar size={13} />
              <span>Due Date:</span>
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="detail-date-input"
            />
          </div>
        </div>
      )}
    </form>
  );
}

TaskInput.propTypes = {
  onAddTask: PropTypes.func.isRequired
};
