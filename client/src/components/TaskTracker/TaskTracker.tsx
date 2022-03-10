import { useState } from "react";
import { Header } from "./Header";
import { Tasks } from "./Tasks";
import { AddTask } from "./AddTask";
import { useTask } from "../../store";

export const TaskTracker = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [taskText, setTaskText] = useState("");
  const { tasks, removeTask, toggleCompletedState } = useTask();

  return (
    <div className="w-1/5">
      <Header
        title="Task Tracker"
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />
      {showAddTask && <AddTask />}
      {tasks.length > 0 ? <Tasks tasks={tasks} /> : "No Tasks to Show"}
    </div>
  );
};
