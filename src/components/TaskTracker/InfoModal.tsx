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
        className="max-w-xs rounded-lg bg-white p-2 px-1 text-gray-800 shadow-md dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end">
          <IoCloseSharp
            className="cursor-pointer text-red-500 hover:bg-red-200"
            onClick={onClose}
          />
        </div>
        <div className="border-gray-100 pb-2">
          <div className="rounded pb-2 text-center font-bold">
            Your Task Tracker
          </div>
          <hr className="border-t-3 w-1/4 border-[#5c5c5c]" />
          <div className="items-center p-2 px-2">
            Double click a task you want to track 
            <br></br>
            (The task will turn blue)
          </div>
        </div>
      </div>
    </div>
  );
};
