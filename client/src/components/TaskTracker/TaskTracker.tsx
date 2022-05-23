import { useState } from "react";
import { Header } from "./Header";
import { Tasks } from "./Tasks";
import { AddTask } from "./AddTask";
import { IoCloseSharp } from "react-icons/io5";
import { useTask, useToggleTasks } from "@Store";
import { Button } from "@Components/Common/Button";

export const TaskTracker = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const { setIsTasksToggled } = useToggleTasks();
  const { tasks } = useTask();

  return (
    <div className="space-y-2 p-3 mb-2 w-72 sm:w-96 dark:text-gray-300 bg-white/[.96] rounded-lg border border-gray-200 shadow-md dark:bg-gray-800/[.96] dark:border-gray-700">
      <div className="flex justify-end">
        <IoCloseSharp
          className="text-red-500 cursor-pointer hover:bg-red-200"
          onClick={() => setIsTasksToggled(false)}
        />
      </div>
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
