import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Settings } from "./Settings";
import { useTask, useTimer, useBreakStarted } from "@Store";

// TODO: Remove alerted
// TODO: Add a blurb/instructions to let users know how to toggle

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
    if (timerQueue === 0 && !task.alerted && task.inProgress) {
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
          className={`w-full cursor-pointer border-l-4 bg-stone-300 py-2 px-2 dark:bg-gray-700 ${
            task.inProgress &&
            !task.completed &&
            "joyRideInProgressTask border-cyan-700 bg-cyan-500 dark:bg-cyan-500 dark:text-stone-600"
          } ${
            task.completed &&
            "border-green-500 bg-green-300 line-through dark:bg-green-300 dark:text-stone-600"
          } ${
            !task.completed &&
            task.alerted &&
            "border-red-500 bg-red-300 dark:bg-red-300 dark:text-stone-600"
          } ${
            !task.completed &&
            !task.alerted &&
            !task.inProgress &&
            "joyRideTask"
          }`}
          onDoubleClick={() => preventFalseInProgress()}
        >
          <div className="cancelDrag flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div>
                {!task.completed ? (
                  <FaCheck
                    className={`ml-2 cursor-pointer dark:text-stone-600 ${
                      task.completed ? "text-green-500" : "text-slate-500"
                    }`}
                    onClick={() => completeTask(task.id)}
                  />
                ) : (
                  <RiArrowGoBackFill
                    className={`ml-2 cursor-pointer ${
                      task.completed ? "text-green-500" : "text-slate-500"
                    }`}
                    onClick={() => completeTask(task.id)}
                  />
                )}
              </div>
              <div className="whitespace-normal">{task.description}</div>
            </div>
            <div className="flex items-center">
              {/*This the guy*/}
              <div className="flex justify-end">
                {task.pomodoroCounter}/{task.pomodoro}
              </div>
              <BsThreeDotsVertical
                className="ml-2 cursor-pointer"
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
