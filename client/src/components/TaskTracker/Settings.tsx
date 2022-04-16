import { useState } from "react";
import { Button } from "../Common/Button";
import { AiFillDelete } from "react-icons/ai";
import { useTask, useMaxPomodoro } from "../../store";
export const Settings = ({ setOpenSettings, Task }) => {
  const [text, setText] = useState(Task.description);
  const { removeTask, setPomodoro, alertTask } = useTask();
  const { maxPomodoro } = useMaxPomodoro();

  const [changePomo, setChangePomo] = useState(Task.pomodoro);

  const onSubmit = (e: any) => {
    e.preventDefault();

    if (Task.pomodoroCounter == Task.pomodoro) {
      alertTask(Task.id, false);
    }
    setPomodoro(Task.id, changePomo);
    setOpenSettings(false);
  };

  const handleDelete = () => {
    alert("Are you sure you want to delete this task?");

    removeTask(Task.id);
    setOpenSettings(false);
  };

  function handlePomoChange(e: any) {
    if (e.target.id === "decrement" && changePomo > Task.pomodoroCounter) {
      setChangePomo(changePomo - 1);
    } else if (e.target.id === "increment" && changePomo < maxPomodoro) {
      setChangePomo(changePomo + 1);
    }
  }

  return (
    <div className="space-y-2 py-2 px-1 mb-2 w-full bg-white text-gray-800 rounded-lg border border-gray-200 shadow-md dark:text-gray-300 dark:bg-gray-800 dark:border-gray-700 ">
      <div>
        <input
          className="w-full h-10 m-1 py-2 px-3 text-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-500"
          type="text"
          placeholder={Task.description}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
      </div>
      <div className="flex justify-between border-b-2 border-gray-100 px-2 pb-2 items-center">
        <div>Change Pomodoro's</div>
        <div className="bg-gray-200 dark:bg-gray-700 dark:text-gray-200">
          <div className="flex p-2 space-x-5">
            <button id="decrement" onClick={(e) => handlePomoChange(e)}>
              &lt;
            </button>
            <div>{changePomo}</div>
            <button id="increment" onClick={(e) => handlePomoChange(e)}>
              &gt;
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-between border-b-2 border-gray-100 px-2 pb-2 items-center">
        <div>Delete Task</div>
        <div className="cursor-pointer hover:text-red-500 mr-3">
          <AiFillDelete className="h-6 w-6" onClick={() => handleDelete()} />
        </div>
      </div>
      <div className="flex justify-between">
        <Button
          className="text-gray-800 font-normal hover:text-white dark:text-white"
          variant="cold"
          onClick={() => setOpenSettings(false)}
        >
          Cancel
        </Button>
        <Button
          className="text-gray-800 font-normal hover:text-white dark:text-white"
          variant="cold"
          onClick={(e) => onSubmit(e)}
        >
          Okay
        </Button>
      </div>
    </div>
  );
};
