import {
  useToggleMusic,
  useToggleTimer,
  useToggleTasks,
  useSpotifyMusic,
  useToggleSettings,
} from "../store";
import { Player } from "../components/Player/Player";
import { Timer } from "../components/Timer/Timer";
import { TaskTracker } from "../components/TaskTracker/TaskTracker";
import { Spotify } from "../components/Player/Spotify/Player";
import { BackgroundNav } from "../components/Nav/BackgroundNav";
import { TimerSettings } from "../components/Timer/Settings";
import { GoGear } from "react-icons/go";

export const HomePage = ({ backgrounds }: { backgrounds: any }) => {
  const { isMusicToggled } = useToggleMusic();
  const { isTimerToggled } = useToggleTimer();
  const { isTasksToggled } = useToggleTasks();
  const { isSpotifyToggled } = useSpotifyMusic();
  const { isSettingsToggled, setIsSettingsToggled } = useToggleSettings();

  return (
    <div className="h-full w-full space-y-1">
      <div className="flex justify-end space-x-6">
        <button
          type="button"
          className="flex items-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 focus:outline-none"
          onClick={() => setIsSettingsToggled(!isSettingsToggled)}
        >
          Settings
          <GoGear className="-mr-1 ml-2" />
        </button>
        <BackgroundNav backgrounds={backgrounds} />
      </div>
      {isMusicToggled && (
        <div className="flex justify-center">
          <Player />
        </div>
      )}
      <div
        className={`flex justify-center ${
          isSpotifyToggled ? "block" : "hidden"
        }`}
      >
        <Spotify />
      </div>
      {isSettingsToggled && (
        <div className="flex justify-center">
          <TimerSettings />
        </div>
      )}
      {isTimerToggled && (
        <div className="flex justify-center">
          <Timer />
        </div>
      )}
      {isTasksToggled && (
        <div className="flex justify-center">
          <TaskTracker />
        </div>
      )}
    </div>
  );
};
