import { useState } from "react";
import YouTube from "react-youtube";
import { FaPlayCircle, FaPauseCircle, FaYoutube } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { IconContext } from "react-icons";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

interface IPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  setVolume: (volume: number | number[]) => void;
}

export const Player = () => {
  const [player, setPlayer] = useState<IPlayer>();
  // TODO: change this to be a static list fetched
  const [videoId, SetVideoId] = useState("0uw1Adx0psw");
  const [playAudio, setPlayAudio] = useState(true);

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
  return (
    <>
      <div className="py-4 px-3 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 w-1/2">
        <div className="flex items-center space-x-6 justify-between">
          <div>Name of Song</div>
          <div className="flex space-x-2">
            <IconContext.Provider value={{ size: "1.1rem" }}>
              <FaYoutube />
            </IconContext.Provider>
            <IconContext.Provider value={{ size: "1.1rem" }}>
              <AiOutlineHeart />
            </IconContext.Provider>
          </div>
        </div>
        <YouTube className="hidden" videoId={videoId} onReady={onReady} />
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
            trackStyle={[{ backgroundColor: "black" }]}
            handleStyle={[{ backgroundColor: "black", borderColor: "white" }]}
          />
        </div>
      </div>
    </>
  );
};
