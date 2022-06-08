import {
  usePosTask,
  usePosMusic,
  usePosSpotify,
  usePosTimer,
  useShortBreakTimer,
  useLongBreakTimer,
  usePomodoroTimer,
  usePosQuote,
  useGrid,
} from "@Store";

function useSetDefault() {
  const { setTaskPosDefault } = usePosTask();
  const { setMusicPosDefault } = usePosMusic();
  const { setSpotifyPosDefault } = usePosSpotify();
  const { setTimerPosDefault } = usePosTimer();
  const { setQuotePosDefault } = usePosQuote();
  const { setGridDefault } = useGrid();
  const { defaultShortBreakLength } = useShortBreakTimer();
  const { defaultLongBreakLength } = useLongBreakTimer();
  const { defaultPomodoroLength } = usePomodoroTimer();

  return (
    clearStorage: boolean,
    clearSettings: boolean,
    clearPosition: boolean
  ) => {
    if (clearStorage) {
      localStorage.clear();
    }

    // Reset all settings
    if (clearSettings) {
      defaultShortBreakLength();
      defaultLongBreakLength();
      defaultPomodoroLength();
      setGridDefault();
    }

    if (clearPosition) {
      // Reset all widget positions
      setTaskPosDefault();
      setMusicPosDefault();
      setSpotifyPosDefault();
      setTimerPosDefault();
      setQuotePosDefault();
      window.location.reload();
    }
  };
}

export default useSetDefault;
