import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { FaPauseCircle, FaPlayCircle, FaYoutube } from "react-icons/fa";
import YouTube from "react-youtube";
import { useSong, useToggleMusic } from "../../../../store";
import "./Lofi.scss";
import { StationSelector } from "./StationSelector";
import { Plugin } from "../../Plugin";

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

export const LofiPlayer = () => {
  const { song, toggledSong } = useSong();
  const { isMusicToggled, setIsMusicToggled } = useToggleMusic();

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
    if (!isMusicToggled) {
      onPauseVideo();
    }
  }, [isMusicToggled]);

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

  const titleChildren = <FaYoutube />;

  return (
    <Plugin
      title={song?.artist}
      titleChildren={titleChildren}
      onClose={() => setIsMusicToggled(false)}
    >
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
    </Plugin>
  );
};
