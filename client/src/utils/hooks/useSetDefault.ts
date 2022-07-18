import {
  usePosTask,
  usePosMusic,
  usePosSpotify,
  usePosTimer,
  usePosQuote,
  usePosTwitch,
} from "@Store";

function useSetDefault() {
  const { setTaskPosDefault } = usePosTask();
  const { setMusicPosDefault } = usePosMusic();
  const { setSpotifyPosDefault } = usePosSpotify();
  const { setTimerPosDefault } = usePosTimer();
  const { setQuotePosDefault } = usePosQuote();
  const { setTwitchPosDefault } = usePosTwitch();

  return () => {
    // Reset all widget positions
    setTaskPosDefault();
    setMusicPosDefault();
    setSpotifyPosDefault();
    setTimerPosDefault();
    setQuotePosDefault();
    setTwitchPosDefault();
  };
}

export default useSetDefault;
