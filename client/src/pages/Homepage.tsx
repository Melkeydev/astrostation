import {
  useToggleMusic,
  useToggleTimer,
  useToggleTasks,
  useSpotifyMusic,
} from "../store";
import { Player } from "../components/Player/Player";
import { Timer } from "../components/Timer/Timer";
import { TaskTracker } from "../components/TaskTracker/TaskTracker";
import { Spotify } from "../components/Player/Spotify/Player";
import { BackgroundNav } from "../components/Nav/BackgroundNav";

import { TimerSettings } from "../components/Timer/Settings";

export const HomePage = ({ backgrounds }: { backgrounds: any }) => {
  const { isMusicToggled } = useToggleMusic();
  const { isTimerToggled } = useToggleTimer();
  const { isTasksToggled } = useToggleTasks();
  const { isSpotifyToggled } = useSpotifyMusic();

  return (
    <div className="h-full w-full space-y-1">
      <BackgroundNav backgrounds={backgrounds} />
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
      {isTimerToggled && (
        <div className="flex justify-center">
          <TimerSettings />
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
