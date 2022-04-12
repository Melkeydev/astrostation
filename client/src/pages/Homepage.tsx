import { useCallback } from "react";
import {
  DragDropContext,
  Droppable,
  DropResult,
  Draggable,
} from "react-beautiful-dnd";
import { GoGear } from "react-icons/go";
import { Donations } from "../components/Crypto/Donations";
import { BackgroundNav } from "../components/Nav/BackgroundNav";
import { Player } from "../components/Player/Player";
import { Spotify } from "../components/Player/Spotify/Player";
import { TaskTracker } from "../components/TaskTracker/TaskTracker";
import { TimerSettings } from "../components/Timer/Settings";
import { Timer } from "../components/Timer/Timer";
import { StationPlugin, useStationPluginsStore } from "../store";

export const HomePage = ({ backgrounds }: { backgrounds: any }) => {
  const {
    plugins,
    toggle: togglePlugin,
    reorder: reorderPlugins,
  } = useStationPluginsStore();

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) {
        return;
      }

      reorderPlugins(result);
    },
    [reorderPlugins]
  );

  const makeStationPluginComponent = useCallback((name: StationPlugin) => {
    switch (name) {
      case StationPlugin.LofiPlayer:
        return <Player />;

      case StationPlugin.SpotifyPlayer:
        return <Spotify />;

      case StationPlugin.TaskTracker:
        return <TaskTracker />;

      case StationPlugin.Timer:
        return <Timer />;

      case StationPlugin.TimerSettings:
        return <TimerSettings />;

      default:
        throw new Error("StationPlugin: Not valid plugin name");
    }
  }, [Player, Spotify, TaskTracker, Timer, TimerSettings]);

  return (
    <div className="h-full w-full space-y-1">
      <div className="flex justify-end space-x-6">
        <button
          type="button"
          className="flex items-center rounded-md shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 focus:outline-none dark:bg-gray-800 dark:text-gray-200"
          onClick={() => togglePlugin(StationPlugin.TimerSettings)}
        >
          Settings
          <GoGear className="-mr-1 ml-2" />
        </button>

        <BackgroundNav backgrounds={backgrounds} />
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="stationplugins">
          {(provided, _snapshot) => (
            <div
              className="flex flex-col items-center space-y-4"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {plugins.map((plugin, index) => (
                <Draggable
                  key={`stationplugin-ref-${index}`}
                  draggableId={`stationplugin-id-${index}`}
                  index={index}
                >
                  {(draggableProvided, _draggableSnapshot) => (
                    <div
                      className="max-w-sm w-1/2 bg-white text-gray-800 rounded-lg border border-gray-200 shadow-md dark:text-gray-300 dark:bg-gray-800 dark:border-gray-700"
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                    >
                      {makeStationPluginComponent(plugin)}
                    </div>
                  )}
                </Draggable>
              ))}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div className="fixed bottom-0">
        <Donations />
      </div>
    </div>
  );
};
