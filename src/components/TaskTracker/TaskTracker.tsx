import { useState } from "react";
import { Header } from "./Header";
import { Tasks } from "./Tasks";
import { AddTask } from "./AddTask";
import { IoCloseSharp, IoInformationCircleOutline } from "react-icons/io5";
import { useTask, useToggleTasks } from "@Store";
import { TaskInfoModal } from "@App/components/TaskTracker/InfoModal";

export const TaskTracker = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const { setIsTasksToggled } = useToggleTasks();
  const { tasks } = useTask();
  const [isTaskInfoModalOpen, setIsTaskInfoModalOpen] = useState(false);

  return (
    <div className="rounded-lg border border-gray-200 bg-white/[.96] shadow-md dark:border-gray-700 dark:bg-gray-800/[.96]">
      <div className="handle flex w-full cursor-move justify-between p-2">
       <TaskInfoModal 
          isVisible={isTaskInfoModalOpen}
          onClose={() => setIsTaskInfoModalOpen(false)}
        />
        <IoInformationCircleOutline
          className="cursor-pointer text-white"
          onClick={() => setIsTaskInfoModalOpen(true)}
        />
        <IoCloseSharp
          className="cursor-pointer text-red-500 hover:bg-red-200"
          onClick={() => setIsTasksToggled(false)}
        />
      </div>
      <div className="joyRideTaskTracker mb-2 w-72 pb-3 pr-3 pl-3 dark:text-gray-300 sm:w-96 ">
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
