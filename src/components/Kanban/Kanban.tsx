import "@Components/Kanban/kanban.css";
import { useToggleKanban } from "@Root/src/store";
import { IconContext } from "react-icons";
import { IoCloseSharp } from "react-icons/io5";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState } from "react";

export const Kanban = ({}) => {
  const { isKanbanToggled, setIsKanbanToggled } = useToggleKanban();

  const [columns, setColumns] = useState([
    {
      id: "n23fnj3mfa073ad",
      title: "To Do",
      tasks: [
        { id: "9nan529dab2495", name: "Example Task" },
        { id: "nd35gna205ndz2", name: "Nice Task" },
      ],
    },
    {
      id: "za9w4550snadi23",
      title: "In Progress",
      tasks: [
        { id: "jfiojijaw523a5", name: "Very nice Task" },
        { id: "onbz237gwue25h", name: "Interesting Task" },
      ],
    },
    {
      id: "kl323dn3ai23ndaw",
      title: "Done",
      tasks: [
        { id: "99dua235madiok", name: "Finished Task 1" },
        { id: "jdo235hadu298a", name: "Finished Task 2" },
      ],
    },
  ]);

  const addTask = (_, column) => {};

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceColumn = columns.find((col) => col.id === source.droppableId);
    const destColumn = columns.find(
      (col) => col.id === destination.droppableId
    );

    const draggedTask = sourceColumn.tasks.find(
      (task) => task.id === draggableId
    );

    sourceColumn.tasks.splice(source.index, 1);
    destColumn.tasks.splice(destination.index, 0, draggedTask);

    setColumns([...columns]);
  };

  return (
    <div className="mb-2 w-72 rounded-lg border border-gray-200 bg-white/[.96] py-4 px-3 text-gray-800 shadow-md dark:border-gray-700 dark:bg-gray-800/[.96] dark:text-gray-300 sm:w-[40rem]">
      <div className="flex w-full flex-col">
        <div className="mb-2 flex flex-row items-center justify-between">
          <h1 className="font-bold text-gray-800 dark:text-white">
            Kanban board
          </h1>
          <IconContext.Provider value={{ size: "1.1rem" }}>
            <IoCloseSharp
              className="cursor-pointer text-red-500 hover:bg-red-200"
              onClick={() => setIsKanbanToggled(false)}
            />
          </IconContext.Provider>
        </div>
        <div className="cancelDrag flex h-full w-full flex-row items-center gap-2">
          <DragDropContext onDragEnd={onDragEnd}>
            {columns.map((column) => (
              <Droppable key={column.id} droppableId={column.id}>
                {(provided) => {
                  return (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="w-full"
                    >
                      <div className="flex h-64 w-full flex-col gap-2 overflow-auto rounded-md border border-gray-700 p-2">
                        <h2 className="font-bold">{column.title}</h2>
                        {column.tasks.map((task, index) => {
                          return (
                            <Draggable
                              key={task.id}
                              draggableId={task.id}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={{
                                    ...provided.draggableProps.style,
                                    userSelect: "none",
                                  }}
                                  className="rounded-md bg-gray-600 p-2"
                                >
                                  {task.name}
                                </div>
                              )}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    </div>
                  );
                }}
              </Droppable>
            ))}
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};
