import { useState } from "react";
import { Header } from "./Header";
import { Tasks } from "./Tasks";
import { AddTask } from "./AddTask";
import { useTask } from "../../store";

export const TaskTracker = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const { tasks } = useTask();

  return (
    <div className="w-1/5 p-5 mb-2 dark:text-gray-300 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
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
