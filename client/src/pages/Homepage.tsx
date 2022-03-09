import { Button } from "../components/Common/Button";
import { useSetBackground, useToggleMusic, useToggleTimer } from "../store";
import { Player } from "../components/Player/Player";
import { Timer } from "../components/Timer/Timer";

import { TaskTracker } from "../components/TaskTracker/TaskTracker";

// Store Hooks

export const HomePage = ({ backgrounds }: { backgrounds: any }) => {
  const { isBackground, setIsBackground } = useSetBackground();
  const { isMusicToggled } = useToggleMusic();
  const { isTimerToggled } = useToggleTimer();
  return (
    <div className="h-full w-full">
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
      {isTimerToggled && (
        <div className="flex justify-center">
          <Timer />
        </div>
      )}
      <div className="flex justify-center">
        <TaskTracker />
      </div>
    </div>
  );
};
