import { Button } from "../components/Common/Button";
import { useSetBackground } from "../store";
import { Player } from "../components/Player/Player";
import { FaPlayCircle } from "react-icons/fa";

export const HomePage = ({ backgrounds }: { backgrounds: any }) => {
  const { isBackground, setIsBackground } = useSetBackground();
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
      <div className="flex justify-center">
        <Player />
      </div>
    </div>
  );
};
