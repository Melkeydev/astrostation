import { useState } from "react";
import { Header } from "./Header";
import { Tasks } from "./Tasks";
import { AddTask } from "./AddTask";
import { IoCloseSharp } from "react-icons/io5";
import { useTask, useToggleTasks } from "@Store";

export const TaskTracker = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const { setIsTasksToggled } = useToggleTasks();
  const { tasks } = useTask();

  return (
    <div className="bg-white/[.96] rounded-lg border border-gray-200 shadow-md dark:bg-gray-800/[.96] dark:border-gray-700">
      <div className="flex justify-end handle p-2 w-full">
        <IoCloseSharp
          className="text-red-500 cursor-pointer hover:bg-red-200"
          onClick={() => setIsTasksToggled(false)}
        />
      </div>
      <div className="space-y-2 pb-3 pr-3 pl-3 mb-2 w-72 sm:w-96 dark:text-gray-300 ">
        <Header
          title="Task Tracker"
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />
        {showAddTask && <AddTask />}
        {tasks.length > 0 ? <Tasks tasks={tasks} /> : "No Tasks to Show"}
      </div>
    </div>
  );
};
