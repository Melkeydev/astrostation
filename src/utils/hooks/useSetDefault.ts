import { usePosTask, usePosMusic, usePosSpotify, usePosTimer, usePosQuote, usePosTwitch, usePosYoutube } from "@Store";

function useSetDefault() {
  const { setTaskPosDefault } = usePosTask();
  const { setMusicPosDefault } = usePosMusic();
  const { setSpotifyPosDefault } = usePosSpotify();
  const { setTimerPosDefault } = usePosTimer();
  const { setQuotePosDefault } = usePosQuote();
  const { setTwitchPosDefault } = usePosTwitch();
  const { setYoutubePosDefault } = usePosYoutube();

  return () => {
    // Reset all widget positions
    setTaskPosDefault();
    setMusicPosDefault();
    setSpotifyPosDefault();
    setTimerPosDefault();
    setQuotePosDefault();
    setTwitchPosDefault();
    setYoutubePosDefault();
  };
}

export default useSetDefault;
