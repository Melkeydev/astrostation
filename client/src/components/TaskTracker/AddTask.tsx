import { useCallback, useState } from "react";
import { useTask } from "../../store";
import { Button } from "../Common/Button";

export const AddTask = () => {
  const limit = 100;

  const [text, setText] = useState("");
  const { addTask } = useTask();
  const [pomoCounter, setPomoCounter] = useState(1);
  const [charCount, setCharCount] = useState(text.slice(0, limit));

  const setFormattedContent = useCallback(
    (text) => {
      setCharCount(text.slice(0, limit));
    },
    [limit, setCharCount]
  );

  const onSubmit = (e: any) => {
    e.preventDefault();

    if (!text) {
      alert("Please add a task");
      return;
    }

    addTask(text, pomoCounter);

    setText("");
    setCharCount("");
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
          className="w-full h-10 m-1 py-2 px-3 text-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-500"
          type="text"
          placeholder="Add Task"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setFormattedContent(e.target.value);
          }}
        />
        <p className="m-1">
          {charCount.length}/{limit}
        </p>
      </div>
      <div className="my-5 flex items-center justify-center">
        <label className="flex-1">Set Pomodoro Counts</label>
        <div className="bg-gray-200 dark:bg-gray-700 dark:text-gray-200">
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
