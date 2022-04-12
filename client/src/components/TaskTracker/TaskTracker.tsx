import { useState } from "react";
import { Header } from "./Header";
import { Tasks } from "./Tasks";
import { AddTask } from "./AddTask";
import { IoCloseSharp } from "react-icons/io5";
import {
  StationPlugin,
  useStationPluginsStore,
  useTask,
} from "../../store";

export const TaskTracker = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const { remove: removePlugin } = useStationPluginsStore();
  const { tasks } = useTask();

  return (
    <div className="p-4">
      <div className="flex justify-end">
        <IoCloseSharp
          className="text-red-500 cursor-pointer hover:bg-red-200"
          onClick={() => removePlugin(StationPlugin.TaskTracker)}
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
