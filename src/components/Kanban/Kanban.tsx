import "@Components/Kanban/kanban.css";
import { useKanban, useToggleKanban } from "@Root/src/store";
import { IconContext } from "react-icons";
import { IoCloseSharp } from "react-icons/io5";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState } from "react";

const KanbanColumn = ({ column, deleteTask }) => {
  const test = () => {
    console.log("pog");
  }

  return (
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
                        className="rounded-md bg-gray-600 py-2 pl-2 pr-1 flex flex-row justify-between items-center"
                      >
                        <span className="align-middle">{task.name}</span>
                        <div className="grow-0">
                          <IoCloseSharp onClick={() => deleteTask(index)} className="cursor-pointer text-gray-400 hover:bg-gray-500 rounded-md w-6 h-6 px-1 grow-0" />
                        </div>
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
  )
}

export const Kanban = ({}) => {
  const { isKanbanToggled, setIsKanbanToggled } = useToggleKanban();

  const { board, setColumns } = useKanban();

  const addTask = (_, column) => { };

  const deleteTask = (taskIndex: number, columnId: string) => {
    console.log(taskIndex, columnId);
  }

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

    const sourceColumn = board.columns.find((col) => col.id === source.droppableId);
    const destColumn = board.columns.find(
      (col) => col.id === destination.droppableId
    );

    const draggedTask = sourceColumn.tasks.find(
      (task) => task.id === draggableId
    );

    sourceColumn.tasks.splice(source.index, 1);
    destColumn.tasks.splice(destination.index, 0, draggedTask);

    setColumns([...board.columns]);
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
            <div className="w-full flex flex-row gap-2">
              {board.columns.map((column) => (
                <KanbanColumn column={column} deleteTask={(passedIndex) => deleteTask(passedIndex, column.id)} />
              ))}
            </div>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};
