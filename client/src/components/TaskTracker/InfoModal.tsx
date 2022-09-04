import { useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";

export const TaskInfoModal = ({ isVisible = false, onClose }) => {
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
      <div
        className="max-w-xs p-2 px-1 bg-white text-gray-800 rounded-lg shadow-md dark:text-gray-300 dark:bg-gray-800 dark:border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end">
          <IoCloseSharp
            className="text-red-500 cursor-pointer hover:bg-red-200"
            onClick={onClose}
          />
        </div>
        <div className="border-gray-100 pb-2">
          <div className="text-center pb-2 rounded font-bold">
            Your tasks tracker
          </div>
          <hr className="border-t-3 border-[#5c5c5c] w-1/4" />
          <div className="px-2 p-2 items-center">
            Double click a task you want to track with the pomodoro counters
            (will turn blue)
          </div>
        </div>
      </div>
    </div>
  );
};
