import { useState } from "react";
import { Header } from "./Header";
import { Tasks } from "./Tasks";
import { AddTask } from "./AddTask";
import { useTask, useToggleTasks } from "../../../store";
import { Plugin } from "../Plugin";

export const TaskTracker = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const { setIsTasksToggled } = useToggleTasks();
  const { tasks } = useTask();

  return (
    <Plugin title="Tasks" onClose={() => setIsTasksToggled(false)}>
      <Header
        title="Task Tracker"
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />
      {showAddTask && <AddTask />}
      {tasks.length > 0 ? <Tasks tasks={tasks} /> : "No Tasks to Show"}
    </Plugin>
  );
};
