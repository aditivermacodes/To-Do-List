import React, { useState, useMemo } from "react";
import confetti from "canvas-confetti";
import { CheckCircle2, Sparkles, Inbox } from "lucide-react";

import { useLocalStorage } from "./hooks/useLocalStorage";
import { INITIAL_TASKS, PRIORITY_WEIGHTS } from "./utils/taskDefaults";
import TaskInput from "./components/TaskInput";
import TaskItem from "./components/TaskItem";
import TaskFilter from "./components/TaskFilter";
import TaskStats from "./components/TaskStats";
import Toast from "./components/Toast";

export default function ToDoList() {
  const [tasks, setTasks] = useLocalStorage("antigravity_todo_tasks", INITIAL_TASKS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("manual");
  const [toast, setToast] = useState(null);

  // Trigger celebratory confetti
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // Confetti fail silently if canvas not supported
    }
  };

  // Add new task
  const handleAddTask = ({ text, priority, category, dueDate }) => {
    const newTask = {
      id: "task-" + Date.now() + "-" + Math.random().toString(36).substring(2, 7),
      text,
      completed: false,
      priority,
      category,
      dueDate,
      createdAt: Date.now()
    };

    setTasks((prev) => [newTask, ...prev]);
    setToast({
      message: `Task added: "${text.length > 25 ? text.slice(0, 25) + '...' : text}"`,
      type: "success"
    });
  };

  // Toggle complete
  const handleToggleComplete = (id) => {
    setTasks((prev) => {
      const target = prev.find((t) => t.id === id);
      const isBecomingComplete = target ? !target.completed : false;

      const updated = prev.map((t) =>
        t.id === id ? { ...t, completed: isBecomingComplete } : t
      );

      // Check if all tasks are now completed
      const remainingActive = updated.filter((t) => !t.completed).length;
      if (isBecomingComplete && remainingActive === 0 && updated.length > 0) {
        triggerConfetti();
        setToast({
          message: "Incredible work! All tasks are complete! 🎉",
          type: "success",
          duration: 5000
        });
      }

      return updated;
    });
  };

  // Remove task with Undo
  const handleRemoveTask = (id) => {
    const taskToRemove = tasks.find((t) => t.id === id);
    const taskIndex = tasks.findIndex((t) => t.id === id);

    setTasks((prev) => prev.filter((t) => t.id !== id));

    if (taskToRemove) {
      setToast({
        message: "Task deleted",
        type: "info",
        duration: 5000,
        undoAction: {
          task: taskToRemove,
          index: taskIndex
        }
      });
    }
  };

  // Restore task (Undo)
  const handleUndo = (undoAction) => {
    if (!undoAction?.task) return;
    setTasks((prev) => {
      const next = [...prev];
      const insertAt = Math.min(undoAction.index, next.length);
      next.splice(insertAt, 0, undoAction.task);
      return next;
    });
    setToast({
      message: "Task restored!",
      type: "success"
    });
  };

  // Update task text
  const handleUpdateText = (id, newText) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: newText } : t))
    );
    setToast({
      message: "Task updated",
      type: "info"
    });
  };

  // Move task up
  const handleMoveUp = (index) => {
    if (index > 0) {
      setTasks((prev) => {
        const next = [...prev];
        const [moved] = next.splice(index, 1);
        next.splice(index - 1, 0, moved);
        return next;
      });
    }
  };

  // Move task down
  const handleMoveDown = (index) => {
    if (index < tasks.length - 1) {
      setTasks((prev) => {
        const next = [...prev];
        const [moved] = next.splice(index, 1);
        next.splice(index + 1, 0, moved);
        return next;
      });
    }
  };

  // Clear completed
  const handleClearCompleted = () => {
    const completedTasks = tasks.filter((t) => t.completed);
    if (completedTasks.length === 0) return;

    if (window.confirm(`Clear ${completedTasks.length} completed task(s)?`)) {
      setTasks((prev) => prev.filter((t) => !t.completed));
      setToast({
        message: `Cleared ${completedTasks.length} completed task(s)`,
        type: "info"
      });
    }
  };

  // Export tasks as JSON
  const handleExportTasks = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(tasks, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `todo-backup-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setToast({
      message: "Tasks exported to JSON successfully!",
      type: "success"
    });
  };

  // Import tasks from JSON
  const handleImportTasks = (importedTasks) => {
    if (!Array.isArray(importedTasks)) return;
    const validated = importedTasks.map((t, idx) => ({
      id: t.id || "imported-" + Date.now() + "-" + idx,
      text: String(t.text || "Untitled Task"),
      completed: Boolean(t.completed),
      priority: ["high", "medium", "low"].includes(t.priority) ? t.priority : "medium",
      category: typeof t.category === "string" ? t.category : "general",
      dueDate: typeof t.dueDate === "string" ? t.dueDate : "",
      createdAt: typeof t.createdAt === "number" ? t.createdAt : Date.now()
    }));

    setTasks(validated);
    setToast({
      message: `Successfully imported ${validated.length} tasks!`,
      type: "success"
    });
  };

  // Filtered & Sorted Tasks
  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        // Status filter
        if (statusFilter === "active" && task.completed) return false;
        if (statusFilter === "completed" && !task.completed) return false;

        // Category filter
        if (categoryFilter !== "all" && task.category !== categoryFilter) return false;

        // Search filter
        if (searchQuery.trim() !== "") {
          const query = searchQuery.toLowerCase();
          return task.text.toLowerCase().includes(query);
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "dueDate") {
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return a.dueDate.localeCompare(b.dueDate);
        }
        if (sortBy === "priority") {
          return (PRIORITY_WEIGHTS[b.priority] || 0) - (PRIORITY_WEIGHTS[a.priority] || 0);
        }
        if (sortBy === "alphabetical") {
          return a.text.localeCompare(b.text);
        }
        if (sortBy === "newest") {
          return (b.createdAt || 0) - (a.createdAt || 0);
        }
        // "manual": preserve user ordering
        return 0;
      });
  }, [tasks, statusFilter, categoryFilter, searchQuery, sortBy]);

  const canReorder =
    sortBy === "manual" &&
    statusFilter === "all" &&
    categoryFilter === "all" &&
    searchQuery.trim() === "";

  return (
    <div className="todolist-app-container">
      {/* Header */}
      <header className="app-header">
        <div className="header-title-badge">
          <Sparkles size={20} className="sparkle-icon" />
          <h1>TaskFlow</h1>
        </div>
        <p className="app-subtitle">Organize your goals, stay focused, and achieve more.</p>
      </header>

      {/* Progress & Stats Card */}
      <TaskStats
        tasks={tasks}
        onClearCompleted={handleClearCompleted}
        onExportTasks={handleExportTasks}
        onImportTasks={handleImportTasks}
      />

      {/* Input Section */}
      <TaskInput onAddTask={handleAddTask} />

      {/* Filters & Controls */}
      <TaskFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        categoryFilter={categoryFilter}
        onCategoryFilterChange={setCategoryFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {/* Task List */}
      {filteredTasks.length > 0 ? (
        <ul className="tasks-list" aria-label="Tasks list">
          {filteredTasks.map((task, index) => (
            <TaskItem
              key={task.id}
              task={task}
              index={index}
              totalTasks={filteredTasks.length}
              canReorder={canReorder}
              onToggleComplete={handleToggleComplete}
              onRemove={handleRemoveTask}
              onMoveUp={handleMoveUp}
              onMoveDown={handleMoveDown}
              onUpdateText={handleUpdateText}
            />
          ))}
        </ul>
      ) : (
        <div className="empty-state">
          {searchQuery || categoryFilter !== "all" || statusFilter !== "all" ? (
            <>
              <Inbox size={42} className="empty-icon" />
              <h3>No matching tasks found</h3>
              <p>Try adjusting your search query or filter criteria.</p>
            </>
          ) : (
            <>
              <CheckCircle2 size={42} className="empty-icon all-clear" />
              <h3>All clear! Nothing on your to-do list.</h3>
              <p>Add a new task above to get started with your day.</p>
            </>
          )}
        </div>
      )}

      {/* Toast Alert */}
      <Toast
        toast={toast}
        onClose={() => setToast(null)}
        onUndo={handleUndo}
      />
    </div>
  );
}