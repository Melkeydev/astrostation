import { useState } from "react";
import { Header } from "./Header";
import { Tasks } from "./Tasks";
import { AddTask } from "./AddTask";
import { useTask } from "../../store";

export const TaskTracker = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [taskText, setTaskText] = useState("");
  const { tasks, removeTask, toggleCompletedState } = useTask();

  function onDelete() {
    console.log("delete");
  }

  function onToggle() {
    console.log("toggle");
  }

  return (
    <div className="">
      <Header
        title="Task Tracker"
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />
      {showAddTask && <AddTask />}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={onDelete} onToggle={onToggle} />
      ) : (
        "No Tasks to Show"
      )}
    </div>
  );
};
