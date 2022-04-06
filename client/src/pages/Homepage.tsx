import {
  Droppable,
  Draggable,
  DragDropContext,
  DropResult,
} from "react-beautiful-dnd";
// import { TimerSettings } from "../components/Timer/Settings";
import { GoGear } from "react-icons/go";
// import { Player } from "../components/Player/Player";
// import { Timer } from "../components/Timer/Timer";
// import { TaskTracker } from "../components/TaskTracker/TaskTracker";
// import { Spotify } from "../components/Player/Spotify/Player";
import { BackgroundNav } from "../components/Nav/BackgroundNav";
import { usePluginsStore, useToggleSettings } from "../store";
import { Plugin, makeDraggablePluginComponent } from "../types/Plugins"

export const HomePage = ({ backgrounds }: { backgrounds: any }) => {
  // const { isMusicToggled } = useToggleMusic();
  // const { isTimerToggled } = useToggleTimer();
  // const { isTasksToggled } = useToggleTasks();
  // const { isSpotifyToggled } = useSpotifyMusic();
  const { isSettingsToggled, setIsSettingsToggled } = useToggleSettings();
  const { plugins, reorderPlugins } = usePluginsStore()

  function onDragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }

    reorderPlugins(result)
  }

  return (
    <div className="h-full w-full space-y-1">
      <div className="flex justify-end space-x-6">
        <button
          type="button"
          className="flex items-center rounded-md shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 focus:outline-none dark:bg-gray-800 dark:text-gray-200"
          onClick={() => setIsSettingsToggled(!isSettingsToggled)}
        >
          Settings
          <GoGear className="-mr-1 ml-2" />
        </button>
        <BackgroundNav backgrounds={backgrounds} />
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="main">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="w-1/5 mx-auto text-gray-800 dark:text-gray-200"
            >
              <div className="flex flex-col space-y-2">
                {plugins.map((plugin: Plugin, index: number) => (
                  <Draggable
                    draggableId={`pluginid-${index}`}
                    index={index}
                    key={`pluginidkey-${index}`}
                  >
                    {(pluginProvided, pluginSnapshot) => (
                      <div
                        ref={pluginProvided.innerRef}
                        {...pluginProvided.draggableProps}
                        {...pluginProvided.dragHandleProps}
                      >
                        {makeDraggablePluginComponent(plugin)}
                      </div>
                    )}
                  </Draggable>
                ))}
              </div>

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/*
      <div
        className={`flex justify-center ${isMusicToggled ? "block" : "hidden"}`}
      >
        <Player />
      </div>
      <div
        className={`flex justify-center ${
          isSpotifyToggled ? "block" : "hidden"
        }`}
      >
        <Spotify />
      </div>
      <div
        className={`flex justify-center ${
          isSettingsToggled ? "block" : "hidden"
        }`}
      >
        <TimerSettings />
      </div>
      <div
        className={`flex justify-center ${isTimerToggled ? "block" : "hidden"}`}
      >
        <Timer />
      </div>
      <div
        className={`flex justify-center ${isTasksToggled ? "block" : "hidden"}`}
      >
        <TaskTracker />
      </div>
      */}
    </div>
  );
};
