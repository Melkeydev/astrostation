import { useState } from "react";
import { useTask } from "../../store";

export const AddTask = () => {
  const [text, setText] = useState("");
  const [reminder, setReminder] = useState(false);
  const { addTask } = useTask();

  const onSubmit = (e: any) => {
    e.preventDefault();

    if (!text) {
      alert("Please add a task");
      return;
    }

    addTask(text);

    setText("");
    setReminder(false);
  };

  return (
    <form className="mb-8" onSubmit={onSubmit}>
      <div className="my-5">
        <label className="block">Task</label>
        <input
          className="w-full h-10 m-1 py-2 px-3 text-lg"
          type="text"
          placeholder="Add Task"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="my-5 flex items-center justify-center">
        <label className="flex-1">Set Reminder</label>
        <input
          className="flex h-5"
          type="checkbox"
          checked={reminder}
          value={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
        />
      </div>

      {/*Make this into a button*/}
      <input type="submit" value="Save Task" className="btn btn-block" />
    </form>
  );
};
