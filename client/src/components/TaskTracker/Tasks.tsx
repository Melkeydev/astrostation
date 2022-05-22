import { Task } from "./Task";
import { Button } from "@Components/Common/Button";
import { useTask } from "@Store";

export const Tasks = ({ tasks }: any) => {
  // TODO: Add Clear all at the bottom of this component
  // TODO: add the hook funcitonality to delete all the tasks in the list
  //
  const { removeAllTasks } = useTask();

  function confirmClearTasks() {
    var answer = window.confirm("This will clear all current tasks");
    if (answer) {
      removeAllTasks();
    }
  }

  return (
    <>
      {tasks.map((task, index) => (
        <Task key={index} task={task} />
      ))}
      {tasks && (
        <div className="flex justify-end">
          <Button variant="danger" onClick={() => confirmClearTasks()}>
            Clear All
          </Button>
        </div>
      )}
    </>
  );
};
