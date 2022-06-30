import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Settings } from "./Settings";
import { useTask, useTimer, useBreakStarted } from "@Store";

export const Task = ({ task }) => {
  const [openSettings, setOpenSettings] = useState(false);
  const { completeTask, toggleInProgressState, alertTask, setPomodoroCounter } =
    useTask();
  const { breakStarted } = useBreakStarted();
  const { timerQueue } = useTimer();

  function preventFalseInProgress() {
    if (task.completed) {
      return;
    }
    toggleInProgressState(task.id);
  }

  useEffect(() => {
    if (timerQueue === 0 && !task.alerted) {
      setPomodoroCounter(task.id);
    }
  }, [timerQueue, breakStarted]);

  useEffect(() => {
    if (task.pomodoroCounter == task.pomodoro && !task.alerted) {
      alertTask(task.id, true);
    }
  }, [task.pomodoroCounter]);

  return (
    <>
      {!openSettings ? (
        <div
          className={`w-full py-2 px-2 cursor-pointer border-l-4 bg-stone-300 dark:bg-gray-700 ${
            task.inProgress && !task.completed && "border-yellow-500"
          } ${
            task.completed &&
            "border-green-500 bg-green-300 dark:bg-green-300 line-through dark:text-stone-600"
          } ${
            !task.completed &&
            task.alerted &&
            "border-red-500 bg-red-300 dark:bg-red-300 dark:text-stone-600"
          }`}
          onDoubleClick={() => preventFalseInProgress()}
        >
          <div className="cancelDrag flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div>
                {!task.completed ? (
                  <FaCheck
                    className={`cursor-pointer ml-2 dark:text-stone-600 ${
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
              </div>
              <div className="whitespace-normal">{task.description}</div>
            </div>
            <div className="flex items-center">
              <div className="flex justify-end">
                {task.pomodoroCounter}/{task.pomodoro}
              </div>
              <BsThreeDotsVertical
                className="cursor-pointer ml-2"
                onClick={() => setOpenSettings(!openSettings)}
              />
            </div>
          </div>
        </div>
      ) : (
        <Settings setOpenSettings={setOpenSettings} Task={task} />
      )}
    </>
  );
};
