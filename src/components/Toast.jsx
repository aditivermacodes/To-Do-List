import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { CheckCircle, AlertCircle, Info, RotateCcw, X } from "lucide-react";

export default function Toast({ toast, onClose, onUndo }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, toast.duration || 4500);

    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const icons = {
    success: <CheckCircle size={18} className="toast-icon success" />,
    error: <AlertCircle size={18} className="toast-icon error" />,
    info: <Info size={18} className="toast-icon info" />
  };

  return (
    <div className={`toast-banner toast-${toast.type || "info"}`} role="status" aria-live="polite">
      <div className="toast-content">
        {icons[toast.type || "info"]}
        <span className="toast-message">{toast.message}</span>
      </div>
      <div className="toast-actions">
        {toast.undoAction && (
          <button
            type="button"
            className="toast-undo-btn"
            onClick={() => {
              onUndo(toast.undoAction);
              onClose();
            }}
          >
            <RotateCcw size={14} />
            <span>Undo</span>
          </button>
        )}
        <button
          type="button"
          className="toast-close-btn"
          onClick={onClose}
          aria-label="Close notification"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}

Toast.propTypes = {
  toast: PropTypes.shape({
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["success", "error", "info"]),
    duration: PropTypes.number,
    undoAction: PropTypes.object
  }),
  onClose: PropTypes.func.isRequired,
  onUndo: PropTypes.func.isRequired
};
