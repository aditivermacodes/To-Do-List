import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Check,
  Trash2,
  ChevronUp,
  ChevronDown,
  Edit3,
  X,
  Calendar,
  Clock
} from "lucide-react";
import { PRIORITIES, CATEGORIES, formatDueDate } from "../utils/taskDefaults";

export default function TaskItem({
  task,
  index,
  totalTasks,
  canReorder,
  onToggleComplete,
  onRemove,
  onMoveUp,
  onMoveDown,
  onUpdateText
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const editInputRef = useRef(null);

  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [isEditing]);

  const handleSaveEdit = () => {
    if (editText.trim() && editText.trim() !== task.text) {
      onUpdateText(task.id, editText.trim());
    } else {
      setEditText(task.text);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSaveEdit();
    } else if (e.key === "Escape") {
      setEditText(task.text);
      setIsEditing(false);
    }
  };

  const priorityInfo = PRIORITIES[task.priority] || PRIORITIES.medium;
  const categoryInfo = CATEGORIES.find((c) => c.id === task.category) || CATEGORIES[0];
  const dueDateInfo = formatDueDate(task.dueDate);

  return (
    <li
      className={`task-item ${task.completed ? "completed" : ""} priority-${task.priority}`}
      data-id={task.id}
    >
      {/* Checkbox toggle */}
      <button
        type="button"
        className={`task-checkbox ${task.completed ? "checked" : ""}`}
        onClick={() => onToggleComplete(task.id)}
        aria-label={task.completed ? "Mark task as pending" : "Mark task as completed"}
        title={task.completed ? "Mark pending" : "Mark done"}
      >
        {task.completed && <Check size={14} strokeWidth={3} />}
      </button>

      {/* Main Content / Edit Input */}
      <div className="task-content">
        {isEditing ? (
          <div className="task-edit-row">
            <input
              ref={editInputRef}
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="task-edit-input"
            />
            <button
              type="button"
              className="task-action-btn save-btn"
              onClick={handleSaveEdit}
              title="Save (Enter)"
              aria-label="Save task edit"
            >
              <Check size={14} />
            </button>
            <button
              type="button"
              className="task-action-btn cancel-btn"
              onClick={() => {
                setEditText(task.text);
                setIsEditing(false);
              }}
              title="Cancel (Esc)"
              aria-label="Cancel task edit"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <>
            <span
              className="task-text"
              onDoubleClick={() => setIsEditing(true)}
              title="Double-click to edit"
            >
              {task.text}
            </span>

            {/* Badges & Meta */}
            <div className="task-meta-row">
              {/* Category */}
              <span className="task-badge category-badge" title={`Category: ${categoryInfo.label}`}>
                <span>{categoryInfo.emoji}</span>
                <span>{categoryInfo.label}</span>
              </span>

              {/* Priority */}
              <span
                className="task-badge priority-badge"
                style={{
                  color: priorityInfo.color,
                  backgroundColor: priorityInfo.bg,
                  borderColor: priorityInfo.border
                }}
              >
                {priorityInfo.label}
              </span>

              {/* Due Date */}
              {dueDateInfo && (
                <span className={`task-badge due-badge due-${dueDateInfo.status}`}>
                  <Calendar size={11} />
                  <span>{dueDateInfo.text}</span>
                </span>
              )}
            </div>
          </>
        )}
      </div>

      {/* Action Buttons */}
      {!isEditing && (
        <div className="task-actions-group">
          <button
            type="button"
            className="task-action-btn edit-btn"
            onClick={() => setIsEditing(true)}
            title="Edit task"
            aria-label="Edit task"
          >
            <Edit3 size={14} />
          </button>

          {canReorder && (
            <>
              <button
                type="button"
                className="task-action-btn move-btn"
                disabled={index === 0}
                onClick={() => onMoveUp(index)}
                title="Move up"
                aria-label="Move task up"
              >
                <ChevronUp size={15} />
              </button>
              <button
                type="button"
                className="task-action-btn move-btn"
                disabled={index === totalTasks - 1}
                onClick={() => onMoveDown(index)}
                title="Move down"
                aria-label="Move task down"
              >
                <ChevronDown size={15} />
              </button>
            </>
          )}

          <button
            type="button"
            className="task-action-btn delete-btn"
            onClick={() => onRemove(task.id)}
            title="Delete task"
            aria-label="Delete task"
          >
            <Trash2 size={14} />
          </button>
        </div>
      )}
    </li>
  );
}

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    priority: PropTypes.string,
    category: PropTypes.string,
    dueDate: PropTypes.string,
    createdAt: PropTypes.number
  }).isRequired,
  index: PropTypes.number.isRequired,
  totalTasks: PropTypes.number.isRequired,
  canReorder: PropTypes.bool.isRequired,
  onToggleComplete: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onMoveUp: PropTypes.func.isRequired,
  onMoveDown: PropTypes.func.isRequired,
  onUpdateText: PropTypes.func.isRequired
};
