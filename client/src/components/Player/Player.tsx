import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { FaPauseCircle, FaPlayCircle, FaYoutube } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import YouTube from "react-youtube";
import {
  StationPlugin,
  useSong,
  useStationPluginsStore,
  useToggleMusic,
} from "../../store";
import "./Player.scss";
import { StationSelector } from "./StationSelector";

interface IPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  changeVideo: () => void;
  setVolume: (volume: number | number[]) => void;
}

type OptionType = {
  playerVars: PlayerVarsType;
};

type PlayerVarsType = {
  autoplay: number;
};

export const Player = () => {
  const { song, toggledSong } = useSong();
  const { plugins, remove: removePlugin } = useStationPluginsStore();

  const [player, setPlayer] = useState<IPlayer>();
  const [playAudio, setPlayAudio] = useState(true);
  const [autoplay, setAutoPlay] = useState(0);

  useEffect(() => {
    if (toggledSong) {
      if (playAudio) {
        setPlayAudio(false);
      }
      setAutoPlay(1);
    }
  }, [toggledSong]);

  useEffect(() => {
    if (!plugins.includes(StationPlugin.LofiPlayer)) {
      onPauseVideo();
    }
  }, [plugins]);

  const onReady = (e: any) => {
    setPlayer(e.target);
  };

  const onPlayVideo = () => {
    player?.playVideo();
  };

  const onPauseVideo = () => {
    player?.pauseVideo();
  };

  const onVolumeChange = (value: number | number[]) => {
    player?.setVolume(value);
  };

  const triggerAudio = () => {
    if (playAudio) {
      onPlayVideo();
    } else {
      onPauseVideo();
    }
    setPlayAudio(!playAudio);
  };

  let opts: OptionType = {
    playerVars: {
      autoplay: autoplay as number,
    },
  };
  return (
    <div className="p-4">
      <div className="flex items-center space-x-6 justify-between">
        <div>{song?.artist}</div>
        <div className="flex space-x-2">
          <IconContext.Provider value={{ size: "1.1rem" }}>
            <FaYoutube />
          </IconContext.Provider>
          <IconContext.Provider value={{ size: "1.1rem" }}>
            <IoCloseSharp
              className="text-red-500 cursor-pointer hover:bg-red-200"
              onClick={() => removePlugin(StationPlugin.LofiPlayer)}
            />
          </IconContext.Provider>
        </div>
      </div>
      <YouTube
        className="hidden"
        videoId={song.id}
        onReady={onReady}
        // @ts-ignore
        opts={opts}
      />
      <div className="space-y-2">
        <div className="flex items-center space-x-3">
          <IconContext.Provider value={{ size: "1.5rem" }}>
            {playAudio ? (
              <FaPlayCircle onClick={triggerAudio} />
            ) : (
              <FaPauseCircle onClick={triggerAudio} />
            )}
          </IconContext.Provider>
          <Slider
            defaultValue={75}
            onChange={(value) => {
              onVolumeChange(value);
            }}
          />
        </div>
        <StationSelector />
      </div>
    </div>
  );
};
