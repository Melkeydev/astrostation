import "./Modal.scss";
import { useEffect } from "react";
import { Login } from "./Login";

export const LoginModal = ({ isVisible = false, onClose }) => {
  const keydownHandler = ({ key }) => {
    switch (key) {
      case "Escape":
        onClose();
        break;
      default:
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keydownHandler);
    return () => document.removeEventListener("keydown", keydownHandler);
  });

  return !isVisible ? null : (
    <div className="modal" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        <Login onClose={onClose} />
      </div>
    </div>
  );
};
