import { Button } from "../components/Common/Button";
import {
  useSetBackground,
  useToggleMusic,
  useToggleTimer,
  useToggleTasks,
} from "../store";
import { Player } from "../components/Player/Player";
import { Timer } from "../components/Timer/Timer";
import { TaskTracker } from "../components/TaskTracker/TaskTracker";
import { Spotify } from "../components/Player/Spotify/Player";

// Store Hooks

export const HomePage = ({ backgrounds }: { backgrounds: any }) => {
  const { setIsBackground } = useSetBackground();
  const { isMusicToggled } = useToggleMusic();
  const { isTimerToggled } = useToggleTimer();
  const { isTasksToggled } = useToggleTasks();
  return (
    <div className="h-full w-full space-y-1">
      <div className="flex justify-end">
        <Button onClick={() => setIsBackground(backgrounds.SPACE)}>
          Button
        </Button>
        <Button onClick={() => setIsBackground(backgrounds.STARS)}>
          Button
        </Button>
        <Button onClick={() => setIsBackground(backgrounds.CITY)}>
          Button
        </Button>
      </div>
      {isMusicToggled && (
        <div className="flex justify-center">
          <Player />
        </div>
      )}
      <div className="flex justify-center">
        <Spotify />
      </div>
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
