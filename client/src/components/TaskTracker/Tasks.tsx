import { Task } from "./Task";

export const Tasks = ({ tasks }: any) => {
  return (
    <>
      {tasks.map((task, index) => (
        <Task key={index} task={task} />
      ))}
    </>
  );
};
