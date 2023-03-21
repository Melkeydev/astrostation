import {
  usePosTask,
  usePosMusic,
  usePosSpotify,
  usePosTimer,
  usePosQuote,
  usePosTwitch,
  usePosHackerNews,
} from "@Store";

function useSetDefault() {
  const { setTaskPosDefault } = usePosTask();
  const { setMusicPosDefault } = usePosMusic();
  const { setSpotifyPosDefault } = usePosSpotify();
  const { setTimerPosDefault } = usePosTimer();
  const { setQuotePosDefault } = usePosQuote();
  const { setTwitchPosDefault } = usePosTwitch();
  const { setHackerNewsPosDefault } = usePosHackerNews();

  return () => {
    // Reset all widget positions
    setTaskPosDefault();
    setMusicPosDefault();
    setSpotifyPosDefault();
    setTimerPosDefault();
    setQuotePosDefault();
    setTwitchPosDefault();
    setHackerNewsPosDefault();
  };
}

export default useSetDefault;
