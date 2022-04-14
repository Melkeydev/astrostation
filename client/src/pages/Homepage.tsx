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

import { Donations } from "../components/Crypto/Donations";

import Draggable from "react-draggable";

import { DWrapper } from "../components/Dragggable/Draggable";

export const HomePage = ({ backgrounds }: { backgrounds: any }) => {
  const { isMusicToggled } = useToggleMusic();
  const { isTimerToggled } = useToggleTimer();
  const { isTasksToggled } = useToggleTasks();
  const { isSpotifyToggled } = useSpotifyMusic();
  const { isSettingsToggled, setIsSettingsToggled } = useToggleSettings();

  return (
    <div className="h-screen w-70 space-y-1">
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
      <DWrapper toggleHook={isMusicToggled}>
        <Player />
      </DWrapper>
      <DWrapper toggleHook={isSpotifyToggled}>
        <Spotify />
      </DWrapper>
      <DWrapper toggleHook={isSettingsToggled}>
        <TimerSettings />
      </DWrapper>
      <DWrapper toggleHook={isTimerToggled}>
        <Timer />
      </DWrapper>
      <DWrapper toggleHook={isTasksToggled}>
        <TaskTracker />
      </DWrapper>
      <div className="fixed bottom-0">
        <Donations />
      </div>
    </div>
  );
};
