import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { FaPauseCircle, FaPlayCircle, FaYoutube } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import YouTube from "react-youtube";
import { useSong, useToggleMusic, usePlayerAudioVolume } from "@Store";
import "./Player.scss";
import { StationSelector } from "./StationSelector";
import { IPlayer, IOptionType } from "./interfaces";

export const Player = () => {
  const { song, toggledSong } = useSong();
  const { isMusicToggled, setIsMusicToggled } = useToggleMusic();
  const { audioVolume, setAudioVolume } = usePlayerAudioVolume();
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
    e.target.setVolume(audioVolume);
    setPlayer(e.target);
  };

  const onPlayVideo = () => {
    player?.playVideo();
  };

  const onPauseVideo = () => {
    player?.pauseVideo();
  };

  const onVolumeChange = (value: number | number[]) => {
    setAudioVolume(value as number);
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

  let opts: IOptionType = {
    playerVars: {
      autoplay: autoplay as number,
    },
  };

  return (
    <>
      <div className="mb-2 w-72 rounded-lg border border-gray-200 bg-white/[.96] py-4 px-3 text-gray-800 shadow-md dark:border-gray-700 dark:bg-gray-800/[.96] dark:text-gray-300 sm:w-96 ">
        <div className="flex items-center justify-between space-x-6">
          <div>{song?.artist}</div>
          <div className="flex space-x-2">
            <IconContext.Provider value={{ size: "1.1rem" }}>
              <FaYoutube />
            </IconContext.Provider>
            <IconContext.Provider value={{ size: "1.1rem" }}>
              <IoCloseSharp
                className="cursor-pointer text-red-500 hover:bg-red-200"
                onClick={() => setIsMusicToggled(false)}
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
              {playAudio ? <FaPlayCircle onClick={triggerAudio} /> : <FaPauseCircle onClick={triggerAudio} />}
            </IconContext.Provider>
            <Slider
              defaultValue={audioVolume}
              onChange={value => {
                onVolumeChange(value as number);
              }}
              railStyle={{
                backgroundColor: "#000",
              }}
              handleStyle={{
                backgroundColor: "#fff",
                opacity: 1,
                color: "red",
              }}
              trackStyle={{
                backgroundColor: "#fff",
              }}
            />
          </div>
          <StationSelector />
        </div>
      </div>
    </>
  );
};
