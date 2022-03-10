import { FaTimes, FaCheck } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";
import { useTask } from "../../store";

export const Task = ({ task }: any) => {
  const { removeTask, completeTask, toggleInProgressState } = useTask();

  function preventFalseInProgress() {
    if (task.completed) {
      return;
    }
    toggleInProgressState(task.id);
  }

  return (
    <div
      className={`w-full m-1 py-2 px-2 cursor-pointer border-l-4 bg-stone-300 ${
        task.inProgress && !task.completed && "border-yellow-500"
      } ${
        task.completed
          ? "border-green-500 bg-green-300 line-through"
          : "border-slate-500"
      }`}
      onDoubleClick={() => preventFalseInProgress()}
    >
      <h3 className="flex items-center justify-between">
        {task.description}
        <div className="flex justify-end">
          {!task.completed ? (
            <FaCheck
              className={`cursor-pointer ml-2 ${
                task.completed ? "text-green-500" : "text-slate-500"
              }`}
              onClick={() => completeTask(task.id)}
            />
          ) : (
            <RiArrowGoBackFill
              className={`cursor-pointer ml-2 ${
                task.completed ? "text-green-500" : "text-slate-500"
              }`}
              onClick={() => completeTask(task.id)}
            />
          )}
          <FaTimes
            className="text-red-500 cursor-pointer ml-2"
            onClick={() => removeTask(task.id)}
          />
        </div>
      </h3>
    </div>
  );
};
