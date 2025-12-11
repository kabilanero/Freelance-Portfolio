import React from "react";

interface DialogProps {
  open: boolean;
  message: string;
  onClose: () => void;
}

const Dialog: React.FC<DialogProps> = ({ open, message, onClose }) => {
  if (!open) return null;

  return (
    <div
      className="dialog-overlay"
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        className="dialog-box"
        style={{
          background: "#fff",
          padding: "24px",
          borderRadius: "12px",
          width: "90%",
          maxWidth: "380px",
          textAlign: "center",
          boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
        }}
      >
        <h3 style={{ marginBottom: 12 }}>Notification</h3>

        <p style={{ marginBottom: 20 }}>{message}</p>

        <button
          onClick={onClose}
          style={{
            padding: "10px 18px",
            background: "#007bff",
            border: "none",
            borderRadius: "8px",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default Dialog;
