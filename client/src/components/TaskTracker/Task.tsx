import { useEffect, useState } from "react";
import { FaTimes, FaCheck } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Settings } from "./Settings";
import { useTask, useTimer } from "../../store";

export const Task = ({ task }: any) => {
  const [openSettings, setOpenSettings] = useState(false);
  const {
    removeTask,
    completeTask,
    toggleInProgressState,
    reducePomodoro,
    alertTask,
  } = useTask();

  const { timerQueue } = useTimer();

  function preventFalseInProgress() {
    if (task.completed) {
      return;
    }
    toggleInProgressState(task.id);
  }

  function getRemainingPomodoro() {
    //let number = task.pomodoro - task.pomodoroCounter;
    if (task.pomodoro < 0) {
      return 0;
    }
    return task.pomodoro;
  }

  useEffect(() => {
    if (timerQueue === 0 && !task.alerted) {
      reducePomodoro(task.id);
    }
  }, [timerQueue]);

  useEffect(() => {
    if (task.pomodoro == 0 && !task.alerted) {
      alertTask(task.id);
      alert(`${task.description} should be completed`);
    }
  }, [task.pomodoro]);

  return (
    <>
      {!openSettings ? (
        <div
          className={`w-full m-1 py-2 px-2 cursor-pointer border-l-4 bg-stone-300 dark:bg-gray-700 ${
            task.inProgress && !task.completed && "border-yellow-500"
          } ${task.completed && "border-green-500 bg-green-300 line-through"}`}
          onDoubleClick={() => preventFalseInProgress()}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div>
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
              </div>
              <div>{task.description}</div>
            </div>
            <div>
              <BsThreeDotsVertical
                className="cursor-pointer ml-2"
                onClick={() => setOpenSettings(!openSettings)}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            Pomodoro's Left
            <div className="flex justify-end">{getRemainingPomodoro()}</div>
          </div>
        </div>
      ) : (
        <Settings setOpenSettings={setOpenSettings} Task={task} />
      )}
    </>
  );
};
