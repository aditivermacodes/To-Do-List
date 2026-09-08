import React from "react";
import PropTypes from "prop-types";
import { Search, X, ArrowUpDown, Filter } from "lucide-react";
import { CATEGORIES } from "../utils/taskDefaults";

export default function TaskFilter({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  categoryFilter,
  onCategoryFilterChange,
  sortBy,
  onSortChange
}) {
  return (
    <div className="task-filter-container">
      {/* Search Bar */}
      <div className="search-bar-wrapper">
        <Search size={16} className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search tasks"
        />
        {searchQuery && (
          <button
            type="button"
            className="search-clear-btn"
            onClick={() => onSearchChange("")}
            aria-label="Clear search"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Filter Tabs & Controls */}
      <div className="filter-controls-row">
        <div className="status-tabs" role="tablist" aria-label="Filter tasks by status">
          {["all", "active", "completed"].map((status) => (
            <button
              key={status}
              type="button"
              role="tab"
              aria-selected={statusFilter === status}
              className={`status-tab ${statusFilter === status ? "active" : ""}`}
              onClick={() => onStatusFilterChange(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        <div className="select-controls">
          {/* Category Filter */}
          <div className="select-wrapper">
            <Filter size={13} className="select-icon" />
            <select
              value={categoryFilter}
              onChange={(e) => onCategoryFilterChange(e.target.value)}
              className="custom-select"
              aria-label="Filter by category"
            >
              <option value="all">All Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.emoji} {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Selector */}
          <div className="select-wrapper">
            <ArrowUpDown size={13} className="select-icon" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="custom-select"
              aria-label="Sort tasks"
            >
              <option value="manual">Custom Order</option>
              <option value="dueDate">Due Date</option>
              <option value="priority">Priority (High to Low)</option>
              <option value="alphabetical">Title (A-Z)</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

TaskFilter.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  statusFilter: PropTypes.string.isRequired,
  onStatusFilterChange: PropTypes.func.isRequired,
  categoryFilter: PropTypes.string.isRequired,
  onCategoryFilterChange: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired
};
