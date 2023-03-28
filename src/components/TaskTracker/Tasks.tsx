import { Task } from "./Task";
import { Button } from "@Components/Common/Button";
import { useTask } from "@Store";
import { ITask } from "@App/interfaces";

export const Tasks = ({ tasks }) => {
  const { removeAllTasks } = useTask();

  function confirmClearTasks() {
    var answer = window.confirm("This will clear all current tasks");
    if (answer) {
      removeAllTasks();
    }
  }

  return (
    <>
      {tasks.map((task: ITask, index: number) => (
        <Task key={index} task={task} tasks={tasks} />
      ))}
      {tasks && (
        <div className="mt-4 flex justify-end">
          <Button variant="danger" onClick={() => confirmClearTasks()}>
            Clear All
          </Button>
        </div>
      )}
    </>
  );
};
