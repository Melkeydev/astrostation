import { useState } from "react";
import { useTask } from "../../../store";
import { Button } from "../../Common/Button";

export const AddTask = () => {
  const [text, setText] = useState("");
  const { addTask } = useTask();
  const [pomoCounter, setPomoCounter] = useState(1);

  const onSubmit = (e: any) => {
    e.preventDefault();

    if (!text) {
      alert("Please add a task");
      return;
    }

    addTask(text, pomoCounter);

    setText("");
    setPomoCounter(1);
  };

  function handlePomodoroChange(e) {
    if (e.target.id === "pomodoro-decrement" && pomoCounter > 1) {
      setPomoCounter(pomoCounter - 1);
    } else if (e.target.id === "pomodoro-increment" && pomoCounter < 10) {
      setPomoCounter(pomoCounter + 1);
    }
  }

  return (
    <form className="mb-8" onSubmit={onSubmit}>
      <div className="my-5">
        <label className="block">Task</label>
        <input
          className="w-full h-10 m-1 py-2 px-3 text-lg border border-gray-300"
          type="text"
          placeholder="Add Task"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      {/*Set Reminder should trigger after every finished session*/}
      <div className="my-5 flex items-center justify-center">
        <label className="flex-1">Set Pomodoro Counts</label>
        <div className="bg-gray-200">
          <div className="flex p-2 space-x-5">
            <button
              type="button"
              id="pomodoro-decrement"
              onClick={(e) => handlePomodoroChange(e)}
            >
              &lt;
            </button>
            <div>{pomoCounter}</div>
            <button
              type="button"
              id="pomodoro-increment"
              onClick={(e) => handlePomodoroChange(e)}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>

      <Button type="submit" variant="secondary">
        Save
      </Button>
    </form>
  );
};
