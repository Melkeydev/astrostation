import { useRef, useEffect, useState, RefCallback } from "react";
import { FaCheck } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Settings } from "./Settings";
import { useTask, useTimer, useBreakStarted } from "@Store";
import clsx from "clsx";
import { ITask } from "@Root/src/interfaces";

// TODO: Remove alerted
// TODO: Add a blurb/instructions to let users know how to toggle

const onClickOff = callback => {
  const callbackRef = useRef<RefCallback<null>>(); // initialize mutable ref, which stores callback
  const innerRef = useRef<HTMLDivElement>(); // returned to client, who marks "border" element

  // update cb on each render, so second useEffect has access to current value
  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
    function handleClick(e) {
      if (innerRef.current && callbackRef.current && !innerRef.current.contains(e.target)) {
        callbackRef.current(e);
      }
    }
  }, []);

  return innerRef; // convenience for client (doesn't need to init ref himself)
};

export const Task = ({ task, tasks }) => {
  const [openSettings, setOpenSettings] = useState(false);
  const { removeTask, setCompleted, toggleInProgressState, alertTask, setPomodoroCounter, toggleMenu } = useTask();
  const { breakStarted } = useBreakStarted();
  const { timerQueue } = useTimer();
  const innerRef = onClickOff(() => {
    toggleMenu(task.id, false);
  });

  const openContextMenu = event => {
    event.preventDefault();
    toggleMenu(task.id, !task.menuToggled);

    /* This is linear search, however it did not seem to 
       have any perf impact for 100-200 tasks at a time */
    tasks.forEach((task_: ITask) => {
      if (task_.menuToggled) toggleMenu(task_.id, false);
    });
  };

  const handleDelete = () => {
    // FIXME: This should be a modal
    alert("Are you sure you want to delete this task?");
    removeTask(task.id);
  };

  /* Observation: When double clicking a task the text is highlighted
     This may not be a huge UX blunder, but it does exist. TBD */
  const preventFalseInProgress = () => {
    if (task.completed) {
      return;
    }
    toggleInProgressState(task.id, !task.inProgress);
  };

  const markNotCompleteWhenTracking = () => {
    toggleInProgressState(task.id, !task.inProgress);
    toggleMenu(task.id, false);
    if (task.completed) setCompleted(task.id, false);
  };

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
          className={clsx(
            "my-2 w-full cursor-pointer border-l-4 bg-stone-300 py-2 px-2 dark:bg-gray-700",
            task.inProgress &&
              !task.completed &&
              "joyRideInProgressTask border-cyan-700 bg-cyan-500 dark:bg-cyan-500 dark:text-stone-600",

            task.completed && "border-green-500 bg-green-300 line-through dark:bg-green-300 dark:text-stone-600",

            !task.completed && task.alerted && "border-red-500 bg-red-300 dark:bg-red-300 dark:text-stone-600",

            !task.completed && !task.alerted && !task.inProgress && "joyRideTask"
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
                    onClick={() => setCompleted(task.id, !task.completed)}
                  />
                ) : (
                  <RiArrowGoBackFill
                    className={clsx("ml-2 cursor-pointer", task.completed ? "text-green-500" : "text-slate-500")}
                    onClick={() => setCompleted(task.id, !task.completed)}
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
              <BsThreeDotsVertical className="ml-2 cursor-pointer" onClick={() => setOpenSettings(!openSettings)} />
            </div>
          </div>
        </div>
      ) : (
        <Settings setOpenSettings={setOpenSettings} Task={task} />
      )}
      <div className="absolute">
        {task.menuToggled && (
          <div ref={innerRef} className="rounded-md bg-neutral-800">
            <ul className="w-full">
              <li
                onClick={() => {
                  markNotCompleteWhenTracking();
                }}
                className="cursor-pointer rounded-md px-5 py-2 hover:bg-neutral-600"
              >
                {task.inProgress ? (
                  <div className="select-none ">Untrack Task</div>
                ) : (
                  <div className="select-none ">Track Task</div>
                )}
              </li>
              <li
                onClick={() => {
                  setCompleted(task.id, !task.completed);
                  toggleMenu(task.id, false);
                }}
                className="cursor-pointer rounded-md px-5 py-2 hover:bg-neutral-600"
              >
                <div className="select-none">Complete Task</div>
              </li>
              <li
                onClick={() => {
                  handleDelete();
                }}
                className="cursor-pointer rounded-md px-5 py-2 hover:bg-neutral-600"
              >
                <div className="select-none">Delete Task</div>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};
