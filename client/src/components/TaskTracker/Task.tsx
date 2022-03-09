import { FaTimes } from "react-icons/fa";

export const Task = ({ task, onDelete, onToggle }) => {
  return (
    <div
      className="m-1 py-2 px-5 cursor-pointer border-l-4 border-green-500 bg-stone-300"
      onDoubleClick={() => onToggle(task.id)}
    >
      <h3 className="flex items-center justify-between">
        {task.description}
        <FaTimes
          className="text-red-500 cursor-pointer ml-2"
          onClick={() => onDelete(task.id)}
        />
      </h3>
    </div>
  );
};
