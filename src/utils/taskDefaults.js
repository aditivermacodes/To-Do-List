export const PRIORITIES = {
  high: { label: "High", color: "#ef4444", bg: "rgba(239, 68, 68, 0.18)", border: "rgba(239, 68, 68, 0.4)" },
  medium: { label: "Medium", color: "#f59e0b", bg: "rgba(245, 158, 11, 0.18)", border: "rgba(245, 158, 11, 0.4)" },
  low: { label: "Low", color: "#10b981", bg: "rgba(16, 185, 129, 0.18)", border: "rgba(16, 185, 129, 0.4)" }
};

export const PRIORITY_WEIGHTS = { high: 3, medium: 2, low: 1 };

export const CATEGORIES = [
  { id: "general", label: "General" },
  { id: "work", label: "Work" },
  { id: "personal", label: "Personal" },
  { id: "study", label: "Study" },
  { id: "health", label: "Fitness & Health" }
];

export const THEMES = [
  { id: "cosmic", name: "Cosmic Glow" },
  { id: "midnight", name: "Midnight Slate" },
  { id: "cyberpunk", name: "Neon Cyber" },
  { id: "emerald", name: "Emerald Mist" },
  { id: "light", name: "Frost Minimal" }
];

export const INITIAL_TASKS = [
  {
    id: "init-1",
    text: "Explore the new To-Do List features",
    completed: false,
    priority: "high",
    category: "work",
    dueDate: new Date().toISOString().split("T")[0],
    createdAt: Date.now() - 3600000
  },
  {
    id: "init-2",
    text: "Hit the gym or go for a brisk jog",
    completed: false,
    priority: "medium",
    category: "health",
    dueDate: "",
    createdAt: Date.now() - 7200000
  },
  {
    id: "init-3",
    text: "Finish reading Chapter 4 of system design book",
    completed: true,
    priority: "low",
    category: "study",
    dueDate: "",
    createdAt: Date.now() - 10800000
  }
];

export function formatDueDate(dateString) {
  if (!dateString) return null;
  const [year, month, day] = dateString.split("-").map(Number);
  const targetDate = new Date(year, month - 1, day);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const diffTime = targetDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return { text: "Overdue", status: "overdue" };
  } else if (diffDays === 0) {
    return { text: "Today", status: "today" };
  } else if (diffDays === 1) {
    return { text: "Tomorrow", status: "tomorrow" };
  } else {
    return {
      text: targetDate.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
      status: "upcoming"
    };
  }
}
