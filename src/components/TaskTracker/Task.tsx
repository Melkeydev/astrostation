import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Settings } from "./Settings";
import { useTask, useTimer, useBreakStarted } from "@Store";
import clsx from "clsx";

// TODO: Remove alerted
// TODO: Add a blurb/instructions to let users know how to toggle

export const Task = ({ task }) => {
  const [openSettings, setOpenSettings] = useState(false);
  const { removeTask, completeTask, toggleInProgressState, alertTask, setPomodoroCounter, toggleMenu } =
    useTask();
  const { breakStarted } = useBreakStarted();
  const { timerQueue } = useTimer();

  const openContextMenu = (event) => {
    event.preventDefault();
    toggleMenu(task.id, !task.menuToggled);
  }

  const closeOnBoundsExit = (_) => {
    /* when the mouse leaves the bounds of the task 
     * only when the task context-menu is open we can close the contextmenu
     * when the mouse leaves the bounds of the tasks div 
     */
    if (task.menuToggled) {
      toggleMenu(task.id, !task.menuToggled);
    }
  }

  // FIXME: partially copied code from Settings.tsx
  const handleDelete = () => {
    alert("Are you sure you want to delete this task?");
    removeTask(task.id);
  };

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

  /* close context menu when we click out of bounds of a context menu
   * this _may_ not be optimal, or the right way since we done utilize ref
   */
  const closeContextMenuOOB = (_) => {
    if (task.menuToggled) {
      toggleMenu(task.id, false);
    }
  }
  document.addEventListener("mousedown", closeContextMenuOOB);

  return (
    <>
      {!openSettings ? (
        <div
          className={clsx(
            "my-2 w-full cursor-pointer border-l-4 bg-stone-300 py-2 px-2 dark:bg-gray-700",
            task.inProgress &&
              !task.completed &&
              "joyRideInProgressTask border-cyan-700 bg-cyan-500 dark:bg-cyan-500 dark:text-stone-600",

            task.completed &&
              "border-green-500 bg-green-300 line-through dark:bg-green-300 dark:text-stone-600",

            !task.completed &&
              task.alerted &&
              "border-red-500 bg-red-300 dark:bg-red-300 dark:text-stone-600",

            !task.completed &&
              !task.alerted &&
              !task.inProgress &&
              "joyRideTask"
          )}
          onContextMenu={openContextMenu}
          onDoubleClick={() => preventFalseInProgress()}
        >
          <div className="cancelDrag flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div>
                {!task.completed ? (
                  <FaCheck
                    className={clsx(
                      "ml-2 cursor-pointer dark:text-stone-600",
                      task.completed ? "text-green-500" : "text-slate-500"
                    )}
                    onClick={() => completeTask(task.id)}
                  />
                ) : (
                  <RiArrowGoBackFill
                    className={clsx(
                      "ml-2 cursor-pointer",
                      task.completed ? "text-green-500" : "text-slate-500"
                    )}
                    onClick={() => completeTask(task.id)}
                  />
                )}
              </div>
              <div className="whitespace-normal">{task.description}</div>
            </div>

            <div className="flex items-center">
              {/*This the guy */}
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
      <div
        className="absolute">
        {task.menuToggled && (
          <div
            className="bg-neutral-800 rounded-md" onMouseLeave={closeOnBoundsExit}>
            <ul className="w-full">
              <li
                onClick={() => { completeTask(task.id) }}
                className="px-5 py-2 hover:bg-neutral-600 rounded-md">
                <div>
                  Toggle Completed
                </div>
              </li>
              <li
                onClick={() => { handleDelete() }}
                className="px-5 py-2 hover:bg-neutral-600 rounded-md">
                <div>
                  Deleted
                </div>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

