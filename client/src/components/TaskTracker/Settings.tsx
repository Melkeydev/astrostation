import { useState } from "react";
import { Button } from "../Common/Button";
import { AiFillDelete } from "react-icons/ai";
import { useTask, useTimer } from "../../store";
export const Settings = ({ setOpenSettings, Task }) => {
  const [text, setText] = useState(Task.description);
  const { removeTask, increasePomodoro, reducePomodoro } = useTask();

  const onSubmit = (e: any) => {
    e.preventDefault();
  };

  const handleDelete = () => {
    alert("Are you sure you want to delete this task?");

    removeTask(Task.id);
    setOpenSettings(false);
  };

  // NOTE: Currently the settings flow is broken. Due to our Zustand hooks
  // they will change regardless if you click yes or no.
  // Need to add a middle handler to adjusting only when clicking Submit

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
            <button id="pomodoro-decrement">&lt;</button>
            <div>{Task.pomodoro}</div>
            <button id="pomodoro-increment">&gt;</button>
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
        >
          Okay
        </Button>
      </div>
    </div>
  );
};
