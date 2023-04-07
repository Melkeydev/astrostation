import "@Components/Kanban/kanban.css";
import { useKanban, useToggleKanban } from "@Root/src/store";
import { IconContext } from "react-icons";
import { IoCloseSharp } from "react-icons/io5";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FormEvent, useState } from "react";
import { BsPlus } from "react-icons/bs";
import { v4 } from "uuid";
import useMediaQuery from "@Utils/hooks/useMediaQuery";

const KanbanColumn = ({ column, addTask, deleteTask }) => {
  const [taskAddMode, setTaskAddMode] = useState(false);
  const [taskInputValue, setTaskInputValue] = useState("");

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    setTaskAddMode(false);
    if (taskInputValue === "" || !/\S/.test(taskInputValue)) {
      setTaskInputValue("");
      return;
    }

    addTask(column.id, taskInputValue);
    setTaskInputValue("");
  }

  return (
    <Droppable key={column.id} droppableId={column.id}>
      {provided => {
        return (
          <div ref={provided.innerRef} {...provided.droppableProps} className="w-full">
            <div className="flex h-64 w-full max-w-[200px] flex-col gap-2 overflow-auto rounded-md border border-gray-200 p-2 dark:border-gray-700 flex-grow-0">
              <h2 className="font-bold">{column.title}</h2>
              <div className="flex flex-col gap-2 overflow-y-auto justify-between h-full">
                <div className="flex flex-col gap-2">
                  {column.tasks.map((task, index) => {
                    return (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {provided => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              ...provided.draggableProps.style,
                              userSelect: "none",
                            }}
                            className="flex flex-grow-0 flex-row items-center justify-between rounded-md bg-gray-300 py-2 pl-2 pr-1 dark:bg-gray-600"
                          >
                            <span className="text-no-overflow align-middle">{task.name}</span>
                            <div className="grow-0">
                              <IoCloseSharp
                                onClick={() => deleteTask(index)}
                                className="h-6 w-6 grow-0 cursor-pointer rounded-md px-1 text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-500"
                              />
                            </div>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
                <div className="w-full">
                  {!taskAddMode ? (
                    <button
                      className="flex flex-row items-center gap-1 rounded-md px-1 text-left hover:bg-gray-200 dark:hover:bg-gray-600 w-full"
                      onClick={() => setTaskAddMode(true)}
                    >
                      <BsPlus className="h-6 w-6" />
                      <span className="align-middle">Add Task</span>
                    </button>
                  ) : (
                    <form onSubmit={e => onFormSubmit(e)}>
                      <input
                        autoFocus
                        value={taskInputValue}
                        onChange={event => {
                          setTaskInputValue(event.target.value);
                        }}
                        placeholder="Enter a task name..."
                        className="mb-2 w-full rounded-sm border border-gray-300 p-1 dark:border-gray-500 dark:bg-gray-700"
                      />
                      <div className="flex w-full flex-row gap-1">
                        <button className="rounded-md bg-blue-600 px-2 py-0.5 text-white hover:bg-blue-700">
                          Add Task
                        </button>
                        <button
                          className="rounded-md px-2 py-0.5 hover:bg-gray-300 dark:hover:bg-gray-600"
                          onClick={() => setTaskInputValue("")}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </Droppable>
  );
};

export const Kanban = ({}) => {
  const { setIsKanbanToggled } = useToggleKanban();
  const { board, setColumns } = useKanban();
  const isDesktop = useMediaQuery("(min-width: 641px)");

  const addTask = (columnId: string, taskName: string) => {
    const column = board.columns.filter(obj => {
      return obj.id === columnId;
    })[0];
    const columnIndex = board.columns.indexOf(column);

    let columns = board.columns;
    columns[columnIndex].tasks.push({ id: v4(), name: taskName });

    setColumns(columns);
  };

  const deleteTask = (taskIndex: number, columnId: string) => {
    const column = board.columns.filter(obj => {
      return obj.id === columnId;
    })[0];
    const columnIndex = board.columns.indexOf(column);

    let columns = board.columns;

    if (!confirm(`Are you sure you want to delete the task "${columns[columnIndex].tasks[taskIndex].name}"?`)) {
      return;
    }

    columns[columnIndex].tasks.splice(taskIndex, 1);
    setColumns(columns);
  };

  const onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const sourceColumn = board.columns.find(col => col.id === source.droppableId);
    const destColumn = board.columns.find(col => col.id === destination.droppableId);

    const draggedTask = sourceColumn.tasks.find(task => task.id === draggableId);

    sourceColumn.tasks.splice(source.index, 1);
    destColumn.tasks.splice(destination.index, 0, draggedTask);

    setColumns([...board.columns]);
  };

  return (
    <div className="my-2 w-72 rounded-lg border border-gray-200 bg-white/[.96] py-4 px-3 text-gray-800 shadow-md dark:border-gray-700 dark:bg-gray-800/[.96] dark:text-gray-300 sm:w-[40rem]">
      <div className="flex w-full flex-col">
        <div className="mb-2 flex flex-row items-center justify-between">
          <h1 className="font-bold text-gray-800 dark:text-white">Kanban board</h1>
          <IconContext.Provider value={{ size: "1.1rem" }}>
            <IoCloseSharp
              className="cursor-pointer text-red-500 hover:bg-red-200"
              onClick={() => setIsKanbanToggled(false)}
            />
          </IconContext.Provider>
        </div>
        <div className="cancelDrag flex h-full w-full flex-row items-center gap-2">
          <DragDropContext onDragEnd={onDragEnd}>
            <div className={`flex w-full gap-2 ${isDesktop ? "flex-row" : "flex-col"}`}>
              {board.columns.map(column => (
                <KanbanColumn
                  key={column.id}
                  column={column}
                  addTask={(columnId, taskName) => addTask(columnId, taskName)}
                  deleteTask={passedIndex => deleteTask(passedIndex, column.id)}
                />
              ))}
            </div>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};
