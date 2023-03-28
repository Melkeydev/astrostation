import { useCallback, useState } from "react";
import { useTask, useBreakStarted } from "@Store";
import { Button } from "@Components/Common/Button";

export const AddTask = () => {
  const limit = 100;
  const [text, setText] = useState("");
  const { addTask } = useTask();
  const [pomoCounter, setPomoCounter] = useState(1);
  const [charCount, setCharCount] = useState(text.slice(0, limit));
  const { breakStarted } = useBreakStarted();

  const setFormattedContent = useCallback(
    (text) => {
      setCharCount(text.slice(0, limit));
    },
    [limit, setCharCount]
  );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!text) {
      alert("Please add a task");
      return;
    }

    // Might need to modify addTask to be aware of break time
    addTask(charCount, pomoCounter, breakStarted);
    setText("");
    setCharCount("");
    setPomoCounter(1);
  };

  function handlePomodoroChange(e: React.MouseEvent<HTMLButtonElement>) {
    const target = e.target as Element;
    if (target.id === "pomodoro-decrement" && pomoCounter > 1) {
      setPomoCounter(pomoCounter - 1);
    } else if (target.id === "pomodoro-increment" && pomoCounter < 10) {
      setPomoCounter(pomoCounter + 1);
    }
  }

  return (
    <form className="mb-8 mt-2" onSubmit={(e) => onSubmit(e)}>
      <div className="my-5">
        <label className="block">Task</label>
        <input
          className="cancelDrag m-1 h-10 w-full border border-gray-300 py-2 px-3 text-lg dark:border-gray-500 dark:bg-gray-700"
          type="text"
          placeholder="Add Task"
          value={charCount}
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
          <div className="flex space-x-5 p-2">
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

      <Button type="submit" variant="primary">
        Save
      </Button>
    </form>
  );
};
