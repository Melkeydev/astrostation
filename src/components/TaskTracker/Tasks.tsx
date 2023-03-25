import { Task } from "./Task";
import { Button } from "@Components/Common/Button";
import { useTask } from "@Store";
import { ITask } from "@App/interfaces";
import { useState, } from 'react';

export const Tasks = ({ tasks }) => {
  const { removeAllTasks } = useTask();

  function confirmClearTasks() {
    var answer = window.confirm("This will clear all current tasks");
    if (answer) {
      removeAllTasks();
    }

  };
  const [menuVisible, setMenuVisible] = useState(false);

  const handleDocumentClick = () => {
    setMenuVisible(false);
    document.removeEventListener('click', handleDocumentClick);
  };
  const handleContextMenu = (e) => {
    e.preventDefault();
    setMenuVisible(true);
    document.addEventListener('click', handleDocumentClick);

  }

  return (
    <>
      {tasks.map((task: ITask, index: number) => (
          <Task key={index} task={task} />
      ))}
      {tasks && (
        <div className="flex justify-end mt-4">
          <Button variant="danger" onClick={() => confirmClearTasks()}>
            Clear All
          </Button>
        </div>
      )}
    </>
  );
};
