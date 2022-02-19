import { useState } from "react";
import YouTube from "react-youtube";
import { Button } from "../Common/Button";

interface IPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
}

export const Player = () => {
  const [player, setPlayer] = useState<IPlayer>();
  // TODO: change this to be a static list fetched
  const [videoId, SetVideoId] = useState("0uw1Adx0psw");

  const onReady = (e: any) => {
    setPlayer(e.target);
  };

  const onPlayVideo = () => {
    player?.playVideo();
  };

  const onPauseVideo = () => {
    player?.pauseVideo();
  };
  return (
    <>
      <YouTube className="hidden" videoId={videoId} onReady={onReady} />
      <Button onClick={onPlayVideo} disabled={!player}>
        Play
      </Button>
      <Button onClick={onPauseVideo} disabled={!player}>
        Pause
      </Button>
    </>
  );
};
